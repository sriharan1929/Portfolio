import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, hasSupabaseConfig } from "../config/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Profile, Project, Education, Experience } from "../types";
import {
  fallbackProfile,
  fallbackSkills,
  fallbackProjects,
  fallbackEducation,
  fallbackExperience
} from "../constants/fallbackData";
import * as db from "../services/supabaseService";

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
  const loadData = useCallback(async () => {
    if (!isDbConfigured) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch Profile
      let profileData = await db.getProfile();

      // Seed if profile doesn't exist
      if (!profileData) {
        console.log("Seeding database with default values...");
        await db.seedDatabase();
        profileData = await db.getProfile();
      }

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch Projects
      const projectsData = await db.getProjects();
      setProjects(projectsData);

      // Fetch Skills
      const skillsData = await db.getSkills();
      if (skillsData && skillsData.length > 0) {
        const skillsObj: Record<string, string[]> = {};
        skillsData.forEach((row) => {
          skillsObj[row.category] = row.skills;
        });
        setSkills(skillsObj);
      }

      // Fetch Education
      const eduData = await db.getEducationList();
      setEducation(eduData);

      // Fetch Experience
      const expData = await db.getExperienceList();
      setExperience(expData);

    } catch (err) {
      console.error("Error fetching data from Supabase Service:", err);
    } finally {
      setLoading(false);
    }
  }, [isDbConfigured]);

  useEffect(() => {
    setIsDbConfigured(hasSupabaseConfig());
  }, []);

  useEffect(() => {
    loadData();
  }, [isDbConfigured, loadData]);

  // CRUD Mutations
  const saveProfile = async (newProfile: Profile): Promise<boolean> => {
    if (!isDbConfigured) {
      setProfile(newProfile);
      return true;
    }

    try {
      setSaving(true);
      await db.updateProfile(newProfile);
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
      await db.updateSkills(newSkillsObj);
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
      await db.updateProject(proj);
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
      await db.insertProject(newProj);
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
      await db.removeProject(id);
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
      const data = await db.updateEducationList(eduList);
      setEducation(data);
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
      const data = await db.updateExperienceList(expList);
      setExperience(data);
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
