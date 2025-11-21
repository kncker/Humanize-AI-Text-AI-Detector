import React from 'react';
import { AiDetectionResult, AnalysisMetric } from '../services/geminiService';
import { BeakerIcon, ChartBarIcon, DocumentTextIcon, BrainIcon, CalculatorIcon, FingerPrintIcon, LightbulbIcon, FaceSmileIcon } from './Icons';

interface AiDetectorResultProps {
    result: AiDetectionResult;
}

const getScoreStyles = (score: number) => {
    if (score > 75) return { bar: 'bg-red-500', text: 'text-red-400' };
    if (score > 40) return { bar: 'bg-yellow-500', text: 'text-yellow-400' };
    return { bar: 'bg-green-500', text: 'text-green-400' };
};

const getScoreText = (score: number) => {
    if (score > 75) return 'Likely AI Generated';
    if (score > 40) return 'Potentially AI Generated';
    return 'Likely Human Written';
}

interface MetricDisplayProps {
    title: string;
    metric: AnalysisMetric;
    icon: React.ReactNode;
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ title, metric, icon }) => {
    const styles = getScoreStyles(metric.score);
    return (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/80 flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-slate-400">{icon}</span>
                    <h4 className="font-semibold text-slate-300">{title}</h4>
                </div>
                <span className={`font-bold text-lg ${styles.text}`}>{Math.round(metric.score)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${styles.bar}`}
                    style={{ width: `${Math.max(5, metric.score)}%` }}
                ></div>
            </div>
            <p className="text-sm text-slate-400 mt-1 flex-grow">{metric.explanation}</p>
        </div>
    );
};


export const AiDetectorResult: React.FC<AiDetectorResultProps> = ({ result }) => {
    const { overallScore, overallExplanation, analysis } = result;
    const styles = getScoreStyles(overallScore);

    const analysisMetrics = [
        { key: 'perplexity', title: 'Perplexity', icon: <BeakerIcon className="w-5 h-5" />, data: analysis.perplexity },
        { key: 'burstiness', title: 'Burstiness', icon: <ChartBarIcon className="w-5 h-5" />, data: analysis.burstiness },
        { key: 'sentenceStructure', title: 'Sentence Structure', icon: <DocumentTextIcon className="w-5 h-5" />, data: analysis.sentenceStructure },
        { key: 'semanticConsistency', title: 'Semantic Consistency', icon: <BrainIcon className="w-5 h-5" />, data: analysis.semanticConsistency },
        { key: 'statisticalAnalysis', title: 'Statistical Patterns', icon: <CalculatorIcon className="w-5 h-5" />, data: analysis.statisticalAnalysis },
        { key: 'watermarkDetection', title: 'AI Watermark', icon: <FingerPrintIcon className="w-5 h-5" />, data: analysis.watermarkDetection },
        { key: 'lexicalOriginality', title: 'Lexical Originality', icon: <LightbulbIcon className="w-5 h-5" />, data: analysis.lexicalOriginality },
        { key: 'emotionalTone', title: 'Emotional Tone', icon: <FaceSmileIcon className="w-5 h-5" />, data: analysis.emotionalTone },
    ];

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 mt-6 w-full max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-center text-slate-300 mb-4">Overall Analysis</h3>
            <div className="text-center mb-4">
                <p className={`text-5xl font-bold ${styles.text}`}>
                    {Math.round(overallScore)}%
                </p>
                <p className="text-slate-400 font-semibold mt-1">{getScoreText(overallScore)}</p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 mb-4">
                <div
                    className={`h-4 rounded-full transition-all duration-500 ${styles.bar}`}
                    style={{ width: `${Math.max(5, overallScore)}%` }}
                ></div>
            </div>
            <p className="text-center text-slate-400 italic mb-8">"{overallExplanation}"</p>

            <div className="border-t border-slate-700 pt-6">
                 <h4 className="text-lg font-semibold text-center text-slate-300 mb-4">Detailed Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analysisMetrics.map(metric => (
                        <MetricDisplay
                            key={metric.key}
                            title={metric.title}
                            icon={metric.icon}
                            metric={metric.data}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};