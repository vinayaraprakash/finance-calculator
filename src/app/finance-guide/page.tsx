import type { Metadata } from "next";
import FinanceGuidesPage from "./FinanceGuidesPage";

export const metadata: Metadata = {
  title: "Finance Guides – EMI, GST, Salary, FD, RD, NPS & PPF Explained",
  description:
    "Learn how EMI, GST, Salary Breakup, Fixed Deposit, Recurring Deposit, NPS, PPF and Gratuity calculations work with simple explanations and examples.",
  keywords: [
    "EMI calculation explained",
    "GST calculation explained",
    "salary breakup explained",
    "FD RD maturity explained",
    "NPS PPF guide",
    "gratuity calculation",
    "finance calculators guide",
  ],
};

export default function GuidesPage() {
  return <FinanceGuidesPage />;
}
