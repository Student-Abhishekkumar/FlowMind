import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Share2, Rocket, RotateCcw } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step6Final = () => {
    const { selectedIdea, resetFlow, setCurrentStep } = useFlowStore();

    const handleDownloadPDF = () => alert("Mock PDF Download initiated! In a real application, this would bundle the State into a PDF blob.");
    const handleShare = () => { navigator.clipboard.writeText("https://flowmind.ai/share/mock-link-123"); alert("Share link copied to clipboard!"); };
    const handleStartOver = () => { if (window.confirm("Are you sure? This will delete the current pipeline.")) resetFlow(); };

    return (
        <div className="flex flex-col h-full mx-auto w-full pt-8 pb-8 items-center justify-center text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center text-white mb-8 shadow-[0_0_40px_rgba(109,40,217,0.5)]">
                <Rocket size={48} />
            </motion.div>
            <h2 className="text-4xl font-extrabold mb-4 text-white">Pipeline Complete!</h2>
            <p className="text-xl text-gray-400 max-w-2xl mb-12">Your idea "<span className="text-white font-medium">{selectedIdea?.title || 'Unknown Idea'}</span>" has been completely unpacked. You have the research, the strategy, the marketing copy, and the execution roadmap.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-12">
                <button onClick={handleDownloadPDF} className="w-full bg-white text-black hover:bg-gray-200 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition text-lg"><FileDown size={24} /> Download PDF Pack</button>
                <button onClick={handleShare} className="w-full bg-surface border border-white/10 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition text-lg"><Share2 size={24} /> Get Share Link</button>
            </div>
            <div className="border-t border-white/10 w-full pt-8 flex justify-center gap-8">
                <button onClick={() => setCurrentStep(5)} className="text-gray-400 hover:text-white transition-colors">Review Data</button>
                <button onClick={handleStartOver} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"><RotateCcw size={16} /> Start a New Flow</button>
            </div>
        </div>
    );
};
export default Step6Final;
