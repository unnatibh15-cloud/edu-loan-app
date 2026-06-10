import comprehensiveColleges from './universities-db.json'

export interface College {
  id: string
  name: string
  country: string
  city: string
  tuitionFeeUSD: number
  livingCostUSD: number
  ranking: number
  acceptanceRate: number
  minCGPA: number
  minIELTS: number
  programs: string[]
  logo: string
}

export const colleges: College[] = comprehensiveColleges as College[]

export const countries = [
  "USA", 
  "UK", 
  "Canada", 
  "Germany", 
  "Australia", 
  "Ireland", 
  "Netherlands", 
  "Singapore", 
  "France", 
  "New Zealand"
]

export const degrees = [
  "Master's in Computer Science",
  "Master's in Data Science",
  "Master's in Business Administration (MBA)",
  "Master's in Engineering & Automation",
  "Master's in Artificial Intelligence",
  "Bachelor's in Computer Science",
  "Bachelor's in Engineering"
]

export const skills = [
  "Python",
  "JavaScript",
  "Machine Learning",
  "Data Analysis",
  "SQL",
  "Cloud Computing",
  "React",
  "Node.js",
  "Data Structures",
  "Communication"
]

export interface LoanProvider {
  id: string
  name: string
  interestRate: number
  maxAmountLakhs: number
  minCGPA: number
  processingFeePercent: number
  repaymentYears: number
  features: string[]
}

export const loanProviders: LoanProvider[] = [
  {
    id: "1",
    name: "HDFC Credila",
    interestRate: 9.5,
    maxAmountLakhs: 75,
    minCGPA: 7.0,
    processingFeePercent: 1,
    repaymentYears: 15,
    features: ["No collateral up to ₹45L", "Pre-visa appraisal access", "Section 80E tax benefits"],
  },
  {
    id: "2",
    name: "SBI Education Loan",
    interestRate: 8.5,
    maxAmountLakhs: 150,
    minCGPA: 6.5,
    processingFeePercent: 0.5,
    repaymentYears: 15,
    features: ["Lowest processing rates", "100% secured loan options", "No hidden parameters"],
  },
  {
    id: "3",
    name: "Axis Bank",
    interestRate: 9.8,
    maxAmountLakhs: 75,
    minCGPA: 7.0,
    processingFeePercent: 1.25,
    repaymentYears: 12,
    features: ["Flexible co-applicant evaluation", "Streamlined digital disbursement"],
  }
]

export function calculateMatchScore(
  college: College,
  cgpa: number,
  ielts: number,
  budgetInLakhs: number
): number {
  let score = 0

  const cgpaDiff = cgpa - college.minCGPA
  if (cgpaDiff >= 1.0) score += 40
  else if (cgpaDiff >= 0.4) score += 30
  else if (cgpaDiff >= 0) score += 25
  else if (cgpaDiff >= -0.4) score += 10
  else score += 0

  const ieltsDiff = ielts - college.minIELTS
  if (ieltsDiff >= 0.5) score += 30
  else if (ieltsDiff >= 0) score += 25
  else if (ieltsDiff >= -0.5) score += 10
  else score += 0

  const totalCostUSD = college.tuitionFeeUSD + college.livingCostUSD
  const totalCostInLakhs = (totalCostUSD * 90) / 100000

  if (budgetInLakhs >= totalCostInLakhs * 1.1) score += 30
  else if (budgetInLakhs >= totalCostInLakhs) score += 25
  else if (budgetInLakhs >= totalCostInLakhs * 0.85) score += 15
  else score += 5

  return Math.min(score, 100)
}

export function getCollegeCategory(score: number): "dream" | "moderate" | "safe" {
  if (score >= 75) return "safe"
  if (score >= 50) return "moderate"
  return "dream"
}

export function calculateEMI(principalInLakhs: number, annualRate: number, years: number): number {
  const principal = principalInLakhs * 100000
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  
  if (monthlyRate === 0) return Math.round(principal / months)

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(emi)
}

export function getLoanEligibility(cgpa: number): { status: "eligible" | "limited" | "risky", maxAmount: number, message: string } {
  if (cgpa >= 8.0) {
    return {
      status: "eligible",
      maxAmount: 15000000,
      message: "Strong profile. You qualify for high-limit unsecured loans up to ₹45L-50L from premium private and public vendors.",
    }
  } else if (cgpa >= 7.0) {
    return {
      status: "limited",
      maxAmount: 7500000,
      message: "Standard eligibility criteria confirmed. Standard unsecured loan paths are viable with creditworthy co-applicants.",
    }
  } else if (cgpa >= 6.0) {
    return {
      status: "limited",
      maxAmount: 4000000,
      message: "Limited unsecured pathways. Collateral assignment options may be recommended to optimize terms.",
    }
  }
  return {
    status: "risky",
    maxAmount: 2000000,
    message: "Lower GPA tier. NBFC matching or mandatory tangible/intangible collateral will be required by major lenders.",
  }
}