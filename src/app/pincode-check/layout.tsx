import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pincode Serviceability Checker — 19,500+ Indian Postal Codes | NVIT.SPACE",
  description:
    "Check banking coverage and geographical serviceability across 19,500+ Indian postal PIN codes for loan origination and retail operations.",
  alternates: {
    canonical: "https://www.nvit.space/pincode-check",
  },
  openGraph: {
    title: "Pincode Serviceability Checker | NVIT.SPACE",
    description:
      "Verify 6-digit Indian PIN code banking serviceability and coverage with NVIT.SPACE data APIs.",
    url: "https://www.nvit.space/pincode-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
