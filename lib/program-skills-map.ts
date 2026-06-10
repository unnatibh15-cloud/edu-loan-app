export interface ProgramSkillContext {
  skills: string[]
  coreGaps: { title: string; description: string }[]
  technicalAdditions: string[]
  catalysts: string[]
  resources: { category: string; title: string; provider: string }[]
}

export const programSkillsMap: Record<string, ProgramSkillContext> = {
  "Master's in Computer Science": {
    skills: ["Python", "Java", "Data Structures", "System Design", "SQL", "Cloud Computing"],
    coreGaps: [
      { title: "Advanced Algorithmic Design", description: "Complex algorithmic analysis, graph transformations, and optimization frameworks." },
      { title: "Distributed Systems Architecture", description: "Concurrency control, network topology maps, and horizontally scalable backend blueprints." }
    ],
    technicalAdditions: ["Go Language", "Docker & Kubernetes", "System Design Patterns"],
    catalysts: ["Open Source Contribution", "LeetCode Graph Audits"],
    resources: [
      { category: "Academic Core", title: "Data Structures & Algorithmic Design Core", provider: "NPTEL / MIT OpenCourseWare" },
      { category: "Systems Core", title: "Distributed Systems Engineering Manuals", provider: "MIT Labs" }
    ]
  },
  "Master's in Data Science": {
    skills: ["Python", "R Programming", "SQL", "Data Analysis", "Tableau", "Statistics"],
    coreGaps: [
      { title: "Data Analysis Infrastructure", description: "Core data lifecycle parsing, analytical pipeline models, and statistical mapping." },
      { title: "Mathematical Statistics & Probability", description: "Stochastic calculus foundations, regression modeling, and distribution variance analytics." }
    ],
    technicalAdditions: ["SQL Advanced Querying", "Tableau Analytics", "Big Data Pipelines"],
    catalysts: ["Kaggle Competitions", "Research Notebooks"],
    resources: [
      { category: "Systems Core", title: "Relational Database Engine Blueprints (SQL)", provider: "DataCamp / FreeCodeCamp" },
      { category: "Mathematical Core", title: "Applied Statistics for Data Science Optimization", provider: "Harvard Online" }
    ]
  },
  "Master's in Artificial Intelligence": {
    skills: ["Python", "PyTorch", "Machine Learning", "Deep Learning", "Data Analysis", "Mathematics"],
    coreGaps: [
      { title: "Python Framework Mastery", description: "Core syntax for structural algorithmic problem-solving and foundational data models." },
      { title: "Machine Learning Frameworks", description: "Essential advanced elective core for computing optimization and model training pipelines." }
    ],
    technicalAdditions: ["PyTorch Neural Nets", "MLOps Lifecycle", "Linear Algebra Foundations"],
    catalysts: ["Research Paper Drafts", "HuggingFace Frameworks"],
    resources: [
      { category: "Core Elective", title: "Machine Learning Foundations Frameworks", provider: "Stanford Online / Coursera" },
      { category: "Advanced Core", title: "Deep Learning Specialization & Neural Training", provider: "DeepLearning.AI" }
    ]
  },
  "Master's in Business Administration (MBA)": {
    skills: ["Financial Analysis", "Corporate Strategy", "Marketing Dynamics", "Leadership", "Excel", "Data Interpretation"],
    coreGaps: [
      { title: "Quantitative Financial Modeling", description: "Corporate valuation frameworks, microeconomic balance metrics, and structural asset parsing." },
      { title: "Strategic Resource Management", description: "Operational execution workflows, human capital optimization, and market-entry game theory." }
    ],
    technicalAdditions: ["Advanced Excel Macro Automation", "PowerBI Dashboards", "Corporate Finance Basics"],
    catalysts: ["Case Study Competitions", "Corporate Internships"],
    resources: [
      { category: "Business Core", title: "Financial Accounting & Capital Evaluation Matrix", provider: "Wharton / Coursera" },
      { category: "Strategy Core", title: "Competitive Strategy & Global Market Economics", provider: "Ludwig-Maximilians-Universität" }
    ]
  },
  "Master's in Engineering & Automation": {
    skills: ["MATLAB", "PLC Programming", "AutoCAD Electrical", "SCADA Systems", "Robotics Control", "Sensors"],
    coreGaps: [
      { title: "Industrial PLC Automation Systems", description: "Logic controllers, variable frequency drives, testing workflows, and schema design frameworks." },
      { title: "Control Systems Theory & Modeling", description: "State-space transformations, feedback loop structures, and simulation mapping environments." }
    ],
    technicalAdditions: ["EPLAN Panel Design", "SCADA Architecture", "Embedded Systems / C++"],
    catalysts: ["Practical Internships", "CAD Schematic Dossiers"],
    resources: [
      { category: "Automation Core", title: "Programmable Logic Controllers & Structural Systems", provider: "RealPars / Industrial Automation Hub" },
      { category: "Electrical Design", title: "Industrial Panel Control Diagrams & AutoCAD Drafting", provider: "Udemy / Technical Guides" }
    ]
  }
}

// Fallback generator for unmapped options (e.g., Bachelor tracks) to ensure layout resilience
export function getProgramSkillContext(program: string): ProgramSkillContext {
  const normalizedProgram = Object.keys(programSkillsMap).find(
    (key) => key.toLowerCase().trim() === program?.toLowerCase().trim()
  )
  return normalizedProgram ? programSkillsMap[normalizedProgram] : programSkillsMap["Master's in Computer Science"]
}