import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PreMarketEdge - Automated daily trading briefings and market intelligence platform',
  description: 'Value Proposition: Saves traders 60+ minutes daily by automatically aggregating and analyzing overnight market developments, earnings, and news into actionable 5-minute briefings before market open.

Target Customer: Day traders, portfolio managers, financial advisors, and retail investors who need efficient pre-market preparation

---
Category: Micro-SaaS
Target Market: Day traders, portfolio managers, financial advisors, and retail investors who need efficient pre-market preparation
Source Hypothesis ID: cc6e791e-da82-48d9-8a8f-9391a4d56d68
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">PreMarketEdge - Automated daily trading briefings and market intelligence platform</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
