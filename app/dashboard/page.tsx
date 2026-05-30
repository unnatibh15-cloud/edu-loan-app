"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useStudent } from "@/context/student-context"
import {
  colleges,
  calculateMatchScore,
  getCollegeCategory,
  getLoanEligibility,
} from "@/lib/mock-data"
import {
  Building2,
  TrendingUp,
  Wallet,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  GraduationCap,
  Globe,
  DollarSign,
  BookOpen,
} from "lucide-react"

export default function DashboardPage() {
  const { profile, profileCompletion } = useStudent()

  // Filter colleges by target country and calculate match scores
  const matchedColleges = colleges
    .filter((c) => !profile.targetCountry || c.country === profile.targetCountry)
    .map((college) => ({
      ...college,
      matchScore: calculateMatchScore(
        college,
        profile.cgpa || 3.0,
        profile.ielts || 6.5,
        profile.budget || 50000
      ),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)

  const dreamColleges = matchedColleges.filter((c) => getCollegeCategory(c.matchScore) === "dream")
  const moderateColleges = matchedColleges.filter((c) => getCollegeCategory(c.matchScore) === "moderate")
  const safeColleges = matchedColleges.filter((c) => getCollegeCategory(c.matchScore) === "safe")

  const loanEligibility = getLoanEligibility(profile.cgpa || 0)

  // Skill gap analysis
  const requiredSkills = ["Python", "Machine Learning", "Data Analysis", "SQL", "Communication"]
  const missingSkills = requiredSkills.filter(
    (skill) => !profile.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
  )

  // Quick stats
  const stats = [
    {
      label: "Target Country",
      value: profile.targetCountry || "Not set",
      icon: Globe,
      color: "text-chart-1",
    },
    {
      label: "Budget",
      value: profile.budget ? `$${(profile.budget / 1000).toFixed(0)}K` : "Not set",
      icon: DollarSign,
      color: "text-chart-2",
    },
    {
      label: "CGPA",
      value: profile.cgpa ? profile.cgpa.toFixed(2) : "Not set",
      icon: BookOpen,
      color: "text-chart-3",
    },
    {
      label: "IELTS",
      value: profile.ielts ? profile.ielts.toFixed(1) : "Not set",
      icon: GraduationCap,
      color: "text-chart-4",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Welcome back, {profile.name?.split(" ")[0] || "Student"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Here&apos;s your study abroad journey overview
              </p>
            </div>
            <Button asChild className="glow">
              <Link href="/chat">
                <Sparkles className="w-4 h-4 mr-2" />
                Talk to AI
              </Link>
            </Button>
          </div>

          {/* Profile Completion Banner */}
          {profileCompletion < 100 && (
            <Card className="glass border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Complete Your Profile</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Complete your profile to get personalized recommendations
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Progress value={profileCompletion} className="h-2 w-32" />
                        <span className="text-sm font-medium text-primary">{profileCompletion}%</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/chat">Continue Setup</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* College Recommendations */}
            <Card className="lg:col-span-2 glass">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  AI Recommended Colleges
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/colleges">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {matchedColleges.length > 0 ? (
                  <div className="space-y-3">
                    {matchedColleges.slice(0, 4).map((college) => {
                      const category = getCollegeCategory(college.matchScore)
                      return (
                        <div
                          key={college.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                              {college.logo}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{college.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {college.city}, {college.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge
                              variant={
                                category === "safe"
                                  ? "default"
                                  : category === "moderate"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                category === "safe"
                                  ? "bg-success text-success-foreground"
                                  : category === "moderate"
                                  ? "bg-warning text-warning-foreground"
                                  : ""
                              }
                            >
                              {category === "safe" ? "Safe" : category === "moderate" ? "Moderate" : "Dream"}
                            </Badge>
                            <span className="text-sm font-medium w-12 text-right">
                              {college.matchScore}%
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Complete your profile to see recommendations</p>
                  </div>
                )}

                {/* Category Summary */}
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-primary">{dreamColleges.length}</p>
                    <p className="text-xs text-muted-foreground">Dream</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-warning">{moderateColleges.length}</p>
                    <p className="text-xs text-muted-foreground">Moderate</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/30">
                    <p className="text-2xl font-bold text-success">{safeColleges.length}</p>
                    <p className="text-xs text-muted-foreground">Safe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Skill Gap Summary */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Skill Gap
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/skill-gap">Details</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {missingSkills.length > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          {missingSkills.length} skills to improve
                        </p>
                        <div className="space-y-2">
                          {missingSkills.slice(0, 3).map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2 text-sm"
                            >
                              <AlertCircle className="w-4 h-4 text-warning" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                        {missingSkills.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            +{missingSkills.length - 3} more
                          </p>
                        )}
                      </>
                    ) : profile.skills.length > 0 ? (
                      <div className="flex items-center gap-2 text-sm text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>All key skills covered!</span>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Add skills to your profile
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Eligibility */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Loan Status
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/loans">Apply</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          loanEligibility.status === "eligible"
                            ? "default"
                            : loanEligibility.status === "limited"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          loanEligibility.status === "eligible"
                            ? "bg-success text-success-foreground"
                            : loanEligibility.status === "limited"
                            ? "bg-warning text-warning-foreground"
                            : ""
                        }
                      >
                        {loanEligibility.status === "eligible"
                          ? "Eligible"
                          : loanEligibility.status === "limited"
                          ? "Limited"
                          : "Risky"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {loanEligibility.message}
                    </p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">Max Loan Amount</p>
                      <p className="text-lg font-bold">
                        ${(loanEligibility.maxAmount / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insight Card */}
              <Card className="glass border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">AI Insight</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {profile.ielts && profile.ielts < 7
                          ? "Improving your IELTS by 0.5 points could unlock 3 more dream universities!"
                          : profile.cgpa && profile.cgpa < 3.5
                          ? "A higher CGPA would significantly improve your loan options and college matches."
                          : "Your profile looks strong! Consider adding more technical skills to stand out."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
