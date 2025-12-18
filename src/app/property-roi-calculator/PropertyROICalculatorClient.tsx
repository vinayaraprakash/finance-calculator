"use client";

import { useState, useMemo } from "react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";

/* ================= HELPERS ================= */
const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("ROI details copied");
};

const shareText = async (text: string) => {
  if (navigator.share) {
    await navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text);
    alert("ROI details copied");
  }
};

export default function PropertyROICalculatorClient() {
  /* ================= INPUTS ================= */
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [annualAppreciation, setAnnualAppreciation] = useState(6);
  const [years, setYears] = useState(10);

  /* ================= CALCULATIONS ================= */
  const calc = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const totalRent = annualRent * years;

    const futureValue =
      propertyPrice *
      Math.pow(1 + annualAppreciation / 100, years);

    const capitalGain = futureValue - propertyPrice;

    const totalReturn = totalRent + capitalGain;

    const roiPercent =
      (totalReturn / propertyPrice) * 100;

    const annualROI = roiPercent / years;

    const rentalYield =
      (annualRent / propertyPrice) * 100;

    return {
      annualRent,
      totalRent,
      futureValue,
      capitalGain,
      totalReturn,
      roiPercent,
      annualROI,
      rentalYield,
    };
  }, [propertyPrice, monthlyRent, annualAppreciation, years]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-10">
        <div className="hero-blue rounded-2xl px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Property ROI Calculator
          </h1>
          <p className="text-slate-200">
            Calculate rental yield, appreciation & total return on property
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder />
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INPUT CARD */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-hero-blue mb-6">
            Property Details
          </h2>

          <label className="font-medium">Property Price</label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(+e.target.value)}
            className="input-box w-full mt-2"
          />

          <label className="font-medium mt-6 block">
            Monthly Rent
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(+e.target.value)}
            className="input-box w-full mt-2"
          />

          <label className="font-medium mt-6 block">
            Annual Appreciation (%)
          </label>
          <input
            type="range"
            min={1}
            max={15}
            value={annualAppreciation}
            onChange={(e) =>
              setAnnualAppreciation(+e.target.value)
            }
            className="slider-hero"
          />
          <p className="text-sm mt-1">
            {annualAppreciation}%
          </p>

          <label className="font-medium mt-6 block">
            Investment Period (Years)
          </label>
          <input
            type="range"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="slider-hero"
          />
          <p className="text-sm mt-1">{years} Years</p>
        </div>

        {/* RESULT CARD */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500">
            Total ROI
          </p>
          <p className="text-3xl font-extrabold text-hero-blue mt-2">
            {calc.roiPercent.toFixed(2)}%
          </p>

          <div className="text-sm text-left mt-6 space-y-2">
            <p>
              Annual ROI:{" "}
              <strong>
                {calc.annualROI.toFixed(2)}%
              </strong>
            </p>
            <p>
              Rental Yield:{" "}
              <strong>
                {calc.rentalYield.toFixed(2)}%
              </strong>
            </p>
            <p>
              Annual Rent:{" "}
              <strong>
                {formatINR(calc.annualRent)}
              </strong>
            </p>
            <p>
              Total Rent ({years} yrs):{" "}
              <strong>
                {formatINR(calc.totalRent)}
              </strong>
            </p>
            <p>
              Property Value After {years} yrs:{" "}
              <strong>
                {formatINR(calc.futureValue)}
              </strong>
            </p>
            <p className="border-t pt-2">
              Capital Gain:{" "}
              <strong>
                {formatINR(calc.capitalGain)}
              </strong>
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() =>
                copyText(
                  `Property ROI: ${calc.roiPercent.toFixed(
                    2
                  )}%`
                )
              }
              className="flex-1 border rounded-lg py-2"
            >
              📋 Copy
            </button>
            <button
              onClick={() =>
                shareText(
                  `Property ROI is ${calc.roiPercent.toFixed(
                    2
                  )}%`
                )
              }
              className="flex-1 border rounded-lg py-2"
            >
              🔗 Share
            </button>
          </div>
        </div>
      </div>

      {/* ================= FAQ ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-16 mb-24">
        <h2 className="text-2xl font-bold mb-6">
          Property ROI FAQs
        </h2>

        {[
          {
            q: "What is property ROI?",
            a: "Property ROI measures the total return from rental income and price appreciation.",
          },
          {
            q: "What is rental yield?",
            a: "Rental yield is annual rent divided by property price, expressed as a percentage.",
          },
          {
            q: "Is appreciation guaranteed?",
            a: "No. Appreciation depends on market conditions and location.",
          },
        ].map((f, i) => (
          <details
            key={i}
            className="group border rounded-lg p-4 mb-4"
          >
            <summary className="font-semibold cursor-pointer flex justify-between">
              {f.q}
              <span className="group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-gray-600">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      {/* ================= MOBILE STICKY ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow px-4 py-3 flex justify-between items-center z-50">
        <span className="font-semibold">
          ROI: {calc.roiPercent.toFixed(2)}%
        </span>
        <span className="text-hero-blue font-semibold">
          View Details
        </span>
      </div>
    </>
  );
}
