const express = require('express');
const router = express.Router();

// Mock delay to simulate AI processing
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Step 1: Idea Capture -> 3 Refined Ideas
router.post('/generate-ideas', async (req, res) => {
    const { idea } = req.body;

    if (!idea) {
        return res.status(400).json({ error: 'Idea is required' });
    }

    await delay(1500); // Simulate API latency

    const refinedIdeas = [
        {
            id: 1,
            title: `${idea} - The All-In-One Platform`,
            description: `A comprehensive platform that helps users seamlessly execute on ${idea}. It integrates all necessary tools into a single dashboard.`,
            targetAudience: "Enterprise users, Agencies",
            difficulty: "Hard"
        },
        {
            id: 2,
            title: `${idea} - Niche AI Copilot`,
            description: `An AI-powered assistant specifically trained to accelerate the workflow of professionals dealing with ${idea}.`,
            targetAudience: "Freelancers, Solopreneurs",
            difficulty: "Medium"
        },
        {
            id: 3,
            title: `${idea} - Automated Pipeline`,
            description: `A webhook-driven automated system that takes inputs related to ${idea} and produces outputs with zero manual intervention.`,
            targetAudience: "Developers, Marketers",
            difficulty: "Easy"
        }
    ];

    res.json({ refinedIdeas });
});

// Step 2: Deep Research
router.post('/deep-research', async (req, res) => {
    const { selectedIdea } = req.body;

    if (!selectedIdea) {
        return res.status(400).json({ error: 'Selected idea is required for research' });
    }

    await delay(2000);

    const research = {
        trends: [
            "Rising demand for AI automation in this space",
            "Shift towards personalized, low-code/no-code solutions",
            "Integration with existing enterprise ecosystems"
        ],
        demographics: [
            "B2B SaaS Focus: Companies with 10-500 employees",
            "Decision Makers: Founders, CTOs, and Heads of Product"
        ],
        revenueModels: [
            { type: "Tiered Subscriptions", potential: "High", MRR: "$10k - $50k" },
            { type: "Usage-based APIs", potential: "Medium", MRR: "Scales with volume" }
        ],
        frameworks: [
            { name: "SaaS Starter Toolkit", description: "Best for immediate go-to-market." },
            { name: "Microservices Architecture", description: "Best for scalability and large teams." }
        ],
        competitors: [
            { name: "Acme Corp", strength: "Large market share", weakness: "Outdated UI/UX" },
            { name: "StartupX", strength: "Fast execution", weakness: "Feature incomplete" }
        ],
        knowledgeGaps: [
            "Lack of educational content on this specific methodology",
            "No clear industry standard for data security in this niche"
        ],
        kpisToTrack: [
            "Customer Acquisition Cost (CAC) < $50",
            "Activation Rate (Time to first value)"
        ]
    };

    res.json({ research });
});

// Step 3: Project Generation
router.post('/generate-project', async (req, res) => {
    const { selectedIdea, research } = req.body;

    await delay(1800);

    const project = {
        problemStatement: `Users struggle to efficiently manage the end-to-end process of ${selectedIdea.title}, often juggling multiple disjointed tools which leads to lost productivity and context switching.`,
        solution: `FlowMind AI offers a unified dashboard that consolidates strategy, execution, and content generation for ${selectedIdea.title}, leveraging AI to automate repetitive tasks and surface actionable insights.`,
        executionPlan: [
            { step: 1, title: "Market Validation", status: "pending", description: "Interview 10 target users" },
            { step: 2, title: "MVP Development", status: "pending", description: "Build core feature set using React and Node" },
            { step: 3, title: "Beta Launch", status: "pending", description: "Onboard first 50 users for feedback" },
            { step: 4, title: "Marketing Campaign", status: "pending", description: "Execute SEO and LinkedIn strategy" },
            { step: 5, title: "Scaling", status: "pending", description: "Introduce premium tiers and integrations" }
        ]
    };

    res.json({ project });
});

// Step 4: Content Generation
router.post('/generate-content', async (req, res) => {
    const { project } = req.body;

    await delay(2000);

    const content = {
        linkedinPost: `Thrilled to announce the upcoming launch of our new solution! 🚀\n\nWe realized that ${project.problemStatement}\n\nThat's why we built this to solve it once and for all.\n\nDrop a 💡 in the comments if you want early access!\n\n#Innovation #Tech #AI`,
        instagramCaption: `Building the future, one step at a time. ✨ Say goodbye to disjointed workflows. Stay tuned for the big reveal! 🛠️ #startupjourney #buildinpublic`,
        hooks: [
            "Are you tired of losing hours every week to inefficient workflows?",
            "The #1 mistake people make when trying to solve this problem...",
            "We built a tool that automates what usually takes an entire team."
        ]
    };

    res.json({ content });
});

// Step 5: Learning Path
router.post('/learning-path', async (req, res) => {
    const { selectedIdea } = req.body;

    await delay(1500);

    const learning = {
        roadmap: [
            { day: "1-3", topic: "Fundamentals of Market Context", description: "Understand the deep problems your users face." },
            { day: "4-7", topic: "Technical Architecture", description: "Learn the core technologies needed to build your MVP." },
            { day: "8-10", topic: "Content & Marketing Strategy", description: "Master the art of acquiring your first users." },
            { day: "11-14", topic: "Launch & Iterate", description: "How to handle feedback, track metrics, and scale." }
        ]
    };

    res.json({ learning });
});

module.exports = router;
