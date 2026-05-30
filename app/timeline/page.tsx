"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStudent } from "@/context/student-context"
import {
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  GraduationCap,
  Plane,
  Wallet,
  BookOpen,
  Building2,
} from "lucide-react"

const timelineSteps = [
  {
    id: 1,
    title: "Profile Setup",
    description: "Complete your profile with academic and personal details",
    icon: GraduationCap,
    duration: "1-2 days",
    phase: "exploration",
  },
  {
    id: 2,
    title: "Take Language Tests",
    description: "Complete IELTS/TOEFL and other required exams",
    icon: BookOpen,
    duration: "2-3 months",
    phase: "preparation",
  },
  {
    id: 3,
    title: "Research Universities",
    description: "Explore and shortlist universities based on AI recommendations",
    icon: Building2,
    duration: "2-4 weeks",
    phase: "preparation",
  },
  {
    id: 4,
    title: "Prepare Documents",
    description: "Gather transcripts, LORs, SOP, and other documents",
    icon: FileText,
    duration: "4-6 weeks",
    phase: "application",
  },
  {
    id: 5,
    title: "Submit Applications",
    description: "Apply to shortlisted universities",
    icon: FileText,
    duration: "2-4 weeks",
    phase: "application",
  },
  {
    id: 6,
    title: "Secure Funding",
    description: "Apply for education loans and scholarships",
    icon: Wallet,
    duration: "4-8 weeks",
    phase: "loan",
  },
  {
    id: 7,
    title: "Visa Application",
    description: "Apply for student visa after receiving admission",
    icon: Plane,
    duration: "4-8 weeks",
    phase: "final",
  },
]

export default function TimelinePage() {
  const { profileCompletion, profile } = useStudent()

  const getStepStatus = (stepId: number) => {
    if (stepId === 1 && profileCompletion === 100) return "completed"
    if (stepId === 1 && profileCompletion > 0) return "in-progress"
    if (stepId === 2 && profile.ielts > 0) return "completed"
    return stepId === 1 ? "in-progress" : "upcoming"
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Your Timeline</h1>
            <p className="text-muted-foreground mt-1">
              Step-by-step guide to your study abroad journey
            </p>
          </div>

          {/* Phase Legend */}
          <div className="flex flex-wrap gap-3">
            {[
              { phase: "exploration", label: "Exploration", color: "bg-chart-1" },
              { phase: "preparation", label: "Preparation", color: "bg-chart-2" },
              { phase: "application", label: "Application", color: "bg-chart-3" },
              { phase: "loan", label: "Financing", color: "bg-chart-4" },
              { phase: "final", label: "Final Steps", color: "bg-chart-5" },
            ].map((item) => (
              <div key={item.phase} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {timelineSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                const phaseColors: Record<string, string> = {
                  exploration: "bg-chart-1",
                  preparation: "bg-chart-2",
                  application: "bg-chart-3",
                  loan: "bg-chart-4",
                  final: "bg-chart-5",
                }

                return (
                  <div key={step.id} className="relative flex gap-4">
                    {/* Timeline Node */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        status === "completed"
                          ? "bg-success text-success-foreground"
                          : status === "in-progress"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : status === "in-progress" ? (
                        <Clock className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </div>

                    {/* Content Card */}
                    <Card
                      className={`flex-1 glass ${
                        status === "in-progress" ? "border-primary/50" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{step.title}</h3>
                              <div
                                className={`w-2 h-2 rounded-full ${phaseColors[step.phase]}`}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge
                              variant={
                                status === "completed"
                                  ? "default"
                                  : status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                status === "completed"
                                  ? "bg-success text-success-foreground"
                                  : ""
                              }
                            >
                              {status === "completed"
                                ? "Completed"
                                : status === "in-progress"
                                ? "In Progress"
                                : "Upcoming"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {step.duration}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tips Card */}
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Timeline Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Start your application process at least 12-18 months before your intended intake
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Book your IELTS/TOEFL test 3-4 months in advance for preferred dates
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Apply to at least 8-10 universities across Dream, Moderate, and Safe categories
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Start your loan application as soon as you receive your first admit letter
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
