import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export const metadata = {
  title: "Finance Calculator",
  description: "Free GST, Salary, EMI and Property ROI calculators",
  icons: {
    icon: "/favicon.svg",
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  
      <body>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5649172375396609"
     crossOrigin="anonymous"/>
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="border-t mt-16 py-8 bg-white">
  <div className="max-w-5xl mx-auto px-4 text-center">

    {/* LINKS */}
    <div className="flex justify-center gap-6 text-sm font-semibold text-hero-blue">
      <a
        href="/about"
        className="hover:underline underline-offset-4"
      >
        About
      </a>

      <a
        href="/privacy-policy"
        className="hover:underline underline-offset-4"
      >
        Privacy Policy
      </a>

      <a
        href="/contact"
        className="hover:underline underline-offset-4"
      >
        Contact
      </a>
      <a href="/disclaimer" className="font-medium text-hero-blue hover:underline">
  Disclaimer
</a>
    </div>
    

    {/* COPYRIGHT */}
    <p className="mt-4 text-xs text-hero-blue/70">
      © {new Date().getFullYear()} FinanceCalc. All rights reserved.
    </p>
  </div>
</footer>

      </body>
    </html>
  );
}
