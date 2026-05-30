"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStudent } from "@/context/student-context"
import {
  GraduationCap,
  Brain,
  FileText,
  Wallet,
  ArrowRight,
  Sparkles,
  Users,
  Globe,
  Award,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI College Recommendations",
    description: "Get personalized college matches based on your profile, budget, and academic credentials.",
  },
  {
    icon: FileText,
    title: "SOP Generator",
    description: "AI-powered Statement of Purpose generator tailored to your target universities.",
  },
  {
    icon: Sparkles,
    title: "Skill Gap Analysis",
    description: "Identify areas for improvement and get actionable suggestions to strengthen your profile.",
  },
  {
    icon: Wallet,
    title: "Loan Planning",
    description: "Compare loan options, calculate EMIs, and apply directly through our platform.",
  },
]

const stats = [
  { value: "50K+", label: "Students Guided" },
  { value: "500+", label: "Partner Universities" },
  { value: "95%", label: "Visa Success Rate" },
  { value: "$2B+", label: "Loans Facilitated" },
]

const testimonials = [
  {
    name: "Priya Sharma",
    university: "Stanford University",
    quote: "EduPilot AI helped me navigate the entire process. From college selection to loan approval, everything was seamless!",
    image: "PS",
  },
  {
    name: "Rahul Verma",
    university: "University of Toronto",
    quote: "The skill gap analysis was eye-opening. I improved my profile and got into my dream university!",
    image: "RV",
  },
  {
    name: "Ananya Patel",
    university: "Imperial College London",
    quote: "The loan comparison feature saved me so much time and money. Highly recommend!",
    image: "AP",
  },
]

export default function LandingPage() {
  const [goal, setGoal] = useState("")
  const router = useRouter()
  const { updateProfile } = useStudent()

  const handleStartJourney = () => {
    if (goal.trim()) {
      updateProfile({ goal: goal.trim() })
    }
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EduPilot AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Chat
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/colleges" className="text-muted-foreground hover:text-foreground transition-colors">
                Colleges
              </Link>
              <Link href="/loans" className="text-muted-foreground hover:text-foreground transition-colors">
                Loans
              </Link>
            </div>
            <Button asChild className="glow">
              <Link href="/chat">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">AI-Powered Study Abroad Platform</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Your AI Copilot for{" "}
            <span className="gradient-text">Study Abroad</span>
            {" "}& Education Loans
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            From exploration to application, we guide you through every step of your international education journey with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              placeholder="Enter your goal (e.g., MS in CS in USA)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="h-14 px-6 text-base bg-secondary/50 border-border"
              onKeyDown={(e) => e.key === "Enter" && handleStartJourney()}
            />
            <Button 
              onClick={handleStartJourney}
              className="h-14 px-8 text-base glow whitespace-nowrap"
            >
              Start Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Trusted by 50,000+ students worldwide
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Study Abroad
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform handles every aspect of your study abroad journey, from finding the perfect college to securing your education loan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl glass glass-hover cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      {feature.title}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Journey in 4 Simple Steps
            </h2>
            <p className="text-muted-foreground">
              From your first chat to your dream university admission
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Brain, title: "Exploration", desc: "Chat with AI to define your goals and preferences" },
              { step: "02", icon: Globe, title: "Preparation", desc: "Get skill gap analysis and improvement plan" },
              { step: "03", icon: FileText, title: "Application", desc: "Generate SOPs and apply to matched colleges" },
              { step: "04", icon: Wallet, title: "Financing", desc: "Compare loans and secure funding" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="p-6 rounded-xl glass h-full">
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground">
              Join thousands of students who achieved their dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-xl glass"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.university}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-2xl glass overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-accent/20 pointer-events-none" />
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students who have already achieved their study abroad dreams with EduPilot AI.
              </p>
              <Button asChild size="lg" className="glow">
                <Link href="/chat">
                  Start Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">EduPilot AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/chat" className="hover:text-foreground transition-colors">AI Chat</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/colleges" className="hover:text-foreground transition-colors">Colleges</Link>
              <Link href="/loans" className="hover:text-foreground transition-colors">Loans</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              2026 EduPilot AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
