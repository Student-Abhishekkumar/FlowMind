import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Save, Target, CheckCircle2 } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import useFlowStore from '../../store/useFlowStore';

const Step3Project = () => {
    const { selectedIdea, research, project, setProject, setCurrentStep, isProcessing, setIsProcessing, setError } = useFlowStore();
    const [localProject, setLocalProject] = useState(null);

    useEffect(() => {
        if (project) setLocalProject(project);
        else if (selectedIdea && research && !isProcessing) handleGenerateProject();
    }, [project]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleGenerateProject = async () => {
        setIsProcessing(true); setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/generate-project', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedIdea, research })
            });
            const data = await response.json();
            if (response.ok) { setProject(data.project); setLocalProject(data.project); }
            else setError(data.error || 'Failed to generate project');
        } catch (err) { setError('Network error'); }
        finally { setIsProcessing(false); }
    };

    const handleManualSave = () => setProject(localProject);
    const isChanged = JSON.stringify(project) !== JSON.stringify(localProject);

    return (
        <div className="flex flex-col h-full mx-auto w-full pt-8 pb-8">
            <div className="mb-8 flex justify-between items-end">
                <div><h2 className="text-3xl font-bold mb-2">Project Hub</h2><p className="text-gray-400">Formalizing the problem, solution, and execution plan.</p></div>
                {localProject && (
                    <button onClick={handleManualSave} disabled={!isChanged} className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${isChanged ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'}`}>
                        {isChanged ? <Save size={16} /> : <CheckCircle2 size={16} />}{isChanged ? 'Save Changes' : 'Saved'}
                    </button>
                )}
            </div>

            {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Loader2 size={48} className="animate-spin text-primary mb-4" />
                    <p className="text-lg text-gray-300">Drafting strategy and blueprinting execution steps...</p>
                </div>
            ) : localProject ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4 text-red-400 font-semibold"><Target size={18} /><h3>Problem Statement</h3></div>
                            <textarea value={localProject.problemStatement} onChange={(e) => setLocalProject({ ...localProject, problemStatement: e.target.value })} className="w-full h-32 bg-black/20 border border-white/5 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-primary/50 resize-none" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-4 text-green-400 font-semibold"><Sparkles size={18} /><h3>The Solution (FlowMind API)</h3></div>
                            <textarea value={localProject.solution} onChange={(e) => setLocalProject({ ...localProject, solution: e.target.value })} className="w-full h-32 bg-black/20 border border-white/5 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-primary/50 resize-none" />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex-1">
                        <h3 className="font-semibold text-lg mb-6 flex items-center gap-2"><span className="text-primary">⚡</span> Execution Blueprint</h3>
                        <div className="space-y-4">
                            {localProject.executionPlan.map((step, idx) => (
                                <div key={idx} className="flex gap-4 items-start p-4 bg-surface rounded-lg border border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold font-mono text-sm shrink-0">{step.step}</div>
                                    <div className="flex-1">
                                        <input className="bg-transparent border-none outline-none font-semibold text-gray-200 w-full mb-1" value={step.title} onChange={(e) => { const newPlan = [...localProject.executionPlan]; newPlan[idx].title = e.target.value; setLocalProject({ ...localProject, executionPlan: newPlan }); }} />
                                        <textarea className="bg-transparent border-none outline-none text-sm text-gray-400 w-full resize-none h-10" value={step.description} onChange={(e) => { const newPlan = [...localProject.executionPlan]; newPlan[idx].description = e.target.value; setLocalProject({ ...localProject, executionPlan: newPlan }); }} />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">{step.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-6 pb-2">
                        <button onClick={() => setCurrentStep(2)} className="text-gray-400 hover:text-white transition-colors">Back to Research</button>
                        <button onClick={() => setCurrentStep(4)} className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">Generate Content <ArrowRight size={18} /></button>
                    </div>
                </motion.div>
            ) : null}
        </div>
    );
};
export default Step3Project;
