"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useStudent } from "@/context/student-context"
import {
  GraduationCap,
  LayoutDashboard,
  Building2,
  TrendingUp,
  Calendar,
  Wallet,
  User,
  MessageSquare,
  Home,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/colleges", label: "Colleges", icon: Building2 },
  { href: "/skill-gap", label: "Skill Gap", icon: TrendingUp },
  { href: "/timeline", label: "Timeline", icon: Calendar },
  { href: "/loans", label: "Loans", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { profile, profileCompletion } = useStudent()

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">EduPilot AI</span>
        </Link>
      </div>

      {/* User Profile Summary */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {profile.name ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase() : "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{profile.name || "Complete your profile"}</p>
            <p className="text-xs text-muted-foreground truncate">
              {profile.degree || "No degree selected"}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Profile Complete</span>
            <span className="text-primary font-medium">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-1.5" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          href="/chat"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          AI Chat
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>
    </aside>
  )
}
