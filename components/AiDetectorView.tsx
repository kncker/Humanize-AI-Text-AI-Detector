import React, { useState, useCallback, useMemo } from 'react';
import { detectAiText, AiDetectionResult } from '../services/geminiService';
import { TextAreaPanel } from './TextAreaPanel';
import { AiDetectorResult } from './AiDetectorResult';
import { AiDetectorResultSkeleton } from './AiDetectorResultSkeleton';
import { ShieldCheckIcon } from './Icons';

export const AiDetectorView: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [result, setResult] = useState<AiDetectionResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!inputText.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const detectionResult = await detectAiText(inputText);
            setResult(detectionResult);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to analyze text. ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [inputText, isLoading]);
    
    const handleClear = () => {
        setInputText('');
        setResult(null);
        setError(null);
    };

    const wordCount = useMemo(() => {
        return inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    }, [inputText]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-4xl">
                 <TextAreaPanel
                    title="Text to Analyze"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste text here to check for AI content..."
                    wordCount={wordCount}
                    onClear={handleClear}
                    isInput={true}
                 />
            </div>
            
            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !inputText.trim()}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <ShieldCheckIcon />
                            <span>Analyze Text</span>
                        </>
                    )}
                </button>
            </div>
            
            {error && <div className="text-center text-red-400 mt-6">{error}</div>}

            {isLoading && <AiDetectorResultSkeleton />}
            {result && !isLoading && <AiDetectorResult result={result} />}
        </div>
    );
};