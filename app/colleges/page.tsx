"use client"

import { useMemo, useState } from "react"
import { useStudent } from "@/context/student-context"
import { colleges, countries, degrees, calculateMatchScore } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Compass, GraduationCap, MapPin, BadgeIndianRupee, Star, ArrowUpRight } from "lucide-react"

export default function OxfordCollegesPage() {
  const { profile } = useStudent()
  
  const [selectedCountry, setSelectedCountry] = useState<string>(profile.targetCountry || "USA")
  const [selectedProgram, setSelectedProgram] = useState<string>(profile.degree || "Master's in Computer Science")

  const filteredAndScoredColleges = useMemo(() => {
    return colleges
      .filter((college) => {
        const matchesCountry = college.country.toLowerCase() === selectedCountry.toLowerCase()
        const matchesProgram = college.programs.includes(selectedProgram)
        return matchesCountry && matchesProgram
      })
      .map((college) => {
        const score = calculateMatchScore(
          college,
          profile.cgpa || 8.0,
          profile.ielts || 7.0,
          profile.budget || 45
        )
        return { ...college, matchScore: score }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [selectedCountry, selectedProgram, profile])

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] p-6 lg:p-10 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Scholar Header */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#1A2E40] tracking-wider uppercase">Institutional Alignment</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compatible Universities</h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
            Cross-referencing international parameters against your aggregate portfolio data.
          </p>
        </div>

        {/* Filter Controls Console */}
        <Card className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Destination Region
              </label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-slate-50/50 border-slate-200/70 rounded-xl text-xs sm:text-sm h-11 focus:ring-1 focus:ring-slate-400 transition-all">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Target Program Track
              </label>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="bg-slate-50/50 border-slate-200/70 rounded-xl text-xs sm:text-sm h-11 focus:ring-1 focus:ring-slate-400 transition-all">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  {degrees.map((d) => (
                    <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Counter */}
        <div className="px-1 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">
            Identified {filteredAndScoredColleges.length} direct institution alignments
          </p>
        </div>

        {/* Navy Accented Grid System */}
        {filteredAndScoredColleges.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {filteredAndScoredColleges.map((college) => {
              const totalCostINR = ((college.tuitionFeeUSD + college.livingCostUSD) * 85) / 100000
              return (
                <Card key={college.id} className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#1A2E40] transition-all duration-200">
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-5">
                    
                    <div className="space-y-2">
                      <div className="w-6 h-1 rounded-full bg-slate-200 group-hover:bg-[#1A2E40] transition-colors" />
                      <h3 className="font-bold text-base text-slate-800 tracking-tight leading-snug">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0 text-slate-300" /> {college.city}, {college.country}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <BadgeIndianRupee className="w-4 h-4 text-slate-400" />
                          <span>~{Math.round(totalCostINR)} Lakhs / yr</span>
                        </div>
                        
                        <Badge className="bg-[#EDF4FA] border border-[#D4E4F5] text-[#1A2E40] font-mono font-bold text-[10px] shadow-none px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-[#1A2E40] fill-[#1A2E40]" /> {college.matchScore}% Match
                        </Badge>
                      </div>

                      <button
                        onClick={() => {
                          const universityQueryName = encodeURIComponent(`${college.name} official application admission login portal`);
                          const directLoginRedirectUrl = `https://www.google.com/search?q=${universityQueryName}&btnI=I%27m+Feeling+Lucky`;
                          window.open(directLoginRedirectUrl, '_blank');
                        }}
                        className="w-full bg-slate-900 hover:bg-[#1A2E40] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 group/btn"
                      >
                        Proceed to Application Hub
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                      </button>
                    </div>

                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/50 p-12 text-center max-w-md mx-auto space-y-3 shadow-sm">
            <Compass className="w-7 h-7 mx-auto text-slate-300 animate-pulse" />
            <p className="text-sm font-bold text-slate-700">No Direct Alignments Found</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Try modifying your academic filters or configurations inside your profile settings panel.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}