import { useState, useEffect } from "react";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import { supabase } from "../../config/supabase";
import { navigate } from "../../App";
import { ProfileForm } from "./forms/ProfileForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { ExpEduForm } from "./forms/ExpEduForm";

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
            className="text-[12px] font-semibold text-text-muted hover:text-accent font-dm-mono cursor-pointer bg-transparent border-none outline-none"
          >
            Preview Site
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full border border-text-muted/40 hover:border-red-400 hover:text-red-500 text-[12px] font-semibold transition-all duration-200 cursor-pointer font-dm-mono bg-transparent"
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
          {activeTab === "profile" && (
            <ProfileForm profile={profile} onSave={saveProfile} showToast={showToast} saving={saving} />
          )}
          {activeTab === "skills" && (
            <SkillsForm skills={skills} onSave={saveSkills} showToast={showToast} saving={saving} />
          )}
          {activeTab === "projects" && (
            <ProjectsForm
              projects={projects}
              onAdd={addProject}
              onSave={saveProject}
              onDelete={deleteProject}
              showToast={showToast}
              saving={saving}
            />
          )}
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
