import EMICalculatorClient from "./EMICalculatorClient";

export const metadata = {
  title: "EMI Calculator Online – Home, Personal, Car & Gold Loan EMI",
  description:
    "Free EMI calculator to calculate monthly EMI for home loan, personal loan, car loan and gold loan with interest and tenure breakdown.",
};


export default function LoanPage({
  params,
}: {
  params: { type: string };
}) {
  return <EMICalculatorClient />;
}
