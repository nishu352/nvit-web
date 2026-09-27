import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Resources, Guides & Architecture | NVIT.SPACE",
  description:
    "Technical engineering guides, architecture breakdowns, case studies, and software development insights from NVIT.SPACE.",
  alternates: {
    canonical: "https://www.nvit.space/resources",
  },
  openGraph: {
    title: "Engineering Resources & Technical Guides | NVIT.SPACE",
    description:
      "Technical guides, architecture blueprints, and engineering insights.",
    url: "https://www.nvit.space/resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
