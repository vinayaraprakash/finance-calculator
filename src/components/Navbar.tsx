"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Calculator,
  Home,
  CreditCard,
  Wallet,
  PiggyBank,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "GST", href: "/gst-calculator", icon: Calculator },
  { name: "Loans", href: "/emi-calculator", icon: CreditCard },
  { name: "FD / RD", href: "/fd-rd-calculator", icon: Wallet },
  { name: "Salary", href: "/salary-breakup", icon: Wallet },
  { name: "NPS/PPF/Gratuity", href: "/ppf-nps-gra-calculator", icon: Wallet },
  { name: "Property ROI", href: "/property-roi-calculator", icon:PiggyBank  },
];

const hideBreadcrumbs = [
  "/about",
  "/privacy-policy",
  "/contact",
  "/disclaimer",
];

/* ---------- Breadcrumb Helpers ---------- */
function getLoanBreadcrumb(pathname: string) {
  if (pathname.includes("home")) return "Home Loan EMI";
  if (pathname.includes("personal")) return "Personal Loan EMI";
  if (pathname.includes("car")) return "Car Loan EMI";
  if (pathname.includes("gold")) return "Gold Loan EMI";
  return "EMI Calculator";
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- ACTIVE STATE LOGIC ---------- */
  const isItemActive = (itemHref: string, itemName: string) => {
    if (pathname === itemHref) return true;

    if (
      itemName === "Loans" &&
      (pathname.startsWith("/emi") ||
        pathname.startsWith("/emi-calculator"))
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-gray-900 hover:text-hero-blue transition-colors"
          >
            FinanceCalc
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const active = isItemActive(item.href, item.name);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-2 font-semibold transition-colors
                    ${
                      active
                        ? "text-hero-blue"
                        : "text-gray-800 hover:text-hero-blue"
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full bg-hero-blue transition-transform duration-200
                      ${active ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col px-6 py-6 space-y-5">
              {navItems.map((item) => {
                const active = isItemActive(item.href, item.name);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 font-semibold transition-colors
                      ${
                        active
                          ? "text-hero-blue"
                          : "text-gray-800 hover:text-hero-blue"
                      }
                    `}
                  >
                    <item.icon size={22} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ================= BREADCRUMBS ================= */}
      {pathname !== "/" && !hideBreadcrumbs.includes(pathname) &&(
        <nav className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm flex flex-wrap items-center gap-2 text-gray-600">
            <Link href="/" className="font-medium hover:text-hero-blue">
              Home
            </Link>

            <span>›</span>

            {/* EMI / Loans */}
            {(pathname.startsWith("/emi") ||
              pathname.startsWith("/emi-calculator")) && (
              <>
                <Link
                  href="/emi-calculator"
                  className="font-medium hover:text-hero-blue"
                >
                  Loans
                </Link>
                <span>›</span>
                <span className="text-gray-800 font-semibold">
                  {getLoanBreadcrumb(pathname)}
                </span>
              </>
            )}

            {/* GST */}
            {pathname === "/gst-calculator" && (
              <span className="text-gray-800 font-semibold">
                GST Calculator
              </span>
            )}

            {/* FD / RD */}
            {pathname === "/fd-rd-calculator" && (
              <span className="text-gray-800 font-semibold">
                FD / RD Calculator
              </span>
            )}

            {/* Salary */}
            {pathname === "/salary-breakup" && (
              <span className="text-gray-800 font-semibold">
                Salary Breakup Calculator
              </span>
            )}

            {/* NPS / PPF / Gratuity */}
            {pathname === "/ppf-nps-gra-calculator" && (
              <span className="text-gray-800 font-semibold">
                NPS / PPF / Gratuity Calculator
              </span>
            )}
             {pathname === "/Disclaimer" && (
              <span className="text-gray-800 font-semibold">
                disclaimer
              </span>
            )}
             {pathname === "/about" && (
              <span className="text-gray-800 font-semibold">
                About
              </span>
            )}
             {pathname === "/contact" && (
              <span className="text-gray-800 font-semibold">
                Contact
              </span>
            )}
             {pathname === "/privacy" && (
              <span className="text-gray-800 font-semibold">
                Privacy
              </span>
            )}
              {pathname === "/property-roi-calculator" && (
              <span className="text-gray-800 font-semibold">
                Property ROI
              </span>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
