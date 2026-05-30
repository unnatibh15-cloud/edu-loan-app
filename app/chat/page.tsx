"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStudent } from "@/context/student-context"
import { countries, degrees, skills as allSkills } from "@/lib/mock-data"
import {
  GraduationCap,
  Send,
  Bot,
  User,
  ArrowRight,
  LayoutDashboard,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  options?: string[]
  field?: keyof typeof fieldQuestions
}

const fieldQuestions = {
  name: "What's your name?",
  targetCountry: "Which country would you like to study in?",
  currentCountry: "Which country are you currently in?",
  degree: "What degree program are you interested in?",
  budget: "What's your total budget for education (in USD)?",
  cgpa: "What's your current CGPA (on a 4.0 scale)?",
  ielts: "What's your IELTS score? (Enter 0 if not taken)",
  skills: "What are your key skills? (Select multiple or type your own)",
  experience: "How many years of relevant work experience do you have?",
}

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "Welcome to EduPilot AI! I'm your personal study abroad copilot. I'll help you find the perfect university and education loan based on your profile. Let's start by getting to know you better.",
}

export default function ChatPage() {
  const { profile, updateProfile, profileCompletion } = useStudent()
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [currentField, setCurrentField] = useState<keyof typeof fieldQuestions>("name")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fieldOrder: (keyof typeof fieldQuestions)[] = [
    "name",
    "targetCountry",
    "currentCountry",
    "degree",
    "budget",
    "cgpa",
    "ielts",
    "skills",
    "experience",
  ]

  useEffect(() => {
    // Ask the first question after welcome
    const timer = setTimeout(() => {
      askQuestion("name")
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const askQuestion = (field: keyof typeof fieldQuestions) => {
    setIsTyping(true)
    setTimeout(() => {
      let options: string[] | undefined
      if (field === "targetCountry" || field === "currentCountry") {
        options = countries
      } else if (field === "degree") {
        options = degrees
      } else if (field === "skills") {
        options = allSkills.slice(0, 8)
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: fieldQuestions[field],
        options,
        field,
      }
      setMessages((prev) => [...prev, newMessage])
      setCurrentField(field)
      setIsTyping(false)
    }, 500)
  }

  const handleSend = (value?: string) => {
    const messageContent = value || input
    if (!messageContent.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Update profile based on current field
    const fieldValue = parseFieldValue(currentField, messageContent)
    updateProfile({ [currentField]: fieldValue })

    // Move to next question or finish
    const currentIndex = fieldOrder.indexOf(currentField)
    if (currentIndex < fieldOrder.length - 1) {
      setTimeout(() => {
        askQuestion(fieldOrder[currentIndex + 1])
      }, 500)
    } else {
      // Profile complete
      setIsTyping(true)
      setTimeout(() => {
        const completeMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: `Excellent, ${profile.name || messageContent.split(" ")[0]}! Your profile is complete. Based on your information, I've prepared personalized college recommendations, skill gap analysis, and loan options. Ready to explore your dashboard?`,
        }
        setMessages((prev) => [...prev, completeMessage])
        setIsTyping(false)
      }, 1000)
    }
  }

  const parseFieldValue = (field: keyof typeof fieldQuestions, value: string) => {
    switch (field) {
      case "budget":
        return parseInt(value.replace(/[^0-9]/g, "")) || 0
      case "cgpa":
        return parseFloat(value) || 0
      case "ielts":
        return parseFloat(value) || 0
      case "experience":
        return parseInt(value) || 0
      case "skills":
        return value.split(",").map((s) => s.trim()).filter(Boolean)
      default:
        return value
    }
  }

  const handleOptionClick = (option: string) => {
    if (currentField === "skills") {
      const currentSkills = input ? input.split(", ") : []
      if (currentSkills.includes(option)) {
        setInput(currentSkills.filter((s) => s !== option).join(", "))
      } else {
        setInput([...currentSkills, option].join(", "))
      }
    } else {
      handleSend(option)
    }
  }

  const selectedSkills = input.split(", ").filter(Boolean)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-80 flex-col border-r border-border glass">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">EduPilot AI</span>
          </Link>
        </div>

        <div className="p-4 flex-1">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm text-primary">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Your Profile
            </h3>
            <div className="space-y-3">
              {Object.entries(fieldQuestions).map(([key, label]) => {
                const value = profile[key as keyof typeof profile]
                const hasValue = Array.isArray(value) ? value.length > 0 : Boolean(value)
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2 text-sm ${
                      hasValue ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        hasValue ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    />
                    <span className="truncate">
                      {hasValue
                        ? Array.isArray(value)
                          ? value.join(", ")
                          : String(value)
                        : label.replace("?", "")}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <Button asChild className="w-full" variant="outline">
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border glass flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="lg:hidden">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">EduPilot AI</h1>
                <p className="text-xs text-muted-foreground">Your study abroad copilot</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="lg:hidden text-sm text-muted-foreground">
              {profileCompletion}% complete
            </div>
            <Button asChild size="sm" variant="outline" className="hidden sm:flex">
              <Link href="/dashboard">
                Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "assistant"
                        ? "bg-primary/20"
                        : "bg-secondary"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                      message.role === "assistant"
                        ? "glass"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>

                {/* Options */}
                {message.options && message.field === currentField && (
                  <div className="ml-11 flex flex-wrap gap-2">
                    {message.options.map((option) => (
                      <Button
                        key={option}
                        variant={
                          message.field === "skills" && selectedSkills.includes(option)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className="rounded-full"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="px-4 py-3 rounded-2xl glass">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Complete message actions */}
            {profileCompletion === 100 && (
              <div className="ml-11 flex flex-wrap gap-2">
                <Button onClick={() => router.push("/dashboard")} className="glow">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  View Dashboard
                </Button>
                <Button variant="outline" onClick={() => router.push("/colleges")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  See College Matches
                </Button>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border glass">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Input
                placeholder={
                  currentField === "skills"
                    ? "Type skills or select above, then send..."
                    : "Type your answer..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="h-12 bg-secondary/50"
              />
              <Button
                onClick={() => handleSend()}
                className="h-12 px-6"
                disabled={!input.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Press Enter to send</span>
              <span>
                {currentField === "skills" && selectedSkills.length > 0
                  ? `${selectedSkills.length} skills selected`
                  : `Question ${fieldOrder.indexOf(currentField) + 1} of ${fieldOrder.length}`}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
