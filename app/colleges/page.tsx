"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStudent } from "@/context/student-context"
import {
  colleges,
  countries,
  calculateMatchScore,
  getCollegeCategory,
} from "@/lib/mock-data"
import {
  Search,
  MapPin,
  DollarSign,
  Award,
  TrendingUp,
  ArrowUpRight,
  Star,
  Filter,
} from "lucide-react"

type CategoryFilter = "all" | "dream" | "moderate" | "safe"

export default function CollegesPage() {
  const { profile } = useStudent()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [countryFilter, setCountryFilter] = useState<string>("all")

  // Calculate match scores for all colleges
  const collegesWithScores = useMemo(() => {
    return colleges.map((college) => ({
      ...college,
      matchScore: calculateMatchScore(
        college,
        profile.cgpa || 3.0,
        profile.ielts || 6.5,
        profile.budget || 50000
      ),
    }))
  }, [profile.cgpa, profile.ielts, profile.budget])

  // Apply filters
  const filteredColleges = useMemo(() => {
    return collegesWithScores
      .filter((college) => {
        // Country filter
        if (countryFilter !== "all" && college.country !== countryFilter) {
          return false
        }
        // Target country preference (prioritize but don't exclude)
        // Search filter
        if (
          search &&
          !college.name.toLowerCase().includes(search.toLowerCase()) &&
          !college.city.toLowerCase().includes(search.toLowerCase())
        ) {
          return false
        }
        // Category filter
        const category = getCollegeCategory(college.matchScore)
        if (categoryFilter !== "all" && category !== categoryFilter) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        // Prioritize target country
        if (profile.targetCountry) {
          if (a.country === profile.targetCountry && b.country !== profile.targetCountry) return -1
          if (b.country === profile.targetCountry && a.country !== profile.targetCountry) return 1
        }
        return b.matchScore - a.matchScore
      })
  }, [collegesWithScores, search, categoryFilter, countryFilter, profile.targetCountry])

  // Count by category
  const categoryCounts = useMemo(() => {
    return collegesWithScores.reduce(
      (acc, college) => {
        const category = getCollegeCategory(college.matchScore)
        acc[category]++
        return acc
      },
      { dream: 0, moderate: 0, safe: 0 } as Record<string, number>
    )
  }, [collegesWithScores])

  const getRecommendation = (college: typeof collegesWithScores[0]) => {
    if (college.matchScore >= 70) {
      return { text: "Apply Now", variant: "default" as const }
    } else if (college.matchScore >= 50) {
      return { text: "Good Chance", variant: "secondary" as const }
    } else {
      return { text: "Improve Profile", variant: "outline" as const }
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">College Recommendations</h1>
              <p className="text-muted-foreground mt-1">
                {filteredColleges.length} colleges matched based on your profile
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges or cities..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-secondary/50"
                  />
                </div>

                {/* Country Filter */}
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-full lg:w-48 bg-secondary/50">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Category Tabs */}
                <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}>
                  <TabsList className="bg-secondary/50">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="safe" className="data-[state=active]:bg-success data-[state=active]:text-success-foreground">
                      Safe ({categoryCounts.safe})
                    </TabsTrigger>
                    <TabsTrigger value="moderate" className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
                      Moderate ({categoryCounts.moderate})
                    </TabsTrigger>
                    <TabsTrigger value="dream">
                      Dream ({categoryCounts.dream})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Target Country Notice */}
          {profile.targetCountry && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-primary" />
              <span>
                Showing results for <span className="text-foreground font-medium">{profile.targetCountry}</span> first
              </span>
            </div>
          )}

          {/* College Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredColleges.map((college) => {
              const category = getCollegeCategory(college.matchScore)
              const recommendation = getRecommendation(college)
              const isTargetCountry = college.country === profile.targetCountry

              return (
                <Card
                  key={college.id}
                  className={`glass glass-hover ${
                    isTargetCountry ? "border-primary/30" : ""
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                        {college.logo}
                      </div>
                      <div className="flex items-center gap-2">
                        {isTargetCountry && (
                          <Badge variant="outline" className="text-primary border-primary/50">
                            <Star className="w-3 h-3 mr-1" />
                            Preferred
                          </Badge>
                        )}
                        <Badge
                          className={
                            category === "safe"
                              ? "bg-success text-success-foreground"
                              : category === "moderate"
                              ? "bg-warning text-warning-foreground"
                              : "bg-secondary"
                          }
                        >
                          {category === "safe" ? "Safe" : category === "moderate" ? "Moderate" : "Dream"}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {college.name}
                    </h3>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {college.city}, {college.country}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <Award className="w-3 h-3" />
                          <span>Ranking</span>
                        </div>
                        <p className="font-semibold">#{college.ranking}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Match</span>
                        </div>
                        <p className="font-semibold">{college.matchScore}%</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <DollarSign className="w-3 h-3" />
                          <span>Tuition</span>
                        </div>
                        <p className="font-semibold">${(college.tuitionFee / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <DollarSign className="w-3 h-3" />
                          <span>Living</span>
                        </div>
                        <p className="font-semibold">${(college.livingCost / 1000).toFixed(0)}K/yr</p>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span>Min CGPA: {college.minCGPA}</span>
                      <span>|</span>
                      <span>Min IELTS: {college.minIELTS}</span>
                    </div>

                    {/* Programs */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {college.programs.slice(0, 3).map((program) => (
                        <Badge key={program} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {college.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{college.programs.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action */}
                    <Button
                      className="w-full"
                      variant={recommendation.variant}
                    >
                      {recommendation.text}
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredColleges.length === 0 && (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-semibold mb-2">No colleges found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
