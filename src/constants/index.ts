export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  Languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
  Frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI", "GraphQL (AppSync)", "REST APIs"],
  "Cloud / DB": ["AWS", "AWS Lambda", "AppSync", "DynamoDB", "Cognito", "IAM", "CloudWatch", "CloudFront", "MySQL"],
  Testing: ["Vitest", "Jest", "React Testing Library"],
  "AI / ML": ["LangChain", "FAISS", "Ollama", "Sentence Transformers"],
};

export const PROJECTS = [
  {
    id: "zip-rag",
    featured: true,
    title: "ZIP-RAG",
    tagline: "Advanced Multi-Format Offline RAG System",
    stack: ["React", "Python", "FastAPI", "FAISS", "LangChain", "Ollama", "sentence-transformers"],
    features: [
      "Developed a full-stack app with a React frontend and FastAPI backend for real-time document querying.",
      "Built an offline RAG system enabling accurate, document-grounded question answering without cloud dependency.",
      "Designed semantic search pipeline using FAISS and Sentence Transformer to retrieve relevant content from large document.",
      "Ran local LLM inference (Llama 3/Mistral via Ollama) for fully private, offline AI responses.",
    ],
    period: "Jan 2026 - Apr 2026",
    github: "https://github.com/sriharan8072",
  },
  {
    id: "learning-management-system",
    featured: false,
    title: "Personal Learning Management System",
    tagline: "MERN Stack Learning Management System",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    features: [
      "Developed a full-stack learning management system using the MERN stack to centralize notes, tasks, goals and roadmaps.",
      "Built responsive React.js components and RESTful APIs to support secure CRUD operations and efficient data.",
      "Integrated JWT authentication and global search to provide secure access and quick navigation across all modules.",
    ],
    period: "Feb 2025 - June 2025",
    github: "https://github.com/sriharan8072",
  },
  {
    id: "wholesale",
    featured: false,
    title: "Online Wholesale Shop Management System",
    tagline: "Java-based wholesale management application",
    stack: ["Java", "MySQL", "Eclipse IDE"],
    features: [
      "Developed a Java-based wholesale management application for inventory and operational workflows.",
      "Implemented CRUD operations and MySQL-backed data persistence for product and order management.",
      "Structured the application for maintainable business logic and clean database interaction.",
    ],
    period: "Dec 2023 - Apr 2024",
    github: "https://github.com/sriharan8072",
  },
];

export const CERTIFICATIONS = [
  { name: "Java Programming", issuer: "Infosys Springboard" },
  { name: "Java Certification", issuer: "Wipro" },
  { name: "SQL Certification", issuer: "HackerRank" },
];

