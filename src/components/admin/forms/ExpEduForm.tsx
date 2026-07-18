import { useState, useEffect } from "react";
import type { Experience, Education } from "../../../types";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { FormLabel } from "../../ui/FormLabel";
import { FormCard } from "../../ui/FormCard";
import { Trash2 } from "lucide-react";

interface ExpEduFormProps {
  experience: Experience[];
  education: Education[];
  onSaveExp: (exp: Experience[]) => Promise<boolean>;
  onSaveEdu: (edu: Education[]) => Promise<boolean>;
  showToast: (m: string) => void;
  saving: boolean;
}

export const ExpEduForm = ({ experience, education, onSaveExp, onSaveEdu, showToast, saving }: ExpEduFormProps) => {
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
  const handleExpChange = (idx: number, field: keyof Experience, val: string | string[] | number) => {
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
    <div className="flex flex-col gap-12 w-full">
      {/* EXPERIENCE SECTION */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between items-start flex-wrap gap-4 w-full">
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

        <div className="flex flex-col gap-6 w-full">
          {expList.map((exp, expIdx) => (
            <FormCard
              key={exp.id || expIdx}
              className="gap-4"
              title={`JOB POSITION #${expIdx + 1}`}
              headerRight={
                <button
                  type="button"
                  onClick={() => removeExp(expIdx)}
                  className="text-red-500 hover:underline text-[10px] font-dm-mono cursor-pointer bg-transparent border-none outline-none flex items-center gap-1"
                >
                  Delete Job <Trash2 size={11} />
                </button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Role Title</FormLabel>
                  <Input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleExpChange(expIdx, "title", e.target.value)}
                    placeholder="e.g. Full Time Intern"
                    inputSize="sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Company / Employer</FormLabel>
                  <Input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExpChange(expIdx, "company", e.target.value)}
                    placeholder="e.g. Syzy Technologies"
                    inputSize="sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Project Name (Optional)</FormLabel>
                  <Input
                    type="text"
                    value={exp.project_name}
                    onChange={(e) => handleExpChange(expIdx, "project_name", e.target.value)}
                    placeholder="e.g. FlowFlux CRM"
                    inputSize="sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Timeline Period</FormLabel>
                  <Input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleExpChange(expIdx, "period", e.target.value)}
                    placeholder="e.g. Jan 2026 – Present"
                    inputSize="sm"
                    required
                  />
                </div>
              </div>

              {/* Points */}
              <div className="flex flex-col gap-3 mt-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <FormLabel className="text-[10px]">Job Accomplishments</FormLabel>
                  <button
                    type="button"
                    onClick={() => addExpArrayItem(expIdx, "points")}
                    className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer bg-transparent border-none outline-none"
                  >
                    + Add Point
                  </button>
                </div>
                {exp.points.map((pt, ptIdx) => (
                  <div key={ptIdx} className="flex gap-2 items-start w-full">
                    <Textarea
                      value={pt}
                      onChange={(e) => handleExpArrayChange(expIdx, "points", ptIdx, e.target.value)}
                      variant="nested"
                      inputSize="sm"
                      className="flex-1"
                      rows={2}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeExpArrayItem(expIdx, "points", ptIdx)}
                      className="text-red-400 hover:bg-red-50 p-2 rounded-lg text-xs cursor-pointer mt-1 bg-transparent border-none outline-none"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3 mt-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <FormLabel className="text-[10px]">Technologies Used</FormLabel>
                  <button
                    type="button"
                    onClick={() => addExpArrayItem(expIdx, "tags")}
                    className="text-[10px] text-accent hover:underline font-dm-mono cursor-pointer bg-transparent border-none outline-none"
                  >
                    + Add Tech Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  {exp.tags.map((tag, tagIdx) => (
                    <div key={tagIdx} className="flex gap-1 items-center bg-[#faf8f5] border border-[#f0ddc8] rounded-lg px-2 py-1">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleExpArrayChange(expIdx, "tags", tagIdx, e.target.value)}
                        className="px-1 py-0.5 border-none bg-transparent text-[11px] outline-none w-20 text-text-dark"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeExpArrayItem(expIdx, "tags", tagIdx)}
                        className="text-red-400 font-bold text-[10px] hover:text-red-600 cursor-pointer bg-transparent border-none outline-none"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FormCard>
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
      <div className="flex flex-col gap-6 pt-8 border-t border-[#f0ddc8] w-full">
        <div className="flex justify-between items-start flex-wrap gap-4 w-full">
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

        <div className="flex flex-col gap-4 w-full">
          {eduList.map((edu, eduIdx) => (
            <FormCard
              key={edu.id || eduIdx}
              title={`SCHOOL ITEM #${eduIdx + 1}`}
              headerRight={
                <button
                  type="button"
                  onClick={() => removeEdu(eduIdx)}
                  className="text-red-500 hover:underline text-[10px] font-dm-mono cursor-pointer bg-transparent border-none outline-none flex items-center gap-1"
                >
                  Delete Item <Trash2 size={11} />
                </button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Degree / Qualification</FormLabel>
                  <Input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(eduIdx, "degree", e.target.value)}
                    placeholder="e.g. B.E. Computer Science"
                    inputSize="sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Institution & Location</FormLabel>
                  <Input
                    type="text"
                    value={edu.place}
                    onChange={(e) => handleEduChange(eduIdx, "place", e.target.value)}
                    placeholder="e.g. Sona College of Technology, Salem"
                    inputSize="sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Year / Timeline</FormLabel>
                  <Input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleEduChange(eduIdx, "year", e.target.value)}
                    placeholder="e.g. 2026"
                    inputSize="sm"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormLabel className="text-[10px]">Score / Grade</FormLabel>
                  <Input
                    type="text"
                    value={edu.score}
                    onChange={(e) => handleEduChange(eduIdx, "score", e.target.value)}
                    placeholder="e.g. CGPA: 7.98/10 or 90.5%"
                    inputSize="sm"
                    required
                  />
                </div>
              </div>
            </FormCard>
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
