import type { Ticker, TickerSymbol } from "../../types/market";
import { formatPrice } from "../../utils/format";

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
        <li key={ticker.symbol} className="ticker-list-item">
            <button
                type="button"
                onClick={() => onSelect(ticker.symbol)}
                className={`ticker-button ${isSelected ? "ticker-button--selected" : ""}`}
            >
                <div className="ticker-button-top">
                    <strong className="ticker-button-symbol">{ticker.symbol}</strong>
                    <span className="ticker-button-price">
                        {formatPrice(ticker.price)}
                    </span>
                </div>

                <div className="ticker-button-bottom">
                    <span className="ticker-button-name">{ticker.name}</span>
                </div>
            </button>

        </li>
    );
};