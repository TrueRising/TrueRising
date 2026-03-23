import '@/styles/globals.css';
import { Alexandria, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const alexandria = Alexandria({ subsets: ['arabic'], variable: '--font-alexandria' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={`${manrope.variable} ${alexandria.variable} bg-backgroundPrimary text-textPrimary antialiased`}>
        {children}
      </body>
    </html>
  );
}
