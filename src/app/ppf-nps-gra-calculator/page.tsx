import InvestmentCalculatorsClient from "./InvestmentCalculatorsClient";

export const metadata = {
  title: "PPF, NPS & Gratuity Calculator | FinanceCalc",
  description:
    "Calculate PPF maturity, NPS retirement corpus and gratuity amount with accurate formulas and clean breakdown.",
};

export default function Page() {
  return <InvestmentCalculatorsClient />;
}
