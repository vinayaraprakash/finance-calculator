import FDRDCalculatorClient from "./FD_RDCalculatorClient";

export const metadata = {
  title: "FD & RD Calculator – Fixed Deposit & Recurring Deposit Calculator",
  description:
    "Free FD and RD calculator to calculate maturity amount, interest earned, and investment value for Fixed and Recurring Deposits in India.",
};

export default function FDRDCalculatorPage() {
  return <FDRDCalculatorClient />;
}
