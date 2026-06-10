export interface LoanInputs {
  principal: number;
  interestRate: number;
  tenureYears: number;
  courseDurationYears: number;
  moratoriumBufferMonths: number;
  familyIncometaxBracket: number;
}

export interface BankCriteria {
  name: string;
  maxUnsecured: string;
  interestRateRange: string;
  processingFee: string;
  coBorrowerRequirement: string;
}

// Real-world matrix for top Indian banks providing education loans
export const INDIAN_BANKS_CRITERIA: BankCriteria[] = [
  {
    name: "State Bank of India (SBI)",
    maxUnsecured: "Up to ₹7.5 Lakhs (Up to ₹50L for premier IIT/IIM/Global tracks)",
    interestRateRange: "8.55% - 11.15%",
    processingFee: "Zero up to ₹20L, ₹10,000 max above it",
    coBorrowerRequirement: "Parents/Spouse mandatory as primary co-obligator"
  },
  {
    name: "HDFC Credila",
    maxUnsecured: "Up to ₹50 Lakhs (Highly dependent on GRE/IELTS & target university country)",
    interestRateRange: "10.25% - 13.50%",
    processingFee: "1% - 1.5% of the approved loan amount",
    coBorrowerRequirement: "Minimum income requirement for co-borrower based on monthly EMI"
  },
  {
    name: "Axis Bank",
    maxUnsecured: "Up to ₹40 Lakhs for prime global universities",
    interestRateRange: "11.25% - 14.00%",
    processingFee: "Up to 1% + GST",
    coBorrowerRequirement: "Co-borrower stable income track record (ITR files required)"
  }
];

export const REQUIRED_LOAN_DOCUMENTS = [
  "Admission Letter from foreign university (with fee break-up structure)",
  "Student Academic Records (10th, 12th, Graduation Marksheets & Degree)",
  "Standardized Exam Scorecards (GRE, GMAT, IELTS, or TOEFL scores)",
  "Co-Borrower Income Proof: Latest 3 Months Salary Slips & 2 Years Form 16 / ITR",
  "Co-Borrower Financial Records: 6 Months Bank Account Statements",
  "KYC Documents: PAN Card, Aadhaar Card, Passport copy of the student"
];

export function calculateIndianLoanDynamics(inputs: LoanInputs) {
  const { principal, interestRate, tenureYears, courseDurationYears, moratoriumBufferMonths, familyIncometaxBracket } = inputs;
  const monthlyRate = (interestRate / 100) / 12;
  const totalMoratoriumMonths = (courseDurationYears * 12) + moratoriumBufferMonths;
  const totalRepaymentMonths = tenureYears * 12;

  const monthlyAccruedInterest = principal * monthlyRate;
  const totalAccruedMoratoriumInterest = monthlyAccruedInterest * totalMoratoriumMonths;
  const loanBalancePostMoratorium = principal + totalAccruedMoratoriumInterest;

  let emi = 0;
  if (monthlyRate > 0) {
    emi = (loanBalancePostMoratorium * monthlyRate * Math.pow(1 + monthlyRate, totalRepaymentMonths)) / 
          (Math.pow(1 + monthlyRate, totalRepaymentMonths) - 1);
  } else {
    emi = loanBalancePostMoratorium / totalRepaymentMonths;
  }

  const totalPayableAmount = emi * totalRepaymentMonths;
  const totalRepaymentInterest = totalPayableAmount - loanBalancePostMoratorium;
  const grandTotalInterestPaid = totalAccruedMoratoriumInterest + totalRepaymentInterest;

  const averageAnnualInterestPaid = grandTotalInterestPaid / (tenureYears + (totalMoratoriumMonths / 12));
  const annualTaxSavings80E = averageAnnualInterestPaid * familyIncometaxBracket;
  const totalTaxSavings80E = annualTaxSavings80E * Math.min(tenureYears, 8);

  return {
    emi: Math.round(emi),
    moratoriumInterestAccrued: Math.round(totalAccruedMoratoriumInterest),
    effectiveLoanPrincipalPostMoratorium: Math.round(loanBalancePostMoratorium),
    totalInterestPaidOverLifetime: Math.round(grandTotalInterestPaid),
    totalNetPayableWithInterest: Math.round(principal + grandTotalInterestPaid),
    annualSection80ETaxSavings: Math.round(annualTaxSavings80E),
    totalSection80ETaxSavings: Math.round(totalTaxSavings80E),
    netEffectiveInterestCost: Math.round(grandTotalInterestPaid - totalTaxSavings80E)
  };
}

export function validateLoanPath(principal: number, hasCollateral: boolean): { approved: boolean; message: string } {
  const UNSECURED_MAX_LIMIT = 5000000;
  if (!hasCollateral && principal > UNSECURED_MAX_LIMIT) {
    return {
      approved: false,
      message: `Loans above ₹50L typically require tangible collateral (Property/Fixed Deposits) in India. Consider adding a collateral asset or downscaling target budget profiles.`
    };
  }
  return {
    approved: true,
    message: hasCollateral ? "Eligible for premium low-interest Secured Loan pathways." : "Eligible for Prime Unsecured Loan pathways up to ₹50L."
  };
}