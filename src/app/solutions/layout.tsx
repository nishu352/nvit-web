import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Technology Solutions | NVIT.SPACE",
  description:
    "Turnkey industry software solutions for fintech, digital lending, logistics, healthcare, and enterprise operations.",
  alternates: {
    canonical: "https://www.nvit.space/solutions",
  },
  openGraph: {
    title: "Industry Technology Solutions | NVIT.SPACE",
    description:
      "Turnkey industry solutions built for operational scale and data integrity.",
    url: "https://www.nvit.space/solutions",
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
