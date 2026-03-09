import type { Ticker, TickerSymbol } from "../../types/market";

interface TickerListItemProps {
    ticker: Ticker;
    isSelected: boolean;
    onSelect: (symbol: TickerSymbol) => void;
}

export const TickerListItem = ({
    ticker,
    isSelected,
    onSelect,
}: TickerListItemProps) => {
    return (
        <li key={ticker.symbol}>
            <button
                type="button"
                onClick={() => onSelect(ticker.symbol)}
                style={{ border: "1px solid #e2e8f0", width: "300px", borderRadius: "4px", padding: "8px", cursor: "pointer", marginBottom: "8px", backgroundColor: isSelected ? "#eff6ff" : "#ffffff" }}>
                {ticker.symbol} - {ticker.name} - {ticker.price}
            </button>
            <div>
                <strong>{ticker.symbol}</strong>
            </div>
            <div>
                {ticker.name}
            </div>
            <div>
                {ticker.price}
            </div>
        </li>
    );
};