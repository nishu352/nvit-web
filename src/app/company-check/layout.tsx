import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Category Checker — Bank Policy Categorization | NVIT.SPACE",
  description:
    "Search compiled employer category matrices across major commercial banks and NBFCs. Reference Category A, B, C, or D loan underwriting policy tiers for Indian corporate employers.",
  alternates: {
    canonical: "https://www.nvit.space/company-check",
  },
  openGraph: {
    title: "Company Category Checker | NVIT.SPACE",
    description:
      "Reference corporate employer category tiering across major Indian lending institutions for loan underwriting awareness.",
    url: "https://www.nvit.space/company-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
