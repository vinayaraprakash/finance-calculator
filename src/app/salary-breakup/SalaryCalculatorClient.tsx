"use client";

import { useState, useMemo } from "react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";

/* ---------------- TAX HELPERS ---------------- */
const calcNewTax = (income: number) => {
  const slabs = [
    [300000, 0],
    [300000, 0.05],
    [300000, 0.1],
    [300000, 0.15],
    [300000, 0.2],
    [Infinity, 0.3],
  ];

  let remaining = income;
  let tax = 0;

  for (const [limit, rate] of slabs) {
    const taxable = Math.min(limit, remaining);
    tax += taxable * rate;
    remaining -= taxable;
    if (remaining <= 0) break;
  }

  return tax * 1.04; // 4% cess
};

const calcOldTax = (income: number) => {
  let tax = 0;

  if (income > 1000000) {
    tax += (income - 1000000) * 0.3;
    income = 1000000;
  }
  if (income > 500000) {
    tax += (income - 500000) * 0.2;
    income = 500000;
  }
  if (income > 250000) {
    tax += (income - 250000) * 0.05;
  }

  return tax * 1.04; // 4% cess
};

/* ---------------- COMPONENT ---------------- */
export default function SalaryCalculatorClient() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(40);
  const [hraPct, setHraPct] = useState(40);
  const [regime, setRegime] = useState<"old" | "new">("new");

  /* ---------------- SALARY LOGIC ---------------- */
  const salary = useMemo(() => {
    // Annual components
    const annualBasic = (ctc * basicPct) / 100;
    const employerPF = annualBasic * 0.12;
    const gratuity = annualBasic * 0.0481;

    const grossAnnual = ctc - employerPF - gratuity;
    const grossMonthly = grossAnnual / 12;

    // Monthly components
    const basic = annualBasic / 12;
    const hra = (basic * hraPct) / 100;

    // Deductions
    const employeePF = basic * 0.12;
    const professionalTax = 200;

    // Taxable income
    const taxableNew = Math.max(0, grossAnnual - 50000);
    const taxableOld = Math.max(0, grossAnnual - 50000 - 150000);

    const annualTaxNew = calcNewTax(taxableNew);
    const annualTaxOld = calcOldTax(taxableOld);

    const monthlyTaxNew = annualTaxNew / 12;
    const monthlyTaxOld = annualTaxOld / 12;

    const takeHomeNew =
      grossMonthly - employeePF - professionalTax - monthlyTaxNew;

    const takeHomeOld =
      grossMonthly - employeePF - professionalTax - monthlyTaxOld;

    return {
      basic,
      hra,
      gross: grossMonthly,
      employeePF,
      taxNew: monthlyTaxNew,
      taxOld: monthlyTaxOld,
      deductionsNew: employeePF + professionalTax + monthlyTaxNew,
      deductionsOld: employeePF + professionalTax + monthlyTaxOld,
      takeHomeNew,
      takeHomeOld,
      annual: {
        gross: grossAnnual,
        employeePF: employeePF * 12,
        taxNew: annualTaxNew,
        taxOld: annualTaxOld,
        takeHomeNew: takeHomeNew * 12,
        takeHomeOld: takeHomeOld * 12,
      },
    };
  }, [ctc, basicPct, hraPct]);

  const activeTax =
    regime === "new" ? salary.taxNew : salary.taxOld;

  const activeTakeHome =
    regime === "new" ? salary.takeHomeNew : salary.takeHomeOld;

  const activeDeductions =
    regime === "new"
      ? salary.deductionsNew
      : salary.deductionsOld;

  const bestRegime =
    salary.annual.takeHomeOld > salary.annual.takeHomeNew
      ? "old"
      : "new";

  const deductionPercent =
    salary.gross > 0
      ? Math.round((activeDeductions / salary.gross) * 100)
      : 0;

  /* ---------------- COPY / SHARE ---------------- */
  const copySalary = () => {
    navigator.clipboard.writeText(
      `Salary Breakup
CTC: ${formatINR(ctc)}
Monthly Take Home: ${formatINR(activeTakeHome)}
Tax Regime: ${regime.toUpperCase()}`
    );
    alert("Salary breakup copied");
  };

  const shareSalary = () => {
    const text = `Monthly Take Home: ${formatINR(activeTakeHome)}`;
    if (navigator.share) navigator.share({ text });
    else copySalary();
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-8">
        <div className="hero-blue rounded-2xl px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Salary Breakup Calculator
          </h1>
          <p className="text-slate-200">
            Old vs New Tax Regime Comparison
          </p>
        </div>
      </div>

      {/* ================= REGIME TOGGLE ================= */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 gap-4 mb-8">
        {(["new", "old"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`card-hero ${
              regime === r ? "ring-2 ring-hero-blue" : ""
            }`}
          >
            <span className="font-semibold capitalize">
              {r} Regime
            </span>
            {bestRegime === r && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                🏆 Best
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder />
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INPUT CARD */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-hero-blue mb-6">
            Salary Inputs
          </h2>

          <label className="font-medium">Annual CTC</label>
          <input
            type="number"
            value={ctc}
            onChange={(e) => setCtc(+e.target.value)}
            className="w-full mt-2 mb-4 px-3 py-2 border-2 border-hero-blue rounded-lg"
          />

          <label className="font-medium">Basic Salary (%)</label>
          <input
            type="range"
            min={30}
            max={60}
            value={basicPct}
            onChange={(e) => setBasicPct(+e.target.value)}
            className="w-full slider-hero"
          />
          <p className="text-sm mt-1">{basicPct}%</p>

          <label className="font-medium mt-4 block">
            HRA (% of Basic)
          </label>
          <input
            type="range"
            min={30}
            max={50}
            value={hraPct}
            onChange={(e) => setHraPct(+e.target.value)}
            className="w-full slider-hero"
          />
          <p className="text-sm mt-1">{hraPct}%</p>
        </div>

        {/* RESULT CARD */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500">Monthly Take-Home</p>
          <p className="text-3xl font-extrabold text-hero-blue mt-2">
            {formatINR(activeTakeHome)}
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
                strokeDasharray={`${100 - deductionPercent},100`}
                style={{ transition: "stroke-dasharray 0.8s ease" }}
                d="M18 2 a 16 16 0 1 1 0 32"
              />
            </svg>
          </div>

          <div className="text-left text-sm space-y-2">
            <p>Gross: <strong>{formatINR(salary.gross)}</strong></p>
            <p>
              Deductions:{" "}
              <strong>
                {formatINR(activeDeductions)} ({deductionPercent}%)
              </strong>
            </p>
            <p className="border-t pt-2">
              PF: <strong>{formatINR(salary.employeePF)}</strong>
            </p>
            <p>
              Income Tax: <strong>{formatINR(activeTax)}</strong>
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={copySalary} className="flex-1 border rounded-lg py-2">
              📋 Copy
            </button>
            <button onClick={shareSalary} className="flex-1 border rounded-lg py-2">
              🔗 Share
            </button>
          </div>
          <span>
        <p className="text-xs text-gray-500 mt-3">
  Results are for informational purposes only and may vary.
</p>
    </span>
        </div>
      </div>
<       div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder />
      </div>
      {/* ================= ANNUAL + MONTHLY BREAKDOWN ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-hero-blue mb-6">
            Annual Salary Breakdown (with Monthly View)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-2 text-left">Component</th>
                  <th className="py-2 text-right">Annual</th>
                  <th className="py-2 text-right">Monthly</th>
                </tr>
              </thead>

              <tbody>
                <tr className="font-semibold border-b">
                  <td className="py-2">CTC</td>
                  <td className="py-2 text-right">{formatINR(ctc)}</td>
                  <td className="py-2 text-right">{formatINR(ctc / 12)}</td>
                </tr>

                <tr className="border-b text-red-600">
                  <td className="py-2 pl-4">Employer PF</td>
                  <td className="py-2 text-right">
                    − {formatINR((ctc * basicPct / 100) * 0.12)}
                  </td>
                  <td className="py-2 text-right">
                    − {formatINR((ctc * basicPct / 100) * 0.12 / 12)}
                  </td>
                </tr>

                <tr className="border-b text-red-600">
                  <td className="py-2 pl-4">Gratuity</td>
                  <td className="py-2 text-right">
                    − {formatINR((ctc * basicPct / 100) * 0.0481)}
                  </td>
                  <td className="py-2 text-right">
                    − {formatINR((ctc * basicPct / 100) * 0.0481 / 12)}
                  </td>
                </tr>

                <tr className="border-b bg-blue-50 font-bold text-hero-blue">
                  <td className="py-2">Gross Salary</td>
                  <td className="py-2 text-right">
                    {formatINR(salary.annual.gross)}
                  </td>
                  <td className="py-2 text-right">
                    {formatINR(salary.gross)}
                  </td>
                </tr>

                <tr className="border-b text-red-600">
                  <td className="py-2 pl-4">Employee PF</td>
                  <td className="py-2 text-right">
                    − {formatINR(salary.annual.employeePF)}
                  </td>
                  <td className="py-2 text-right">
                    − {formatINR(salary.employeePF)}
                  </td>
                </tr>

                <tr className="border-b text-red-600">
                  <td className="py-2 pl-4">
                    Income Tax ({regime.toUpperCase()}, incl. cess)
                  </td>
                  <td className="py-2 text-right">
                    − {formatINR(
                      regime === "new"
                        ? salary.annual.taxNew
                        : salary.annual.taxOld
                    )}
                  </td>
                  <td className="py-2 text-right">
                    − {formatINR(activeTax)}
                  </td>
                </tr>

                <tr className="border-b text-red-600">
                  <td className="py-2 pl-4">Professional Tax</td>
                  <td className="py-2 text-right">− {formatINR(2400)}</td>
                  <td className="py-2 text-right">− {formatINR(200)}</td>
                </tr>

                <tr className="bg-green-50 font-extrabold text-green-700">
                  <td className="py-3">Take-Home Salary</td>
                  <td className="py-3 text-right">
                    {formatINR(
                      regime === "new"
                        ? salary.annual.takeHomeNew
                        : salary.annual.takeHomeOld
                    )}
                  </td>
                  <td className="py-3 text-right">
                    {formatINR(activeTakeHome)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Education cess (4%) is already included in income tax.
          </p>
        </div>
      </div>

      {/* ================= FAQ ================= */}
<div className="max-w-5xl mx-auto px-4 mt-16">
  <h2 className="text-2xl font-bold mb-6">
    Salary Breakup Calculator FAQs
  </h2>

  <div className="space-y-4">
    {[
      {
        q: "How is take-home salary calculated?",
        a: "Take-home salary is calculated by subtracting employee PF, professional tax, and income tax (including 4% cess) from your gross salary."
      },
      {
        q: "What is the difference between CTC and Gross Salary?",
        a: "CTC includes employer PF and gratuity. Gross salary is what you earn before personal deductions like employee PF and tax."
      },
      {
        q: "Why is employer PF deducted from CTC?",
        a: "Employer PF is part of your CTC but not paid to you directly. It is deposited into your PF account, so it is removed to calculate gross salary."
      },
      {
        q: "Which tax regime gives higher take-home salary?",
        a: "It depends on your income and deductions. This calculator automatically highlights the best regime based on higher take-home."
      },
      {
        q: "Is education cess included in tax?",
        a: "Yes. A 4% education cess is applied on income tax in both old and new tax regimes and is already included in calculations."
      },
      {
        q: "Is this salary calculator accurate?",
        a: "This calculator provides close estimates using standard Indian salary structures. Actual salary may vary based on company policies."
      }
    ].map((faq, i) => (
      <details
        key={i}
        className="group border rounded-lg p-4 cursor-pointer"
      >
        <summary className="font-semibold flex justify-between items-center">
          {faq.q}
          <span className="transition group-open:rotate-180">⌄</span>
        </summary>
        <p className="mt-3 text-gray-600">
          {faq.a}
        </p>
      </details>
    ))}
  </div>
</div>


      {/* ================= MOBILE STICKY ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow px-4 py-3 flex justify-between items-center z-50">
        <span className="font-semibold">
          Best Take-Home:{" "}
          {formatINR(
            bestRegime === "new"
              ? salary.takeHomeNew
              : salary.takeHomeOld
          )}
        </span>
        <span className="text-xs text-green-600 font-semibold">
          🏆 Best Regime
        </span>
      </div>
    </>
  );
}
