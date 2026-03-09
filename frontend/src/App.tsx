import { useQuery } from '@tanstack/react-query';
import './App.css'
import { fetchTickers } from './services/api';

export default function App() {

  const { data: tickers = [], isLoading, isError } = useQuery({
    queryKey: ['tickers'],
    queryFn: fetchTickers,
  });

  return (
    <main>
      <h1>Real-Time Trading Dashboard</h1>
      
      {isLoading ? <p>Loading tickers...</p>: null}
      {isError ? <p>Failed to load tickers</p> : null}

      {tickers.length > 0 && (
        <ul>
          {tickers.map((ticker) => (
            <li key={ticker.symbol}>{ticker.symbol} - {ticker.name} - {ticker.price}</li>
          ))}
        </ul>
      )}

    </main>
  )
}
