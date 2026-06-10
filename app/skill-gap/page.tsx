"use client";

import { useStudent } from "@/context/student-context";
import { CheckCircle2, AlertTriangle, BookOpen, ArrowUpRight, Award, BadgeIndianRupee, Sparkles } from "lucide-react";

const skillGapDataByDegree: Record<string, {
  capabilities: string[];
  deficits: string[];
  courses: { title: string; provider: string; type: string; url: string }[];
}> = {
  "Master's in Computer Science": {
    capabilities: ["Core Data Structures", "Object-Oriented Programming", "Basic Frontend Engineering (HTML/CSS)", "SQL Database Fundamentals"],
    deficits: ["Advanced System Architecture", "Cloud Deployments (AWS/GCP Cluster Engineering)", "Enterprise Full-Stack Frameworks (MERN/Next.js)", "Algorithmic Optimization & Complexity Bounds"],
    courses: [
      { title: "MIT OpenCourseWare: Distributed Systems Architecture", provider: "MIT", type: "FREE COURSE", url: "https://ocw.mit.edu/courses/6-824-distributed-computer-systems-engineering-spring-2015/" },
      { title: "AWS Cloud Practitioner Certification Track", provider: "AMAZON WEB SERVICES", type: "PROFESSIONAL BADGE", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
      { title: "Advanced Full-Stack Engineering Blueprint", provider: "META/COURSERA", type: "SPECIALIZATION", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" }
    ]
  },
  "Master's in Data Science": {
    capabilities: ["Core Python Programming", "SQL Database Fundamentals", "Basic Excel Analytics", "Data Interpretation"],
    deficits: ["Advanced Statistical Modeling", "Big Data Pipelines (Spark/Hadoop Architecture)", "Machine Learning Deployment (MLOps)", "Interactive Dashboard Engineering (Tableau/PowerBI)"],
    courses: [
      { title: "Harvard: Introduction to Data Science with Python", provider: "HARVARD UNIVERSITY", type: "FREE COURSE", url: "https://pll.harvard.edu/course/introduction-data-science-python" },
      { title: "IBM Data Engineering Professional Certificate", provider: "IBM/COURSERA", type: "SPECIALIZATION", url: "https://www.coursera.org/professional-certificates/ibm-data-engineer" },
      { title: "Data Visualization & Analytics Mastery", provider: "UC DAVIS", type: "CERTIFICATION", url: "https://www.coursera.org/specializations/data-visualization" }
    ]
  },
  "Master's in Artificial Intelligence": {
    capabilities: ["Python Fundamentals", "Linear Algebra Foundations", "Calculus & Probability Base", "Basic Data Analysis"],
    deficits: ["Deep Learning Framework Integration (PyTorch)", "Computer Vision Pipeline Design", "Natural Language Processing (NLP)", "Reinforcement Learning & Vector Systems"],
    courses: [
      { title: "Deep Learning Specialization", provider: "DEEPLEARNING.AI / ANDREW NG", type: "SPECIALIZATION", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/" },
      { title: "Stanford CS224N: Natural Language Processing with Deep Learning", provider: "STANFORD UNIVERSITY", type: "FREE COURSE", url: "https://web.stanford.edu/class/cs224n/" },
      { title: "PyTorch Ultimate Production Engineering Track", provider: "META AI", type: "PROFESSIONAL BADGE", url: "https://www.coursera.org/professional-certificates/meta-database-engineer" }
    ]
  },
  "Master's in Business Administration (MBA)": {
    capabilities: ["Basic Leadership Concepts", "Public Speaking", "Microsoft Office Essentials", "Foundational Team Dynamics"],
    deficits: ["Corporate Strategy Formulation", "Advanced Financial Modeling", "Data-Driven Marketing Analytics", "Enterprise Resource Planning (ERP/SAP Systems)"],
    courses: [
      { title: "Wharton: Business Foundations Specialization", provider: "UNIVERSITY OF PENNSYLVANIA", type: "SPECIALIZATION", url: "https://online.wharton.upenn.edu/business-foundations/" },
      { title: "Financial Modeling & Valuation Analyst (FMVA)", provider: "CFI", type: "PROFESSIONAL CERTIFICATE" , url: "https://corporatefinanceinstitute.com/certifications/financial-modeling-valuation-analyst-fmva/"},
      { title: "Strategic Management & Corporate Dynamics", provider: "COPENHAGEN BUSINESS SCHOOL", type: "FREE COURSE", url: "https://www.coursera.org/learn/strategic-management" }
    ]
  },
  "Master's in Engineering & Automation": {
    capabilities: ["Foundational Physics", "Circuit Theory Basics", "C++ Fundamentals", "Engineering Drawing Concepts"],
    deficits: ["Industrial PLC/SCADA Systems Architecture", "Advanced AutoCAD Electrical Drafting", "Robotics Kinematics & Control", "Embedded Systems Circuit Design"],
    courses: [
      { title: "Mechatronics & Industrial Automation Systems", provider: "GEORGIA TECH", type: "FREE COURSE", url: "https://pe.gatech.edu/degrees/mechanical-engineering" },
      { title: "Complete PLC & SCADA Engineering Blueprint", provider: "SIEMENS TRAINING ACADEMY", type: "PROFESSIONAL CERTIFICATE", url: "https://www.sitrain-learning.siemens.com/" },
      { title: "Robotics Foundations: Kinematics & Control Models", provider: "PENNSYLVANIA UNIVERSITY", type: "SPECIALIZATION", url: "https://www.coursera.org/specializations/robotics" }
    ]
  },
  "Bachelor's in Computer Science": {
    capabilities: ["Basic High School Mathematics", "Logic Formulation", "Computer Literacy Fundamentals"],
    deficits: ["Data Structures & Algorithm Optimization", "Object-Oriented Programming Foundations", "Git/GitHub Version Control Essentials", "Web Architecture Basics (HTML/CSS/JS)"],
    courses: [
      { title: "Princeton: Computer Science - An Interdisciplinary Approach", provider: "PRINCETON UNIVERSITY", type: "FREE COURSE", url: "https://online.princeton.edu/computer-science-an-interdisciplinary-approach" },
      { title: "Data Structures and Algorithms Specialization", provider: "UC SAN DIEGO", type: "SPECIALIZATION", url: "https://www.coursera.org/specializations/data-structures-algorithms" },
      { title: "The Complete Git & GitHub Engineering Guide", provider: "GOOGLE CAREER CERTIFICATES", type: "PROFESSIONAL BADGE", url: "https://www.coursera.org/learn/introduction-git-github" }
    ]
  },
  "Bachelor's in Engineering": {
    capabilities: ["Advanced High School Physics", "Mathematical Calculus Grounding", "Basic Machine Shop Literacy"],
    deficits: ["Computer-Aided Engineering Design (AutoCAD/SolidWorks)", "Introduction to MATLAB Computing Environment", "Basic Electronics & Semiconductor Layouts", "Applied Mechanics Engineering Systems"],
    courses: [
      { title: "Introduction to Engineering Mechanics", provider: "GEORGIA TECH", type: "FREE COURSE", url: "https://www.coursera.org/learn/engineering-mechanics-1" },
      { title: "AutoCAD & SolidWorks Engineering CAD Specialization", provider: "AUTODESK", type: "PROFESSIONAL CERTIFICATE", url: "https://www.coursera.org/professional-certificates/autodesk-cad-cam-cae-mechanical-engineering" },
      { title: "MATLAB Programming Core Track for Engineers", provider: "VANDERBILT UNIVERSITY", type: "SPECIALIZATION", url: "https://www.coursera.org/learn/matlab" }
    ]
  }
};

export default function SkillGapPage() {
  const { profile } = useStudent();
  const chosenDegree = profile?.degree || "Master's in Computer Science";

  const matchedKey = Object.keys(skillGapDataByDegree).find(
    (key) => key.toLowerCase().trim() === chosenDegree.toLowerCase().trim()
  );

  const currentData = matchedKey 
    ? skillGapDataByDegree[matchedKey] 
    : skillGapDataByDegree["Master's in Computer Science"];

  return (
    // 🎨 rich Warm Alabaster Canvas Background
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1B18] p-6 lg:p-10 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Soft, Personalized Welcome Context Banner */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#C87A53] tracking-wider uppercase">Curriculum Bridge Matrix</span>
          <h1 className="text-3xl font-black text-[#1E1B18] tracking-tight">Academic Skill Alignment</h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium leading-relaxed">
            Structuring educational development vectors back to competitive admissions cutoffs.
          </p>
        </div>

        {/* 🎯 TOP PARAMETERS STRIP - Infused with Soft Sage, Terracotta, and warm linen backings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-stone-200/60 p-5 rounded-2xl shadow-[0_2px_12px_rgba(200,122,83,0.02)] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#C87A53] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Academic CGPA</span>
              <span className="text-sm font-black text-stone-800">{profile?.cgpa ? `${profile.cgpa.toFixed(2)} / 10.0` : "Not Added"}</span>
            </div>
          </div>

          <div className="bg-white border border-stone-200/60 p-5 rounded-2xl shadow-[0_2px_12px_rgba(200,122,83,0.02)] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#6B8E7B] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Language Measure</span>
              <span className="text-sm font-black text-stone-800">{profile?.ielts ? `${profile.ielts.toFixed(1)} IELTS Band` : "Pending Target"}</span>
            </div>
          </div>

          <div className="bg-white border border-stone-200/60 p-5 rounded-2xl shadow-[0_2px_12px_rgba(200,122,83,0.02)] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-100/60 flex items-center justify-center text-stone-600 shrink-0">
              <BadgeIndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Tuition Budget</span>
              <span className="text-sm font-black text-stone-800">{profile?.budget ? `₹ ${profile.budget} Lakhs Max` : "Unspecified"}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: VERIFIED METRICS VS GROWTH STONES */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left Block - Muted Moss Sage Tone */}
          <div className="bg-white border border-stone-200/60 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B8E7B]" /> Verified Strengths Verified
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed font-medium">Core competencies fully recorded inside your background registry profile.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {currentData.capabilities.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7F5] text-[#4A6455] rounded-full text-xs font-semibold border border-[#E2EAE5]">
                  ✓ {skill}
                </span>
              ))}
              {profile?.skills && profile.skills.map((customSkill: string) => (
                !currentData.capabilities.includes(customSkill) && (
                  <span key={customSkill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7F5] text-[#4A6455] rounded-full text-xs font-semibold border border-[#E2EAE5]">
                    ✓ {customSkill}
                  </span>
                )
              ))}
            </div>
          </div>

          {/* Right Block - Earth Terracotta Tint */}
          <div className="bg-white border border-stone-200/60 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-4">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C87A53]" /> Target Growth Benchmarks
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed font-medium">Target syllabus modules highly requested across international institutions.</p>
            <div className="flex flex-col gap-2 pt-1">
              {currentData.deficits.map((deficit) => {
                const userKnowsIt = profile?.skills?.some((s: string) => s.toLowerCase().trim() === deficit.toLowerCase().trim());
                if (userKnowsIt) return null;

                return (
                  <div key={deficit} className="flex items-center gap-2.5 px-3.5 py-3 bg-[#FCFAF7] text-[#7A4E38] rounded-xl text-xs font-semibold border border-[#F4EDE2] transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C87A53] shrink-0" />
                    <span>Bridge Component: {deficit}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: REPOSITORIES WITH RICH CARAMEL-TERRACOTTA INTERACTIVE RESPONSES */}
        <div className="bg-white border border-stone-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] divide-y divide-stone-100 overflow-hidden">
          <div className="p-5 bg-stone-50/80 flex items-center gap-2 border-b border-stone-100">
            <BookOpen className="w-4 h-4 text-[#C87A53]" />
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Tailored Curriculums & Mitigation Repositories
            </h2>
          </div>

          <div className="flex flex-col">
            {currentData.courses.map((course) => (
              <a 
                key={course.title} 
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 flex items-center justify-between hover:bg-[#FDFDFD] transition-colors group cursor-pointer"
              >
                <div className="space-y-1.5 pr-4">
                  <h3 className="font-bold text-sm sm:text-base text-stone-800 group-hover:text-[#C87A53] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-stone-400">
                    <span className="text-stone-500">{course.provider}</span>
                    <span>•</span>
                    <span className="text-[#C87A53] bg-orange-50/70 px-2 py-0.5 rounded-md text-[10px] tracking-wide uppercase font-extrabold border border-orange-100/40">
                      {course.type}
                    </span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200/60 flex items-center justify-center text-stone-400 group-hover:bg-[#C87A53] group-hover:border-[#C87A53] group-hover:text-white transition-all shadow-sm shrink-0 transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Editorial Action Footer Strip */}
        <div className="text-center text-xs font-medium text-stone-400 pt-2 border-t border-stone-200/20">
          <span>Ready to review financing terms? Dive into your live <strong>Repayment Appraisal Matrix</strong> next.</span>
        </div>

      </div>
    </div>
  );
}