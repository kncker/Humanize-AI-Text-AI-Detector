import React from 'react';
import { ClearIcon, CopyIcon, CheckIcon, UndoIcon, RedoIcon } from './Icons';

interface TextAreaPanelProps {
    title: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    wordCount: number;
    onClear?: () => void;
    onCopy?: () => void;
    isCopied?: boolean;
    isLoading?: boolean;
    isInput: boolean;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
}

const SkeletonLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
);

export const TextAreaPanel: React.FC<TextAreaPanelProps> = ({
    title,
    value,
    onChange,
    placeholder,
    wordCount,
    onClear,
    onCopy,
    isCopied,
    isLoading,
    isInput,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg flex flex-col h-full">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h2 className="font-semibold text-slate-300">{title}</h2>
                <div className="flex items-center gap-4">
                    {isInput && (
                        <>
                            <button onClick={onUndo} disabled={!canUndo} className="text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed transition-colors" title="Undo">
                                <UndoIcon />
                            </button>
                            <button onClick={onRedo} disabled={!canRedo} className="text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed transition-colors" title="Redo">
                                <RedoIcon />
                            </button>
                            {onClear && (
                                <button onClick={onClear} className="text-slate-400 hover:text-white transition-colors" title="Clear Text">
                                    <ClearIcon />
                                </button>
                            )}
                        </>
                    )}
                    {!isInput && onCopy && (
                        <button onClick={onCopy} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5" title="Copy to Clipboard">
                           {isCopied ? <CheckIcon /> : <CopyIcon />}
                           <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="p-4 flex-grow relative">
                {isLoading ? (
                    <SkeletonLoader />
                ) : (
                    <textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        readOnly={!isInput}
                        className="w-full h-full bg-transparent text-slate-300 placeholder-slate-500 resize-none focus:outline-none min-h-[400px] lg:min-h-0"
                    />
                )}
            </div>
            <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
                Word Count: {wordCount}
            </div>
        </div>
    );
};