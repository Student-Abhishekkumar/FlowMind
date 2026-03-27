import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Layers, BrainCircuit, Search, FileText, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { icon: Sparkles, label: "Idea", color: "from-violet-500 to-purple-600" },
    { icon: Search, label: "Research", color: "from-blue-500 to-cyan-600" },
    { icon: BrainCircuit, label: "Project", color: "from-indigo-500 to-blue-600" },
    { icon: FileText, label: "Content", color: "from-pink-500 to-rose-600" },
    { icon: BookOpen, label: "Learning", color: "from-orange-500 to-amber-600" },
    { icon: CheckCircle2, label: "Output", color: "from-green-500 to-emerald-600" },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-gray-100 flex flex-col relative overflow-hidden">

            {/* Animated background blobs */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] bg-primary/20 rounded-full blur-[130px] pointer-events-none"
                animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-[15%] right-[-10%] w-[45%] h-[45%] bg-secondary/20 rounded-full blur-[130px] pointer-events-none"
                animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 25, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[25%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[130px] pointer-events-none"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />

            {/* Floating particles */}
            {[...Array(18)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-primary-light/30"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 4 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 5, ease: 'easeInOut' }}
                />
            ))}

            {/* Header */}
            <header className="py-6 px-8 max-w-7xl mx-auto w-full flex justify-between items-center z-10">
                <div className="text-2xl font-bold text-gradient flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(109,40,217,0.5)]">F</span>
                    FlowMind
                </div>
                <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-2 text-sm font-medium">
                    Enter App <ArrowRight size={16} />
                </button>
            </header>

            {/* Main Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 max-w-6xl mx-auto w-full mt-8 mb-20">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-sm font-medium mb-8 shadow-[0_0_20px_rgba(109,40,217,0.2)]">
                        <Sparkles size={14} /> The Unified AI Execution System for Builders
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        Transform Ideas Into <br />
                        <span className="text-gradient">Real Output in Minutes</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Stop juggling 10 different AI tools. FlowMind takes your raw idea and guides it through research, project planning, content generation, and execution.
                    </p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_rgba(109,40,217,0.5)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto"
                    >
                        Start Your Flow <ArrowRight size={20} />
                    </button>
                </motion.div>

                {/* Animated pipeline steps */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full mt-24 max-w-4xl"
                >
                    <div className="relative flex items-center justify-between gap-2 mb-4">
                        {/* Connecting line */}
                        <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-violet-600 via-blue-500 to-green-500 opacity-30 z-0" />
                        <motion.div
                            className="absolute left-[5%] top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-violet-600 via-blue-500 to-green-500 z-0"
                            initial={{ width: '0%' }}
                            animate={{ width: '90%' }}
                            transition={{ duration: 2.5, delay: 0.8, ease: 'easeInOut' }}
                        />

                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.8 + i * 0.25 }}
                                    className="flex flex-col items-center gap-3 z-10"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.4)]`}
                                    >
                                        <Icon size={24} />
                                    </motion.div>
                                    <span className="text-xs text-gray-500 font-medium">{step.label}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2.5 }}
                        className="mt-16 grid grid-cols-3 gap-6 text-center"
                    >
                        {[{ val: '6x', label: 'Faster Execution' }, { val: '100%', label: 'State Persistent' }, { val: 'AI-First', label: 'Pipeline Design' }].map((stat, i) => (
                            <div key={i} className="glass-card rounded-xl py-5 px-4">
                                <div className="text-2xl font-bold text-gradient mb-1">{stat.val}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
