'use client';

import React, { useState, useMemo } from 'react';
import { calculateIndianLoanDynamics, validateLoanPath, INDIAN_BANKS_CRITERIA, REQUIRED_LOAN_DOCUMENTS } from '@/lib/financials';
import { Landmark, FileCheck, ShieldAlert, BadgeIndianRupee, Percent, Calendar } from 'lucide-react';

export default function CopperLoanNavigatorPage() {
  const [principal, setPrincipal] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(11.5);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [courseDuration] = useState<number>(2);
  const [moratoriumBuffer] = useState<number>(6);
  const [taxBracket, setTaxBracket] = useState<number>(0.30);
  const [hasCollateral, setHasCollateral] = useState<boolean>(false);

  const calculationResults = useMemo(() => {
    return calculateIndianLoanDynamics({
      principal,
      interestRate,
      tenureYears,
      courseDurationYears: courseDuration,
      moratoriumBufferMonths: moratoriumBuffer,
      familyIncometaxBracket: taxBracket,
    });
  }, [principal, interestRate, tenureYears, courseDuration, moratoriumBuffer, taxBracket]);

  const pathValidation = useMemo(() => {
    return validateLoanPath(principal, hasCollateral);
  }, [principal, hasCollateral]);

  const formatINR = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 bg-[#FAF8F5] min-h-screen text-stone-800 font-sans antialiased">
      
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#A36A45] tracking-wider uppercase">Financial Strategy</span>
        <h1 className="text-3xl font-black text-stone-900 tracking-tight">Repayment Appraisal Matrix</h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">Simulate tenure dynamics and evaluate elite public vs alternative banking criteria loops.</p>
      </div>

      {/* SECTION 1: BANK CRITERIA MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-stone-400" /> Public & Alternative Banking Parameters
          </h2>
          <div className="space-y-3.5">
            {INDIAN_BANKS_CRITERIA.map((bank, index) => (
              <div key={index} className="p-4 rounded-xl border border-stone-100 bg-stone-50/30 hover:border-stone-300 transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <h3 className="font-bold text-sm text-stone-800">{bank.name}</h3>
                  <span className="text-[10px] bg-stone-50 border border-stone-200 text-stone-700 font-mono font-bold px-2 py-0.5 rounded">Base Rate: {bank.interestRateRange}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-stone-500 font-medium">
                  <p><strong>Unsecured Limit:</strong> {bank.maxUnsecured}</p>
                  <p><strong>Processing Policy:</strong> {bank.processingFee}</p>
                  <p className="md:col-span-2 text-[11px] text-stone-400 italic"><strong>Co-Borrower:</strong> {bank.coBorrowerRequirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Check List */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-stone-400" /> Mandatory Documentation Check
          </h2>
          <ul className="space-y-3 text-xs text-stone-600 font-medium">
            {REQUIRED_LOAN_DOCUMENTS.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-normal">
                <span className="text-[#A36A45] text-xs mt-0.5 shrink-0">✓</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION 2: SIMULATOR & GRID SLATERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-stone-800 border-b pb-2">Repayment Sliders</h2>
          
          {/* Collateral Flag Button Toggle */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">Asset Backing Status</label>
            <div className="grid grid-cols-2 gap-2 bg-stone-50 p-1 rounded-xl border border-stone-200/40">
              <button 
                onClick={() => setHasCollateral(true)}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${hasCollateral ? 'bg-white text-stone-800 shadow-xs border border-stone-200' : 'text-stone-500 hover:text-stone-700'}`}
              >
                With Asset Backing
              </button>
              <button 
                onClick={() => setHasCollateral(false)}
                className={`py-2 rounded-lg text-xs font-semibold transition-all ${!hasCollateral ? 'bg-white text-stone-800 shadow-xs border border-stone-200' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Unsecured Path
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-stone-600 flex items-center gap-1"><BadgeIndianRupee className="w-3.5 h-3.5 text-stone-400" /> Principal Limit</span>
              <span className="text-stone-800 font-mono">{formatINR(principal)}</span>
            </div>
            <input type="range" min="500000" max="10000000" step="50000" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-[#A36A45] h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-stone-600 flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-stone-400" /> Interest Value</span>
              <span className="text-stone-800 font-mono">{interestRate}%</span>
            </div>
            <input type="range" min="7" max="16" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-[#A36A45] h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-stone-600 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" /> Target Tenure</span>
              <span className="text-stone-800 font-mono">{tenureYears} Years</span>
            </div>
            <input type="range" min="3" max="15" step="1" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-[#A36A45] h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-wider">Family Income Slab</label>
            <select value={taxBracket} onChange={(e) => setTaxBracket(Number(e.target.value))} className="w-full p-2.5 border border-stone-200 rounded-xl bg-white text-xs font-semibold">
              <option value={0.00}>Exempt (0%)</option>
              <option value={0.10}>10% Slab</option>
              <option value={0.20}>20% Slab</option>
              <option value={0.30}>30% Slab</option>
            </select>
          </div>
        </div>

        {/* FINANCIAL GRID APPRAISAL STATUS SLATE */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${pathValidation.approved ? 'bg-stone-50 border-stone-200 text-stone-800' : 'bg-orange-50/40 border-orange-200 text-stone-800'}`}>
            <ShieldAlert className="w-5 h-5 text-[#A36A45] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-500">Framework Verification Cap Status</h3>
              <p className="text-xs font-medium text-stone-600 mt-0.5 leading-relaxed">{pathValidation.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-xs flex flex-col justify-between">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">EMI Starting Post-Moratorium</span>
              <div className="text-xl font-black text-stone-800 tracking-tight mt-1">{formatINR(calculationResults.effectiveLoanPrincipalPostMoratorium)}</div>
              <p className="text-[11px] text-stone-400 mt-2 font-medium">Includes total accrued interest of <span className="font-bold text-stone-600">{formatINR(calculationResults.moratoriumInterestAccrued)}</span> generated over course years.</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200/60 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#A36A45]" />
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Calculated Monthly EMI</span>
              <div className="text-2xl font-black text-stone-800 tracking-tight mt-1">{formatINR(calculationResults.emi)} <span className="text-xs font-medium text-stone-400">/ month</span></div>
              <p className="text-[11px] text-stone-500 mt-2 font-medium">Simple interest accumulation applies across active study timeline.</p>
            </div>
          </div>

          {/* Tax Incentives Row */}
          <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">🇮🇳 Section 80E Income Tax Incentives</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-medium">Under the Indian IT Act, you can deduct the complete interest payout components annually from gross income evaluations for 8 consecutive years.</p>
            <div className="grid grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100"><span className="block text-[9px] text-stone-400 font-bold uppercase">Yearly Relief</span><span className="text-xs sm:text-sm font-black text-stone-700">{formatINR(calculationResults.annualSection80ETaxSavings)}</span></div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100"><span className="block text-[9px] text-stone-400 font-bold uppercase">Total Deduction</span><span className="text-xs sm:text-sm font-black text-stone-700">{formatINR(calculationResults.totalSection80ETaxSavings)}</span></div>
              <div className="p-2.5 bg-stone-900 text-white rounded-xl"><span className="block text-[9px] text-stone-300 font-bold uppercase">True Adjusted Cost</span><span className="text-xs sm:text-sm font-black">{formatINR(calculationResults.netEffectiveInterestCost)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}