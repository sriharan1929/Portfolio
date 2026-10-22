# Sriharan R — Developer Portfolio & Showcase

> Modern, full-stack personal portfolio showcasing production-grade AI applications, offline RAG systems, developer tooling, and cloud architectures.

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-portfolio--pi--brown--71.vercel.app-ff6b00?style=for-the-badge&logo=vercel)](https://portfolio-pi-brown-71.vercel.app/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-sriharan1929-181717?style=for-the-badge&logo=github)](https://github.com/sriharan1929)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sriharan--r-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sriharan-r/)

---

## 🚀 Projects Overview

| Project | Category | Tech Stack | Links |
| :--- | :--- | :--- | :--- |
| **ZIP-RAG v2.0** | Offline AI / RAG System | React 19, FastAPI, LangChain, BM25, FAISS, Ollama, RapidOCR | [GitHub](https://github.com/sriharan1929/Rag_AI_Agent) |
| **Agentic AI Template Engine** | AI Developer Tooling | React, TypeScript, Vite, FastAPI, Jinja2, OpenRouter | [GitHub](https://github.com/sriharan1929/Agentic_AI) |
| **My Learning OS** | Full-Stack Productivity OS | React, Node.js, Express, MongoDB, JWT, Zod | [Live Demo](https://my-learning-assist-client.vercel.app/) · [GitHub](https://github.com/sriharan1929/My_Learning_Assist) |
| **Supply Chain 360** | Data Analytics & BI | Python, Pandas, PostgreSQL, SQLAlchemy, Power BI, DAX | [GitHub](https://github.com/sriharan1929/Supply_Chain_Analyst) |
| **Wholesale Management System** | Desktop ERP Application | Java, Java Swing, JDBC, MySQL | [GitHub](https://github.com/sriharan1929/wholesale_management) |
| **KTM 390 Duke Landing Page** | Responsive Web Showcase | HTML5, CSS3, Bootstrap 5, JavaScript | [GitHub](https://github.com/sriharan1929/Simple-UI) |

---

## 🛠️ Detailed Project Descriptions

### 1. ZIP-RAG v2.0 — Production-Grade Offline Multi-Format Document Intelligence
- **Repository:** [`Rag_AI_Agent`](https://github.com/sriharan1929/Rag_AI_Agent)
- **Tech Stack:** React 19, FastAPI, Python, LangChain, BM25, FAISS, Reciprocal Rank Fusion (RRF), Ollama, RapidOCR
- **Highlights:**
  - Offline-first document intelligence pipeline processing PDFs, Word, Excel, ZIP archives, and source code without cloud dependency.
  - Hybrid retrieval combining BM25 keyword matching and FAISS dense vector search with Reciprocal Rank Fusion (RRF).
  - Multi-query expansion, contextual compression, and RapidOCR for scanned documents with streaming AI responses over Server-Sent Events (SSE).
  - Powered by local LLM inference (Llama 3 / Mistral via Ollama) with interactive document visualization and session history.

### 2. Agentic AI Template Engine — Full-Stack Code Generation Platform
- **Repository:** [`Agentic_AI`](https://github.com/sriharan1929/Agentic_AI)
- **Tech Stack:** React, TypeScript, Vite, FastAPI, Python, Jinja2, OpenRouter
- **Highlights:**
  - Automated developer scaffolding platform generating structured frontend and backend boilerplate from natural language prompts.
  - Dual generation workflows: natural-language AI prompt generation and an interactive entity/schema builder for granular model configuration.
  - Modular Jinja2 templating system supporting custom template uploads, multi-provider LLM integration via OpenRouter, and live code preview.

### 3. My Learning OS — Personal Learning Management System & Knowledge Workspace
- **Repository:** [`My_Learning_Assist`](https://github.com/sriharan1929/My_Learning_Assist) | **Live:** [my-learning-assist-client.vercel.app](https://my-learning-assist-client.vercel.app/)
- **Tech Stack:** React, Vite, Node.js, Express, MongoDB, JWT, Zod, Tailwind CSS
- **Highlights:**
  - Full-stack learning workspace centralizing notes, study roadmaps, checklists, Kanban topics, tasks, and goals in a Scandinavian/Japandi aesthetic.
  - Built-in Pomodoro focus timer, interactive calendar scheduler, study analytics dashboard, resource bookmarking, and diary reflection logs.
  - Secure JWT authentication with bcryptjs, Zod schema validation, global multi-category search, and file attachment handling.

### 4. Supply Chain 360 — Supply Chain Analytics Platform
- **Repository:** [`Supply_Chain_Analyst`](https://github.com/sriharan1929/Supply_Chain_Analyst)
- **Tech Stack:** Python, Pandas, NumPy, PostgreSQL, SQLAlchemy, Power BI, DAX
- **Highlights:**
  - Operational analytics platform tracking supply chain flows from supplier procurement to warehouse distribution, delivery, and returns.
  - Automated data modeling pipelines using PostgreSQL and SQLAlchemy with KPI aggregations across inventory levels, order fulfillment, and logistics.
  - Interactive Power BI dashboards using custom DAX measures for executive reporting on supplier performance, operational bottlenecks, and cost profitability.

### 5. Wholesale Management System — Desktop Inventory Management
- **Repository:** [`wholesale_management`](https://github.com/sriharan1929/wholesale_management)
- **Tech Stack:** Java, Java Swing, JDBC, MySQL
- **Highlights:**
  - Desktop ERP application for managing wholesale inventory, category distribution (groceries, dairy, produce), and product catalogs.
  - Relational database architecture with MySQL and high-throughput JDBC connectivity for inventory stock reconciliation and transactional integrity.
  - Dynamic tabular product tables, category-specific screens, multi-criteria search, and automated stock alerts.

### 6. KTM 390 Duke Landing Page — Motorcycle Product Showcase
- **Repository:** [`Simple-UI`](https://github.com/sriharan1929/Simple-UI)
- **Tech Stack:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Highlights:**
  - Immersive, responsive product landing page showcasing technical specifications, features, and imagery for the KTM 390 Duke.
  - Smooth interactive theme switching, micro-interactions, responsive grid layout, and optimized media rendering.

---

## 💻 Tech Stack & Skills

- **Languages:** Java, JavaScript, TypeScript, Python, SQL, HTML5, CSS3
- **Frontend:** React.js, TypeScript, Vite, Tailwind CSS, Bootstrap 5
- **Backend:** FastAPI, Node.js, Express.js, GraphQL (AppSync), REST APIs, Jinja2
- **Cloud & Databases:** AWS (Lambda, AppSync, DynamoDB, Cognito, IAM, CloudWatch, CloudFront), PostgreSQL, MongoDB, MySQL
- **AI & RAG:** LangChain, FAISS, BM25, Ollama, RapidOCR, Sentence Transformers, Reciprocal Rank Fusion (RRF)
- **Data & Analytics:** Pandas, NumPy, Power BI, DAX, SQLAlchemy
- **Testing:** Vitest, Jest, React Testing Library

---

## ⚡ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/sriharan1929/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Run the local development server
npm run dev

# Build for production
npm run build
```
