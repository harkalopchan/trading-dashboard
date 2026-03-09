import type { Ticker, TickerSymbol } from "../../types/market";
import { TickerListItem } from "./TickerListItem";

interface TickerListProps {
    tickers: Ticker[];
    selectedSymbol?: TickerSymbol;
    onSelect: (symbol: TickerSymbol) => void;
}

export const TickerList = ({
    tickers,
    selectedSymbol,
    onSelect
}: TickerListProps) => {
    return (
        <section className="ticker-list-section">
            <div className="section-heading">
                <h2 className="section-title">Ticker list</h2>
                <p className="section-subtitle">Select an instrument to view live chart data</p>
            </div>
            {tickers.length > 0 ? (
                <ul className="ticker-list">
                    {tickers.map((ticker) => (
                        <TickerListItem
                            key={ticker.symbol}
                            ticker={ticker}
                            isSelected={selectedSymbol === ticker.symbol}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            ) : <p>No tickers found</p>}
        </section>
    );
};