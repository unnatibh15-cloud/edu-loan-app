"use client"

import Link from "next/link"
import { useStudent } from "@/context/student-context"
import {
  Compass,
  FileText,
  BookOpen,
  ChevronRight,
  CalendarDays,
  ShieldCheck
} from "lucide-react"

export default function GalleryDashboard() {
  const { profile, profileCompletion } = useStudent()

  const workspaceSlates = [
    {
      title: "University Eligibility Matcher",
      description: profile.targetCountry 
        ? `Reviewing compatible institutions matching your choice of ${profile.targetCountry}.` 
        : "Explore tailored global university alignments based on your score portfolio.",
      statusLabel: profileCompletion === 100 ? "Verified" : "Action Required",
      actionCall: "Review Matches",
      bgClass: "bg-white border-stone-200", 
      accentLine: "bg-stone-800",
      icon: Compass,
      link: "/colleges"
    },
    {
      title: "Indian Banking Loan Pre-Appraisal",
      description: profile.budget 
        ? `Active track running for your requested financing parameter cap of ₹ ${profile.budget} Lakhs.` 
        : "Configure your overall tuition limits to map structural repayment terms dynamically.",
      statusLabel: profile.budget ? "Analysis Ready" : "Setup Incomplete",
      actionCall: "Simulate Repayments",
      bgClass: "bg-white border-stone-200", 
      accentLine: "bg-stone-400",
      icon: FileText,
      link: "/loans"
    },
    {
      title: "Profile Competency Audit",
      description: profile.cgpa 
        ? `Evaluating domain readiness metrics against your aggregate ${profile.cgpa.toFixed(2)}/10.0 scale.` 
        : "Audit your background structural skills against competitive international baseline targets.",
      statusLabel: "Growth Path Ready",
      actionCall: "View Bridge Gaps",
      bgClass: "bg-white border-stone-200", 
      accentLine: "bg-stone-300",
      icon: BookOpen,
      link: "/skill-gap"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#1E1B18] p-6 lg:p-10 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Verification System Header */}
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-stone-800" />
            <span className="text-xs font-semibold text-stone-600 tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> 
              Portfolio Track Status: Synced with Verification Engine
            </span>
          </div>
          
          <div className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 text-stone-700 font-medium text-xs px-3 py-1.5 rounded-xl shadow-xs">
            <CalendarDays className="w-3.5 h-3.5 text-stone-400" />
            <span>Intake Profile: Global Cycle</span>
          </div>
        </header>

        {/* Greeting Banner */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-stone-400 tracking-wider uppercase">Workspace Matrix</span>
          <h1 className="text-4xl font-black text-stone-900 tracking-tight capitalize">
            {profile.name?.toLowerCase() || "Fresh Workspace"}
          </h1>
        </div>

        {/* Action Slate Containers */}
        <div className="grid gap-5">
          {workspaceSlates.map((slate, idx) => (
            <Link href={slate.link} key={idx} className="block group transition-all duration-200 hover:-translate-y-0.5">
              <div className={`${slate.bgClass} p-6 lg:p-8 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden bg-white hover:border-stone-400 transition-colors`}>
                
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${slate.accentLine}`} />

                <div className="flex items-start gap-5 pl-2">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-stone-100 transition-colors">
                    <slate.icon className="w-5 h-5 text-stone-600" />
                  </div>
                  
                  <div className="space-y-1 max-w-xl">
                    <h3 className="font-bold text-lg tracking-tight text-stone-800 group-hover:text-stone-900 transition-colors">
                      {slate.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">
                      {slate.description}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-50 border border-stone-200 text-stone-600 px-2 py-0.5 rounded-md">
                        {slate.statusLabel}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-stone-50 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 border border-stone-200 px-4 py-2.5 rounded-xl transition-all self-end sm:self-auto shadow-xs shrink-0">
                  <span>{slate.actionCall}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-transform transform group-hover:translate-x-0.5" />
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Parameters Grid */}
        <div className="space-y-3 pt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 px-0.5">Verified Registry Log</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "CGPA Scale", val: profile.cgpa ? `${profile.cgpa.toFixed(2)} / 10.0` : "Pending Data", status: "Verified Base" },
              { label: "Language Test", val: profile.ielts ? `${profile.ielts.toFixed(1)} IELTS Band` : "Not Logged Yet", status: "Language Baseline" },
              { label: "Tuition Budget", val: profile.budget ? `₹ ${profile.budget} Lakhs` : "Unspecified", status: "Financial Capacity" }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between h-28 shadow-xs hover:border-stone-400 transition-all">
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">{stat.label}</span>
                  <span className="text-[9px] font-bold bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded-md text-stone-700">
                    {stat.status}
                  </span>
                </div>
                <p className="text-xl font-bold text-stone-800 tracking-tight text-left pb-1">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}