import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Category Checker — Bank Policy Categorization | NVIT.SPACE",
  description:
    "Instant employer category search across partner banks. Verify Category A, B, C, or D loan underwriting policy tiers for Indian corporate employers.",
  alternates: {
    canonical: "https://www.nvit.space/company-check",
  },
  openGraph: {
    title: "Company Category Checker | NVIT.SPACE",
    description:
      "Verify corporate employer category status across partner banking institutions for loan policy eligibility.",
    url: "https://www.nvit.space/company-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
