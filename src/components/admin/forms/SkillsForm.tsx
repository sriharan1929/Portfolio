import { useState, useEffect } from "react";
import { Button } from "../../ui/Button";

interface SkillsFormProps {
  skills: Record<string, string[]>;
  onSave: (s: Record<string, string[]>) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

export const SkillsForm = ({ skills, onSave, showToast, saving }: SkillsFormProps) => {
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
            className="px-4 py-2 rounded-xl border border-[#f0ddc8] text-xs outline-none bg-white focus:border-accent text-text-dark"
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
                className="text-[10px] text-red-500 font-dm-mono hover:underline cursor-pointer bg-transparent border-none outline-none"
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
                    className="flex-1 px-4 py-2 rounded-xl border border-[#f0ddc8] text-xs outline-none focus:border-accent bg-[#faf8f5] text-text-dark"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category, index)}
                    className="p-2 text-xs hover:bg-red-50 text-red-400 rounded-lg cursor-pointer transition-colors bg-transparent border-none outline-none"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddSkill(category)}
                className="self-start text-[11px] font-bold text-text-muted hover:text-accent font-dm-mono mt-2 cursor-pointer bg-transparent border-none outline-none"
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
