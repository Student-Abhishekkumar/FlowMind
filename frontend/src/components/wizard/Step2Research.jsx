import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, TrendingUp, Cpu, Users, AlertTriangle, DollarSign, Target, Activity } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step2Research = () => {
    const { selectedIdea, research, setResearch, setCurrentStep, isProcessing, setIsProcessing, setError } = useFlowStore();

    useEffect(() => {
        if (selectedIdea && !research && !isProcessing) handleResearch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleResearch = async () => {
        setIsProcessing(true); setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/deep-research', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedIdea })
            });
            const data = await response.json();
            if (response.ok) setResearch(data.research);
            else setError(data.error || 'Failed to analyze');
        } catch (err) { setError('Network error'); }
        finally { setIsProcessing(false); }
    };

    const Card = ({ title, icon: Icon, children, colorClass }) => (
        <div className="glass-card border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2`} />
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${colorClass} bg-opacity-20`}><Icon size={20} className="text-white" /></div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="text-sm text-gray-400 space-y-3">{children}</div>
        </div>
    );

    return (
        <div className="flex flex-col h-full mx-auto w-full pt-8 pb-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Deep Research</h2>
                <p className="text-gray-400">Analyzing market context for "<span className="text-white font-medium">{selectedIdea?.title}</span>"</p>
            </div>

            {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-primary mb-4" />
                    <p className="text-lg text-gray-300">Scanning market data, competitors, and viability...</p>
                </div>
            ) : research ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full overflow-y-auto custom-scrollbar pr-2 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 flex-1">
                        <Card title="Market Trends" icon={TrendingUp} colorClass="bg-blue-500">
                            <ul className="list-disc pl-4 space-y-2">{research.trends.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </Card>
                        <Card title="Demographics" icon={Users} colorClass="bg-indigo-500">
                            <ul className="list-disc pl-4 space-y-2">{research.demographics?.map((d, i) => <li key={i}>{d}</li>)}</ul>
                        </Card>
                        <Card title="Revenue Models" icon={DollarSign} colorClass="bg-green-500">
                            <div className="space-y-4">
                                {research.revenueModels?.map((r, i) => (
                                    <div key={i} className="bg-white/5 p-3 rounded-lg flex justify-between">
                                        <div><div className="font-semibold text-gray-200">{r.type}</div><div className="text-xs text-blue-400 mt-1">Potential: {r.potential}</div></div>
                                        <div className="text-right"><div className="text-xs text-green-400 mt-[20px]">{r.MRR}</div></div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card title="Frameworks" icon={Cpu} colorClass="bg-purple-500">
                            <div className="space-y-4">
                                {research.frameworks.map((f, i) => (
                                    <div key={i} className="bg-white/5 p-3 rounded-lg"><div className="font-semibold text-gray-200">{f.name}</div><div>{f.description}</div></div>
                                ))}
                            </div>
                        </Card>
                        <Card title="Competitors" icon={Target} colorClass="bg-orange-500">
                            <div className="space-y-4">
                                {research.competitors.map((c, i) => (
                                    <div key={i} className="bg-white/5 p-3 rounded-lg flex justify-between">
                                        <div><div className="font-semibold text-gray-200">{c.name}</div><div className="text-xs text-green-400 mt-1">Strength: {c.strength}</div></div>
                                        <div className="text-right"><div className="text-xs text-red-400 mt-[20px]">Weakness: {c.weakness}</div></div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card title="Knowledge Gaps" icon={AlertTriangle} colorClass="bg-red-500">
                            <ul className="list-disc pl-4 space-y-2">{research.knowledgeGaps.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </Card>
                        <Card title="KPIs to Track" icon={Activity} colorClass="bg-pink-500">
                            <ul className="list-disc pl-4 space-y-2">{research.kpisToTrack?.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </Card>
                    </div>
                    <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-6">
                        <button onClick={() => setCurrentStep(1)} className="text-gray-400 hover:text-white transition-colors">Back to Ideas</button>
                        <button onClick={() => setCurrentStep(3)} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition">
                            Initialize Project <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-red-400 mb-4">No research generated yet.</p>
                    <button onClick={handleResearch} className="bg-primary px-4 py-2 rounded-lg">Retry Research</button>
                </div>
            )}
        </div>
    );
};
export default Step2Research;
