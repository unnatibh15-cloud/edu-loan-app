"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useStudent } from "@/context/student-context"
import {
  loanProviders,
  calculateEMI,
  getLoanEligibility,
} from "@/lib/mock-data"
import {
  Wallet,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calculator,
  FileText,
  Building2,
  Percent,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react"

const documentChecklist = [
  { id: "passport", label: "Valid Passport", required: true },
  { id: "admission", label: "Admission Letter", required: true },
  { id: "i20", label: "I-20 / CAS Letter", required: true },
  { id: "transcripts", label: "Academic Transcripts", required: true },
  { id: "marksheets", label: "Mark Sheets (All Semesters)", required: true },
  { id: "ielts", label: "IELTS/TOEFL Score", required: true },
  { id: "income", label: "Income Proof (Co-applicant)", required: true },
  { id: "bank", label: "Bank Statements (6 months)", required: true },
  { id: "photo", label: "Passport Size Photos", required: false },
  { id: "sop", label: "Statement of Purpose", required: false },
]

export default function LoansPage() {
  const { profile } = useStudent()
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [loanTenure, setLoanTenure] = useState(10)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<typeof loanProviders[0] | null>(null)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [checkedDocs, setCheckedDocs] = useState<string[]>([])

  const eligibility = getLoanEligibility(profile.cgpa || 0)

  // Filter providers based on eligibility
  const eligibleProviders = loanProviders.filter(
    (p) => (profile.cgpa || 0) >= p.minCGPA && loanAmount <= p.maxAmount
  )

  const handleApply = (provider: typeof loanProviders[0]) => {
    setSelectedProvider(provider)
    setShowApplyDialog(true)
  }

  const handleSubmitApplication = () => {
    setApplicationSubmitted(true)
    setTimeout(() => {
      setShowApplyDialog(false)
      setApplicationSubmitted(false)
      setCheckedDocs([])
    }, 2000)
  }

  const toggleDoc = (docId: string) => {
    setCheckedDocs((prev) =>
      prev.includes(docId) ? prev.filter((d) => d !== docId) : [...prev, docId]
    )
  }

  const requiredDocs = documentChecklist.filter((d) => d.required)
  const allRequiredChecked = requiredDocs.every((d) => checkedDocs.includes(d.id))

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Education Loans</h1>
            <p className="text-muted-foreground mt-1">
              Compare loan options and apply directly
            </p>
          </div>

          {/* Eligibility Banner */}
          <Card
            className={`glass ${
              eligibility.status === "eligible"
                ? "border-success/30"
                : eligibility.status === "limited"
                ? "border-warning/30"
                : "border-destructive/30"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
                      eligibility.status === "eligible"
                        ? "bg-success/20"
                        : eligibility.status === "limited"
                        ? "bg-warning/20"
                        : "bg-destructive/20"
                    }`}
                  >
                    {eligibility.status === "eligible" ? (
                      <CheckCircle2 className="w-7 h-7 text-success" />
                    ) : eligibility.status === "limited" ? (
                      <AlertCircle className="w-7 h-7 text-warning" />
                    ) : (
                      <XCircle className="w-7 h-7 text-destructive" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">Loan Eligibility</h3>
                      <Badge
                        className={
                          eligibility.status === "eligible"
                            ? "bg-success text-success-foreground"
                            : eligibility.status === "limited"
                            ? "bg-warning text-warning-foreground"
                            : "bg-destructive text-destructive-foreground"
                        }
                      >
                        {eligibility.status === "eligible"
                          ? "Eligible"
                          : eligibility.status === "limited"
                          ? "Limited Options"
                          : "Risky"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{eligibility.message}</p>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm text-muted-foreground">Maximum Loan Amount</p>
                  <p className="text-3xl font-bold gradient-text">
                    INR {(eligibility.maxAmount / 100000).toFixed(0)}L
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EMI Calculator */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                EMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Sliders */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium">Loan Amount</label>
                      <span className="text-sm text-primary font-semibold">
                        INR {(loanAmount / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(v) => setLoanAmount(v[0])}
                      max={Math.min(eligibility.maxAmount, 15000000)}
                      min={500000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5L</span>
                      <span>{(Math.min(eligibility.maxAmount, 15000000) / 100000).toFixed(0)}L</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium">Loan Tenure</label>
                      <span className="text-sm text-primary font-semibold">
                        {loanTenure} years
                      </span>
                    </div>
                    <Slider
                      value={[loanTenure]}
                      onValueChange={(v) => setLoanTenure(v[0])}
                      max={15}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5 years</span>
                      <span>15 years</span>
                    </div>
                  </div>
                </div>

                {/* EMI Display */}
                <div className="grid grid-cols-2 gap-4">
                  {eligibleProviders.slice(0, 4).map((provider) => {
                    const emi = calculateEMI(loanAmount, provider.interestRate, loanTenure)
                    return (
                      <div
                        key={provider.id}
                        className="p-4 rounded-xl bg-secondary/50"
                      >
                        <p className="text-xs text-muted-foreground mb-1">{provider.name}</p>
                        <p className="text-xl font-bold">INR {emi.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Providers */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Available Loan Providers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {loanProviders.map((provider) => {
                const isEligible = (profile.cgpa || 0) >= provider.minCGPA
                const emi = calculateEMI(loanAmount, provider.interestRate, loanTenure)
                const totalPayable = emi * loanTenure * 12
                const totalInterest = totalPayable - loanAmount

                return (
                  <Card
                    key={provider.id}
                    className={`glass ${!isEligible ? "opacity-60" : ""}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{provider.name}</h3>
                            {!isEligible && (
                              <Badge variant="outline" className="text-xs">
                                Min CGPA: {provider.minCGPA}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Max: INR {(provider.maxAmount / 100000).toFixed(0)}L
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Percent className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-lg font-bold">{provider.interestRate}%</p>
                          <p className="text-xs text-muted-foreground">Interest</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-lg font-bold">{provider.repaymentYears}yr</p>
                          <p className="text-xs text-muted-foreground">Max Tenure</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Wallet className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-lg font-bold">{provider.processingFee}%</p>
                          <p className="text-xs text-muted-foreground">Proc. Fee</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {provider.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Estimated EMI</p>
                          <p className="text-lg font-bold">INR {emi.toLocaleString()}/mo</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Total Interest</p>
                          <p className="text-sm font-medium">
                            INR {(totalInterest / 100000).toFixed(1)}L
                          </p>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={!isEligible}
                        onClick={() => handleApply(provider)}
                      >
                        {isEligible ? "Apply Now" : "Not Eligible"}
                        {isEligible && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Document Checklist */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Document Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {documentChecklist.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
                  >
                    <Checkbox
                      id={doc.id}
                      checked={checkedDocs.includes(doc.id)}
                      onCheckedChange={() => toggleDoc(doc.id)}
                    />
                    <label
                      htmlFor={doc.id}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {doc.label}
                    </label>
                    {doc.required && (
                      <Badge variant="outline" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {checkedDocs.length} of {documentChecklist.length} documents ready
                  </span>
                  <Progress
                    value={(checkedDocs.length / documentChecklist.length) * 100}
                    className="w-32 h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="glass border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Loan Tips</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Compare interest rates and processing fees across providers
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Higher CGPA can unlock better interest rates and loan amounts
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Consider collateral-free options for amounts up to 40L
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Education loan interest is tax deductible under Section 80E
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          {applicationSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-success" />
              <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground">
                Your loan application has been submitted successfully. You will receive a confirmation shortly.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Apply for Loan</DialogTitle>
                <DialogDescription>
                  {selectedProvider?.name} - Confirm your documents are ready
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold">INR {(loanAmount / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tenure</p>
                      <p className="font-semibold">{loanTenure} years</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Interest Rate</p>
                      <p className="font-semibold">{selectedProvider?.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. EMI</p>
                      <p className="font-semibold">
                        INR {calculateEMI(loanAmount, selectedProvider?.interestRate || 9, loanTenure).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Required Documents</p>
                  {requiredDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id={`dialog-${doc.id}`}
                        checked={checkedDocs.includes(doc.id)}
                        onCheckedChange={() => toggleDoc(doc.id)}
                      />
                      <label htmlFor={`dialog-${doc.id}`} className="cursor-pointer">
                        {doc.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitApplication} disabled={!allRequiredChecked}>
                  Submit Application
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
