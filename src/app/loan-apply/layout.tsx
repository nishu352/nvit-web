import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for Loan — Digital Lending Onboarding | NVIT.SPACE",
  description:
    "Fast and secure digital borrower intake application for personal, home, and business loans powered by NVIT.SPACE.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
