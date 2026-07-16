import { useState } from "react";
import type { Project } from "../../../types";
import { Button } from "../../ui/Button";

interface ProjectsFormProps {
  projects: Project[];
  onSave: (p: Project) => Promise<boolean>;
  onAdd: (p: Omit<Project, "sort_order">) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

export const ProjectsForm = ({ projects, onSave, onAdd, onDelete, showToast, saving }: ProjectsFormProps) => {
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
            className="text-[12px] font-dm-mono text-text-muted hover:text-text-dark cursor-pointer bg-transparent border-none outline-none"
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
              className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer bg-transparent border-none outline-none"
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
                  className="flex-1 px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs bg-[#faf8f5] text-text-dark"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("stack", idx)}
                  className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer bg-transparent border-none outline-none"
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
              className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer bg-transparent border-none outline-none"
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
                  className="flex-1 px-4 py-2 border border-[#f0ddc8] rounded-xl text-xs bg-[#faf8f5] leading-relaxed text-text-dark"
                  rows={2}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("features", idx)}
                  className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer mt-1 bg-transparent border-none outline-none"
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
                className="px-3.5 py-2 border border-[#f0ddc8] hover:bg-[#faf8f5] rounded-xl text-xs font-semibold cursor-pointer text-text-dark bg-transparent outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="px-3.5 py-2 border border-red-100 hover:bg-red-50 text-red-500 rounded-xl text-xs font-semibold cursor-pointer bg-transparent outline-none"
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
