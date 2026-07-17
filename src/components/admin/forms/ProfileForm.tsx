import { useState, useEffect } from "react";
import type { Profile } from "../../../types";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { FormLabel } from "../../ui/FormLabel";
import { FormCard } from "../../ui/FormCard";

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

      <FormCard title="Hero Section Content">
        <div className="flex flex-col gap-2">
          <FormLabel>Hero Title</FormLabel>
          <Input
            type="text"
            value={formData.hero_title}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormLabel>Hero Subtitle</FormLabel>
          <Input
            type="text"
            value={formData.hero_subtitle}
            onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <FormLabel>Hero Description</FormLabel>
          <Textarea
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            rows={3}
            required
          />
        </div>
      </FormCard>

      <FormCard title="Contact & Status Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <FormLabel>Availability Status</FormLabel>
            <Input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              placeholder="Open to work"
              required
            />
          </div>
        </div>
      </FormCard>

      <FormCard
        title="About Paragraphs"
        headerRight={
          <button
            type="button"
            onClick={addParagraph}
            className="text-[11px] text-accent hover:underline font-dm-mono cursor-pointer bg-transparent border-none outline-none"
          >
            + Add Paragraph
          </button>
        }
      >
        {formData.about_paragraphs.map((p, i) => (
          <div key={i} className="flex gap-4 items-start w-full">
            <span className="font-dm-mono text-[11px] text-text-muted mt-3">#{i + 1}</span>
            <div className="flex-1 flex flex-col gap-2">
              <Textarea
                value={p}
                onChange={(e) => handleParagraphChange(i, e.target.value)}
                rows={3}
                required
              />
            </div>
            <button
              type="button"
              onClick={() => removeParagraph(i)}
              className="p-2 border border-red-200 hover:bg-red-50 text-red-500 rounded-lg text-xs mt-1 transition-colors cursor-pointer bg-transparent outline-none"
            >
              🗑
            </button>
          </div>
        ))}
      </FormCard>

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

