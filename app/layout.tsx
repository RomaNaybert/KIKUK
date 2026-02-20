import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KI als Brücke zwischen Kulturen',
  description: 'Interaktive One-Page-Experience über Pakistan, Russland und KI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
