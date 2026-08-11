import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CursorTracker from "@/components/layout/CursorTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NVIT.SPACE — Technology • Software • AI • Digital Solutions",
  description:
    "NVIT.SPACE is a modern digital engineering studio building websites, web applications, mobile apps, AI solutions, and custom software for forward-thinking enterprises.",
  keywords: [
    "NVIT.SPACE",
    "Digital Engineering Studio",
    "Web Application Development",
    "Mobile App Development",
    "AI Solutions",
    "Custom Software",
    "Business Automation",
    "Full-Stack Development",
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
        <Analytics />
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
