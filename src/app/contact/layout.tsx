import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Engineering & Consultation | NVIT.SPACE",
  description:
    "Schedule a technical architecture consultation with the NVIT.SPACE engineering team. Discuss custom web applications, APIs, AI automations, and digital platforms.",
  alternates: {
    canonical: "https://www.nvit.space/contact",
  },
  openGraph: {
    title: "Contact NVIT.SPACE — Software Engineering Consultation",
    description:
      "Connect with our engineering leadership to build bespoke software solutions, web platforms, and automated workflows.",
    url: "https://www.nvit.space/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
