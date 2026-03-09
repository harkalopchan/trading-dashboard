import { useEffect, useMemo, useState } from "react";
import { useTickerHistory } from "../../hooks/useTickerHistory";
import { useTickers } from "../../hooks/useTickers";
import type { PricePoint, Ticker, TickerSymbol } from "../../types/market";
import { useTickerStream } from "../../hooks/useTickerStream";
import { PriceChart } from "../chart/PriceChart";
import { TickerList } from "../ticker/TickerList";
import "../../styles/dashboard.css";

export const Dashboard = () => {
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
    }, [tickers]);

    useEffect(() => {
        setLiveHistory(history);
    }, [history]);

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
        <main className="dashboard-page">
            <header className="dashboard-header">
                <h1 className="dashboard-header-title">Real-Time Trading Dashboard</h1>
                <p className="dashboard-subtitle">Live market prices with REST history and WebSocket updates</p>
            </header>

            {isTickersLoading ? <p>Loading tickers...</p> : null}
            {isTickersError ? <p>Failed to load tickers</p> : null}

            {!isTickersLoading && !isTickersError && (
                <section className="dashboard-summary">
                    <div className="summer-card">
                        <span className="summer-label">Selected Ticker: </span>
                        <strong className="summary-value">{activeSymbol ?? "None"}</strong>
                    </div>
                    <div className="summer-card">
                        <span className="summer-label">Available Tickers: </span>
                        <strong className="summary-value">{liveTickers.length}</strong>
                    </div>
                </section>
            )}

            <section className="dashboard-grid">
                <div className="dashboard-panel">

                    {!isTickersLoading && !isTickersError && (
                        <TickerList
                            tickers={liveTickers}
                            selectedSymbol={activeSymbol}
                            onSelect={setSelectedSymbol}
                        />
                    )}
                </div>
                <div className="dashboard-panel">

                    {isHistoryLoading ? <p>Loading history...</p> : null}
                    {isHistoryError ? <p>Failed to load history</p> : null}

                    {!isHistoryLoading && !isHistoryError && (
                        <PriceChart
                            data={liveHistory}
                            symbol={activeSymbol}
                        />
                    )}
                </div>

            </section>
        </main>
    );
};