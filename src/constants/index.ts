export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  Frontend: ["React.js", "React 19", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["FastAPI", "Node.js", "REST APIs", "Authentication", "CRUD", "Python", "Java"],
  "AI / ML": ["LangChain", "FAISS", "Ollama", "OpenRouter API", "Hugging Face", "Sentence Transformers", "PyMuPDF", "RapidOCR"],
  "Cloud / DB": ["AWS Lambda", "DynamoDB", "CloudWatch", "Route 53", "MySQL"],
  Tools: ["Git", "GitHub", "VS Code", "Eclipse IDE", "Browser DevTools"],
};

export const PROJECTS = [
  {
    id: "zip-rag",
    featured: true,
    title: "ZIP-RAG",
    tagline: "Offline multi-format RAG system for secure document-grounded Q&A",
    stack: ["React 19", "FastAPI", "FAISS", "LangChain", "Ollama", "PyMuPDF", "RapidOCR", "Sentence Transformers"],
    features: [
      "Semantic retrieval pipeline with FAISS + Sentence Transformers",
      "Local LLM inference via Ollama (Llama 3 / Mistral) — zero cloud dependency",
      "OCR + PDF parsing workflows for scanned documents",
      "Full-stack React 19 frontend with FastAPI backend APIs",
    ],
    period: "Jan 2026 – Apr 2026",
    github: "https://github.com/sriharan8072",
  },
  {
    id: "study-chatbot",
    featured: false,
    title: "My Study Chatbot",
    tagline: "AI-powered academic assistant with conversational UX and live API integration",
    stack: ["HTML", "CSS", "JavaScript", "OpenRouter API"],
    features: [
      "Context-aware responses via OpenRouter API",
      "Responsive chatbot interface for seamless UX",
      "Real-time query handling for student learning support",
    ],
    period: "Jan 2025 – Apr 2025",
    github: "https://github.com/sriharan8072",
  },
  {
    id: "wholesale",
    featured: false,
    title: "Online Wholesale Shop",
    tagline: "Java-based inventory and order management system with MySQL persistence",
    stack: ["Java", "MySQL", "Eclipse IDE"],
    features: [
      "Full CRUD operations for product and order management",
      "MySQL-backed data persistence and clean schema design",
      "Maintainable business logic with structured separation of concerns",
    ],
    period: "Jan 2024 – Apr 2024",
    github: "https://github.com/sriharan8072",
  },
];

export const CERTIFICATIONS = [
  { name: "Java Programming", issuer: "Infosys Springboard" },
  { name: "Java Certification", issuer: "Wipro" },
  { name: "SQL Certification", issuer: "HackerRank" },
];
