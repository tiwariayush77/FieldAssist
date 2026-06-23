import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'FieldAssist Beat Planner',
  description: 'An operational, field-ready beat and order booking prototype for sales representatives.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-[#0A1126] text-[#0A1126] font-sans h-screen max-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}

