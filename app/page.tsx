"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStudent } from "@/context/student-context"
import {
  GraduationCap,
  FileText,
  Sparkles,
  BadgeIndianRupee,
  ArrowRight,
  MapPin,
  ChevronRight,
  Building,
} from "lucide-react"

const features = [
  {
    icon: Building,
    title: "Tailored University Matching",
    description: "Discover universities across the US, UK, Canada, and Europe that align perfectly with your exact Indian CGPA and budget constraints.",
  },
  {
    icon: FileText,
    title: "SOP & Document Blueprints",
    description: "Generate structured drafts for your Statement of Purpose (SOP) built around your real academic and internship history.",
  },
  {
    icon: Sparkles,
    title: "Indian Profile Optimizer",
    description: "Identify key gaps in your skills or test scores and get localized guidance to make your global application competitive.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Education Loan Planning",
    description: "Compare collateral and non-collateral loan options from major Indian public banks, private banks, and NBFCs.",
  },
]

const stats = [
  { value: "100%", label: "Built for Indian Applicants" },
  { value: "500+", label: "Global Universities Tracked" },
  { value: "₹ Lakhs", label: "Local Budget Planning" },
  { value: "1-on-1", label: "Structured Roadmap" },
]

export default function LandingPage() {
  const [goal, setGoal] = useState("")
  const router = useRouter()
  const { updateProfile } = useStudent()

  const handleStartJourney = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (goal.trim()) {
      updateProfile({ goal: goal.trim() })
    }
    router.push("/chat")
  }

  return (
    // 🎨 Canvas Base: Soft Warm Grey/Cream background from edited-image.jpg
    <div className="min-h-screen bg-[#F4F4F3] text-[#1A1A1A] font-sans antialiased selection:bg-[#E3F2E9] relative overflow-hidden">
      
      {/* 🟢 TOP SECTION: Fluid, Organic Mint Blob Banner extending behind Hero */}
      <div className="absolute top-0 left-0 right-0 h-[720px] bg-[#E3F2E9] rounded-b-[60px] md:rounded-b-[100px] z-0 pointer-events-none transition-all">
        {/* Large Decorative Sparkle Star Elements from edited-image.jpg */}
        <svg className="absolute top-28 right-[10%] w-24 h-24 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
        </svg>
        <svg className="absolute bottom-16 left-[8%] w-16 h-16 text-white opacity-60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
        </svg>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 border-b border-stone-200/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1A1A1A] flex items-center justify-center shadow-xs">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-[#1A1A1A]">EduPilot</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/chat" className="text-xs font-bold text-stone-500 hover:text-[#1A1A1A] transition-colors">
                Profile Builder
              </Link>
              <Link href="/dashboard" className="text-xs font-bold text-stone-500 hover:text-[#1A1A1A] transition-colors">
                Dashboard
              </Link>
              <Link href="/colleges" className="text-xs font-bold text-stone-500 hover:text-[#1A1A1A] transition-colors">
                Universities
              </Link>
              <Link href="/loans" className="text-xs font-bold text-stone-500 hover:text-[#1A1A1A] transition-colors">
                Loan Navigator
              </Link>
            </div>

            {/* High-Contrast Pill Action Button */}
            <Button onClick={() => router.push("/chat")} className="relative z-50 text-xs font-bold bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white rounded-2xl h-10 px-4 shadow-sm">
              Plan Your Degree
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200/60 rounded-full text-[10px] font-black uppercase tracking-wider text-stone-500 shadow-xs mx-auto">
            <MapPin className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Dedicated Study Abroad Navigator for Indian Students</span>
          </div>
          
          {/* Bold, heavy rounded typography style */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A1A1A] leading-[1.1] max-w-3xl mx-auto">
            Simplify Your Journey from <br />
            <span className="text-[#2B3E34] bg-white/40 px-4 py-1 rounded-2xl inline-block mt-2">India to a Global Campus</span>
          </h1>
          
          <p className="text-sm sm:text-base font-semibold text-stone-600 max-w-xl mx-auto leading-relaxed">
            Build a highly competitive profile, pinpoint academic requirements, and compare localized Indian financial avenues effortlessly.
          </p>

          {/* Minimalist Bold Sparkle Star Centerpiece */}
          <div className="flex justify-center py-2 animate-pulse duration-[4000ms]">
            <svg className="w-16 h-16 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
            </svg>
          </div>

          {/* High-Contrast Dynamic Form Pill Wrapper */}
          <form onSubmit={handleStartJourney} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2 relative z-20">
            <Input
              placeholder="e.g., MS in Computer Science in Germany"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="h-14 px-5 text-xs bg-white border-stone-200/80 rounded-2xl shadow-sm focus-visible:ring-stone-400"
            />
            <Button 
              type="submit"
              className="h-14 px-6 text-xs font-bold bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white rounded-2xl shadow-sm shrink-0 cursor-pointer tracking-wide flex items-center justify-center gap-1"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Screen Pagination Pill Dots Decorator */}
          <div className="flex items-center gap-1.5 justify-center pt-4">
            <div className="w-5 h-2 rounded-full bg-[#1A1A1A]" />
            <div className="w-2 h-2 rounded-full bg-stone-300" />
            <div className="w-2 h-2 rounded-full bg-stone-300" />
          </div>

        </div>
      </section>

      {/* Localized Focus Stats */}
      <section className="py-12 px-4 bg-white border-y border-stone-200/40 relative z-10 shadow-xs">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-5 bg-[#FBFBFA] border border-stone-200/40 rounded-3xl">
                <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structural Features */}
      <section className="py-24 px-4 relative z-10 bg-[#FBFBFA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">
              Everything Needed to Transition Abroad
            </h2>
            <p className="text-stone-500 font-medium text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              We translate confusing international processes into clear, measurable steps right from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-[28px] border border-stone-200/60 bg-white hover:border-stone-400 transition-all duration-200 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-stone-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold flex items-center gap-1.5 text-stone-800 group-hover:text-[#374A3D] transition-colors">
                      {feature.title}
                      <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium UI Simple Footer */}
      <footer className="py-10 px-4 bg-white border-t border-stone-200/40 text-xs text-stone-400 font-medium relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-black text-[#1A1A1A] text-sm">EduPilot</div>
          <div className="flex gap-5 text-[11px] font-bold">
            <Link href="/chat" className="hover:text-[#1A1A1A] transition-colors">Profile Builder</Link>
            <Link href="/dashboard" className="hover:text-[#1A1A1A] transition-colors">Dashboard</Link>
            <Link href="/colleges" className="hover:text-[#1A1A1A] transition-colors">Universities</Link>
            <Link href="/loans" className="hover:text-[#1A1A1A] transition-colors">Loan Navigator</Link>
          </div>
          <div className="text-[11px] text-stone-400">© 2026 EduPilot. Tailored for Indian students.</div>
        </div>
      </footer>
    </div>
  )
}