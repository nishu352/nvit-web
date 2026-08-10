import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CursorTracker from "@/components/layout/CursorTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NVIT Solution — Best DSA Loan Agency | Company Category & Policy Verification Engine",
  description:
    "NVIT Solution PVT. LTD. Enterprise DSA Platform & Fintech Marketplace — Instant company category verification, pincode serviceability check, personal loans, business loans, overdrafts, and balance transfers from 40+ banks & NBFCs.",
  keywords: [
    "NVIT Solution",
    "NVIT Solution Loan Agency",
    "DSA Policy Platform",
    "Company Category Check",
    "Pincode Serviceability",
    "Instant Personal Loan",
    "Bank Policy Check",
    "NBFC Loan Eligibility",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased selection:bg-royal selection:text-white relative`} suppressHydrationWarning>
        <CursorTracker />
        {/* Subtle radial cursor glow following mouse cursor */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(59,130,246,0.035),transparent_80%)] dark:bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(59,130,246,0.05),transparent_80%)]" 
          aria-hidden="true" 
        />
        <div className="relative z-10">
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
