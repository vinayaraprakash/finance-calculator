"use client";

import { useState, useMemo } from "react";
import {
  Home,
  CreditCard,
  Car,
  Coins,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";

/* ---------------- CONFIG ---------------- */
const LOANS = {
  home: {
    label: "Home Loan",
    icon: Home,
    amount: { min: 500000, max: 50000000, step: 50000, default: 3000000 },
    rate: { min: 8.4, max: 11, step: 0.05, default: 8.6 },
    tenure: { min: 5, max: 30, step: 1, default: 20 },
  },
  personal: {
    label: "Personal Loan",
    icon: CreditCard,
    amount: { min: 50000, max: 4000000, step: 10000, default: 500000 },
    rate: { min: 10.5, max: 24, step: 0.1, default: 14 },
    tenure: { min: 1, max: 5, step: 1, default: 3 },
  },
  car: {
    label: "Car Loan",
    icon: Car,
    amount: { min: 100000, max: 5000000, step: 25000, default: 800000 },
    rate: { min: 8.75, max: 15, step: 0.1, default: 9 },
    tenure: { min: 1, max: 7, step: 1, default: 5 },
  },
  gold: {
    label: "Gold Loan",
    icon: Coins,
    amount: { min: 25000, max: 5000000, step: 10000, default: 300000 },
    rate: { min: 7, max: 17, step: 0.1, default: 10 },
    tenure: { min: 1, max: 5, step: 1, default: 2 },
  },
};

/* ---------------- EMI LOGIC ---------------- */
function calculateEMI(p: number, r: number, y: number) {
  if (p <= 0 || r <= 0 || y <= 0) {
    return { emi: 0, total: 0, interest: 0, months: 0 };
  }

  const mRate = r / 12 / 100;
  const months = y * 12;

  const emi =
    (p * mRate * Math.pow(1 + mRate, months)) /
    (Math.pow(1 + mRate, months) - 1);

  const total = emi * months;
  const interest = total - p;

  return { emi, total, interest, months };
}

/* ---------------- FAQ ---------------- */
const faqs = [
  {
    q: "How is EMI calculated?",
    a: "EMI is calculated using loan amount, interest rate and tenure using a reducing balance formula.",
  },
  {
    q: "Which loan has the lowest EMI?",
    a: "Home loans usually have lower EMIs due to longer tenure and lower interest rates.",
  },
  {
    q: "Can EMI change in future?",
    a: "Yes, EMI can change if the interest rate is floating or if you make prepayments.",
  },
];

export default function EMICalculatorClient() {
  const [loanType, setLoanType] = useState<keyof typeof LOANS>("home");
  const cfg = LOANS[loanType];

  const [amount, setAmount] = useState(cfg.amount.default);
  const [rate, setRate] = useState(cfg.rate.default);
  const [tenure, setTenure] = useState(cfg.tenure.default);
  const [showTable, setShowTable] = useState(false);

  const { emi, total, interest, months } = useMemo(
    () => calculateEMI(amount, rate, tenure),
    [amount, rate, tenure]
  );

  const principalPercent = total > 0 ? Math.round((amount / total) * 100) : 0;

  /* ---------------- COPY / SHARE ---------------- */
  const copyEMI = () => {
    navigator.clipboard.writeText(
      `EMI Details
Loan: ${cfg.label}
Amount: ${formatINR(amount)}
Rate: ${rate}%
Tenure: ${tenure} years
Monthly EMI: ${formatINR(emi)}`
    );
    alert("EMI details copied");
  };

  const shareEMI = () => {
    const text = `Monthly ${cfg.label} EMI: ${formatINR(emi)}`;
    navigator.share ? navigator.share({ text }) : copyEMI();
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-10">
        <div className="hero-blue rounded-2xl px-6 py-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">
              EMI Calculator
            </h1>
            <p className="text-slate-200">
              Calculate EMI for Home, Personal, Car & Gold Loans.
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(LOANS).map(([key, val]) => {
          const Icon = val.icon;
          const active = loanType === key;

          return (
            <button
              key={key}
              onClick={() => {
                setLoanType(key as any);
                setAmount(val.amount.default);
                setRate(val.rate.default);
                setTenure(val.tenure.default);
              }}
              className={`card-hero flex items-center gap-3 transition-all
                ${active ? "ring-2 ring-hero-blue scale-[1.03]" : "hover:scale-[1.02]"}
              `}
            >
              <Icon
                className={`w-5 h-5 ${
                  active ? "text-hero-blue" : "text-gray-600"
                }`}
              />
              <span className="font-semibold">{val.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= AD ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <AdPlaceholder />
      </div>

      {/* ================= CALCULATOR ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INPUT CARD */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-hero-blue mb-6">
            {cfg.label} Details
          </h2>

          {/* Amount */}
          <label className="font-medium">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full mt-1 mb-2 px-3 py-2 border-2 border-hero-blue rounded-lg"
          />
          <input
            type="range"
            min={cfg.amount.min}
            max={cfg.amount.max}
            step={cfg.amount.step}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full slider-hero"
          />

          {/* Rate */}
          <label className="font-medium mt-6 block">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full mt-1 mb-2 px-3 py-2 border-2 border-hero-blue rounded-lg"
          />
          <input
            type="range"
            min={cfg.rate.min}
            max={cfg.rate.max}
            step={cfg.rate.step}
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full slider-hero"
          />

          {/* Tenure */}
          <label className="font-medium mt-6 block">Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(+e.target.value)}
            className="w-full mt-1 mb-2 px-3 py-2 border-2 border-hero-blue rounded-lg"
          />
          <input
            type="range"
            min={cfg.tenure.min}
            max={cfg.tenure.max}
            step={cfg.tenure.step}
            value={tenure}
            onChange={(e) => setTenure(+e.target.value)}
            className="w-full slider-hero"
          />
        </div>

        {/* RESULT CARD */}
        <div
          id="emi-breakdown"
          className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm text-center"
        >
          <p className="text-sm text-gray-500">
            Monthly {cfg.label} EMI
          </p>
          <p className="text-3xl font-extrabold text-hero-blue mt-2">
            {formatINR(emi)}
          </p>

          {/* DONUT */}
          <div className="relative w-44 h-44 mx-auto my-6">
            <svg viewBox="0 0 36 36">
              <path
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200"
                fill="none"
                d="M18 2 a 16 16 0 1 1 0 32"
              />
              <path
                stroke="#0b2c5d"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${principalPercent},100`}
                style={{ transition: "stroke-dasharray 0.8s ease" }}
                d="M18 2 a 16 16 0 1 1 0 32"
              />
            </svg>
          </div>

          <div className="text-left text-sm space-y-2">
            <p>Principal: <strong>{formatINR(amount)}</strong></p>
            <p>Interest: <strong>{formatINR(interest)}</strong></p>
            <p className="border-t pt-2">
              Total Payable: <strong>{formatINR(total)}</strong>
            </p>
            
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={copyEMI} className="flex-1 border rounded-lg py-2">
              📋 Copy
            </button>
            <button onClick={shareEMI} className="flex-1 border rounded-lg py-2">
              🔗 Share
            </button>
          </div>
           <span>
        <p className="text-xs text-gray-500 mt-3">
  Results are for informational purposes only and may vary.
</p>
    </span>

          <button className="mt-6 w-full bg-hero-blue text-white py-3 rounded-lg font-semibold">
            Apply Now
          </button>
        </div>
      </div>

      {/* ================= AMORTIZATION ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <button
          onClick={() => setShowTable(!showTable)}
          className="font-semibold text-hero-blue"
        >
          {showTable ? "Hide" : "View"} Loan Amortization Table
        </button>

        {showTable && (
          <div className="mt-6 bg-white border rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th>Month</th>
                  <th>EMI</th>
                  <th>Interest</th>
                  <th>Principal</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(Math.min(months, 12))].map((_, i) => (
                  <tr key={i} className="border-b">
                    <td>{i + 1}</td>
                    <td>{formatINR(emi)}</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= FAQ ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold mb-6">
          EMI Calculator FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group border rounded-lg p-4">
              <summary className="font-semibold cursor-pointer flex justify-between">
                {f.q}
                <span className="group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 my-12">
        <AdPlaceholder />
      </div>

      {/* ================= STICKY MOBILE EMI ================= */}
      {emi > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Monthly EMI</p>
              <p className="font-bold text-hero-blue">
                {formatINR(emi)}
              </p>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("emi-breakdown")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-hero-blue text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              View Details
            </button>
          </div>
        </div>
      )}
    </>
  );
}
