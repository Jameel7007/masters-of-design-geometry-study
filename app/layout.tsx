import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
const socialImage = new URL(`${basePath}/og.png`, metadataBase.origin).toString();

export const metadata: Metadata = {
  metadataBase,
  title: 'Masters of the Design · The Eleven Watches',
  description: 'An interactive study of eleven Naqshbandi principles, dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
  openGraph: {
    title: 'Masters of the Design',
    description: 'The Eleven Watches · Dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
    images: [{ url: socialImage, width: 1731, height: 909, alt: 'Masters of the Design · The Eleven Watches' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masters of the Design',
    description: 'The Eleven Watches · Dedicated to Shaykh Abdullah al-Fa’iz ad-Daghestani.',
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
