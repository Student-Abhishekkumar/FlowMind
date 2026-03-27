import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, ArrowRight, Loader2, Linkedin, Instagram, Hash } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step4Content = () => {
    const { project, content, setContent, setCurrentStep, isProcessing, setIsProcessing, setError } = useFlowStore();

    useEffect(() => {
        if (project && !content && !isProcessing) handleGenerateContent();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleGenerateContent = async () => {
        setIsProcessing(true); setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/generate-content', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project })
            });
            const data = await response.json();
            if (response.ok) setContent(data.content);
            else setError(data.error || 'Failed to generate content');
        } catch (err) { setError('Network error'); }
        finally { setIsProcessing(false); }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const ContentCard = ({ title, icon: Icon, text, colorClass }) => (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative group">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <div className={`flex items-center gap-2 ${colorClass} font-semibold`}><Icon size={18} /> {title}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => copyToClipboard(text)} className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition"><Copy size={16} /></button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition"><RefreshCw size={16} /></button>
                </div>
            </div>
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{text}</p>
        </div>
    );

    return (
        <div className="flex flex-col h-full mx-auto w-full pt-8 pb-8">
            <div className="mb-8"><h2 className="text-3xl font-bold mb-2">Content Generation</h2><p className="text-gray-400">Your marketing assets, ready to post.</p></div>

            {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-primary mb-4" />
                    <p className="text-lg text-gray-300">Crafting high-converting social copy and hooks...</p>
                </div>
            ) : content ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-6">
                        <div className="space-y-6">
                            <ContentCard title="LinkedIn Announcement" icon={Linkedin} text={content.linkedinPost} colorClass="text-[#0a66c2]" />
                            <ContentCard title="Instagram Caption" icon={Instagram} text={content.instagramCaption} colorClass="text-[#E1306C]" />
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5 text-secondary-light font-semibold"><Hash size={18} /><h3>Viral Hooks (A/B Test)</h3></div>
                            <ul className="space-y-4">
                                {content.hooks.map((hook, idx) => (
                                    <li key={idx} className="bg-surface p-4 rounded-lg flex justify-between items-start group">
                                        <span className="text-gray-300 text-sm">"{hook}"</span>
                                        <button onClick={() => copyToClipboard(hook)} className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition pl-2"><Copy size={14} /></button>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full mt-6 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition flex justify-center items-center gap-2 text-gray-400 hover:text-white"><RefreshCw size={14} /> Generate More Hooks</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-6">
                        <button onClick={() => setCurrentStep(3)} className="text-gray-400 hover:text-white transition-colors">Back to Project Hub</button>
                        <button onClick={() => setCurrentStep(5)} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition">View Learning Path <ArrowRight size={18} /></button>
                    </div>
                </motion.div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <p className="text-red-400 mb-4">No content generated yet or missing project details.</p>
                    <button onClick={handleGenerateContent} className="bg-primary px-4 py-2 rounded-lg">Retry Content Gen</button>
                </div>
            )}
        </div>
    );
};
export default Step4Content;
