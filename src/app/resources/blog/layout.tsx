import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights | NVIT.SPACE",
  description:
    "Articles on full-stack architecture, API performance, database optimization, and modern software development.",
  alternates: {
    canonical: "https://www.nvit.space/resources/blog",
  },
  openGraph: {
    title: "Engineering Blog | NVIT.SPACE",
    description:
      "Technical insights on software engineering, APIs, and modern architecture.",
    url: "https://www.nvit.space/resources/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
