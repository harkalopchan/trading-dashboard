import { generateInitialHistory, initialTickers } from "../data/marketSeed.js";
import type { PricePoint, TickerSymbol, Ticker, LivePriceMessage } from "../types/market.js";

const priceState = new Map<TickerSymbol, number>();
const historyState = new Map<TickerSymbol, PricePoint[]>();

for (const ticker of initialTickers) {
    priceState.set(ticker.symbol, ticker.price);
    historyState.set(ticker.symbol, generateInitialHistory(ticker.symbol, ticker.price));
}

const roundPrice = (value: number): number => Number(value.toFixed(2));

const getRandomPercentageChange = (): number => {
    return (Math.random() - 0.5) * 0.02;
};

const appendHistoryPoint = (symbol: TickerSymbol, point: PricePoint): void => {
    const existingHistory = historyState.get(symbol) ?? [];
    const updatedHistory = [...existingHistory, point].slice(0, 20);
    historyState.set(symbol, updatedHistory);
};

export const getTickers = (): Ticker[] => {
    return initialTickers.map(ticker => ({
        symbol: ticker.symbol,
        price: priceState.get(ticker.symbol) ?? ticker.price,
        name: ticker.name,
    }));
};

export const getTickerHistory = (symbol: TickerSymbol): PricePoint[] => {
    return historyState.get(symbol) ?? [];
};

export const hasTicker = (symbol: string): symbol is TickerSymbol => {
    return initialTickers.some(ticker => ticker.symbol === symbol);
};

export const generateNextPrice = (symbol: TickerSymbol): LivePriceMessage => {
    const currentPrice = priceState.get(symbol)
    if(currentPrice === undefined) {
        throw new Error(`Ticker ${symbol} not found`);
    }
    const percentageChange = getRandomPercentageChange();

    const nextPrice = roundPrice(currentPrice * (1 + percentageChange));
    const timestamp = Date.now();

    const nextPoint: PricePoint = { timestamp, price: nextPrice, symbol };

    priceState.set(symbol, nextPrice);
    appendHistoryPoint(symbol, nextPoint);

    return nextPoint;
};

export const generateNextMarketTick = (): LivePriceMessage[] => {
    return initialTickers.map(ticker => generateNextPrice(ticker.symbol));
};