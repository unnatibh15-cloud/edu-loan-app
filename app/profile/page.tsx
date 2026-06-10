"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "@/context/student-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, degrees } from "@/lib/mock-data";
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Languages, 
  Briefcase, 
  BadgeIndianRupee, 
  Edit3, 
  Check, 
  LayoutDashboard,
  X
} from "lucide-react";

const dynamicProgramSkills: Record<string, string[]> = {
  "Master's in Computer Science": ["Python", "Java", "Data Structures", "System Design", "SQL", "Cloud Computing", "JavaScript", "React", "Node.js"],
  "Master's in Data Science": ["Python", "R Programming", "SQL", "Data Analysis", "Tableau", "Statistics", "Machine Learning", "Pandas"],
  "Master's in Artificial Intelligence": ["Python", "PyTorch", "Machine Learning", "Deep Learning", "Data Analysis", "Mathematics", "Computer Vision", "NLP"],
  "Master's in Business Administration (MBA)": ["Financial Analysis", "Corporate Strategy", "Marketing Dynamics", "Leadership", "Excel", "Data Interpretation", "PowerBI"],
  "Master's in Engineering & Automation": ["MATLAB", "PLC Programming", "AutoCAD Electrical", "SCADA Systems", "Robotics Control", "Sensors", "Embedded Systems", "C++"],
  "Bachelor's in Computer Science": ["Python", "C++", "Java", "HTML/CSS", "JavaScript", "Data Structures", "SQL", "Git GitHub"],
  "Bachelor's in Engineering": ["Mathematics", "Physics", "MATLAB", "AutoCAD", "C++", "Circuit Analysis", "SolidWorks"]
};

export default function ProfileSummaryPage() {
  const router = useRouter();
  const { profile, updateProfile } = useStudent();
  const [isEditing, setIsEditing] = useState(false);

  // Local state mirrored to global student context properties
  const [formData, setFormData] = useState({
    name: profile?.name || "Student",
    currentCountry: profile?.currentCountry || "India",
    targetCountry: profile?.targetCountry || "Not Specified",
    degree: profile?.degree || "Not Specified",
    cgpa: profile?.cgpa || 0,
    ielts: profile?.ielts || 0,
    skills: profile?.skills || [],
    experience: profile?.experience || 0,
    budget: profile?.budget || 0,
    hasCollateral: profile?.hasCollateral ?? false,
    goal: profile?.goal || "",
  });

  const getActiveSkillsOptions = (): string[] => {
    const chosenDegree = formData.degree || "Master's in Computer Science";
    const matchedKey = Object.keys(dynamicProgramSkills).find(
      (key) => key.toLowerCase().trim() === chosenDegree.toLowerCase().trim()
    );
    return matchedKey ? dynamicProgramSkills[matchedKey] : dynamicProgramSkills["Master's in Computer Science"];
  };

  const handleSkillToggle = (skill: string) => {
    if (!isEditing) return;
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  const handleSaveAllChanges = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    // 🎨 Canvas Base: Nordic Studio Bone White
    <div className="min-h-screen bg-[#FBFBFA] text-[#111827] px-6 py-10 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Command Hub Header Card */}
        <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.005)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 shrink-0 shadow-inner">
              <User className="w-5 h-5 text-stone-600" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">Identity Ledger</span>
              <h1 className="text-xl font-black tracking-tight text-stone-900">{formData.name}'s Profile Hub</h1>
            </div>
          </div>
          
          {/* Controls: Using Minimalist Deep Olive tones */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {isEditing ? (
              <Button size="sm" onClick={handleSaveAllChanges} className="bg-[#374A3D] hover:bg-[#2B3A30] text-white text-xs h-9 rounded-xl shadow-xs transition-colors">
                <Check className="w-4 h-4 mr-1.5" /> Save Parameters
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="text-xs h-9 border-stone-200 hover:bg-stone-50 rounded-xl text-stone-700 font-semibold">
                <Edit3 className="w-3.5 h-3.5 mr-1.5 text-stone-400" /> Modify Metrics
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => router.push("/dashboard")} className="text-xs h-9 border-stone-200 hover:bg-stone-50 rounded-xl text-stone-700 font-semibold">
              <LayoutDashboard className="w-3.5 h-3.5 mr-1.5 text-stone-400" /> Dashboard
            </Button>
          </div>
        </div>

        {/* Profile Metrics Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">
          
          {/* CARD 1: TARGET COUNTRY GEOGRAPHY */}
          <div className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.003)] space-y-5">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-stone-400" /> Target Alignment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Target Destination Country</label>
                {isEditing ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {countries.map((c) => (
                      <Button
                        key={c}
                        type="button"
                        size="sm"
                        variant={formData.targetCountry === c ? "default" : "outline"}
                        className={`text-[10px] h-7 px-3 rounded-full font-semibold transition-all ${
                          formData.targetCountry === c 
                            ? "bg-[#374A3D] text-white hover:bg-[#2B3A30]" 
                            : "border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                        onClick={() => setFormData({ ...formData, targetCountry: c })}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-stone-800 pt-1">{formData.targetCountry}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Current Base Location</label>
                {isEditing ? (
                  <Input 
                    value={formData.currentCountry} 
                    onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                    className="h-9 text-xs mt-1.5 rounded-xl border-stone-200 bg-stone-50/40" 
                  />
                ) : (
                  <p className="text-sm font-medium text-stone-600 pt-1">{formData.currentCountry}</p>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: ACADEMICS */}
          <div className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.003)] space-y-5">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-stone-400" /> Academic Thresholds
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Intended Degree Program</label>
                {isEditing ? (
                  <div className="flex flex-col gap-1 mt-2">
                    {degrees.map((d) => (
                      <Button
                        key={d}
                        type="button"
                        variant={formData.degree === d ? "default" : "outline"}
                        className={`text-[10px] h-8 px-3 justify-start font-semibold rounded-xl truncate transition-all ${
                          formData.degree === d 
                            ? "bg-[#374A3D] text-white hover:bg-[#2B3A30]" 
                            : "border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                        onClick={() => setFormData({ ...formData, degree: d, skills: [] })}
                      >
                        {d}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-stone-800 pt-1 truncate">{formData.degree}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Aggregate Undergraduate CGPA</label>
                {isEditing ? (
                  <Input 
                    type="number" 
                    step="0.01"
                    value={formData.cgpa} 
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="h-9 text-xs mt-1.5 rounded-xl border-stone-200 bg-stone-50/40" 
                  />
                ) : (
                  <p className="text-sm font-mono font-bold text-[#374A3D] pt-1">{formData.cgpa.toFixed(2)} / 10.0</p>
                )}
              </div>
            </div>
          </div>

          {/* CARD 3: LANGUAGE COMPETENCIES & MATRIX CHIPS */}
          <div className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.003)] space-y-4 md:col-span-2">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <Languages className="w-4 h-4 text-stone-400" /> Languages & Domain Skills
            </h3>
            <div className="grid md:grid-cols-3 gap-6 pt-1">
              <div>
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">IELTS Score Baseline</label>
                {isEditing ? (
                  <Input 
                    type="number" 
                    step="0.5"
                    value={formData.ielts} 
                    onChange={(e) => setFormData({ ...formData, ielts: parseFloat(e.target.value) || 0 })}
                    className="h-9 text-xs mt-1.5 rounded-xl border-stone-200 bg-stone-50/40" 
                  />
                ) : (
                  <p className="text-sm font-bold text-stone-800 pt-1">{formData.ielts > 0 ? `${formData.ielts.toFixed(1)} Band` : "Not Taken Yet"}</p>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">MAPPED TECHNICAL STRENGTHS</label>
                <div className="flex flex-wrap gap-1.5 p-3.5 bg-stone-50/60 rounded-xl border border-stone-200/40 min-h-11">
                  {isEditing ? (
                    getActiveSkillsOptions().map((skill) => {
                      const active = formData.skills.includes(skill);
                      return (
                        <Button
                          key={skill}
                          type="button"
                          variant={active ? "default" : "outline"}
                          className={`text-[10px] h-6 px-2.5 rounded-full font-semibold transition-all ${
                            active 
                              ? "bg-[#374A3D] text-white hover:bg-[#2B3A30]" 
                              : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
                          }`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Button>
                      );
                    })
                  ) : formData.skills.length > 0 ? (
                    formData.skills.map((s) => (
                      <span key={s} className="text-[10px] bg-[#EBEFEF] border border-[#DEE5E5] text-[#2C3E33] font-mono font-bold px-2.5 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 italic font-medium pt-0.5">No skill tags mapped.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: BUDGETING & LOAN CLASSIFICATION STATUS */}
          <div className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.003)] space-y-4 md:col-span-2">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <BadgeIndianRupee className="w-4 h-4 text-stone-400" /> Budget Configuration
            </h3>
            <div className="grid md:grid-cols-2 gap-6 pt-1">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Overall Budget Limit</label>
                  {isEditing ? (
                    <Input 
                      type="number" 
                      value={formData.budget} 
                      onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                      className="h-9 text-xs mt-1.5 rounded-xl border-stone-200 bg-stone-50/40" 
                    />
                  ) : (
                    <p className="text-sm font-bold text-[#374A3D] pt-1">₹ {formData.budget} Lakhs</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-black text-stone-400 block uppercase tracking-wide">Structural Experience Base</label>
                  {isEditing ? (
                    <Input 
                      type="number" 
                      value={formData.experience} 
                      onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                      className="h-9 text-xs mt-1.5 rounded-xl border-stone-200 bg-stone-50/40" 
                    />
                  ) : (
                    <p className="text-sm font-medium text-stone-600 pt-1">{formData.experience} Years Logged History</p>
                  )}
                </div>
              </div>

              {/* Collateral Segment */}
              <div className="p-4 bg-stone-50 border border-stone-200/60 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <label className="text-xs font-bold block text-stone-800">Collateral Strategy Flag</label>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed font-medium">
                    Controls matching architectures across public bank secured parameters vs unsecured alternative routes.
                  </p>
                </div>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.hasCollateral === true ? "default" : "outline"}
                      className={`text-[10px] h-8 flex-1 font-semibold rounded-xl transition-all ${
                        formData.hasCollateral === true 
                          ? "bg-[#374A3D] text-white hover:bg-[#2B3A30]" 
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                      onClick={() => setFormData({ ...formData, hasCollateral: true })}
                    >
                      Collateral Available
                    </Button>
                    <Button
                      type="button"
                      variant={formData.hasCollateral === false ? "default" : "outline"}
                      className={`text-[10px] h-8 flex-1 font-semibold rounded-xl transition-all ${
                        formData.hasCollateral === false 
                          ? "bg-[#374A3D] text-white hover:bg-[#2B3A30]" 
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                      onClick={() => setFormData({ ...formData, hasCollateral: false })}
                    >
                      Unsecured Path
                    </Button>
                  </div>
                ) : (
                  <div className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-md border w-fit shadow-2xs ${
                    formData.hasCollateral 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/50' 
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>
                    {formData.hasCollateral ? "✓ SECURED ASSET BACKING ACTIVE" : "⚠ SEEKING UNSECURED FINANCIAL ENGINE"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 5: CAREER STRATEGY INTENT TEXT */}
          <div className="bg-white border border-stone-200/40 p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.003)] space-y-2 md:col-span-2">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-stone-400" /> Ambition Blueprint Target
            </h3>
            {isEditing ? (
              <Textarea 
                value={formData.goal} 
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="text-xs bg-stone-50/40 border-stone-200 rounded-xl mt-2 p-3 focus:ring-1 focus:ring-stone-400 transition-all"
                rows={3}
              />
            ) : (
              <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed pt-1 italic">
                &quot;{formData.goal || "No career intent vectors mapped yet."}&quot;
              </p>
            )}
          </div>

        </div>

        {/* Editorial Action Footer Strip */}
        <div className="text-center text-xs font-medium text-stone-400 pt-2 border-t border-stone-200/20">
          <span>Parameters locked. Run a project save to sync updates live to your global database tracking core.</span>
        </div>

      </div>
    </div>
  );
}