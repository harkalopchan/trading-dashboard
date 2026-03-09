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
        <section style={{ margin: "16px 0" }}>
            <h2>Ticker List</h2>
            {tickers.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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