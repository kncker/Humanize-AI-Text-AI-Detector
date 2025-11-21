import React from 'react';

const MetricSkeleton: React.FC = () => {
    return (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-24"></div>
                </div>
                <div className="h-6 bg-slate-700 rounded w-12"></div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2"></div>
            <div className="space-y-2 mt-1">
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
            </div>
        </div>
    );
};

export const AiDetectorResultSkeleton: React.FC = () => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 mt-6 w-full max-w-4xl mx-auto animate-pulse">
            <div className="h-5 bg-slate-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="text-center mb-4">
                <div className="h-12 w-24 bg-slate-700 rounded-lg mx-auto"></div>
                <div className="h-4 bg-slate-700 rounded w-1/4 mx-auto mt-2"></div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-4/5 mx-auto mb-8"></div>

            <div className="border-t border-slate-700 pt-6">
                 <div className="h-5 bg-slate-700 rounded w-1/2 mx-auto mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <MetricSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};