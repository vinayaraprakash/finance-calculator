"use client";

import { useState } from "react";
import AdPlaceholder from "@/components/AdPlaceholder";

const SECTIONS = [
  { key: "all", label: "All" },
  { key: "emi", label: "EMI" },
  { key: "gst", label: "GST" },
  { key: "fd", label: "FD / RD" },
  { key: "salary", label: "Salary" },
  { key: "retirement", label: "NPS / PPF / Gratuity" },
];

export default function FinanceGuidesPage() {
  const [active, setActive] = useState("all");

  const show = (key: string) => active === "all" || active === key;

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-10">
        <div className="hero-blue rounded-2xl px-6 py-10 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Finance Guides & Calculations Explained
          </h1>
          <p className="text-slate-200 max-w-3xl">
            Learn how EMI, GST, Salary, FD, RD, NPS, PPF and Gratuity
            calculations work — explained simply with examples.
          </p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-6 gap-3 mb-10">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`card-hero text-sm font-semibold transition
              ${
                active === s.key
                  ? "ring-2 ring-hero-blue text-hero-blue"
                  : "hover:scale-[1.02]"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ================= AD ================= */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <AdPlaceholder />
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-12 leading-relaxed text-gray-700">

        {/* ================= EMI ================= */}
        {show("emi") && (
          <section className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-hero-blue mb-4">
              How EMI is Calculated in India
            </h2>

            <p>
              EMI (Equated Monthly Installment) is the fixed monthly payment
              you make towards a loan. It includes both principal repayment
              and interest.
            </p>

            <p className="mt-3">
              EMI depends on three factors:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>Loan Amount</li>
              <li>Interest Rate</li>
              <li>Loan Tenure</li>
            </ul>

            <p className="mt-4 font-semibold">EMI Formula:</p>

            <p className="bg-gray-50 p-3 rounded-lg text-sm mt-2">
              EMI = P × r × (1 + r)<sup>n</sup> / [(1 + r)<sup>n</sup> − 1]
            </p>

            <p className="mt-4">
              Home loans usually have lower EMI due to longer tenure and
              lower interest rates, while personal loans have higher EMI.
            </p>
          </section>
        )}

        {/* ================= GST ================= */}
        {show("gst") && (
          <section className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-hero-blue mb-4">
              GST Calculation Explained (CGST, SGST & IGST)
            </h2>

            <p>
              GST (Goods and Services Tax) is an indirect tax applied on goods
              and services in India.
            </p>

            <p className="mt-3">
              There are two main calculation types:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>Exclusive GST – tax added on base price</li>
              <li>Inclusive GST – tax already included in price</li>
            </ul>

            <p className="mt-4">
              For intra-state sales, GST is split into CGST and SGST.
              For inter-state sales, IGST applies.
            </p>

            <p className="mt-3">
              GST rates in India are typically 5%, 12%, 18% and 28%.
            </p>
          </section>
        )}

        {/* ================= FD / RD ================= */}
        {show("fd") && (
          <section className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-hero-blue mb-4">
              FD & RD Maturity Calculation
            </h2>

            <p>
              Fixed Deposits (FD) and Recurring Deposits (RD) are popular
              low-risk investment options in India.
            </p>

            <p className="mt-3">
              FD earns compound interest on a lump sum investment, while
              RD grows through monthly contributions.
            </p>

            <p className="mt-4 font-semibold">FD Formula:</p>
            <p className="bg-gray-50 p-3 rounded-lg text-sm mt-2">
              A = P × (1 + r/n)<sup>n×t</sup>
            </p>

            <p className="mt-4 font-semibold">RD Calculation:</p>
            <p>
              RD maturity depends on monthly deposits, tenure and interest rate.
            </p>
          </section>
        )}

        {/* ================= SALARY ================= */}
        {show("salary") && (
          <section className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-hero-blue mb-4">
              Salary Breakup & Take-Home Calculation
            </h2>

            <p>
              Your CTC (Cost to Company) is not your take-home salary.
            </p>

            <p className="mt-3">
              Take-home salary is calculated after:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>Employer PF & Gratuity deduction</li>
              <li>Employee PF</li>
              <li>Income tax (Old or New regime)</li>
              <li>Professional tax</li>
            </ul>

            <p className="mt-4">
              Choosing the right tax regime can significantly impact your
              monthly salary.
            </p>
          </section>
        )}

        {/* ================= RETIREMENT ================= */}
        {show("retirement") && (
          <section className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-hero-blue mb-4">
              NPS, PPF & Gratuity Explained
            </h2>

            <p>
              These are long-term retirement and savings instruments.
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>PPF – Safe, tax-free, government backed</li>
              <li>NPS – Market-linked retirement corpus</li>
              <li>Gratuity – Employer benefit after 5 years of service</li>
            </ul>

            <p className="mt-4">
              Each has different tax benefits and withdrawal rules.
            </p>
          </section>
        )}

      </div>

      {/* ================= FAQ ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-16 mb-20">
        <h2 className="text-2xl font-bold mb-6">
          Finance Guides FAQs
        </h2>

        {[
          {
            q: "Are these guides accurate?",
            a: "Yes, calculations are based on standard financial formulas. Actual results may vary based on bank policies.",
          },
          {
            q: "Can I rely on these guides for tax filing?",
            a: "These guides are for understanding and estimation only. Always consult a tax professional.",
          },
        ].map((f, i) => (
          <details key={i} className="group border rounded-lg p-4 mb-4">
            <summary className="font-semibold cursor-pointer flex justify-between">
              {f.q}
              <span className="group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-gray-600">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
