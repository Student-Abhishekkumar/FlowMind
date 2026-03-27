import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Calendar } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step5Learning = () => {
    const { selectedIdea, learning, setLearning, setCurrentStep, isProcessing, setIsProcessing, setError } = useFlowStore();

    useEffect(() => {
        if (selectedIdea && !learning && !isProcessing) handleGenerateLearning();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleGenerateLearning = async () => {
        setIsProcessing(true); setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/learning-path', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedIdea })
            });
            const data = await response.json();
            if (response.ok) setLearning(data.learning);
            else setError(data.error || 'Failed to generate learning path');
        } catch (err) { setError('Network error'); }
        finally { setIsProcessing(false); }
    };

    return (
        <div className="flex flex-col h-full mx-auto w-full pt-8 pb-8">
            <div className="mb-8"><h2 className="text-3xl font-bold mb-2">Your 14-Day Roadmap</h2><p className="text-gray-400">A customized learning and execution path for your project.</p></div>

            {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-primary mb-4" />
                    <p className="text-lg text-gray-300">Structuring your 14-day intensive roadmap...</p>
                </div>
            ) : learning ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1">
                    <div className="flex-1 relative overflow-y-auto pr-2 custom-scrollbar">
                        <div className="absolute left-8 top-4 bottom-4 w-px bg-white/10" />
                        <div className="space-y-8 pl-16 relative mt-4">
                            {learning.roadmap.map((item, idx) => (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.15 }} key={idx} className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                                    <div className="absolute -left-[53px] top-6 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-[0_0_10px_rgba(109,40,217,0.8)]" />
                                    <div className="flex items-center gap-2 text-primary-light font-bold mb-2 text-sm uppercase tracking-wide"><Calendar size={16} /> Day {item.day}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">{item.topic}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-6">
                        <button onClick={() => setCurrentStep(4)} className="text-gray-400 hover:text-white transition-colors">Back to Content</button>
                        <button onClick={() => setCurrentStep(6)} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition">Generate Final Result <ArrowRight size={18} /></button>
                    </div>
                </motion.div>
            ) : null}
        </div>
    );
};
export default Step5Learning;
