import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopProgressBar from './TopProgressBar';
import useFlowStore from '../../store/useFlowStore';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const resetFlow = useFlowStore((state) => state.resetFlow);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleStartOver = () => {
        if (window.confirm("Are you sure you want to start over? All progress will be lost.")) {
            resetFlow();
        }
    };

    return (
        <div className="flex h-screen bg-background text-white overflow-hidden">
            <Sidebar onGoHome={handleGoHome} onStartOver={handleStartOver} />
            <div className="flex-1 flex flex-col relative">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

                <TopProgressBar />

                <main className="flex-1 overflow-y-auto p-8 z-10 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
