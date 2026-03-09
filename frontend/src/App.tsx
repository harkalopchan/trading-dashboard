import { useTickers } from './hooks/useTickers';
import './App.css'
import { useEffect, useMemo, useState } from 'react';
import type { TickerSymbol, Ticker, PricePoint } from './types/market';
import { useTickerHistory } from './hooks/useTickerHistory';
import { useTickerStream } from './hooks/useTickerStream';
import { TickerList } from './components/ticker/TickerList';

export default function App() {

  const {
    data: tickers = [],
    isLoading: isTickersLoading,
    isError: isTickersError
  } = useTickers();

  const [selectedSymbol, setSelectedSymbol] = useState<TickerSymbol | undefined>(undefined);

  const [liveTickers, setLiveTickers] = useState<Ticker[]>([]);
  const [liveHistory, setLiveHistory] = useState<PricePoint[]>([]);

  const activeSymbol = useMemo(() => {
    if (selectedSymbol) return selectedSymbol;

    return tickers[0]?.symbol;
  }, [selectedSymbol, tickers]);

  const {
    data: history = [],
    isLoading: isHistoryLoading,
    isError: isHistoryError
  } = useTickerHistory(activeSymbol);

  const { latestMessage } = useTickerStream();

  useEffect(() => {
    setLiveTickers(tickers);
  }, [tickers])

  useEffect(() => {
    setLiveHistory(history);
  }, [history])

  useEffect(() => {
    if (!latestMessage) return;

    setLiveTickers((currentTickers) => {
      return currentTickers.map((ticker) => {
        return ticker.symbol === latestMessage.symbol ? { ...ticker, price: latestMessage.price } : ticker;
      });
    });

    if (latestMessage.symbol === activeSymbol) {
      setLiveHistory((currentHistory) => {
        return [...currentHistory, latestMessage].slice(-50);
      });
    }
  }, [latestMessage, activeSymbol]);

  return (
    <main>

      <h1>Real-Time Trading Dashboard</h1>

      {isTickersLoading ? <p>Loading tickers...</p> : null}
      {isTickersError ? <p>Failed to load tickers</p> : null}

      <div style={{ margin: "16px 0" }}>
        <strong>Selected ticker:</strong> {activeSymbol ?? "None"}
      </div>

      <TickerList
        tickers={liveTickers}
        selectedSymbol={activeSymbol}
        onSelect={setSelectedSymbol}
      />

      <section style={{ margin: "16px 0" }}>
        <h2>Live History Preview</h2>

        {isHistoryLoading ? <p>Loading history...</p> : null}
        {isHistoryError ? <p>Failed to load history</p> : null}

        {liveHistory.length > 0 ? (
          <ul>
            {history.slice(-5).map((point) => (
              <li key={point.timestamp}>
                {point.symbol} - {new Date(point.timestamp).toLocaleString()} - {point.price}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  )
}
