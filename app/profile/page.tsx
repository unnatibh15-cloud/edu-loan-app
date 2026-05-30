"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStudent } from "@/context/student-context"
import { countries, degrees, skills as allSkills } from "@/lib/mock-data"
import {
  User,
  Globe,
  GraduationCap,
  Wallet,
  BookOpen,
  Award,
  Briefcase,
  Target,
  Save,
  CheckCircle2,
  X,
  Plus,
} from "lucide-react"

export default function ProfilePage() {
  const { profile, updateProfile, profileCompletion } = useStudent()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  const [newSkill, setNewSkill] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const profileFields = [
    {
      key: "name",
      label: "Full Name",
      icon: User,
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      key: "targetCountry",
      label: "Target Country",
      icon: Globe,
      type: "select",
      options: countries,
    },
    {
      key: "currentCountry",
      label: "Current Country",
      icon: Globe,
      type: "select",
      options: countries,
    },
    {
      key: "degree",
      label: "Desired Degree",
      icon: GraduationCap,
      type: "select",
      options: degrees,
    },
    {
      key: "budget",
      label: "Total Budget (USD)",
      icon: Wallet,
      type: "number",
      placeholder: "e.g., 50000",
    },
    {
      key: "cgpa",
      label: "CGPA (out of 4.0)",
      icon: BookOpen,
      type: "number",
      placeholder: "e.g., 3.5",
      step: "0.01",
      max: 4,
    },
    {
      key: "ielts",
      label: "IELTS Score",
      icon: Award,
      type: "number",
      placeholder: "e.g., 7.0",
      step: "0.5",
      max: 9,
    },
    {
      key: "experience",
      label: "Work Experience (years)",
      icon: Briefcase,
      type: "number",
      placeholder: "e.g., 2",
    },
    {
      key: "goal",
      label: "Career Goal",
      icon: Target,
      type: "text",
      placeholder: "e.g., MS in Computer Science at Stanford",
    },
  ]

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Your Profile</h1>
              <p className="text-muted-foreground mt-1">
                Manage your profile information
              </p>
            </div>
            <div className="flex items-center gap-3">
              {saveSuccess && (
                <Badge className="bg-success text-success-foreground gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Saved
                </Badge>
              )}
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>

          {/* Profile Completion */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                  {profile.name
                    ? profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "?"}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{profile.name || "Complete your profile"}</h2>
                  <p className="text-muted-foreground">{profile.degree || "No degree selected"}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Progress value={profileCompletion} className="h-2 flex-1 max-w-xs" />
                    <span className="text-sm font-medium text-primary">{profileCompletion}% complete</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {profileFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-muted-foreground" />
                      {field.label}
                    </Label>
                    {field.type === "select" ? (
                      <Select
                        value={formData[field.key as keyof typeof formData] as string}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, [field.key]: value }))
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.key}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData] as string | number}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [field.key]:
                              field.type === "number"
                                ? parseFloat(e.target.value) || 0
                                : e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        step={field.step}
                        max={field.max}
                        className="bg-secondary/50"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Skills */}
              <div className="flex flex-wrap gap-2">
                {formData.skills.length > 0 ? (
                  formData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 p-0.5 rounded-full hover:bg-secondary"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
              </div>

              {/* Add Skill */}
              {isEditing && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(newSkill)}
                      className="bg-secondary/50"
                    />
                    <Button
                      variant="outline"
                      onClick={() => addSkill(newSkill)}
                      disabled={!newSkill}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {allSkills
                        .filter((s) => !formData.skills.includes(s))
                        .slice(0, 8)
                        .map((skill) => (
                          <Button
                            key={skill}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => addSkill(skill)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {skill}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Summary */}
          <Card className="glass border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="font-semibold">{profile.targetCountry || "Not set"}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <Wallet className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-semibold">
                    {profile.budget ? `$${(profile.budget / 1000).toFixed(0)}K` : "Not set"}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="font-semibold">{profile.cgpa || "Not set"}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">IELTS</p>
                  <p className="font-semibold">{profile.ielts || "Not set"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="glass border-destructive/30">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reset Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Clear all your profile data and start fresh
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset your profile?")) {
                      updateProfile({
                        name: "",
                        targetCountry: "",
                        currentCountry: "",
                        degree: "",
                        budget: 0,
                        cgpa: 0,
                        ielts: 0,
                        toefl: 0,
                        skills: [],
                        experience: 0,
                        goal: "",
                      })
                      setFormData({
                        name: "",
                        targetCountry: "",
                        currentCountry: "",
                        degree: "",
                        budget: 0,
                        cgpa: 0,
                        ielts: 0,
                        toefl: 0,
                        skills: [],
                        experience: 0,
                        goal: "",
                      })
                    }
                  }}
                >
                  Reset Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
