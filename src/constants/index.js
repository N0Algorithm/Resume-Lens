export const UPLOAD_STEPS = [
  "Uploading...",
  "Reading Resume...",
  "Analyzing..."
];

export const SAMPLE_REPORT = {
  fileName: "resume-v1.pdf",
  overallScore: 87,
  candidateLevel: "Senior Software Engineer (8+ YOE)",
  suggestedRoles: ["Senior Frontend Engineer", "Full-Stack Tech Lead", "Cloud Web Architect"],
  readability: "Strong",
  impactWordsCount: 14,
  strongVerbs: ["Architected", "Spearheaded", "Reduced", "Implemented", "Engineered"],
  weakPhrases: ["Responsible for", "Worked on", "Helped with"],
  summary: "This resume is well-structured and clearly highlights technical experience. However, there are opportunities to quantify achievements more aggressively to improve ATS ranking and recruiter impact.",
  pillarScores: {
    impactMetrics: 82,
    keywords: 94,
    formatting: 90,
    contactInfo: 100
  },
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Docker",
    "AWS",
    "Git",
    "REST APIs",
    "GraphQL",
    "Tailwind CSS"
  ],
  bulletRewrite: {
    original: "Worked on frontend web app using React and reduced bundle size.",
    improved: "Architected modular frontend architecture in React and Next.js, slashing JavaScript bundle size by 42% and boosting page load speed for 5M+ users.",
    why: "Replaces weak passive phrasing ('Worked on') with strong clinical ownership ('Architected') and adds quantifiable scale and impact metrics."
  },
  recommendations: [
    {
      id: 1,
      title: 'Quantify "Improved Performance"',
      description: 'In your Senior Developer role, specify the percentage improvement in load times or metric gains.',
      icon: 'warning',
      type: 'warning'
    },
    {
      id: 2,
      title: 'Reduce Summary Length',
      description: 'Your professional summary is over 4 lines. Consider tightening it to a punchy 2-3 sentence paragraph.',
      icon: 'format_align_left',
      type: 'suggestion'
    },
    {
      id: 3,
      title: 'Highlight Cloud Architecture',
      description: 'You mention AWS in skills, but adding specific AWS services (ECS, Lambda, S3) under job descriptions will boost ATS parsing.',
      icon: 'cloud',
      type: 'info'
    }
  ],
  atsReview: {
    status: "Passed",
    checks: [
      { name: "Standard Fonts", status: "pass", detail: "Inter & Helvetica detected (100% ATS compatible)" },
      { name: "Section Headers", status: "pass", detail: "Standard headings (Experience, Skills, Education) identified" },
      { name: "Table & Column Layouts", status: "pass", detail: "Single-column linear text flow, no complex tables" },
      { name: "File Format & Size", status: "pass", detail: "Standard PDF text layer intact (245 KB)" }
    ]
  },
  defaultJobMatch: {
    matchScore: 82,
    missing: ["Docker", "Redis", "AWS"],
    matched: ["React", "Git", "JavaScript"]
  }
};
