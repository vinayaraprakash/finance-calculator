"use client";

import { useState, useMemo } from "react";
import { Coins, Calendar } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";

/* ---------------- CONFIG ---------------- */
const MODES = {
  fd: {
    label: "Fixed Deposit",
    icon: Coins,
    amount: { min: 10000, max: 10000000, step: 10000, default: 200000 },
    rate: { min: 3, max: 9, step: 0.1, default: 6.5 },
    tenure: { min: 1, max: 10, step: 1, default: 3 }, // years
  },
  rd: {
    label: "Recurring Deposit",
    icon: Calendar,
    amount: { min: 500, max: 100000, step: 500, default: 5000 },
    rate: { min: 4, max: 9, step: 0.1, default: 6.8 },
    tenure: { min: 6, max: 120, step: 1, default: 36 }, // months
  },
};

/* ---------------- CALCULATIONS ---------------- */
function calculateFD(p: number, r: number, y: number) {
  const n = 4;
  return p * Math.pow(1 + r / 100 / n, n * y);
}

function calculateRD(p: number, r: number, m: number) {
  const rate = r / 100 / 4;
  const t = m / 12;
  return p * ((Math.pow(1 + rate, t * 4) - 1) / (1 - Math.pow(1 + rate, -1 / 3)));
}

export default function FDRDCalculatorClient() {
  const [mode, setMode] = useState<"fd" | "rd">("fd");
  const cfg = MODES[mode];

  const [amount, setAmount] = useState(cfg.amount.default);
  const [rate, setRate] = useState(cfg.rate.default);
  const [tenure, setTenure] = useState(cfg.tenure.default);

  const maturity = useMemo(() => {
    return mode === "fd"
      ? calculateFD(amount, rate, tenure)
      : calculateRD(amount, rate, tenure);
  }, [amount, rate, tenure, mode]);

  const invested =
    mode === "fd" ? amount : amount * tenure;

  const interest = maturity - invested;
  const interestPercent =
    maturity > 0 ? Math.round((interest / maturity) * 100) : 0;

  /* ---------------- COPY / SHARE ---------------- */
  const copyDetails = () => {
    navigator.clipboard.writeText(
      `${cfg.label} Calculation
Invested: ${formatINR(invested)}
Rate: ${rate}%
Tenure: ${tenure} ${mode === "fd" ? "years" : "months"}
Maturity: ${formatINR(maturity)}`
    );
    alert("Details copied");
  };

  const shareDetails = () => {
    const text = `${cfg.label} Maturity Amount: ${formatINR(maturity)}`;
    navigator.share ? navigator.share({ text }) : copyDetails();
  };

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-8">
        <div className="hero-blue rounded-2xl px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">FD / RD Calculator</h1>
          <p className="text-slate-200">
            Calculate maturity amount for Fixed & Recurring Deposits
          </p>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 gap-4">
        {Object.entries(MODES).map(([key, val]) => {
          const Icon = val.icon;
          const active = mode === key;

          return (
            <button
              key={key}
              onClick={() => {
                setMode(key as any);
                setAmount(val.amount.default);
                setRate(val.rate.default);
                setTenure(val.tenure.default);
              }}
              className={`card-hero flex items-center gap-3 ${
                active ? "ring-2 ring-hero-blue" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-hero-blue" />
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
          <label className="font-medium">
            {mode === "fd" ? "Deposit Amount" : "Monthly Deposit"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full mt-2 mb-3 px-3 py-2 border-2 border-hero-blue rounded-lg"
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
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="w-full mt-2 mb-3 px-3 py-2 border-2 border-hero-blue rounded-lg"
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
          <label className="font-medium mt-6 block">
            Tenure ({mode === "fd" ? "Years" : "Months"})
          </label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(+e.target.value)}
            className="w-full mt-2 mb-3 px-3 py-2 border-2 border-hero-blue rounded-lg"
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
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Maturity Amount</p>
          <p className="text-3xl font-extrabold text-hero-blue mt-2">
            {formatINR(maturity)}
          </p>

          {/* DONUT */}
          <div className="relative w-44 h-44 mx-auto my-6">
            <svg viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2 a 16 16 0 1 1 0 32"
              />
              <path
                stroke="#0b2c5d"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${interestPercent},100`}
                style={{ transition: "stroke-dasharray 0.8s ease" }}
                d="M18 2 a 16 16 0 1 1 0 32"
              />
            </svg>
          </div>

          <div className="text-left text-sm space-y-2">
            <p>Invested: <strong>{formatINR(invested)}</strong></p>
            <p>Interest: <strong>{formatINR(interest)}</strong></p>
            <p className="border-t pt-2">
              Total: <strong>{formatINR(maturity)}</strong>
            </p>
          
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={copyDetails} className="flex-1 border rounded-lg py-2">
              📋 Copy
            </button>
            <button onClick={shareDetails} className="flex-1 border rounded-lg py-2">
              🔗 Share
            </button>
          </div>
  <p className="text-xs text-gray-500 mt-3">
  Results are for informational purposes only and may vary.
</p>
          <button className="mt-6 w-full bg-hero-blue text-white py-3 rounded-lg font-semibold">
            Invest Now
          </button>
        </div>
      </div>

      {/* ================= AD ================= */}
      <div className="max-w-5xl mx-auto px-4 my-12">
        <AdPlaceholder />
      </div>
      {/* ================= FAQ ================= */}
<div className="max-w-5xl mx-auto px-4 mt-16">
  <h2 className="text-2xl font-bold mb-6">
    FD & RD Calculator FAQs
  </h2>

  <div className="space-y-4">
    {[
      {
        q: "What is the difference between FD and RD?",
        a: "A Fixed Deposit is a one-time investment, while a Recurring Deposit involves monthly contributions."
      },
      {
        q: "How is FD maturity calculated?",
        a: "FD maturity is calculated using compound interest, usually compounded quarterly by banks."
      },
      {
        q: "Is RD interest compounded?",
        a: "Yes, RD interest is compounded quarterly, similar to FD."
      },
      {
        q: "Are these calculations accurate?",
        a: "The calculator uses standard banking formulas. Actual maturity may vary slightly by bank."
      }
    ].map((item, idx) => (
      <details
        key={idx}
        className="group rounded-lg border p-4 cursor-pointer"
      >
        <summary className="font-semibold flex justify-between items-center">
          {item.q}
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>
        <p className="mt-3 text-gray-600">
          {item.a}
        </p>
      </details>
    ))}
  </div>
</div>

      {/* ================= MOBILE STICKY BAR ================= */}
<div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg px-4 py-3 flex items-center justify-between">
  <div>
    <p className="text-xs text-gray-500">Maturity Amount</p>
    <p className="font-bold text-hero-blue">
      {formatINR(maturity)}
    </p>
  </div>

  <button
    onClick={() =>
      document
        .getElementById("fd-rd-result")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    className="text-sm font-semibold text-hero-blue"
  >
    View Details
  </button>
</div>

    </>
  );
}
