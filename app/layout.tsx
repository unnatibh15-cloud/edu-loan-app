"use client";

import { Inter, Geist_Mono } from 'next/font/google'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { StudentProvider, useStudent } from '@/context/student-context'
import { Progress } from "@/components/ui/progress"
import {
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Calendar,
  Coins,
  User,
  Sparkles
} from "lucide-react"
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

function getAdaptiveGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good morning ☀️";
  if (currentHour < 17) return "Good afternoon 🌤️";
  return "Working late tonight? 🌙";
}

function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { profile, profileCompletion } = useStudent()
  const pathname = usePathname()

  const hideSidebar = pathname === "/" || pathname === "/chat";

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Colleges", href: "/colleges", icon: GraduationCap },
    { name: "Skill Gap", href: "/skill-gap", icon: TrendingUp },
    { name: "Timeline", href: "/timeline", icon: Calendar },
    { name: "Loans", href: "/loans", icon: Coins },
    { name: "Profile Summary", href: "/profile", icon: User },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] flex text-[#111827] relative">
      
      {!hideSidebar && (
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-76 bg-white border-r border-stone-200/60 flex-col h-screen z-50 p-6 justify-between">
          
          <div className="space-y-6">
            {/* Logo Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="w-8 h-8 rounded-xl bg-[#374A3D] flex items-center justify-center shadow-sm">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-base text-stone-900">EduPilot AI</span>
            </div>

            {/* Personalized Welcome */}
            <div className="space-y-0.5 pl-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-stone-400 block">{getAdaptiveGreeting()}</span>
              <h2 className="text-base font-black text-stone-800 capitalize truncate max-w-[200px]">
                Hey, {profile?.name || "Student"}!
              </h2>
            </div>

            {/* Operational Completion Tracker */}
            <div className="space-y-1.5 bg-[#FBFBFA] p-3.5 rounded-2xl border border-stone-200/40">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-500">
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#374A3D]" /> Profile Integrity</span>
                <span className="text-[#374A3D] font-mono">{profileCompletion || 80}%</span>
              </div>
              <Progress value={profileCompletion || 80} className="h-1 bg-stone-200/60" style={{'--progress-background': '#374A3D'} as React.CSSProperties} />
            </div>

            {/* Navigation links stack matching deep Nordic accent tones */}
            <nav className="space-y-1 pt-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-[#374A3D] text-white shadow-sm" 
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Context Summary Meta Widget Footer */}
          <div className="p-4 bg-[#FBFBFA] rounded-2xl border border-stone-200/40 space-y-1 text-[11px] leading-relaxed text-stone-600 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
            <span className="font-bold text-stone-800 block">Current Focus Track:</span>
            <span className="block text-stone-500 truncate max-w-[190px]">🎯 {profile?.degree || "Master's in Data Science"}</span>
            <span className="block text-stone-500">✈️ Outbound to {profile?.targetCountry || "USA"}</span>
          </div>

        </aside>
      )}

      {/* Main Content Viewport Spacer component alignment */}
      <main className={`flex-1 min-h-screen bg-[#FBFBFA] w-full ${hideSidebar ? "lg:pl-0" : "lg:pl-76"}`}>
        {children}
      </main>

    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-[#FBFBFA] text-[#111827]`}>
        <StudentProvider>
          <GlobalLayoutWrapper>
            {children}
          </GlobalLayoutWrapper>
        </StudentProvider>
      </body>
    </html>
  )
}