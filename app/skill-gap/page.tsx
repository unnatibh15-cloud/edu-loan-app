"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useStudent } from "@/context/student-context"
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  BookOpen,
  Briefcase,
  Award,
  Target,
  ArrowRight,
  Lightbulb,
  Star,
} from "lucide-react"

interface SkillRequirement {
  name: string
  category: "technical" | "academic" | "experience" | "language"
  importance: "critical" | "important" | "nice-to-have"
  description: string
}

const idealRequirements: SkillRequirement[] = [
  { name: "Python", category: "technical", importance: "critical", description: "Core programming language for data science and ML" },
  { name: "Machine Learning", category: "technical", importance: "critical", description: "Foundation for AI-related programs" },
  { name: "Data Analysis", category: "technical", importance: "critical", description: "Essential for extracting insights from data" },
  { name: "SQL", category: "technical", importance: "important", description: "Database querying and management" },
  { name: "Cloud Computing", category: "technical", importance: "important", description: "AWS, GCP, or Azure experience" },
  { name: "Communication", category: "technical", importance: "important", description: "Written and verbal communication skills" },
  { name: "Research", category: "experience", importance: "nice-to-have", description: "Academic or industry research experience" },
  { name: "Leadership", category: "experience", importance: "nice-to-have", description: "Team lead or project management experience" },
]

const academicBenchmarks = {
  cgpa: { excellent: 3.8, good: 3.5, minimum: 3.0 },
  ielts: { excellent: 7.5, good: 7.0, minimum: 6.5 },
  experience: { excellent: 3, good: 2, minimum: 1 },
}

export default function SkillGapPage() {
  const { profile } = useStudent()

  const userSkillsLower = profile.skills.map((s) => s.toLowerCase())

  const getSkillStatus = (skill: SkillRequirement) => {
    const hasSkill = userSkillsLower.includes(skill.name.toLowerCase())
    if (hasSkill) return "met"
    if (skill.importance === "critical") return "critical-gap"
    if (skill.importance === "important") return "gap"
    return "optional"
  }

  const skillsAnalysis = idealRequirements.map((skill) => ({
    ...skill,
    status: getSkillStatus(skill),
  }))

  const metSkills = skillsAnalysis.filter((s) => s.status === "met")
  const criticalGaps = skillsAnalysis.filter((s) => s.status === "critical-gap")
  const gaps = skillsAnalysis.filter((s) => s.status === "gap")
  const optional = skillsAnalysis.filter((s) => s.status === "optional")

  // Calculate scores
  const getAcademicScore = (value: number, benchmarks: typeof academicBenchmarks.cgpa) => {
    if (value >= benchmarks.excellent) return { score: 100, label: "Excellent", color: "text-success" }
    if (value >= benchmarks.good) return { score: 75, label: "Good", color: "text-primary" }
    if (value >= benchmarks.minimum) return { score: 50, label: "Acceptable", color: "text-warning" }
    return { score: 25, label: "Needs Improvement", color: "text-destructive" }
  }

  const cgpaAnalysis = getAcademicScore(profile.cgpa || 0, academicBenchmarks.cgpa)
  const ieltsAnalysis = getAcademicScore(profile.ielts || 0, academicBenchmarks.ielts)
  const experienceAnalysis = getAcademicScore(profile.experience || 0, academicBenchmarks.experience)

  const overallScore = Math.round(
    (metSkills.length / idealRequirements.length) * 40 +
      (cgpaAnalysis.score / 100) * 30 +
      (ieltsAnalysis.score / 100) * 20 +
      (experienceAnalysis.score / 100) * 10
  )

  const improvements = [
    criticalGaps.length > 0 && {
      title: "Learn Critical Skills",
      description: `Focus on ${criticalGaps.slice(0, 2).map(s => s.name).join(" and ")} first`,
      impact: "High",
      icon: Target,
    },
    profile.ielts < 7 && {
      title: "Improve IELTS Score",
      description: "Score of 7.0+ opens doors to more universities",
      impact: "High",
      icon: BookOpen,
    },
    profile.cgpa < 3.5 && {
      title: "Boost Your CGPA",
      description: "Higher CGPA improves college and loan options",
      impact: "High",
      icon: Award,
    },
    profile.experience < 2 && {
      title: "Gain Work Experience",
      description: "Internships or projects strengthen applications",
      impact: "Medium",
      icon: Briefcase,
    },
    gaps.length > 0 && {
      title: "Add Complementary Skills",
      description: `Consider learning ${gaps.slice(0, 2).map(s => s.name).join(", ")}`,
      impact: "Medium",
      icon: TrendingUp,
    },
  ].filter(Boolean)

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Skill Gap Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Detailed analysis of your profile vs ideal requirements
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold gradient-text">{overallScore}%</p>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium">CGPA</span>
                  </div>
                  <span className={cgpaAnalysis.color}>{cgpaAnalysis.label}</span>
                </div>
                <p className="text-3xl font-bold mb-2">{profile.cgpa || "N/A"}</p>
                <Progress value={cgpaAnalysis.score} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Excellent: 3.8+ | Good: 3.5+ | Min: 3.0
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium">IELTS</span>
                  </div>
                  <span className={ieltsAnalysis.color}>{ieltsAnalysis.label}</span>
                </div>
                <p className="text-3xl font-bold mb-2">{profile.ielts || "N/A"}</p>
                <Progress value={ieltsAnalysis.score} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Excellent: 7.5+ | Good: 7.0+ | Min: 6.5
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <span className={experienceAnalysis.color}>{experienceAnalysis.label}</span>
                </div>
                <p className="text-3xl font-bold mb-2">{profile.experience || 0} yrs</p>
                <Progress value={experienceAnalysis.score} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Excellent: 3+ | Good: 2+ | Min: 1
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Skills Analysis */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Your Skills */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Skills Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Met Skills */}
                {metSkills.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-success mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Skills You Have ({metSkills.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {metSkills.map((skill) => (
                        <Badge key={skill.name} className="bg-success/20 text-success border-success/30">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Critical Gaps */}
                {criticalGaps.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-destructive mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Critical Gaps ({criticalGaps.length})
                    </p>
                    <div className="space-y-2">
                      {criticalGaps.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                        >
                          <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium text-sm">{skill.name}</p>
                            <p className="text-xs text-muted-foreground">{skill.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Gaps */}
                {gaps.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-warning mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Important to Learn ({gaps.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {gaps.map((skill) => (
                        <Badge key={skill.name} variant="outline" className="border-warning/50 text-warning">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional */}
                {optional.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Nice to Have ({optional.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {optional.map((skill) => (
                        <Badge key={skill.name} variant="outline" className="opacity-60">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Improvement Plan */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Improvement Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {improvements.length > 0 ? (
                  improvements.map((item, index) => {
                    if (!item) return null
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <Badge
                              variant={item.impact === "High" ? "default" : "secondary"}
                              className={
                                item.impact === "High"
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }
                            >
                              {item.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-success" />
                    <p className="font-medium">Your profile looks great!</p>
                    <p className="text-sm text-muted-foreground">
                      You meet most of the ideal requirements
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resources */}
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Python for Data Science", platform: "Coursera", type: "Course" },
                  { title: "Machine Learning A-Z", platform: "Udemy", type: "Course" },
                  { title: "IELTS Preparation", platform: "British Council", type: "Test Prep" },
                  { title: "SQL Bootcamp", platform: "DataCamp", type: "Course" },
                  { title: "AWS Cloud Practitioner", platform: "AWS", type: "Certification" },
                  { title: "Communication Skills", platform: "LinkedIn Learning", type: "Course" },
                ].map((resource) => (
                  <div
                    key={resource.title}
                    className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground">{resource.platform}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
