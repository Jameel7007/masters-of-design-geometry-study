import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Masters of the Design · The Eleven Watches',
  description: 'An interactive study of eleven Naqshbandi principles, dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
  openGraph: {
    title: 'Masters of the Design',
    description: 'The Eleven Watches · Dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Masters of the Design · The Eleven Watches' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masters of the Design',
    description: 'The Eleven Watches · Dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
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
