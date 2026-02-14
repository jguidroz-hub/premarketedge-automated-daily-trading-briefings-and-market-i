'use client';

import { useState } from 'react';
import Link from 'next/link';

type StockMove = { symbol: string; name: string; price: number; change: number; volume: string; signal: 'bullish' | 'bearish' | 'neutral' };
type Event = { time: string; title: string; impact: 'high' | 'medium' | 'low' };

const PREMARKET: StockMove[] = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 148.32, change: 3.2, volume: '12.4M', signal: 'bullish' },
  { symbol: 'TSLA', name: 'Tesla', price: 342.10, change: -1.8, volume: '8.7M', signal: 'bearish' },
  { symbol: 'AAPL', name: 'Apple', price: 234.56, change: 0.4, volume: '5.2M', signal: 'neutral' },
  { symbol: 'META', name: 'Meta', price: 612.88, change: 2.1, volume: '4.8M', signal: 'bullish' },
  { symbol: 'AMZN', name: 'Amazon', price: 198.45, change: -0.6, volume: '3.9M', signal: 'neutral' },
  { symbol: 'MSFT', name: 'Microsoft', price: 432.10, change: 1.5, volume: '3.1M', signal: 'bullish' },
  { symbol: 'AMD', name: 'AMD', price: 178.90, change: 4.1, volume: '6.3M', signal: 'bullish' },
  { symbol: 'GOOG', name: 'Alphabet', price: 176.22, change: -0.3, volume: '2.8M', signal: 'neutral' },
];

const EVENTS: Event[] = [
  { time: '8:30 AM', title: 'CPI Data Release (January)', impact: 'high' },
  { time: '9:00 AM', title: 'Fed Governor Waller Speech', impact: 'medium' },
  { time: '10:00 AM', title: 'Consumer Sentiment (Prelim)', impact: 'medium' },
  { time: '11:00 AM', title: 'Crude Oil Inventories', impact: 'low' },
  { time: '2:00 PM', title: 'Treasury Budget Statement', impact: 'medium' },
];

const signalColors = { bullish: 'text-green-600', bearish: 'text-red-600', neutral: 'text-gray-500' };
const impactColors = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-600' };

export default function BriefingPage() {
  const [watchlist] = useState(['NVDA', 'TSLA', 'AAPL', 'META', 'AMD']);
  const watched = PREMARKET.filter(s => watchlist.includes(s.symbol));
  const others = PREMARKET.filter(s => !watchlist.includes(s.symbol));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white">← Dashboard</Link>
          <h1 className="font-bold text-lg">📊 Pre-Market Briefing</h1>
          <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Live · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
        </div>
        <button className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-sm rounded-lg hover:bg-gray-700">
          ⚙️ Edit Watchlist
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Market Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-xs text-gray-500 uppercase">S&P 500 Futures</p>
            <p className="text-xl font-bold text-green-400">+0.42%</p>
            <p className="text-xs text-gray-500">5,234.50</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-xs text-gray-500 uppercase">NASDAQ Futures</p>
            <p className="text-xl font-bold text-green-400">+0.68%</p>
            <p className="text-xs text-gray-500">18,445.25</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-xs text-gray-500 uppercase">VIX</p>
            <p className="text-xl font-bold text-yellow-400">16.8</p>
            <p className="text-xs text-gray-500">-0.3 from close</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Watchlist */}
          <div className="col-span-2">
            <h2 className="font-semibold mb-3 text-gray-300">Your Watchlist</h2>
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-gray-500 font-medium">Symbol</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-medium">Price</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-medium">Change</th>
                    <th className="text-right px-4 py-2.5 text-gray-500 font-medium">Volume</th>
                    <th className="text-center px-4 py-2.5 text-gray-500 font-medium">Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {watched.map(s => (
                    <tr key={s.symbol} className="border-b border-gray-800/50 hover:bg-gray-800/50">
                      <td className="px-4 py-3"><span className="font-bold">{s.symbol}</span><span className="text-gray-500 text-xs ml-2">{s.name}</span></td>
                      <td className="px-4 py-3 text-right font-mono">${s.price.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-mono ${s.change > 0 ? 'text-green-400' : s.change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {s.change > 0 ? '+' : ''}{s.change}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-400">{s.volume}</td>
                      <td className={`px-4 py-3 text-center text-xs font-medium capitalize ${signalColors[s.signal]}`}>{s.signal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-semibold mb-3 text-gray-300">Other Movers</h2>
            <div className="grid grid-cols-3 gap-3">
              {others.map(s => (
                <div key={s.symbol} className="bg-gray-900 rounded-lg border border-gray-800 p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{s.symbol}</span>
                    <span className={`text-sm font-mono ${s.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.change > 0 ? '+' : ''}{s.change}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">${s.price.toFixed(2)} · {s.volume}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events Sidebar */}
          <div>
            <h2 className="font-semibold mb-3 text-gray-300">Today's Events</h2>
            <div className="space-y-2">
              {EVENTS.map((e, i) => (
                <div key={i} className="bg-gray-900 rounded-lg border border-gray-800 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 font-mono">{e.time}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${impactColors[e.impact]}`}>
                      {e.impact}
                    </span>
                  </div>
                  <p className="text-sm">{e.title}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="font-semibold text-sm mb-2">🤖 AI Summary</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Markets are mildly bullish ahead of CPI data. Semiconductor stocks leading with NVDA +3.2% and AMD +4.1% on continued AI demand. Tesla weakness on margin concerns. Key risk: CPI surprise could trigger volatility. Watch Fed commentary post-data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
