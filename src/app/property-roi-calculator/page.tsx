import PropertyROICalculatorClient from "./PropertyROICalculatorClient";

export const metadata = {
  title: "Property ROI Calculator | FinanceCalc",
  description:
    "Calculate property ROI including rental yield, appreciation, capital gains and total returns.",
};

export default function PropertyROICalculatorPage() {
  return <PropertyROICalculatorClient />;
}
