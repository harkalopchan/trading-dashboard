import { useState, useEffect } from 'react';
import './App.css'
import type { Ticker } from './types/market';
import { fetchTickers } from './services/api';

export default function App() {

  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadTickers = async () => {
      try {
        const data = await fetchTickers();
        setTickers(data);
      } catch {
        setError("Failed to load tickers");
      }
    };
    loadTickers();
  }, []);

  return (
    <main>
      <h1>Real-Time Trading Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {tickers.length > 0 && (
        <ul>
          {tickers.map((ticker) => (
            <li key={ticker.symbol}>{ticker.symbol} - {ticker.name} - {ticker.price}</li>
          ))}
        </ul>
      )}
      <p>Frontend setup complete with API, caching, and chart dependencies.</p>
    </main>
  )
}
