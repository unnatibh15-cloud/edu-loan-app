"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface StudentProfile {
  name: string
  targetCountry: string
  currentCountry: string
  degree: string
  budget: number
  cgpa: number
  ielts: number
  toefl: number
  skills: string[]
  experience: number
  goal: string
  hasCollateral: boolean; // true if they have property/FD, false if they don't
}

interface StudentContextType {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
  profileCompletion: number
  resetProfile: () => void
}

const defaultProfile: StudentProfile = {
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
  hasCollateral: false,
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile)

  // SAFE HYDRATION: Load from localStorage only AFTER the component mounts on the client
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("edupilot_profile")
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
    } catch (error) {
      console.error("Failed to parse profile from localStorage:", error)
    }
  }, [])

  // NATIVE SYNC: Save to localStorage whenever state alters
  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates }
      try {
        localStorage.setItem("edupilot_profile", JSON.stringify(next))
      } catch (error) {
        console.error("Failed to save profile to localStorage:", error)
      }
      return next
    })
  }

  const resetProfile = () => {
    try {
      localStorage.removeItem("edupilot_profile")
    } catch (error) {
      console.error("Failed to clear localStorage:", error)
    }
    setProfile(defaultProfile)
  }

  const profileCompletion = (() => {
    const fields = [
      profile.name,
      profile.targetCountry,
      profile.currentCountry,
      profile.degree,
      profile.budget,
      profile.cgpa,
      profile.ielts || profile.toefl,
      profile.skills.length > 0,
      profile.experience,
      profile.goal,
    ]
    const filled = fields.filter((field) => {
      if (typeof field === "string") return field.length > 0
      if (typeof field === "number") return field > 0
      return Boolean(field)
    }).length
    return Math.round((filled / fields.length) * 100)
  })()

  return (
    <StudentContext.Provider
      value={{ profile, updateProfile, profileCompletion, resetProfile }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider")
  }
  return context
}