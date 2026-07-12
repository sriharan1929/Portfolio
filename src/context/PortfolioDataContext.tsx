import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase, hasSupabaseConfig } from "../config/supabase";
import type { Session } from "@supabase/supabase-js";

// Define TypeScript interfaces
export interface Profile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  features: string[];
  period: string;
  github: string;
  featured: boolean;
  sort_order: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  sort_order: number;
}

export interface Education {
  id: string;
  degree: string;
  place: string;
  year: string;
  score: string;
  sort_order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  project_name: string;
  period: string;
  points: string[];
  tags: string[];
  sort_order: number;
}

// Static Fallback Data
const fallbackProfile: Profile = {
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

const fallbackSkills: Record<string, string[]> = {
  Languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
  Frontend: ["React.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI", "GraphQL (AppSync)", "REST APIs"],
  "Cloud / DB": ["AWS", "AWS Lambda", "AppSync", "DynamoDB", "Cognito", "IAM", "CloudWatch", "CloudFront", "MySQL"],
  Testing: ["Vitest", "Jest", "React Testing Library"],
  "AI / ML": ["LangChain", "FAISS", "Ollama", "Sentence Transformers"]
};

const fallbackProjects: Project[] = [
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

const fallbackEducation: Education[] = [
  { id: "1", degree: "B.E. CSE", place: "Sona College of Technology, Salem", year: "2026", score: "CGPA: 7.98/10", sort_order: 1 },
  { id: "2", degree: "HSC", place: "SSRM Higher Secondary School, Karuppur", year: "2021", score: "90.5%", sort_order: 2 },
  { id: "3", degree: "SSLC", place: "SSRM Higher Secondary School, Karuppur", year: "2019", score: "89%", sort_order: 3 }
];

const fallbackExperience: Experience[] = [
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

interface PortfolioContextType {
  profile: Profile;
  skills: Record<string, string[]>;
  projects: Project[];
  education: Education[];
  experience: Experience[];
  loading: boolean;
  saving: boolean;
  session: Session | null;
  isAdmin: boolean;
  isDbConfigured: boolean;
  saveProfile: (p: Profile) => Promise<boolean>;
  saveSkills: (s: Record<string, string[]>) => Promise<boolean>;
  saveProject: (p: Project) => Promise<boolean>;
  addProject: (p: Omit<Project, "sort_order">) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveEducation: (eduList: Education[]) => Promise<boolean>;
  saveExperience: (expList: Experience[]) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const PortfolioDataContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioDataProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [skills, setSkills] = useState<Record<string, string[]>>(fallbackSkills);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [education, setEducation] = useState<Education[]>(fallbackEducation);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isDbConfigured, setIsDbConfigured] = useState(hasSupabaseConfig());

  // Listen to Supabase Auth Changes
  useEffect(() => {
    if (!isDbConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [isDbConfigured]);

  // Load portfolio data from database
  const loadData = async () => {
    if (!isDbConfigured) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from("profile")
        .select("*")
        .eq("id", "main")
        .maybeSingle();

      if (profileErr) throw profileErr;

      // Seed if profile doesn't exist
      if (!profileData) {
        await seedDatabase();
        return;
      }

      setProfile(profileData);

      // Fetch Projects
      const { data: projectsData, error: projectsErr } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (projectsErr) throw projectsErr;
      setProjects(projectsData || []);

      // Fetch Skills
      const { data: skillsData, error: skillsErr } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });

      if (skillsErr) throw skillsErr;
      if (skillsData && skillsData.length > 0) {
        const skillsObj: Record<string, string[]> = {};
        skillsData.forEach((row: SkillCategory) => {
          skillsObj[row.category] = row.skills;
        });
        setSkills(skillsObj);
      }

      // Fetch Education
      const { data: eduData, error: eduErr } = await supabase
        .from("education")
        .select("*")
        .order("sort_order", { ascending: true });

      if (eduErr) throw eduErr;
      setEducation(eduData || []);

      // Fetch Experience
      const { data: expData, error: expErr } = await supabase
        .from("experience")
        .select("*")
        .order("sort_order", { ascending: true });

      if (expErr) throw expErr;
      setExperience(expData || []);

    } catch (err) {
      console.error("Error fetching data from Supabase:", err);
    } finally {
      setLoading(false);
    }
  };

  // Seed default data if database is empty
  const seedDatabase = async () => {
    try {
      console.log("Seeding database with default values...");
      // Seed Profile
      await supabase.from("profile").insert([fallbackProfile]);

      // Seed Skills
      const skillsToInsert = Object.entries(fallbackSkills).map(([category, skills], i) => ({
        category,
        skills,
        sort_order: i + 1
      }));
      await supabase.from("skills").insert(skillsToInsert);

      // Seed Projects
      await supabase.from("projects").insert(fallbackProjects);

      // Seed Education
      const eduToInsert = fallbackEducation.map(({ degree, place, year, score, sort_order }) => ({
        degree,
        place,
        year,
        score,
        sort_order
      }));
      await supabase.from("education").insert(eduToInsert);

      // Seed Experience
      const expToInsert = fallbackExperience.map(({ title, company, project_name, period, points, tags, sort_order }) => ({
        title,
        company,
        project_name,
        period,
        points,
        tags,
        sort_order
      }));
      await supabase.from("experience").insert(expToInsert);

      // Reload
      await loadData();
    } catch (err) {
      console.error("Failed to seed database:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDbConfigured(hasSupabaseConfig());
  }, []);

  useEffect(() => {
    loadData();
  }, [isDbConfigured]);

  // CRUD Mutations
  const saveProfile = async (newProfile: Profile): Promise<boolean> => {
    if (!isDbConfigured) {
      setProfile(newProfile);
      return true;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from("profile")
        .update({
          name: newProfile.name,
          email: newProfile.email,
          phone: newProfile.phone,
          location: newProfile.location,
          status: newProfile.status,
          hero_title: newProfile.hero_title,
          hero_subtitle: newProfile.hero_subtitle,
          hero_description: newProfile.hero_description,
          about_paragraphs: newProfile.about_paragraphs,
          updated_at: new Date().toISOString()
        })
        .eq("id", "main");

      if (error) throw error;
      setProfile(newProfile);
      return true;
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile. Ensure you are logged in as admin.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveSkills = async (newSkillsObj: Record<string, string[]>): Promise<boolean> => {
    if (!isDbConfigured) {
      setSkills(newSkillsObj);
      return true;
    }

    try {
      setSaving(true);
      
      // We delete existing and re-insert to handle renamed or deleted categories
      const { error: deleteErr } = await supabase.rpc("clear_skills_table"); // Custom RPC or delete all
      
      if (deleteErr) {
        // Fallback to manual delete if RPC not installed
        const { error: manualDeleteErr } = await supabase.from("skills").delete().neq("category", "placeholder_to_prevent_empty");
        if (manualDeleteErr) throw manualDeleteErr;
      }

      const skillsToInsert = Object.entries(newSkillsObj).map(([category, list], i) => ({
        category,
        skills: list,
        sort_order: i + 1
      }));

      const { error: insertErr } = await supabase.from("skills").insert(skillsToInsert);
      if (insertErr) throw insertErr;

      setSkills(newSkillsObj);
      return true;
    } catch (err) {
      console.error("Error saving skills:", err);
      alert("Failed to save skills. Ensure you are logged in.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (proj: Project): Promise<boolean> => {
    if (!isDbConfigured) {
      setProjects(prev => prev.map(p => p.id === proj.id ? proj : p));
      return true;
    }

    try {
      setSaving(true);
      const { error } = await supabase
        .from("projects")
        .update({
          title: proj.title,
          tagline: proj.tagline,
          stack: proj.stack,
          features: proj.features,
          period: proj.period,
          github: proj.github,
          featured: proj.featured,
          sort_order: proj.sort_order
        })
        .eq("id", proj.id);

      if (error) throw error;
      setProjects(prev => prev.map(p => p.id === proj.id ? proj : p));
      return true;
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const addProject = async (proj: Omit<Project, "sort_order">): Promise<boolean> => {
    const nextOrder = projects.length > 0 ? Math.max(...projects.map(p => p.sort_order)) + 1 : 1;
    const newProj: Project = { ...proj, sort_order: nextOrder };

    if (!isDbConfigured) {
      setProjects(prev => [...prev, newProj]);
      return true;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from("projects").insert([newProj]);
      if (error) throw error;
      setProjects(prev => [...prev, newProj]);
      return true;
    } catch (err) {
      console.error("Error adding project:", err);
      alert("Failed to add project.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    if (!isDbConfigured) {
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    }

    try {
      setSaving(true);
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveEducation = async (eduList: Education[]): Promise<boolean> => {
    if (!isDbConfigured) {
      setEducation(eduList);
      return true;
    }

    try {
      setSaving(true);
      
      // Delete old education items
      const { error: delErr } = await supabase.from("education").delete().neq("degree", "dummy");
      if (delErr) throw delErr;

      // Insert new items
      const eduToInsert = eduList.map((edu, i) => ({
        degree: edu.degree,
        place: edu.place,
        year: edu.year,
        score: edu.score,
        sort_order: i + 1
      }));

      const { data, error: insErr } = await supabase.from("education").insert(eduToInsert).select();
      if (insErr) throw insErr;

      setEducation(data || eduList);
      return true;
    } catch (err) {
      console.error("Error saving education list:", err);
      alert("Failed to save education.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveExperience = async (expList: Experience[]): Promise<boolean> => {
    if (!isDbConfigured) {
      setExperience(expList);
      return true;
    }

    try {
      setSaving(true);

      // Delete old experience
      const { error: delErr } = await supabase.from("experience").delete().neq("title", "dummy");
      if (delErr) throw delErr;

      // Insert new
      const expToInsert = expList.map((exp, i) => ({
        title: exp.title,
        company: exp.company,
        project_name: exp.project_name,
        period: exp.period,
        points: exp.points,
        tags: exp.tags,
        sort_order: i + 1
      }));

      const { data, error: insErr } = await supabase.from("experience").insert(expToInsert).select();
      if (insErr) throw insErr;

      setExperience(data || expList);
      return true;
    } catch (err) {
      console.error("Error saving experience list:", err);
      alert("Failed to save experience.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        profile,
        skills,
        projects,
        education,
        experience,
        loading,
        saving,
        session,
        isAdmin: !!session,
        isDbConfigured,
        saveProfile,
        saveSkills,
        saveProject,
        addProject,
        deleteProject,
        saveEducation,
        saveExperience,
        refreshData: loadData
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (context === undefined) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }
  return context;
};
