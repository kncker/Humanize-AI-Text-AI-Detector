
import React from 'react';
import { SparklesIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center gap-3">
                    <SparklesIcon className="w-8 h-8 text-indigo-400" />
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                        Humanize AI Text
                    </h1>
                </div>
            </div>
        </header>
    );
};
