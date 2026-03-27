import React from 'react';
import { Lightbulb, Search, FolderKanban, PenTool, BookOpen, CheckCircle, Home, RotateCcw } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const steps = [
    { id: 1, name: 'Idea Capture', icon: Lightbulb },
    { id: 2, name: 'Deep Research', icon: Search },
    { id: 3, name: 'Project Hub', icon: FolderKanban },
    { id: 4, name: 'Content Gen', icon: PenTool },
    { id: 5, name: 'Learning Path', icon: BookOpen },
    { id: 6, name: 'Final Output', icon: CheckCircle },
];

const Sidebar = ({ onGoHome, onStartOver }) => {
    const currentStep = useFlowStore((state) => state.currentStep);
    const setCurrentStep = useFlowStore((state) => state.setCurrentStep);

    const handleStepClick = (id) => setCurrentStep(id);

    return (
        <div className="w-64 glass border-r border-white/5 flex flex-col justify-between h-full z-20 hidden md:flex">
            <div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg">F</span>
                        FlowMind
                    </h1>
                </div>

                <nav className="px-4 space-y-2 mt-4">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => handleStepClick(step.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
                  ${isActive
                                        ? 'bg-primary/20 text-white border border-primary/50 shadow-[0_0_15px_rgba(109,40,217,0.3)]'
                                        : isCompleted
                                            ? 'text-gray-300 hover:bg-white/5'
                                            : 'text-gray-500 hover:text-gray-400'}
                `}
                            >
                                <div className={`p-1.5 rounded-md ${isActive ? 'bg-primary/30 text-primary-light' : isCompleted ? 'text-primary' : 'text-gray-500'}`}>
                                    <Icon size={18} />
                                </div>
                                {step.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-white/5 space-y-2">
                <button onClick={onStartOver} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2 rounded-md hover:bg-white/5 transition-colors">
                    <RotateCcw size={16} /> Start Over
                </button>
                <button onClick={onGoHome} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white px-4 py-2 rounded-md hover:bg-white/5 transition-colors">
                    <Home size={16} /> Back to Home
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
