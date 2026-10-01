import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pincode Serviceability Checker — Pan-India Postal Codes | NVIT.SPACE",
  description:
    "Evaluate geographical serviceability across pan-India postal PIN codes in the available reference dataset for retail operations and credit evaluation.",
  alternates: {
    canonical: "https://www.nvit.space/pincode-check",
  },
  openGraph: {
    title: "Pincode Serviceability Checker | NVIT.SPACE",
    description:
      "Inspect 6-digit Indian PIN code serviceability across pan-India postal codes in the available dataset.",
    url: "https://www.nvit.space/pincode-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
