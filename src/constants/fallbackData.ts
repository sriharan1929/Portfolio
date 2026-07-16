import type { Profile, Project, Education, Experience } from "../types";

export const fallbackProfile: Profile = {
  id: "main",
  name: "Sriharan R",
  email: "sriharan8072@gmail.com",
  phone: "+91 8072800950",
  location: "Salem, Tamil Nadu",
  status: "Open to work",
  hero_title: "Sriharan R",
  hero_subtitle: "Full Stack Developer · React.js · TypeScript · Java · AWS",
  hero_description: "Computer Science Engineering undergraduate (2026) building full-stack, frontend, or AI applications. Hands-on with React, TypeScript, Java, Python, FastAPI, MySQL, and AWS.",
  about_paragraphs: [
    "I'm a Computer Science Engineering undergraduate at Sona College of Technology (CGPA 7.98), graduating in 2026. My work sits at the intersection of full-stack engineering and AI application development, where I focus on building systems that are as thoughtful in architecture as they are in user experience.",
    "I've built an offline RAG system that works across multiple document formats using FAISS, LangChain, and locally running LLMs — no cloud dependency, no data leaving the machine. That project taught me to think across retrieval logic, local inference, document processing, and frontend UX simultaneously.",
    "I approach engineering the way you'd approach a well-organized desk — every tool in its place, every decision reasoned, every interface considered. I'm ready to contribute to product teams building React, AI, or backend-driven systems."
  ]
};

export const fallbackSkills: Record<string, string[]> = {
  Languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
  Frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI", "GraphQL (AppSync)", "REST APIs"],
  "Cloud / DB": ["AWS", "AWS Lambda", "AppSync", "DynamoDB", "Cognito", "IAM", "CloudWatch", "CloudFront", "MySQL"],
  Testing: ["Vitest", "Jest", "React Testing Library"],
  "AI / ML": ["LangChain", "FAISS", "Ollama", "Sentence Transformers"]
};

export const fallbackProjects: Project[] = [
  {
    id: "zip-rag",
    title: "ZIP-RAG",
    tagline: "Advanced Multi-Format Offline RAG System",
    stack: ["React", "Python", "FastAPI", "FAISS", "LangChain", "Ollama", "sentence-transformers"],
    features: [
      "Developed a full-stack app with a React frontend and FastAPI backend for real-time document querying.",
      "Built an offline RAG system enabling accurate, document-grounded question answering without cloud dependency.",
      "Designed semantic search pipeline using FAISS and Sentence Transformer to retrieve relevant content from large document.",
      "Ran local LLM inference (Llama 3/Mistral via Ollama) for fully private, offline AI responses."
    ],
    period: "Jan 2026 - Apr 2026",
    github: "https://github.com/sriharan1929/Rag_AI_Agent",
    featured: true,
    sort_order: 1
  },
  {
    id: "learning-management-system",
    title: "Personal Learning Management System",
    tagline: "MERN Stack Learning Management System",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    features: [
      "Developed a full-stack learning management system using the MERN stack to centralize notes, tasks, goals and roadmaps.",
      "Built responsive React.js components and RESTful APIs to support secure CRUD operations and efficient data.",
      "Integrated JWT authentication and global search to provide secure access and quick navigation across all modules."
    ],
    period: "Feb 2025 - June 2025",
    github: "https://github.com/sriharan1929/My_Learning_Assist",
    featured: false,
    sort_order: 2
  },
  {
    id: "wholesale",
    title: "Online Wholesale Shop Management System",
    tagline: "Java-based wholesale management application",
    stack: ["Java", "MySQL", "Eclipse IDE"],
    features: [
      "Developed a Java-based wholesale management application for inventory and operational workflows.",
      "Implemented CRUD operations and MySQL-backed data persistence for product and order management.",
      "Structured the application for maintainable business logic and clean database interaction."
    ],
    period: "Dec 2023 - Apr 2024",
    github: "https://github.com/sriharan1929/wholesale_management",
    featured: false,
    sort_order: 3
  }
];

export const fallbackEducation: Education[] = [
  { id: "1", degree: "B.E. CSE", place: "Sona College of Technology, Salem", year: "2026", score: "CGPA: 7.98/10", sort_order: 1 },
  { id: "2", degree: "HSC", place: "SSRM Higher Secondary School, Karuppur", year: "2021", score: "90.5%", sort_order: 2 },
  { id: "3", degree: "SSLC", place: "SSRM Higher Secondary School, Karuppur", year: "2019", score: "89%", sort_order: 3 }
];

export const fallbackExperience: Experience[] = [
  {
    id: "1",
    title: "Full Time Intern",
    company: "Syzy Technologies Pvt Ltd, Salem",
    project_name: "FlowFlux | Enterprise Business Management & CRM Software",
    period: "Jan 2026 – Present",
    points: [
      "Built and maintained React/TypeScript components for modules, integrating GraphQL APIs via AWS AppSync.",
      "Hands-on experience with Lambda, AppSync, DynamoDB, Cognito, IAM, CloudWatch, and CloudFront.",
      "Authored 40+ unit, integration, and E2E tests using Vitest and React Testing Library, improving test coverage across CRM modules and catching regressions pre-deployment."
    ],
    tags: ["React.js", "TypeScript", "Vitest", "GraphQL", "AWS", "AppSync", "DynamoDB"],
    sort_order: 1
  }
];
