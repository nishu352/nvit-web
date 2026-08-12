import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pincode Check',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
