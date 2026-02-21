import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KI als Brücke zwischen Kulturen',
  description: 'Interaktive Seite über Pakistan, Russland und KI als kulturelle Brücke.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="noise">{children}</body>
    </html>
  );
}
