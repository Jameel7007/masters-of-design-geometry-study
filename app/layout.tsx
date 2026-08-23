import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Masters of the Design · Geometry Study 01',
  description: 'A research-stage mathematical prototype of the Sufi Enneagram geometry.',
  openGraph: {
    title: 'Masters of the Design',
    description: 'Geometry Study 01 · A research-stage mathematical prototype.',
    images: [{ url: '/og.png', width: 1664, height: 936, alt: 'Masters of the Design · Geometry Study 01' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masters of the Design',
    description: 'Geometry Study 01 · A research-stage mathematical prototype.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
