"use client";

import { useState } from "react";
import { calculateGST, GSTType, GSTMode } from "@/lib/gst";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";
import ThemeToggle from "@/components/ThemeToggle";
import { useCountUp } from "@/hooks/useCountUp";

/* FAQ DATA */
const faqs = [
  {
    q: "What is GST?",
    a: "GST (Goods and Services Tax) is a unified indirect tax levied on goods and services in India.",
  },
  {
    q: "How is GST calculated?",
    a: "GST is calculated by multiplying the taxable value with the applicable GST rate.",
  },
  {
    q: "What is the difference between inclusive and exclusive GST?",
    a: "Exclusive GST is added to the base price, while inclusive GST already includes GST.",
  },
  {
    q: "What is IGST and when is it applicable?",
    a: "IGST applies to inter-state transactions where buyer and seller are in different states.",
  },
];

export default function GSTCalculatorClient() {
  const [amount, setAmount] = useState<number | null>(null);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<GSTType>("exclusive");
  const [mode, setMode] = useState<GSTMode>("cgst_sgst");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const result = amount
    ? calculateGST(amount, rate, type, mode)
    : null;

  const animatedTotal = useCountUp(result?.totalAmount || 0);

  const copyBreakdown = () => {
    const text = `
GST Calculation
Amount: ${amount ?? 0}
Rate: ${rate}%
Base Amount: ${formatINR(result?.baseAmount ?? 0)}
GST: ${formatINR(result?.gstAmount ?? 0)}
Total: ${formatINR(result?.totalAmount ?? 0)}
    `;
    navigator.clipboard.writeText(text);
    alert("GST breakdown copied!");
  };

  const shareCalculation = () => {
    const text = `GST Calculation
Amount: ${amount ?? 0}
Rate: ${rate}%
Total: ${formatINR(result?.totalAmount ?? 0)}`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Calculation copied!");
    }
  };

  return (
    <>
      {/* PAGE WRAPPER */}
      <div className="max-w-2xl mx-auto px-4  dark:text-gray-100">

        {/* HEADER */}
        <section className="hero-blue rounded-2xl mb-10">
{/* PAGE HEADER */}
<div className="max-w-2xl mx-auto px-4 mt-6 mb-8">
  <div className="bg-hero-blue rounded-2xl px-6 py-8 text-white">
    <div className="flex justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          GST Calculator
        </h1>
        <p className="text-slate-200">
          Calculate GST with CGST, SGST or IGST breakdown.
        </p>
      </div>
    </div>
  </div>
</div>

</section>

        <AdPlaceholder />

        {/* INPUT + BREAKDOWN CARD */}
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6 mt-6">

          <h2 className="text-lg font-semibold text-hero-blue mb-4">
            Enter Details
          </h2>

          {/* AMOUNT */}
          <label className="block mb-1 font-medium">
            Amount (₹)
          </label>
          <input
            type="number"
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : null)
            }
          />

          {/* GST RATE */}
          <label className="block mt-4 mb-1 font-medium flex items-center gap-2">
            GST Rate (%)
            <span
              title="Common GST rates: 5%, 12%, 18%, 28%"
              className="cursor-help text-gray-400"
            >
              ⓘ
            </span>
          </label>
          <select
            className="w-full p-3 rounded-lg border"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {[5, 12, 18, 28].map((r) => (
              <option key={r} value={r}>
                {r}%
              </option>
            ))}
          </select>

          {/* GST TYPE */}
          <label className="block mt-4 mb-1 font-medium">
            GST Type
          </label>
          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                className="accent-blue-600"
                checked={type === "exclusive"}
                onChange={() => setType("exclusive")}
              />{" "}
              Exclusive
            </label>
            <label>
              <input
                type="radio"
                className="accent-blue-600"
                checked={type === "inclusive"}
                onChange={() => setType("inclusive")}
              />{" "}
              Inclusive
            </label>
          </div>

          {/* GST MODE */}
          <label className="block mt-4 mb-1 font-medium">
            GST Mode
          </label>
          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                className="accent-blue-600"
                checked={mode === "cgst_sgst"}
                onChange={() => setMode("cgst_sgst")}
              />{" "}
              CGST + SGST
            </label>
            <label>
              <input
                type="radio"
                className="accent-blue-600"
                checked={mode === "igst"}
                onChange={() => setMode("igst")}
              />{" "}
              IGST
            </label>
          </div>

          {/* DIVIDER */}
          <div className="border-t my-6" />

          {/* GST BREAKDOWN (ALWAYS VISIBLE) */}
         {/* GST BREAKDOWN */}
<div id="gst-breakdown" className="mt-6">
  <h3 className="text-lg font-semibold text-hero-blue mb-4">
    GST Breakdown
  </h3>

  <div className="space-y-3 text-sm">
    {/* Base */}
    <div className="flex justify-between">
      <span >Base Amount</span>
      <span className="font-medium">
        {formatINR(result?.baseAmount ?? 0)}
      </span>
    </div>

    {/* Taxes */}
    {mode === "igst" ? (
      <div className="flex justify-between">
        <span >IGST ({rate}%)</span>
        <span className="font-medium">
          {formatINR(result?.igst ?? 0)}
        </span>
      </div>
    ) : (
      <>
        <div className="flex justify-between">
          <span>CGST ({rate / 2}%)</span>
          <span className="font-medium">
            {formatINR(result?.cgst ?? 0)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>SGST ({rate / 2}%)</span>
          <span className="font-medium">
            {formatINR(result?.sgst ?? 0)}
          </span>
        </div>
      </>
    )}
  </div>

  {/* Divider */}
  <div className="border-t my-4" />

  {/* TOTAL */}
  <div className="flex justify-between items-center">
    <span className="text-base font-semibold">
      Total Amount
    </span>
    <span className="text-xl font-bold text-green-600">
      {formatINR(animatedTotal)}
    </span>
    
  </div>

  {/* ACTIONS */}
  <div className="flex gap-3 mt-4">
    <button
      onClick={copyBreakdown}
      className="px-4 py-2 text-sm border rounded-lg"
    >
      📋 Copy
    </button>
    <button
      onClick={shareCalculation}
      className="px-4 py-2 text-sm border rounded-lg hover"
    >
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

        {/* MID AD */}
        <div className="my-10">
          <AdPlaceholder />
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-2xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-lg"
            >
              <button
                className="w-full p-4 flex justify-between text-left font-semibold"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <span>{openFaq === i ? "−" : "˅"}</span>
              </button>

              {openFaq === i && (
                <div className="px-4 pb-4 text-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AdPlaceholder />
        </div>
      </div>

      {/* MOBILE STICKY TOTAL */}
      {result && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden px-4 py-3 flex justify-between items-center z-50">
          <span className="font-semibold">
            Total: {formatINR(animatedTotal)}
          </span>
          <button
            className="text-hero-blue font-semibold"
            onClick={() =>
              document
                .getElementById("gst-breakdown")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Breakdown
          </button>
        </div>
      )}
    </>
  );
}
