import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Digital Engineering Studio | NVIT.SPACE",
  description:
    "Learn about NVIT.SPACE, our engineering leadership, full-stack technologies, and custom digital transformation services.",
  alternates: {
    canonical: "https://www.nvit.space/about",
  },
  openGraph: {
    title: "About NVIT.SPACE — Digital Engineering Studio",
    description:
      "Full-stack software engineering, high-performance web applications, AI automation, and fintech systems.",
    url: "https://www.nvit.space/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
