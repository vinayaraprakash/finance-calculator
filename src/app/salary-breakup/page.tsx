import SalaryCalculatorClient from "./SalaryCalculatorClient";

export const metadata = {
  title: "Salary Breakup Calculator – CTC to Take Home",
  description:
    "Calculate monthly take-home salary from CTC with PF, HRA and deductions.",
};

export default function SalaryPage() {
  return <SalaryCalculatorClient />;
}
