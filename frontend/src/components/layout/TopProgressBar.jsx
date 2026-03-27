import React from 'react';
import useFlowStore from '../../store/useFlowStore';

const TopProgressBar = () => {
    const currentStep = useFlowStore((state) => state.currentStep);
    const totalSteps = 6;
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="h-1 w-full bg-surface/50 border-b border-white/5 z-20">
            <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full blur-[8px]" />
            </div>
        </div>
    );
};

export default TopProgressBar;
