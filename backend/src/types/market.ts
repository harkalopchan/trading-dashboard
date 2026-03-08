export type TickerSymbol = "BTC-USD" | "ETH-USD" | "SOL-USD" | "XRP-USD";

export interface Ticker {
    symbol: TickerSymbol;
    price: number;
    name: string;
}

export interface PricePoint {
    timestamp: number;
    price: number;
    symbol: TickerSymbol;
}

export interface LivePriceMessage {
    symbol: TickerSymbol;
    price: number;
    timestamp: number;
}