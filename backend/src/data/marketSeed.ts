import type { Ticker, PricePoint, TickerSymbol } from "../types/market.ts";

export const initialTickers: Ticker[] = [
    { symbol: "BTC-USD", price: 67367.92, name: "Bitcoin" },
    { symbol: "ETH-USD", price: 1961.04, name: "Ethereum" },
    { symbol: "SOL-USD", price: 82.36, name: "Solana" },
    { symbol: "XRP-USD", price: 1.36, name: "XRP" },
];

export const generateInitialHistory = (symbol: TickerSymbol, basePrice: number, points: number = 20): PricePoint[] => {
    const now = Date.now();
    const history: PricePoint[] = [];
    for (let i = points - 1; i >=0; i -= 1) {
        const variance = (Math.random() * 0.05) * basePrice * 0.02;
        history.push({
            timestamp: now - i * 1000, 
            price: Number((basePrice + variance).toFixed(2)), 
            symbol,
        });
    }
    return history;
};