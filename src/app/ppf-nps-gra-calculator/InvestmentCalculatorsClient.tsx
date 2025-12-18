"use client";

import { useState, useMemo } from "react";
import AdPlaceholder from "@/components/AdPlaceholder";
import { formatINR } from "@/utils/formatINR";

/* ================= HELPERS ================= */

const copyText = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  alert(`${label} details copied`);
};

const shareText = async (text: string) => {
  if (navigator.share) {
    await navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text);
    alert("Details copied");
  }
};

const calcPPF = (yearly: number, years: number, rate: number) => {
  let total = 0;
  for (let i = 0; i < years; i++) {
    total = (total + yearly) * (1 + rate / 100);
  }
  return total;
};

const calcNPS = (monthly: number, years: number, rate: number) => {
  const r = rate / 100 / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
};

const calcGratuity = (salary: number, years: number) => {
  return (salary * 15 * years) / 26;
};

export default function PPFNPSGratuityCalculatorClient() {
  /* ================= PPF ================= */
  const [ppfAmount, setPpfAmount] = useState(10000);
  const [ppfYears, setPpfYears] = useState(15);
  const ppfRate = 7.1;

  const ppfMaturity = useMemo(
    () => calcPPF(ppfAmount, ppfYears, ppfRate),
    [ppfAmount, ppfYears]
  );

  /* ================= NPS ================= */
  const [npsMonthly, setNpsMonthly] = useState(5000);
  const [npsYears, setNpsYears] = useState(25);
  const [npsRate, setNpsRate] = useState(10);

  const npsCorpus = useMemo(
    () => calcNPS(npsMonthly, npsYears, npsRate),
    [npsMonthly, npsYears, npsRate]
  );

  /* ================= GRATUITY ================= */
  const [gratSalary, setGratSalary] = useState(40000);
  const [gratYears, setGratYears] = useState(10);

  const gratuity = useMemo(
    () => calcGratuity(gratSalary, gratYears),
    [gratSalary, gratYears]
  );

  /* ================= COPY ================= */
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-6 mb-10">
        <div className="hero-blue rounded-2xl px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            PPF, NPS & Gratuity Calculator
          </h1>
          <p className="text-slate-200">
            Calculate long-term savings, retirement corpus & gratuity benefits
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder />
      </div>

      {/* ================= PPF ================= */}
      <section className="max-w-5xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold text-hero-blue mb-6">
          PPF Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <label className="font-medium">Yearly Investment</label>
            <input
              type="number"
              value={ppfAmount}
              onChange={(e) => setPpfAmount(+e.target.value)}
              className="input-box w-full mt-2"
            />

            <label className="font-medium mt-6 block">
              Time Period (Years)
            </label>
            <input
              type="range"
              min={5}
              max={25}
              value={ppfYears}
              onChange={(e) => setPpfYears(+e.target.value)}
              className="slider-hero"
            />
            <p className="text-sm mt-1">{ppfYears} Years</p>

            <p className="mt-4 text-sm text-gray-600">
              Interest Rate: {ppfRate}%
            </p>
          </div>

          {/* Result */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500">Maturity Value</p>
            <p className="text-3xl font-extrabold text-hero-blue mt-2">
              {formatINR(ppfMaturity)}
            </p>

            <div className="text-sm text-left mt-6 space-y-2">
              <p>
                Invested:{" "}
                <strong>{formatINR(ppfAmount * ppfYears)}</strong>
              </p>
              <p>
                Interest:{" "}
                <strong>
                  {formatINR(ppfMaturity - ppfAmount * ppfYears)}
                </strong>
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  copyText(`PPF Maturity: ${formatINR(ppfMaturity)}`)
                }
                className="flex-1 border rounded-lg py-2"
              >
                📋 Copy
              </button>
              <button className="flex-1 border rounded-lg py-2">
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
      </section>

      {/* ================= NPS ================= */}
      <section className="max-w-5xl mx-auto px-4 mt-16">
        <h2 className="text-xl font-bold text-hero-blue mb-6">
          NPS Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <label className="font-medium">Monthly Contribution</label>
            <input
              type="number"
              value={npsMonthly}
              onChange={(e) => setNpsMonthly(+e.target.value)}
              className="input-box w-full mt-2"
            />

            <label className="font-medium mt-6 block">
              Years to Invest
            </label>
            <input
              type="range"
              min={5}
              max={40}
              value={npsYears}
              onChange={(e) => setNpsYears(+e.target.value)}
              className="slider-hero"
            />
            <p className="text-sm mt-1">{npsYears} Years</p>

            <label className="font-medium mt-4 block">
              Expected Return (%)
            </label>
            <input
              type="number"
              value={npsRate}
              onChange={(e) => setNpsRate(+e.target.value)}
              className="input-box w-full mt-2"
            />
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500">Estimated Corpus</p>
            <p className="text-3xl font-extrabold text-hero-blue mt-2">
              {formatINR(npsCorpus)}
            </p>

            <div className="text-sm text-left mt-6 space-y-2">
              <p>
                Invested:{" "}
                <strong>{formatINR(npsMonthly * 12 * npsYears)}</strong>
              </p>
              <p>
                Gains:{" "}
                <strong>
                  {formatINR(
                    npsCorpus - npsMonthly * 12 * npsYears
                  )}
                </strong>
              </p>
              <div className="flex gap-3 mt-6">
  <button
    onClick={() =>
      copyText(
        `NPS Calculator
Monthly Contribution: ${formatINR(npsMonthly)}
Years: ${npsYears}
Estimated Corpus: ${formatINR(npsCorpus)}`,
      )
    }
    className="flex-1 border rounded-lg py-2"
  >
    📋 Copy
  </button>

  <button
    onClick={() =>
      shareText(
        `My NPS Corpus after ${npsYears} years is ${formatINR(
          npsCorpus
        )}`
      )
    }
    className="flex-1 border rounded-lg py-2"
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
        </div>
      </section>

      {/* ================= GRATUITY ================= */}
      <section className="max-w-5xl mx-auto px-4 mt-16 mb-24">
        <h2 className="text-xl font-bold text-hero-blue mb-6">
          Gratuity Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <label className="font-medium">
              Monthly Salary (Basic + DA)
            </label>
            <input
              type="number"
              value={gratSalary}
              onChange={(e) => setGratSalary(+e.target.value)}
              className="input-box w-full mt-2"
            />

            <label className="font-medium mt-6 block">
              Years of Service
            </label>
            <input
              type="range"
              min={1}
              max={40}
              value={gratYears}
              onChange={(e) => setGratYears(+e.target.value)}
              className="slider-hero"
            />
            <p className="text-sm mt-1">{gratYears} Years</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500">
              Total Gratuity Payable
            </p>
            <p className="text-3xl font-extrabold text-hero-blue mt-2">
              {formatINR(gratuity)}
            </p>
            <div className="flex gap-3 mt-6">
  <button
    onClick={() =>
      copyText(
        `Gratuity Calculator
Monthly Salary (Basic + DA): ${formatINR(gratSalary)}
Years of Service: ${gratYears}
Gratuity Payable: ${formatINR(gratuity)}`
      )
    }
    className="flex-1 border rounded-lg py-2"
  >
    📋 Copy
  </button>

  <button
    onClick={() =>
      shareText(
        `My gratuity payable is ${formatINR(gratuity)}`
      )
    }
    className="flex-1 border rounded-lg py-2"
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
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <AdPlaceholder />
      </div>

      {/* ================= FAQ ================= */}
      <div className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>

        {[
          {
            q: "Is PPF tax-free?",
            a: "Yes, PPF investments, interest and maturity are tax-free under Section 80C.",
          },
          {
            q: "Is NPS better than PPF?",
            a: "NPS generally offers higher returns but carries market risk, while PPF is safe and guaranteed.",
          },
          {
            q: "When is gratuity payable?",
            a: "Gratuity is payable after completing 5 years of continuous service with an employer.",
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

      {/* ================= MOBILE STICKY ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow px-4 py-3 flex justify-between items-center z-50">
        <span className="font-semibold">
          PPF: {formatINR(ppfMaturity)}<br/>
          NPS:{formatINR(npsCorpus)}<br/>
          Gratuity:{formatINR(gratuity)}
        </span>
        <span className="text-hero-blue font-semibold">
          View Details
        </span>
      </div>
    </>
  );
}
