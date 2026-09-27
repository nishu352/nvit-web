import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Calculators & Serviceability Tools | NVIT.SPACE',
  description:
    'Interactive financial calculation utilities, loan amortization schedules, and geographic serviceability checkers by NVIT.SPACE.',
  alternates: {
    canonical: 'https://www.nvit.space/finance-tools',
  },
  openGraph: {
    title: 'Financial Calculators & Verification Tools | NVIT.SPACE',
    description:
      'Interactive financial calculation utilities and serviceability verification tools.',
    url: 'https://www.nvit.space/finance-tools',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
