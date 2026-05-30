export interface College {
  id: string
  name: string
  country: string
  city: string
  tuitionFee: number
  livingCost: number
  ranking: number
  acceptanceRate: number
  minCGPA: number
  minIELTS: number
  programs: string[]
  logo: string
}

export const colleges: College[] = [
  // USA
  {
    id: "1",
    name: "Massachusetts Institute of Technology",
    country: "USA",
    city: "Cambridge",
    tuitionFee: 55000,
    livingCost: 20000,
    ranking: 1,
    acceptanceRate: 4,
    minCGPA: 3.9,
    minIELTS: 7.5,
    programs: ["Computer Science", "Engineering", "Data Science", "AI"],
    logo: "MIT",
  },
  {
    id: "2",
    name: "Stanford University",
    country: "USA",
    city: "Stanford",
    tuitionFee: 52000,
    livingCost: 22000,
    ranking: 3,
    acceptanceRate: 5,
    minCGPA: 3.8,
    minIELTS: 7.5,
    programs: ["Computer Science", "Business", "Engineering"],
    logo: "Stanford",
  },
  {
    id: "3",
    name: "University of California, Berkeley",
    country: "USA",
    city: "Berkeley",
    tuitionFee: 45000,
    livingCost: 18000,
    ranking: 10,
    acceptanceRate: 14,
    minCGPA: 3.5,
    minIELTS: 7.0,
    programs: ["Computer Science", "Data Science", "Engineering"],
    logo: "UCB",
  },
  {
    id: "4",
    name: "University of Texas at Austin",
    country: "USA",
    city: "Austin",
    tuitionFee: 38000,
    livingCost: 15000,
    ranking: 42,
    acceptanceRate: 29,
    minCGPA: 3.2,
    minIELTS: 6.5,
    programs: ["Computer Science", "Business", "Engineering"],
    logo: "UTA",
  },
  {
    id: "5",
    name: "Arizona State University",
    country: "USA",
    city: "Phoenix",
    tuitionFee: 32000,
    livingCost: 14000,
    ranking: 103,
    acceptanceRate: 88,
    minCGPA: 2.8,
    minIELTS: 6.0,
    programs: ["Computer Science", "Business", "Engineering"],
    logo: "ASU",
  },
  // UK
  {
    id: "6",
    name: "University of Oxford",
    country: "UK",
    city: "Oxford",
    tuitionFee: 38000,
    livingCost: 16000,
    ranking: 4,
    acceptanceRate: 17,
    minCGPA: 3.7,
    minIELTS: 7.5,
    programs: ["Computer Science", "Mathematics", "AI"],
    logo: "Oxford",
  },
  {
    id: "7",
    name: "Imperial College London",
    country: "UK",
    city: "London",
    tuitionFee: 36000,
    livingCost: 18000,
    ranking: 6,
    acceptanceRate: 14,
    minCGPA: 3.6,
    minIELTS: 7.0,
    programs: ["Engineering", "Computer Science", "Data Science"],
    logo: "Imperial",
  },
  {
    id: "8",
    name: "University of Manchester",
    country: "UK",
    city: "Manchester",
    tuitionFee: 28000,
    livingCost: 12000,
    ranking: 32,
    acceptanceRate: 56,
    minCGPA: 3.2,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "Business"],
    logo: "UoM",
  },
  {
    id: "9",
    name: "University of Birmingham",
    country: "UK",
    city: "Birmingham",
    tuitionFee: 24000,
    livingCost: 11000,
    ranking: 84,
    acceptanceRate: 72,
    minCGPA: 3.0,
    minIELTS: 6.0,
    programs: ["Computer Science", "Engineering", "Business"],
    logo: "UoB",
  },
  // Canada
  {
    id: "10",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto",
    tuitionFee: 45000,
    livingCost: 16000,
    ranking: 21,
    acceptanceRate: 43,
    minCGPA: 3.5,
    minIELTS: 7.0,
    programs: ["Computer Science", "Engineering", "AI"],
    logo: "UofT",
  },
  {
    id: "11",
    name: "University of British Columbia",
    country: "Canada",
    city: "Vancouver",
    tuitionFee: 42000,
    livingCost: 15000,
    ranking: 35,
    acceptanceRate: 52,
    minCGPA: 3.4,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "Data Science"],
    logo: "UBC",
  },
  {
    id: "12",
    name: "University of Alberta",
    country: "Canada",
    city: "Edmonton",
    tuitionFee: 28000,
    livingCost: 12000,
    ranking: 110,
    acceptanceRate: 58,
    minCGPA: 3.0,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "AI"],
    logo: "UofA",
  },
  // Australia
  {
    id: "13",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne",
    tuitionFee: 40000,
    livingCost: 18000,
    ranking: 14,
    acceptanceRate: 70,
    minCGPA: 3.4,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "Data Science"],
    logo: "UoM",
  },
  {
    id: "14",
    name: "University of Sydney",
    country: "Australia",
    city: "Sydney",
    tuitionFee: 42000,
    livingCost: 20000,
    ranking: 19,
    acceptanceRate: 68,
    minCGPA: 3.3,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "Business"],
    logo: "USyd",
  },
  {
    id: "15",
    name: "Monash University",
    country: "Australia",
    city: "Melbourne",
    tuitionFee: 38000,
    livingCost: 16000,
    ranking: 42,
    acceptanceRate: 75,
    minCGPA: 3.0,
    minIELTS: 6.0,
    programs: ["Computer Science", "Engineering", "IT"],
    logo: "Monash",
  },
  // Germany
  {
    id: "16",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    tuitionFee: 2000,
    livingCost: 12000,
    ranking: 30,
    acceptanceRate: 8,
    minCGPA: 3.5,
    minIELTS: 6.5,
    programs: ["Computer Science", "Engineering", "AI"],
    logo: "TUM",
  },
  {
    id: "17",
    name: "RWTH Aachen University",
    country: "Germany",
    city: "Aachen",
    tuitionFee: 1500,
    livingCost: 10000,
    ranking: 55,
    acceptanceRate: 15,
    minCGPA: 3.3,
    minIELTS: 6.0,
    programs: ["Engineering", "Computer Science", "Mechanical"],
    logo: "RWTH",
  },
]

export const countries = ["USA", "UK", "Canada", "Australia", "Germany", "India"]

export const degrees = [
  "Master's in Computer Science",
  "Master's in Data Science",
  "Master's in Business Administration",
  "Master's in Engineering",
  "Master's in Artificial Intelligence",
  "Bachelor's in Computer Science",
  "Bachelor's in Engineering",
  "PhD in Computer Science",
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
  "Project Management",
  "Communication",
  "Leadership",
  "Research",
]

export interface LoanProvider {
  id: string
  name: string
  interestRate: number
  maxAmount: number
  minCGPA: number
  processingFee: number
  repaymentYears: number
  features: string[]
}

export const loanProviders: LoanProvider[] = [
  {
    id: "1",
    name: "HDFC Credila",
    interestRate: 9.5,
    maxAmount: 7500000,
    minCGPA: 3.0,
    processingFee: 1,
    repaymentYears: 15,
    features: ["No collateral up to 40L", "Quick disbursement", "Tax benefits"],
  },
  {
    id: "2",
    name: "SBI Education Loan",
    interestRate: 8.5,
    maxAmount: 15000000,
    minCGPA: 2.5,
    processingFee: 0.5,
    repaymentYears: 15,
    features: ["Lowest interest rate", "Government backed", "Long repayment"],
  },
  {
    id: "3",
    name: "Prodigy Finance",
    interestRate: 10.5,
    maxAmount: 10000000,
    minCGPA: 3.2,
    processingFee: 2,
    repaymentYears: 10,
    features: ["No cosigner required", "For top universities", "Global coverage"],
  },
  {
    id: "4",
    name: "Axis Bank Education Loan",
    interestRate: 9.8,
    maxAmount: 7500000,
    minCGPA: 2.8,
    processingFee: 1.5,
    repaymentYears: 12,
    features: ["Flexible repayment", "Quick processing", "Doorstep service"],
  },
]

export function calculateMatchScore(
  college: College,
  cgpa: number,
  ielts: number,
  budget: number
): number {
  let score = 0

  // CGPA score (40%)
  const cgpaDiff = cgpa - college.minCGPA
  if (cgpaDiff >= 0.5) score += 40
  else if (cgpaDiff >= 0.2) score += 30
  else if (cgpaDiff >= 0) score += 20
  else if (cgpaDiff >= -0.2) score += 10
  else score += 0

  // IELTS score (30%)
  const ieltsDiff = ielts - college.minIELTS
  if (ieltsDiff >= 0.5) score += 30
  else if (ieltsDiff >= 0) score += 20
  else if (ieltsDiff >= -0.5) score += 10
  else score += 0

  // Budget score (30%)
  const totalCost = college.tuitionFee + college.livingCost
  if (budget >= totalCost * 1.2) score += 30
  else if (budget >= totalCost) score += 25
  else if (budget >= totalCost * 0.8) score += 15
  else score += 5

  return Math.min(score, 100)
}

export function getCollegeCategory(
  score: number
): "dream" | "moderate" | "safe" {
  if (score >= 75) return "safe"
  if (score >= 50) return "moderate"
  return "dream"
}

export function calculateEMI(
  principal: number,
  rate: number,
  years: number
): number {
  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(emi)
}

export function getLoanEligibility(cgpa: number): {
  status: "eligible" | "limited" | "risky"
  maxAmount: number
  message: string
} {
  if (cgpa >= 3.5) {
    return {
      status: "eligible",
      maxAmount: 15000000,
      message: "You qualify for maximum loan amounts with best interest rates.",
    }
  } else if (cgpa >= 3.0) {
    return {
      status: "limited",
      maxAmount: 7500000,
      message: "You qualify for standard loan amounts. Higher CGPA unlocks better options.",
    }
  } else if (cgpa >= 2.5) {
    return {
      status: "limited",
      maxAmount: 5000000,
      message: "Limited options available. Consider improving academics.",
    }
  }
  return {
    status: "risky",
    maxAmount: 2500000,
    message: "Few options available. Collateral may be required.",
  }
}
