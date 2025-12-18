"use client";

import { formatINR } from "@/utils/formatINR";

interface Props {
  amount: number;
  setAmount: (v: number) => void;
  tenure: number;
  setTenure: (v: number) => void;
  rate: number;
  setRate: (v: number) => void;
  config: {
    minAmount: number;
    maxAmount: number;
    minTenure: number;
    maxTenure: number;
    minRate: number;
    maxRate: number;
  };
}

export default function LoanDetailsCard({
  amount,
  setAmount,
  tenure,
  setTenure,
  rate,
  setRate,
  config,
}: Props) {
  return (
    <div className="loan-card">
      <h2 className="text-lg font-semibold text-hero-blue mb-8">
        Loan Details
      </h2>

      {/* ========= LOAN AMOUNT ========= */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <label className="text-sm font-medium text-gray-700">
            Loan Amount
          </label>
          <div className="text-lg font-bold text-gray-900">
            {formatINR(amount)}
          </div>
        </div>

        <input
          type="range"
          min={config.minAmount}
          max={config.maxAmount}
          step={10000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="slider-hero"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹1 Lac</span>
          <span>₹10 Cr</span>
        </div>
      </div>

      {/* ========= TENURE ========= */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <label className="text-sm font-medium text-gray-700">
            Tenure
          </label>
          <div className="text-lg font-bold text-gray-900">
            {tenure} <span className="text-sm font-medium">Years</span>
          </div>
        </div>

        <input
          type="range"
          min={config.minTenure}
          max={config.maxTenure}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="slider-hero"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{config.minTenure}</span>
          <span>{config.maxTenure}</span>
        </div>
      </div>

      {/* ========= INTEREST RATE ========= */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <label className="text-sm font-medium text-gray-700">
            Interest Rate
          </label>
          <div className="text-lg font-bold text-gray-900">
            {rate}% <span className="text-sm font-medium">p.a.</span>
          </div>
        </div>

        <input
          type="range"
          min={config.minRate}
          max={config.maxRate}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="slider-hero"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{config.minRate}%</span>
          <span>{config.maxRate}%</span>
        </div>
      </div>
    </div>
  );
}
