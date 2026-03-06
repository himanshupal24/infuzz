import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Infuzz — Where Brands Meet High-Performing Creators',
  description: 'Discover influencers based on performance, not just followers. Join the Infuzz creator network and get matched with top brands.',
  keywords: 'influencer marketing, creator platform, brand deals, micro influencers, engagement rate',
  openGraph: {
    title: 'Infuzz — Influencer Discovery Platform',
    description: 'Data-driven influencer discovery. Find creators based on real performance metrics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
