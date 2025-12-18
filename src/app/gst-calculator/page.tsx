import GSTCalculatorClient from "./GSTCalculatorClient";

export const metadata = {
  title: "GST Calculator Online – Calculate CGST, SGST & IGST",
  description:
    "Free GST calculator to calculate inclusive and exclusive GST with CGST, SGST and IGST breakup.",
};

export default function GSTCalculatorPage() {
  return (
    <>
      <GSTCalculatorClient />
    </>
  );
}
