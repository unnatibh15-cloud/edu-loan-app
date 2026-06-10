"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudent } from "@/context/student-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, degrees } from "@/lib/mock-data";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  MapPin,
  GraduationCap,
  X,
  Plus,
  Compass,
  Heart
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

export default function HumanizedChatPage() {
  const router = useRouter();
  const { updateProfile } = useStudent();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [validationError, setValidationError] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    currentCountry: "Kanpur, India",
    targetCountry: "",
    degree: "",
    budget: "",
    cgpa: "",
    ielts: "",
    toefl: "",
    skills: [] as string[],
    experience: "",
    hasCollateral: null as boolean | null,
    goal: "",
  });

  const getActiveSkillsOptions = (): string[] => {
    const chosenDegree = formData.degree || "Master's in Computer Science";
    const matchedKey = Object.keys(dynamicProgramSkills).find(
      (key) => key.toLowerCase().trim() === chosenDegree.toLowerCase().trim()
    );
    return matchedKey ? dynamicProgramSkills[matchedKey] : dynamicProgramSkills["Master's in Computer Science"];
  };

  const validateStep = (): boolean => {
    setValidationError("");
    if (currentStep === 1 && !formData.name.trim()) {
      setValidationError("I'd love to know what to call you first! Please drop your name above.");
      return false;
    }
    if (currentStep === 2) {
      if (!formData.targetCountry) {
        setValidationError("Please select your dream destination region to pull matching data frameworks.");
        return false;
      }
      if (!formData.degree) {
        setValidationError("Select your target curriculum track so we can analyze program criteria.");
        return false;
      }
    }
    if (currentStep === 3) {
      const gpa = parseFloat(formData.cgpa);
      if (isNaN(gpa) || gpa < 0 || gpa > 10.0) {
        setValidationError("Let's input a valid academic CGPA score tracked on a 10.0 scale.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setValidationError("");
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return { ...prev, skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill] };
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, customSkill.trim()] }));
      setCustomSkill("");
    }
  };

  const handleFinishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    updateProfile({
      name: formData.name,
      currentCountry: formData.currentCountry,
      targetCountry: formData.targetCountry,
      degree: formData.degree,
      cgpa: parseFloat(formData.cgpa) || 0,
      ielts: parseFloat(formData.ielts) || 0,
      toefl: parseFloat(formData.toefl) || 0,
      skills: formData.skills,
      experience: parseInt(formData.experience) || 0,
      budget: parseInt(formData.budget) || 0,
      hasCollateral: formData.hasCollateral === true,
      goal: formData.goal,
    });

    router.push("/dashboard");
  };

  return (
    // 🎯 REFACTORED FOR WIDESCREEN: Remapped outer canvas bounds to remove centered bounding boxes
    <div className="w-full min-h-screen bg-[#FAF6F0] flex flex-col justify-between font-sans antialiased relative overflow-hidden select-none">
      
      {/* Decorative high-end ambient design sweeps */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#B85C38]/5 blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-stone-200/40 blur-3xl pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      {/* Structured full-width fluid header tracking box */}
      <div className="w-full max-w-7xl mx-auto px-6 py-6 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-orange-100/60 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-[#B85C38]" />
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest text-stone-400">
            Chapter {currentStep} of {totalSteps}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-[#B85C38]">
          {currentStep === 1 && "Aligning profile registry metrics origin"}
          {currentStep === 2 && "Mapping your ultimate university destination"}
          {currentStep === 3 && "Cataloging academic parameters performance records"}
          {currentStep === 4 && "Verifying specialized domain functional skills and scores"}
          {currentStep === 5 && "Reviewing your logged practical engineering history base"}
          {currentStep === 6 && "Balancing financial caps limits with path vision targets"}
        </span>
      </div>

      {/* Horizontal step indicator timeline bar directly under upper headers */}
      <div className="w-full h-1 bg-stone-200/60 relative z-10">
        <div className="h-full bg-[#B85C38] transition-all duration-500 ease-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
      </div>

      {/* 🚀 EXTENDED CONTENT CONTAINER: Stretches beautifully to clear maximum width borders */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:px-12 lg:py-16 flex flex-col justify-center relative z-10">
        <div className="max-w-3xl w-full mr-auto space-y-8">

          {/* STEP 1: IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">First things first—what should we call you?</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">Let's establish your secure personal workspace parameters. Where are you currently preparing from?</p>
              </div>
              <div className="space-y-4 pt-2 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Your Name</label>
                  <Input placeholder="e.g., Shrey Jain" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Current Operating Base Location</label>
                  <Input placeholder="e.g., Kanpur, India" value={formData.currentCountry} onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 shadow-xs" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GEOGRAPHY */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">Where is your dream program taking you?</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">Select your target study destination and curriculum blueprint below so I can pull active local visa metrics.</p>
              </div>
              <div className="space-y-6 pt-2">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B85C38]" /> Select Target Destination
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {countries.map((country) => (
                      <Button key={country} type="button" variant={formData.targetCountry === country ? "default" : "outline"} className={`text-xs h-10 px-5 rounded-xl font-bold transition-all shadow-xs ${formData.targetCountry === country ? "bg-[#B85C38] text-white hover:bg-[#9E4B2C]" : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"}`} onClick={() => setFormData({ ...formData, targetCountry: country })}>{country}</Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 max-w-xl">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#B85C38]" /> Intended Higher Curriculum Track
                  </label>
                  <div className="flex flex-col gap-2">
                    {degrees.map((deg) => (
                      <Button key={deg} type="button" variant={formData.degree === deg ? "default" : "outline"} className={`justify-start text-xs h-11 px-4 font-bold text-left truncate rounded-xl transition-all shadow-xs ${formData.degree === deg ? "bg-[#B85C38] text-white hover:bg-[#9E4B2C]" : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"}`} onClick={() => setFormData({ ...formData, degree: deg, skills: [] })}>{deg}</Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC LANDMARKS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">Let's catalog your academic performance history.</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">What is your current undergraduate aggregate CGPA index scale mark? Our matcher will use this to verify admission alignment parameters instantly.</p>
              </div>
              <div className="space-y-1.5 pt-2 max-w-xl">
                <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Your Local Indian CGPA (on a 10.0 scale)</label>
                <Input type="number" step="0.01" placeholder="e.g., 8.42" value={formData.cgpa} onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 font-mono shadow-xs" />
              </div>
            </div>
          )}

          {/* STEP 4: SKILLS REFRAME */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">Languages & functional field capabilities.</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">Select specialized strengths to establish your core profile. Leave language baselines at 0 if tests are still pending—completely normal!</p>
              </div>
              <div className="space-y-5 pt-2 w-full">
                <div className="space-y-1.5 max-w-xl">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">IELTS Overall Band Score (Put 0 if test is upcoming)</label>
                  <Input type="number" step="0.5" placeholder="e.g., 7.5" value={formData.ielts} onChange={(e) => setFormData({ ...formData, ielts: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 font-mono shadow-xs" />
                </div>
                <div className="space-y-3 w-full">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Core Strengths Checklist (Select what you know)</label>
                  <div className="flex flex-wrap gap-2 p-5 bg-white rounded-2xl border border-stone-200/80 min-h-[120px] shadow-xs">
                    {getActiveSkillsOptions().map((skill) => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <Button key={skill} type="button" variant={isSelected ? "default" : "outline"} className={`text-xs h-8 px-3.5 rounded-xl font-bold transition-all shadow-xs ${isSelected ? "bg-[#B85C38] text-white hover:bg-[#9E4B2C]" : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100"}`} onClick={() => handleSkillToggle(skill)}>{skill}{isSelected && <X className="w-3 h-3 ml-1.5 inline" />}</Button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2.5 items-center max-w-xl">
                  <Input placeholder="Type custom specialized skill tags..." value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} className="h-10 text-xs flex-1 rounded-xl border-stone-200 bg-white shadow-xs" />
                  <Button type="button" size="sm" onClick={handleAddCustomSkill} className="h-10 px-4 text-xs bg-stone-800 text-white hover:bg-stone-900 rounded-xl font-black shadow-xs"><Plus className="w-4 h-4 mr-1" /> Add Tag</Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: EXPERIENCE */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">Your practical operational background history.</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">How many years of relevant full-time employment or formal internship experience have you completed? (Put 0 if you are navigating straight from college—completely standard!).</p>
              </div>
              <div className="space-y-1.5 pt-2 max-w-xl">
                <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Years of Work/Internship History</label>
                <Input type="number" placeholder="e.g., 2" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 shadow-xs" />
              </div>
            </div>
          )}

          {/* STEP 6: REAPPRAISAL NUMBERS */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">Let's align your funding limit boundaries & goals.</h2>
                <p className="text-sm sm:text-base text-stone-500 font-semibold leading-relaxed">Provide your budget estimates so we can automatically evaluate and isolate customized public vs unsecured alternative financing channels.</p>
              </div>
              <div className="space-y-5 pt-2 w-full">
                <div className="space-y-1.5 max-w-xl">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">Target Overall Budget Comfort (In INR Lakhs)</label>
                  <Input type="number" placeholder="e.g., enter 40 for ₹ 40 Lakhs budget cap" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="h-12 rounded-xl border-stone-200 bg-white px-4 text-sm focus:border-stone-400 focus:ring-0 font-mono shadow-xs" />
                </div>
                <div className="p-6 bg-white rounded-2xl border border-stone-200/80 space-y-4 max-w-2xl shadow-xs">
                  <div className="space-y-1">
                    <label className="text-sm font-black text-stone-800 flex items-center gap-1.5"><Heart className="w-4 h-4 text-[#B85C38] fill-current" /> Does your family have an asset available for loan backing?</label>
                    <p className="text-xs text-stone-500 font-semibold leading-relaxed">Securing minimal interest rates across national public banks relies heavily on assets (like property or fixed deposits). If you do not have this, it is entirely fine—our model will map specialized unsecured NBFC paths instead!</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Button type="button" variant={formData.hasCollateral === true ? "default" : "outline"} className={`flex-1 text-xs h-11 rounded-xl font-bold transition-all shadow-xs ${formData.hasCollateral === true ? "bg-[#B85C38] text-white hover:bg-[#9E4B2C]" : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"}`} onClick={() => setFormData({ ...formData, hasCollateral: true })}>Yes, asset available</Button>
                    <Button type="button" variant={formData.hasCollateral === false ? "default" : "outline"} className={`flex-1 text-xs h-11 rounded-xl font-bold transition-all shadow-xs ${formData.hasCollateral === false ? "bg-[#B85C38] text-white hover:bg-[#9E4B2C]" : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"}`} onClick={() => setFormData({ ...formData, hasCollateral: false })}>No, match unsecured routes</Button>
                  </div>
                </div>
                <div className="space-y-1.5 max-w-2xl">
                  <label className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">In your own words, what is your ultimate post-degree vision?</label>
                  <Textarea rows={3} placeholder="e.g., I want to lead specialized software engineering tracks abroad or dive into technical cloud management architectures..." value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} className="rounded-xl border-stone-200 bg-white p-3.5 text-xs shadow-xs" />
                </div>
              </div>
            </div>
          )}

          {/* Validation Alert Box */}
          {validationError && (
            <div className="text-xs sm:text-sm text-amber-950 bg-orange-50 p-4 rounded-xl border border-orange-200 font-bold max-w-xl shadow-xs">
              ⚠️ {validationError}
            </div>
          )}

        </div>
      </main>

      {/* Full-width sticky alignment control action footer toolbar */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 lg:px-12 flex items-center justify-between border-t border-stone-200/60 relative z-10">
        <Button type="button" variant="ghost" size="sm" className={`text-xs font-bold text-stone-500 rounded-xl ${currentStep === 1 ? "opacity-0 pointer-events-none" : "hover:bg-stone-100"}`} onClick={handlePrev}>
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Previous Stage
        </Button>

        {currentStep < totalSteps ? (
          <Button type="button" size="sm" onClick={handleNext} className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold px-5 h-10 shadow-sm transition-all">
            Continue <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        ) : (
          <Button type="button" size="sm" className="bg-[#B85C38] hover:bg-[#9E4B2C] text-white rounded-xl text-xs font-bold px-6 h-10 shadow-sm transition-colors" onClick={handleFinishOnboarding}>
            Assemble Workspace Matrix <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        )}
      </footer>

    </div>
  );
}