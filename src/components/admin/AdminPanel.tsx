import { useState, useEffect } from "react";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import type { Profile, Project, Education, Experience } from "../../context/PortfolioDataContext";
import { supabase } from "../../config/supabase";
import { navigate } from "../../App";
import { Button } from "../ui/Button";

type Tab = "profile" | "skills" | "projects" | "experience";

export const AdminPanel = () => {
  const {
    profile,
    skills,
    projects,
    education,
    experience,
    loading,
    saving,
    isAdmin,
    isDbConfigured,
    saveProfile,
    saveSkills,
    saveProject,
    addProject,
    deleteProject,
    saveEducation,
    saveExperience
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [successMsg, setSuccessMsg] = useState("");

  // Route guarding: redirect to login if not admin
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, loading]);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSignOut = async () => {
    if (isDbConfigured) {
      await supabase.auth.signOut();
    }
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdf9]">
        <div className="w-10 h-10 rounded-full border-[3px] border-accent/20 border-t-accent animate-spin mb-4" />
        <p className="text-sm text-text-muted font-lora">Loading portfolio database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col text-text-dark font-sans relative">
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-[200] bg-[#1a1410] border border-[#f0ddc8]/30 px-6 py-4 rounded-2xl shadow-xl text-white text-[13px] font-medium font-dm-mono flex items-center gap-2 animate-[slideIn_0.3s_ease-out]">
          <span className="text-emerald-400">✓</span> {successMsg}
        </div>
      )}

      {/* Header */}
      <header className="h-20 bg-white border-b border-[#f0ddc8] px-6 md:px-12 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
            💼
          </div>
          <div>
            <h1 className="font-cormorant text-xl font-bold tracking-[-0.01em]">Sri-Portfolio Admin</h1>
            <p className="text-[10px] text-text-muted font-dm-mono uppercase mt-0.5">Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isDbConfigured && (
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-amber-700 font-dm-mono">
              Local Mode (No DB)
            </span>
          )}
          <button
            onClick={() => navigate("/")}
            className="text-[12px] font-semibold text-text-muted hover:text-accent font-dm-mono cursor-pointer"
          >
            Preview Site
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full border border-text-muted/40 hover:border-red-400 hover:text-red-500 text-[12px] font-semibold transition-all duration-200 cursor-pointer font-dm-mono"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#f0ddc8] p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          {[
            { id: "profile", label: "Profile & Hero", icon: "👤" },
            { id: "skills", label: "Skills Inventory", icon: "⚡" },
            { id: "projects", label: "Projects List", icon: "💻" },
            { id: "experience", label: "Job & School", icon: "🎓" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[13px] font-semibold transition-all duration-150 cursor-pointer shrink-0 md:w-full ${
                activeTab === tab.id
                  ? "bg-accent-light text-accent border border-accent-border"
                  : "text-text-muted hover:bg-[#faf8f5] hover:text-text-dark border border-transparent"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content area */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-[900px]">
          {activeTab === "profile" && <ProfileForm profile={profile} onSave={saveProfile} showToast={showToast} saving={saving} />}
          {activeTab === "skills" && <SkillsForm skills={skills} onSave={saveSkills} showToast={showToast} saving={saving} />}
          {activeTab === "projects" && <ProjectsForm projects={projects} onAdd={addProject} onSave={saveProject} onDelete={deleteProject} showToast={showToast} saving={saving} />}
          {activeTab === "experience" && (
            <ExpEduForm
              experience={experience}
              education={education}
              onSaveExp={saveExperience}
              onSaveEdu={saveEducation}
              showToast={showToast}
              saving={saving}
            />
          )}
        </main>
      </div>
    </div>
  );
};

/* ==========================================================================
   Tab Components
   ========================================================================== */

// 1. PROFILE & HERO FORM
interface ProfileFormProps {
  profile: Profile;
  onSave: (p: Profile) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

const ProfileForm = ({ profile, onSave, showToast, saving }: ProfileFormProps) => {
  const [formData, setFormData] = useState<Profile>({ ...profile });

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSave(formData);
    if (success) showToast("Profile information saved successfully");
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...formData.about_paragraphs];
    updated[index] = val;
    setFormData({ ...formData, about_paragraphs: updated });
  };

  const addParagraph = () => {
    setFormData({ ...formData, about_paragraphs: [...formData.about_paragraphs, ""] });
  };

  const removeParagraph = (index: number) => {
    const updated = formData.about_paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, about_paragraphs: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h2 className="font-cormorant text-2xl font-bold mb-1">Profile & Hero Details</h2>
        <p className="text-xs text-text-muted font-lora">Configure metadata, contact info, and introductory sections.</p>
      </div>

      <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
        <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono pb-2 border-b border-[#f0ddc8]">
          Hero Section Content
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Hero Title</label>
          <input
            type="text"
            value={formData.hero_title}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Hero Subtitle</label>
          <input
            type="text"
            value={formData.hero_subtitle}
            onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Hero Description</label>
          <textarea
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark leading-relaxed"
            required
          />
        </div>
      </div>

      <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
        <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono pb-2 border-b border-[#f0ddc8]">
          Contact & Status Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Availability Status</label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              placeholder="Open to work"
              className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
        <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono pb-2 border-b border-[#f0ddc8] flex justify-between items-center">
          About Paragraphs
          <button
            type="button"
            onClick={addParagraph}
            className="text-[11px] text-accent hover:underline font-dm-mono cursor-pointer"
          >
            + Add Paragraph
          </button>
        </h3>

        {formData.about_paragraphs.map((p, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="font-dm-mono text-[11px] text-text-muted mt-3">#{i + 1}</span>
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(i, e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark leading-relaxed"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => removeParagraph(i)}
              className="p-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-lg text-xs mt-1 transition-colors cursor-pointer"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={saving}
        variant="primary"
        size="lg"
        className="self-start text-xs font-bold font-dm-mono tracking-[0.05em] uppercase"
      >
        {saving ? "Saving changes..." : "Save Profile Details"}
      </Button>
    </form>
  );
};

// 2. SKILLS FORM
interface SkillsFormProps {
  skills: Record<string, string[]>;
  onSave: (s: Record<string, string[]>) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

const SkillsForm = ({ skills, onSave, showToast, saving }: SkillsFormProps) => {
  const [skillsState, setSkillsState] = useState<Record<string, string[]>>({ ...skills });
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    setSkillsState({ ...skills });
  }, [skills]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSave(skillsState);
    if (success) showToast("Skills inventory saved successfully");
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const cat = newCatName.trim();
    if (skillsState[cat]) {
      alert("Category already exists.");
      return;
    }
    setSkillsState({ ...skillsState, [cat]: [] });
    setNewCatName("");
  };

  const handleRemoveCategory = (cat: string) => {
    const next = { ...skillsState };
    delete next[cat];
    setSkillsState(next);
  };

  const handleSkillChange = (cat: string, index: number, val: string) => {
    const list = [...skillsState[cat]];
    list[index] = val;
    setSkillsState({ ...skillsState, [cat]: list });
  };

  const handleAddSkill = (cat: string) => {
    setSkillsState({ ...skillsState, [cat]: [...skillsState[cat], ""] });
  };

  const handleRemoveSkill = (cat: string, index: number) => {
    const list = skillsState[cat].filter((_, i) => i !== index);
    setSkillsState({ ...skillsState, [cat]: list });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="font-cormorant text-2xl font-bold mb-1">Skills Inventory</h2>
          <p className="text-xs text-text-muted font-lora">Organize and publish technical skill pills by categories.</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category (e.g. Databases)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[#f0ddc8] text-xs outline-none bg-white focus:border-accent"
          />
          <Button
            type="button"
            onClick={handleAddCategory}
            variant="dark"
            size="sm"
          >
            + Category
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(skillsState).map(([category, list]) => (
          <div key={category} className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-[#f0ddc8]">
              <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono">{category}</span>
              <button
                type="button"
                onClick={() => handleRemoveCategory(category)}
                className="text-[10px] text-red-500 font-dm-mono hover:underline cursor-pointer"
              >
                Delete Category 🗑
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {list.map((skill, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(category, index, e.target.value)}
                    placeholder="Skill name (e.g. React.js)"
                    className="flex-1 px-4 py-2 rounded-xl border border-[#f0ddc8] text-xs outline-none focus:border-accent bg-[#faf8f5]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category, index)}
                    className="p-2 text-xs hover:bg-red-50 text-red-400 rounded-lg cursor-pointer transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddSkill(category)}
                className="self-start text-[11px] font-bold text-text-muted hover:text-accent font-dm-mono mt-2 cursor-pointer"
              >
                + Add Skill
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={saving}
        variant="primary"
        size="lg"
        className="self-start text-xs font-bold font-dm-mono tracking-[0.05em] uppercase"
      >
        {saving ? "Saving..." : "Save Skills Inventory"}
      </Button>
    </form>
  );
};

// 3. PROJECTS LIST FORM
interface ProjectsFormProps {
  projects: Project[];
  onSave: (p: Project) => Promise<boolean>;
  onAdd: (p: Omit<Project, "sort_order">) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

const ProjectsForm = ({ projects, onSave, onAdd, onDelete, showToast, saving }: ProjectsFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Single Project state
  const [projForm, setProjForm] = useState<Project | Omit<Project, "sort_order">>({
    id: "",
    title: "",
    tagline: "",
    stack: [],
    features: [],
    period: "",
    github: "",
    featured: false
  });

  const handleEditClick = (p: Project) => {
    setEditingId(p.id);
    setProjForm({ ...p });
  };

  const handleAddClick = () => {
    setEditingId("new");
    setProjForm({
      id: "",
      title: "",
      tagline: "",
      stack: [],
      features: [],
      period: "",
      github: "",
      featured: false
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === "new") {
      // Setup random text ID if empty
      const generatedId = projForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const success = await onAdd({ ...projForm, id: projForm.id || generatedId } as Project);
      if (success) {
        showToast("New project added");
        setEditingId(null);
      }
    } else if (editingId) {
      const success = await onSave(projForm as Project);
      if (success) {
        showToast("Project details updated");
        setEditingId(null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const success = await onDelete(id);
      if (success) showToast("Project deleted");
    }
  };

  const handleArrayStringChange = (field: "stack" | "features", index: number, val: string) => {
    const list = [...(projForm[field] || [])];
    list[index] = val;
    setProjForm({ ...projForm, [field]: list });
  };

  const addArrayItem = (field: "stack" | "features") => {
    const list = [...(projForm[field] || [])];
    setProjForm({ ...projForm, [field]: [...list, ""] });
  };

  const removeArrayItem = (field: "stack" | "features", index: number) => {
    const list = (projForm[field] || []).filter((_, i) => i !== index);
    setProjForm({ ...projForm, [field]: list });
  };

  if (editingId) {
    return (
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="flex justify-between items-center pb-3 border-b border-[#f0ddc8]">
          <h2 className="font-cormorant text-2xl font-bold">
            {editingId === "new" ? "Add New Project" : `Edit Project: ${projForm.title}`}
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-[12px] font-dm-mono text-text-muted hover:text-text-dark cursor-pointer"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-5 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Project ID</label>
              <input
                type="text"
                placeholder="e.g. zip-rag"
                disabled={editingId !== "new"}
                value={projForm.id}
                onChange={(e) => setProjForm({ ...projForm, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "") })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark disabled:bg-[#faf8f5] disabled:cursor-not-allowed"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Project Title</label>
              <input
                type="text"
                placeholder="e.g. ZIP-RAG"
                value={projForm.title}
                onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Project Tagline</label>
              <input
                type="text"
                value={projForm.tagline}
                onChange={(e) => setProjForm({ ...projForm, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">Timeline / Period</label>
              <input
                type="text"
                placeholder="Jan 2026 - Apr 2026"
                value={projForm.period}
                onChange={(e) => setProjForm({ ...projForm, period: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-[0.05em] uppercase text-text-light font-dm-mono">GitHub Repository URL</label>
              <input
                type="url"
                value={projForm.github}
                onChange={(e) => setProjForm({ ...projForm, github: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#f0ddc8] text-sm focus:border-accent outline-none text-text-dark"
                required
              />
            </div>

            <div className="flex gap-3 items-center mt-2 md:col-span-2">
              <input
                type="checkbox"
                id="featured"
                checked={projForm.featured}
                onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })}
                className="w-4 h-4 rounded border-[#f0ddc8] text-accent focus:ring-accent accent-accent"
              />
              <label htmlFor="featured" className="text-[12px] font-semibold text-text-dark font-dm-mono cursor-pointer select-none">
                Feature on main page (Highlighted style)
              </label>
            </div>
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono pb-2 border-b border-[#f0ddc8] flex justify-between items-center">
            Tech Stack Tags
            <button
              type="button"
              onClick={() => addArrayItem("stack")}
              className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer"
            >
              + Add Tech Tag
            </button>
          </h3>
          <div className="flex flex-col gap-2.5">
            {projForm.stack.map((tech, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayStringChange("stack", idx, e.target.value)}
                  placeholder="e.g. React"
                  className="flex-1 px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs bg-[#faf8f5]"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("stack", idx)}
                  className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Points */}
        <div className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
          <h3 className="text-[12px] font-bold tracking-[0.1em] uppercase text-accent font-dm-mono pb-2 border-b border-[#f0ddc8] flex justify-between items-center">
            Key Project Features / Accomplishments
            <button
              type="button"
              onClick={() => addArrayItem("features")}
              className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer"
            >
              + Add Feature Point
            </button>
          </h3>
          <div className="flex flex-col gap-2.5">
            {projForm.features.map((feat, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <textarea
                  value={feat}
                  onChange={(e) => handleArrayStringChange("features", idx, e.target.value)}
                  placeholder="Describe an accomplishment or architecture detail..."
                  className="flex-1 px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs bg-[#faf8f5] leading-relaxed"
                  rows={2}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("features", idx)}
                  className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer mt-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={saving}
            variant="primary"
            size="lg"
            className="text-xs font-bold font-dm-mono tracking-[0.05em] uppercase"
          >
            {saving ? "Saving..." : "Save Project"}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="secondary"
            size="lg"
            className="text-xs font-bold font-dm-mono tracking-[0.05em] uppercase text-text-muted hover:text-text-dark border-text-muted/40"
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className="font-cormorant text-2xl font-bold mb-1">Projects List</h2>
          <p className="text-xs text-text-muted font-lora">Publish and maintain details of your developer projects.</p>
        </div>
        <Button
          onClick={handleAddClick}
          variant="primary"
          size="sm"
          className="font-dm-mono tracking-[0.05em] uppercase text-xs"
        >
          + Add Project
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-[#f0ddc8] rounded-[20px] p-6 flex justify-between items-center shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[15px]">{proj.title}</h3>
                {proj.featured && (
                  <span className="px-2 py-0.5 rounded bg-accent-light text-[9px] font-bold text-accent font-dm-mono uppercase border border-accent-border">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-[12px] text-text-muted font-lora mt-1">{proj.tagline}</p>
              <div className="text-[10px] text-text-light font-dm-mono mt-1.5">{proj.period}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(proj)}
                className="px-3.5 py-2 border border-[#f0ddc8] hover:bg-[#faf8f5] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="px-3.5 py-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. EXPERIENCE & EDUCATION FORM
interface ExpEduFormProps {
  experience: Experience[];
  education: Education[];
  onSaveExp: (exp: Experience[]) => Promise<boolean>;
  onSaveEdu: (edu: Education[]) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

const ExpEduForm = ({ experience, education, onSaveExp, onSaveEdu, showToast, saving }: ExpEduFormProps) => {
  const [expList, setExpList] = useState<Experience[]>([]);
  const [eduList, setEduList] = useState<Education[]>([]);

  useEffect(() => {
    setExpList(experience.map(e => ({ ...e, points: [...e.points], tags: [...e.tags] })));
  }, [experience]);

  useEffect(() => {
    setEduList(education.map(ed => ({ ...ed })));
  }, [education]);

  const handleSaveExperience = async () => {
    const success = await onSaveExp(expList);
    if (success) showToast("Work experience details updated");
  };

  const handleSaveEducation = async () => {
    const success = await onSaveEdu(eduList);
    if (success) showToast("Education milestones updated");
  };

  // Education Helpers
  const handleEduChange = (idx: number, field: keyof Education, val: string) => {
    const list = [...eduList];
    list[idx] = { ...list[idx], [field]: val };
    setEduList(list);
  };

  const addEdu = () => {
    setEduList([...eduList, { id: Date.now().toString(), degree: "", place: "", year: "", score: "", sort_order: eduList.length + 1 }]);
  };

  const removeEdu = (idx: number) => {
    setEduList(eduList.filter((_, i) => i !== idx));
  };

  // Experience Helpers
  const handleExpChange = (idx: number, field: keyof Experience, val: any) => {
    const list = [...expList];
    list[idx] = { ...list[idx], [field]: val };
    setExpList(list);
  };

  const handleExpArrayChange = (expIdx: number, field: "points" | "tags", arrIdx: number, val: string) => {
    const list = [...expList];
    const subArr = [...list[expIdx][field]];
    subArr[arrIdx] = val;
    list[expIdx] = { ...list[expIdx], [field]: subArr };
    setExpList(list);
  };

  const addExpArrayItem = (expIdx: number, field: "points" | "tags") => {
    const list = [...expList];
    list[expIdx] = { ...list[expIdx], [field]: [...list[expIdx][field], ""] };
    setExpList(list);
  };

  const removeExpArrayItem = (expIdx: number, field: "points" | "tags", arrIdx: number) => {
    const list = [...expList];
    const subArr = list[expIdx][field].filter((_, i) => i !== arrIdx);
    list[expIdx] = { ...list[expIdx], [field]: subArr };
    setExpList(list);
  };

  const addExp = () => {
    setExpList([
      ...expList,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        project_name: "",
        period: "",
        points: [],
        tags: [],
        sort_order: expList.length + 1
      }
    ]);
  };

  const removeExp = (idx: number) => {
    setExpList(expList.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-12">
      {/* EXPERIENCE SECTION */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="font-cormorant text-2xl font-bold mb-1">Work Experience</h2>
            <p className="text-xs text-text-muted font-lora">Manage your professional job roles and internships.</p>
          </div>
          <Button
            type="button"
            onClick={addExp}
            variant="dark"
            size="sm"
          >
            + Add Job Card
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {expList.map((exp, expIdx) => (
            <div key={exp.id || expIdx} className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-[0_2px_12px_rgba(194,97,26,0.02)]">
              <div className="flex justify-between items-center pb-2 border-b border-[#f0ddc8]">
                <span className="font-dm-mono text-[11px] font-semibold text-accent">JOB POSITION #{expIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeExp(expIdx)}
                  className="text-red-500 hover:underline text-[10px] font-dm-mono cursor-pointer"
                >
                  Delete Job 🗑
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Role Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleExpChange(expIdx, "title", e.target.value)}
                    placeholder="e.g. Full Time Intern"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Company / Employer</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExpChange(expIdx, "company", e.target.value)}
                    placeholder="e.g. Syzy Technologies"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Project Name (Optional)</label>
                  <input
                    type="text"
                    value={exp.project_name}
                    onChange={(e) => handleExpChange(expIdx, "project_name", e.target.value)}
                    placeholder="e.g. FlowFlux CRM"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Timeline Period</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleExpChange(expIdx, "period", e.target.value)}
                    placeholder="e.g. Jan 2026 – Present"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>
              </div>

              {/* Points */}
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Job Accomplishments</label>
                  <button
                    type="button"
                    onClick={() => addExpArrayItem(expIdx, "points")}
                    className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer"
                  >
                    + Add Point
                  </button>
                </div>
                {exp.points.map((pt, ptIdx) => (
                  <div key={ptIdx} className="flex gap-2 items-start">
                    <textarea
                      value={pt}
                      onChange={(e) => handleExpArrayChange(expIdx, "points", ptIdx, e.target.value)}
                      className="flex-1 px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs bg-[#faf8f5]"
                      rows={2}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeExpArrayItem(expIdx, "points", ptIdx)}
                      className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer mt-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Technologies Used</label>
                  <button
                    type="button"
                    onClick={() => addExpArrayItem(expIdx, "tags")}
                    className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer"
                  >
                    + Add Tech Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tagIdx) => (
                    <div key={tagIdx} className="flex gap-1 items-center bg-[#faf8f5] border border-[#f0ddc8] rounded-lg px-2 py-1">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleExpArrayChange(expIdx, "tags", tagIdx, e.target.value)}
                        className="px-1 py-0.5 border-none bg-transparent text-[11px] outline-none w-20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeExpArrayItem(expIdx, "tags", tagIdx)}
                        className="text-red-400 font-bold text-[10px] hover:text-red-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleSaveExperience}
          disabled={saving}
          variant="primary"
          size="lg"
          className="self-start text-xs font-bold font-dm-mono tracking-[0.05em] uppercase"
        >
          {saving ? "Saving..." : "Save Work Experience"}
        </Button>
      </div>

      {/* EDUCATION SECTION */}
      <div className="flex flex-col gap-6 pt-8 border-t border-[#f0ddc8]">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h2 className="font-cormorant text-2xl font-bold mb-1">Education Milestones</h2>
            <p className="text-xs text-text-muted font-lora">Publish and maintain your academic credentials.</p>
          </div>
          <Button
            type="button"
            onClick={addEdu}
            variant="dark"
            size="sm"
          >
            + Add School Card
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {eduList.map((edu, eduIdx) => (
            <div key={edu.id || eduIdx} className="bg-white border border-[#f0ddc8] rounded-[24px] p-6 shadow-[0_2px_12px_rgba(194,97,26,0.02)] flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#f0ddc8]">
                <span className="font-dm-mono text-[10px] font-semibold text-accent">SCHOOL ITEM #{eduIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeEdu(eduIdx)}
                  className="text-red-500 hover:underline text-[10px] font-dm-mono cursor-pointer"
                >
                  Delete Item 🗑
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Degree / Qualification</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(eduIdx, "degree", e.target.value)}
                    placeholder="e.g. B.E. Computer Science"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Institution & Location</label>
                  <input
                    type="text"
                    value={edu.place}
                    onChange={(e) => handleEduChange(eduIdx, "place", e.target.value)}
                    placeholder="e.g. Sona College of Technology, Salem"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Year / Timeline</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleEduChange(eduIdx, "year", e.target.value)}
                    placeholder="e.g. 2026"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-light font-dm-mono uppercase">Score / Grade</label>
                  <input
                    type="text"
                    value={edu.score}
                    onChange={(e) => handleEduChange(eduIdx, "score", e.target.value)}
                    placeholder="e.g. CGPA: 7.98/10 or 90.5%"
                    className="px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleSaveEducation}
          disabled={saving}
          variant="primary"
          size="lg"
          className="self-start text-xs font-bold font-dm-mono tracking-[0.05em] uppercase"
        >
          {saving ? "Saving..." : "Save Education milestones"}
        </Button>
      </div>
    </div>
  );
};
