import React from 'react';
import useFlowStore from '../store/useFlowStore';

import Step1Idea from '../components/wizard/Step1Idea';
import Step2Research from '../components/wizard/Step2Research';
import Step3Project from '../components/wizard/Step3Project';
import Step4Content from '../components/wizard/Step4Content';
import Step5Learning from '../components/wizard/Step5Learning';
import Step6Final from '../components/wizard/Step6Final';

const WizardContainer = () => {
    const currentStep = useFlowStore((state) => state.currentStep);

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1Idea />;
            case 2: return <Step2Research />;
            case 3: return <Step3Project />;
            case 4: return <Step4Content />;
            case 5: return <Step5Learning />;
            case 6: return <Step6Final />;
            default: return <Step1Idea />;
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col relative">
            {renderStep()}
        </div>
    );
};

export default WizardContainer;
