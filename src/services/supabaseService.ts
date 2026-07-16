import { supabase } from "../config/supabase";
import type { Profile, Project, Education, Experience, SkillCategory } from "../types";
import { fallbackProfile, fallbackSkills, fallbackProjects, fallbackEducation, fallbackExperience } from "../constants/fallbackData";

export const getProfile = async (): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const updateProfile = async (newProfile: Profile): Promise<void> => {
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
};

export const getSkills = async (): Promise<SkillCategory[]> => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateSkills = async (newSkillsObj: Record<string, string[]>): Promise<void> => {
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
};

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateProject = async (proj: Project): Promise<void> => {
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
};

export const insertProject = async (proj: Project): Promise<void> => {
  const { error } = await supabase.from("projects").insert([proj]);
  if (error) throw error;
};

export const removeProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
};

export const getEducationList = async (): Promise<Education[]> => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateEducationList = async (eduList: Education[]): Promise<Education[]> => {
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
  return data || eduList;
};

export const getExperienceList = async (): Promise<Experience[]> => {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateExperienceList = async (expList: Experience[]): Promise<Experience[]> => {
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
  return data || expList;
};

export const seedDatabase = async (): Promise<void> => {
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
};
