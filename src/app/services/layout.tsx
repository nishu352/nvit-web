import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software & Technology Services | NVIT.SPACE",
  description:
    "Explore full-stack digital engineering services: web applications, mobile apps, AI automation, cloud backends, and bespoke software systems.",
  alternates: {
    canonical: "https://www.nvit.space/services",
  },
  openGraph: {
    title: "Software & Technology Services | NVIT.SPACE",
    description:
      "Full-stack engineering capabilities from websites to AI systems and cloud backends.",
    url: "https://www.nvit.space/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
