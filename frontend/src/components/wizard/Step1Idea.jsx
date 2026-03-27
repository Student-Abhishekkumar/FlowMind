import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step1Idea = () => {
    const { idea, setIdea, refinedIdeas, setRefinedIdeas, selectedIdea, setSelectedIdea, setCurrentStep, isProcessing, setIsProcessing, setError } = useFlowStore();
    const [localIdea, setLocalIdea] = useState(idea);

    const handleGenerate = async () => {
        if (!localIdea.trim()) return;

        setIdea(localIdea);
        setIsProcessing(true);
        setError(null);
        setRefinedIdeas([]);
        setSelectedIdea(null);

        try {
            const response = await fetch('http://localhost:5000/api/generate-ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea: localIdea })
            });

            const data = await response.json();
            if (response.ok) {
                setRefinedIdeas(data.refinedIdeas);
            } else {
                setError(data.error || 'Failed to generate ideas');
            }
        } catch (err) {
            setError('Network error. Is the backend running?');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSelect = (ideaObj) => setSelectedIdea(ideaObj);
    const handleContinue = () => selectedIdea && setCurrentStep(2);

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full pt-8">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold mb-4">What do you want to build?</h2>
                <p className="text-gray-400">Describe your idea in a sentence, and our AI will refine it into actionable concepts.</p>
            </div>

            <div className="glass-card rounded-2xl p-2 mb-8 border border-white/10">
                <div className="bg-surface rounded-xl p-4 flex gap-4">
                    <input
                        type="text"
                        value={localIdea}
                        onChange={(e) => setLocalIdea(e.target.value)}
                        placeholder="e.g., An AI tool that helps freelancers track time and generate invoices..."
                        className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 placeholder:text-gray-600 focus:ring-0"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isProcessing || !localIdea.trim()}
                        className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                        Generate
                    </button>
                </div>
            </div>

            {refinedIdeas.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-200">Select a direction to proceed:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {refinedIdeas.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className={`p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden group
                  ${selectedIdea?.id === item.id
                                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(109,40,217,0.2)]'
                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                    }
                `}
                            >
                                {selectedIdea?.id === item.id && (
                                    <div className="absolute top-4 right-4 text-primary-light"><CheckCircle2 size={24} /></div>
                                )}
                                <div className="text-xs font-semibold text-primary-light uppercase tracking-wider mb-2">{item.difficulty} • {item.targetAudience.split(',')[0]}</div>
                                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-auto pb-8">
                        <button
                            onClick={handleContinue} disabled={!selectedIdea}
                            className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue to Deep Research <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
export default Step1Idea;
