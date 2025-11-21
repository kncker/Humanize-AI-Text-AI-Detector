import React, { useState, useCallback, useMemo } from 'react';
import { humanizeText, WritingVariety } from '../services/geminiService';
import { TextAreaPanel } from './TextAreaPanel';
import { ArrowIcon, SparklesIcon } from './Icons';
import { useHistoryState } from '../hooks/useHistoryState';

const VarietyButton: React.FC<{
    label: string;
    variety: WritingVariety;
    currentVariety: WritingVariety;
    onClick: (variety: WritingVariety) => void;
}> = ({ label, variety, currentVariety, onClick }) => {
    const isActive = variety === currentVariety;
    return (
        <button
            onClick={() => onClick(variety)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
        >
            {label}
        </button>
    );
};

export const HumanizerView: React.FC = () => {
    const { 
        state: inputText, 
        set: setInputText, 
        undo, 
        redo, 
        canUndo, 
        canRedo 
    } = useHistoryState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [variety, setVariety] = useState<WritingVariety>('default');

    const handleHumanize = useCallback(async () => {
        if (!inputText.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setOutputText('');
        setIsCopied(false);

        try {
            const result = await humanizeText(inputText, variety);
            setOutputText(result);
        } catch (err) {
            setError('Failed to humanize text. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [inputText, isLoading, variety]);

    const handleClearInput = () => {
        setInputText('');
        setOutputText('');
        setError(null);
        setIsCopied(false);
    };

    const handleCopyOutput = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };
    
    const inputWordCount = useMemo(() => {
        return inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    }, [inputText]);

    const outputWordCount = useMemo(() => {
        return outputText.trim() ? outputText.trim().split(/\s+/).length : 0;
    }, [outputText]);
    
    return (
        <>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <TextAreaPanel
                    title="AI Text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your AI-generated text here..."
                    wordCount={inputWordCount}
                    onClear={handleClearInput}
                    isInput={true}
                    onUndo={undo}
                    onRedo={redo}
                    canUndo={canUndo}
                    canRedo={canRedo}
                />
                <TextAreaPanel
                    title="Humanized Text"
                    value={outputText}
                    placeholder="Your human-like text will appear here..."
                    wordCount={outputWordCount}
                    onCopy={handleCopyOutput}
                    isCopied={isCopied}
                    isLoading={isLoading}
                    isInput={false}
                />
            </div>
            {error && <div className="text-center text-red-400 mt-4">{error}</div>}
            <div className="my-6 flex flex-col items-center gap-4">
                 <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-lg">
                    <span className="text-sm font-semibold text-slate-400 px-2">Writing Style:</span>
                    <VarietyButton label="Default" variety="default" currentVariety={variety} onClick={setVariety} />
                    <VarietyButton label="More Varied" variety="varied" currentVariety={variety} onClick={setVariety} />
                    <VarietyButton label="More Concise" variety="concise" currentVariety={variety} onClick={setVariety} />
                </div>
                <button
                    onClick={handleHumanize}
                    disabled={isLoading || !inputText.trim()}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Humanizing...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon />
                            <span>Humanize</span>
                            <ArrowIcon />
                        </>
                    )}
                </button>
            </div>
        </>
    );
};