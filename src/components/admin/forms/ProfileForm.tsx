import { useState, useEffect } from "react";
import type { Profile } from "../../../types";
import { Button } from "../../ui/Button";

interface ProfileFormProps {
  profile: Profile;
  onSave: (p: Profile) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

export const ProfileForm = ({ profile, onSave, showToast, saving }: ProfileFormProps) => {
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
