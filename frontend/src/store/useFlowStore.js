import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFlowStore = create(
    persist(
        (set) => ({
            idea: '',
            refinedIdeas: [],
            selectedIdea: null,
            research: null,
            project: null,
            content: null,
            learning: null,
            currentStep: 1,
            isProcessing: false,
            error: null,

            setIdea: (idea) => set({ idea }),
            setRefinedIdeas: (ideas) => set({ refinedIdeas: ideas }),
            setSelectedIdea: (idea) => set({ selectedIdea: idea }),
            setResearch: (research) => set({ research }),
            setProject: (project) => set({ project }),
            setContent: (content) => set({ content }),
            setLearning: (learning) => set({ learning }),

            setCurrentStep: (step) => set({ currentStep: step }),
            setIsProcessing: (status) => set({ isProcessing: status }),
            setError: (error) => set({ error }),

            resetFlow: () => set({
                idea: '',
                refinedIdeas: [],
                selectedIdea: null,
                research: null,
                project: null,
                content: null,
                learning: null,
                currentStep: 1,
                isProcessing: false,
                error: null
            }),
        }),
        { name: 'flowmind-storage' }
    )
);

export default useFlowStore;
