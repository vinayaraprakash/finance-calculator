import Link from "next/link";
import {
  Calculator,
  CreditCard,
  Home,
  Wallet,
  Car,
  Coins,
  PiggyBank,
  Building2,
} from "lucide-react";


import AdPlaceholder from "@/components/AdPlaceholder";

const tools = [
  {
    title: "GST Calculator",
    desc: "Calculate CGST, SGST & IGST easily",
    href: "/gst-calculator",
    icon: Calculator,
  },
  {
    title: "Home Loan EMI",
    desc: "Calculate EMI for home loans",
    href: "/emi-calculator?type=home",
    icon: Home,
  },
  {
    title: "Personal Loan EMI",
    desc: "Plan personal loan EMIs",
    href: "/emi-calculator?type=personal",
    icon: CreditCard,
  },
  {
    title: "Car Loan EMI",
    desc: "Estimate car loan EMIs",
    href: "/emi-calculator?type=car",
    icon: Car,
  },
  {
    title: "Gold Loan EMI",
    desc: "Check EMI against gold loans",
    href: "/emi-calculator?type=gold",
    icon: Coins,
  },
  {
    title: "Fixed Deposit (FD)",
    desc: "Calculate FD maturity amount",
    href: "/fd-rd-calculator",
    icon: Wallet,
  },
  {
    title: "Recurring Deposit (RD)",
    desc: "Plan monthly RD savings",
    href: "/fd-rd-calculator",
    icon: Wallet,
  },
  {
    title: "Salary Breakup",
    desc: "Understand CTC & take-home",
    href: "/salary-breakup",
    icon: Wallet,
  },
  {
    title: "Property ROI",
    desc: "Analyze real estate returns",
    href: "/property-roi-calculator",
    icon: Building2,
  },
  {
    title: "NPS",
    desc: "Analyze NPS retirement returns",
    href: "/ppf-nps-gra-calculator",
    icon: PiggyBank,
  },
  {
    title: "PPF",
    desc: "Calculate PPF maturity amount",
    href: "/ppf-nps-gra-calculator",
    icon: PiggyBank,
  },
  {
    title: "Gratuity",
    desc: "Calculate gratuity payable amount",
    href: "/ppf-nps-gra-calculator",
    icon: Coins,
  },
];


export default function HomePage() {
  return (
    <>
      {/* 🔵 HERO */}
      <section className="hero-blue py-24 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">
            Healthier wallet, happier you
          </h1>
          <p className="text-slate-200 max-w-xl">
            Simple, free financial calculators to help you make smarter money decisions.
          </p>
        </div>
      </section>

      {/* ⚪ CONTENT */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* 🔹 AD */}
          <div className="floating-card mb-12 p-4">
            <AdPlaceholder />
          </div>

          {/* 🔹 TOOLS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <div className="card-hero cursor-pointer">
                  <tool.icon className="w-8 h-8 mb-4 text-hero-blue" />
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* 🔹 SEO CONTENT */}
          <section className="mt-16 max-w-5xl mx-auto text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold mb-4">
              Free Online Financial Calculators in India
            </h2>

            <p className="mb-4">
              FinanceCalc offers free and easy-to-use financial calculators
              designed to help individuals make better money decisions.
              Whether you are calculating GST, planning loan EMIs, or
              estimating returns on fixed deposits, our tools simplify
              complex financial calculations.
            </p>

            <p>
              Our calculators are built using standard financial formulas
              and are suitable for quick estimations. These tools are ideal
              for salaried professionals, business owners, and investors
              across India.
            </p>
          </section>

          {/* 🔹 FAQ */}
          <section className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What is FinanceCalc?",
                  a: "FinanceCalc is a free online platform offering GST, EMI, FD, RD, and ROI calculators.",
                },
                {
                  q: "Are these calculators accurate?",
                  a: "They use standard formulas for estimation. For official decisions, consult a professional.",
                },
                {
                  q: "Is FinanceCalc free to use?",
                  a: "Yes, all calculators are completely free.",
                },
                {
                  q: "Can I use these calculators for tax filing?",
                  a: "They are suitable for estimation but not a replacement for official filings.",
                },
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
          </section>

        </div>
      </section>
    </>
  );
}
