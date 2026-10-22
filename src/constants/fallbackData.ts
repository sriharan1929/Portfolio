import type { Profile, Project, Education, Experience } from "../types";

export const fallbackProfile: Profile = {
  id: "main",
  name: "Sriharan R",
  email: "sriharan8072@gmail.com",
  phone: "+91 8072800950",
  location: "Salem, Tamil Nadu",
  status: "Open to work",
  hero_title: "Sriharan R",
  hero_subtitle: "Full Stack Developer · AI Agents & RAG · React & TypeScript · Cloud",
  hero_description: "Computer Science Engineering undergraduate (2026) building full-stack applications, Agentic AI systems, and offline RAG architectures. Hands-on with React, TypeScript, FastAPI, Python, Node.js, Java, and AWS.",
  about_paragraphs: [
    "I'm a Computer Science Engineering undergraduate at Sona College of Technology (CGPA 7.98), graduating in 2026. My work sits at the intersection of full-stack engineering and AI application development, where I focus on building systems that are as thoughtful in architecture as they are in user experience.",
    "I've built ZIP-RAG v2.0, a production-grade offline RAG system that processes multi-format documents (PDFs, Office, code, ZIPs) using hybrid BM25 + FAISS search and local LLMs via Ollama, as well as an Agentic AI Template Engine that automates full-stack code scaffolding.",
    "I approach engineering the way you'd approach a well-organized desk — every tool in its place, every decision reasoned, every interface considered. I'm ready to contribute to product teams building React, AI, or backend-driven systems."
  ],
  linkedin: "https://www.linkedin.com/in/sriharan-r/",
  github: "https://github.com/sriharan1929",
  resume_url: "/Sriharan_Resume.pdf"
};

export const fallbackSkills: Record<string, string[]> = {
  Languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  Frontend: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Bootstrap 5"],
  Backend: ["FastAPI", "Node.js", "Express.js", "GraphQL (AppSync)", "REST APIs", "Jinja2"],
  "Cloud / DB": ["AWS", "AWS Lambda", "AppSync", "DynamoDB", "PostgreSQL", "MongoDB", "MySQL", "Cognito", "CloudFront"],
  "AI / RAG": ["LangChain", "FAISS", "BM25", "Ollama", "RapidOCR", "Sentence Transformers", "RRF"],
  "Data / Analytics": ["Pandas", "NumPy", "Power BI", "DAX", "SQLAlchemy"],
  Testing: ["Vitest", "Jest", "React Testing Library"]
};

export const fallbackProjects: Project[] = [
  {
    id: "zip-rag",
    title: "ZIP-RAG v2.0",
    tagline: "Production-Grade Offline Multi-Format Document Intelligence System",
    stack: ["React 19", "FastAPI", "Python", "LangChain", "BM25", "FAISS", "Ollama", "RapidOCR"],
    features: [
      "Engineered offline-first document intelligence pipeline processing PDFs, Word, Excel, ZIP archives, and source code without cloud dependency.",
      "Implemented hybrid retrieval combining BM25 keyword matching and FAISS dense vector search with Reciprocal Rank Fusion (RRF) for optimal ranking accuracy.",
      "Integrated multi-query expansion, contextual compression, and RapidOCR for scanned documents with streaming AI responses over Server-Sent Events (SSE).",
      "Powered by local LLM inference (Llama 3 / Mistral via Ollama) with interactive document visualization and session history."
    ],
    period: "Jan 2026 - Present",
    github: "https://github.com/sriharan1929/Rag_AI_Agent",
    featured: true,
    sort_order: 1
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Template Engine",
    tagline: "AI-Powered Full-Stack Code & Boilerplate Generation Engine",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "Python", "Jinja2", "OpenRouter"],
    features: [
      "Built an automated developer scaffolding platform generating structured, production-ready frontend and backend boilerplate from natural language prompts.",
      "Implemented dual generation workflows: natural-language AI prompt generation and an interactive entity/schema builder for granular model configuration.",
      "Engineered a modular Jinja2 templating system supporting custom template uploads, multi-provider LLM integration via OpenRouter, and live code preview."
    ],
    period: "Jan 2026 - Present",
    github: "https://github.com/sriharan1929/Agentic_AI",
    featured: true,
    sort_order: 2
  },
  {
    id: "my-learning-os",
    title: "My Learning OS",
    tagline: "Personal Learning Management System & Knowledge Workspace",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Zod"],
    features: [
      "Developed a full-stack learning workspace centralizing notes, study roadmaps, checklists, Kanban topics, tasks, and goals in a Scandinavian/Japandi aesthetic.",
      "Integrated a built-in Pomodoro focus timer, interactive calendar scheduler, study analytics dashboard, resource bookmarking, and diary reflection logs.",
      "Implemented secure JWT authentication with bcryptjs, Zod schema validation, global multi-category search, and file attachment handling."
    ],
    period: "Feb 2025 - Jun 2025",
    github: "https://github.com/sriharan1929/My_Learning_Assist",
    live: "https://my-learning-assist-client.vercel.app/",
    featured: true,
    sort_order: 3
  },
  {
    id: "supply-chain-360",
    title: "Supply Chain 360",
    tagline: "Supply Chain Analytics & Business Intelligence Platform",
    stack: ["Python", "Pandas", "NumPy", "PostgreSQL", "SQLAlchemy", "Power BI", "DAX"],
    features: [
      "Architected an end-to-end supply chain analytics platform tracking flows from supplier procurement to warehouse distribution, delivery, and returns.",
      "Built automated data modeling pipelines using PostgreSQL and SQLAlchemy with KPI aggregations across inventory levels, order fulfillment, and logistics.",
      "Designed interactive Power BI dashboards using custom DAX measures for executive reporting on supplier performance, operational bottlenecks, and cost profitability."
    ],
    period: "Jul 2025 - Nov 2025",
    github: "https://github.com/sriharan1929/Supply_Chain_Analyst",
    featured: false,
    sort_order: 4
  },
  {
    id: "wholesale",
    title: "Wholesale Management System",
    tagline: "Desktop Inventory & Product Distribution System",
    stack: ["Java", "Java Swing", "JDBC", "MySQL"],
    features: [
      "Built a Java desktop ERP application for managing wholesale inventory, category distribution (groceries, dairy, produce), and product catalogs.",
      "Implemented relational database architecture with MySQL and high-throughput JDBC connectivity for inventory stock reconciliation and transactional integrity.",
      "Designed intuitive Swing UI views featuring dynamic tabular product tables, category-specific screens, multi-criteria search, and automated stock alerts."
    ],
    period: "Dec 2023 - Apr 2024",
    github: "https://github.com/sriharan1929/wholesale_management",
    featured: false,
    sort_order: 5
  },
  {
    id: "simple-ui",
    title: "KTM 390 Duke Landing Page",
    tagline: "Responsive Motorcycle Product Showcase & Modern Landing Page",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5"],
    features: [
      "Crafted an immersive, responsive product landing page showcasing specifications, motorcycle imagery, and interactive call-to-action sections.",
      "Implemented custom theme switching, smooth micro-interactions, responsive grid layout, and optimized media rendering across all devices."
    ],
    period: "Aug 2024 - Sep 2024",
    github: "https://github.com/sriharan1929/Simple-UI",
    featured: false,
    sort_order: 6
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
    title: "Junior Engineering Intern",
    company: "Syzy Technologies Pvt Ltd, Salem",
    project_name: "FlowFlux | Enterprise CRM and Business Management Software",
    period: "Jan 2026 – Jul 2026",
    points: [
      "Built and maintained React and TypeScript components for CRM modules, integrating GraphQL APIs via AWS AppSync.",
      "Worked with AWS Lambda, AppSync, DynamoDB, Cognito, IAM, CloudWatch, and CloudFront.",
      "Authored 40+ unit, integration, and E2E tests using Vitest and React Testing Library, improving test coverage across CRM modules and catching regressions pre-deployment."
    ],
    tags: ["React.js", "TypeScript", "Vitest", "GraphQL", "AWS", "AppSync", "DynamoDB"],
    sort_order: 1
  },
  {
    id: "2",
    title: "Junior Engineering Intern",
    company: "Syzy Technologies Pvt Ltd, Salem",
    project_name: "Grand Vekasa Hotel Official Website",
    period: "Jan 2026 – Jul 2026",
    points: [
      "Developed and optimized the official hotel website in Next.js with a strong focus on technical SEO to improve organic search ranking and user engagement.",
      "Leveraged AI coding tools to accelerate development workflows, using Playwright, Figma Make, and Stitch AI to build automations and prototype responsive UI."
    ],
    tags: ["Next.js", "SEO", "Playwright", "TypeScript", "UI Automation"],
    sort_order: 2
  }
];
