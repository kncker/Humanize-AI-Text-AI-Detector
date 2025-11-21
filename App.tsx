import React, { useState } from 'react';
import { Header } from './components/Header';
import { SparklesIcon, ShieldCheckIcon } from './components/Icons';
import { HumanizerView } from './components/HumanizerView';
import { AiDetectorView } from './components/AiDetectorView';

type ActiveView = 'humanizer' | 'detector';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<ActiveView>('humanizer');

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <Header />
            <nav className="border-b border-slate-700/50">
                <div className="container mx-auto px-4 flex justify-center">
                    <button 
                        onClick={() => setActiveView('humanizer')}
                        className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${activeView === 'humanizer' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                    >
                        <SparklesIcon className="w-5 h-5" />
                        Humanizer
                    </button>
                    <button 
                        onClick={() => setActiveView('detector')}
                        className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${activeView === 'detector' ? 'border-teal-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                    >
                        <ShieldCheckIcon className="w-5 h-5" />
                        AI Detector
                    </button>
                </div>
            </nav>
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
                {activeView === 'humanizer' ? <HumanizerView /> : <AiDetectorView />}
            </main>
        </div>
    );
};

export default App;
