import { describe, it, expect } from "vitest";
import { generateNextMarketTick, getTickerHistory, hasTicker, getTickers } from "../src/services/marketSimulator.js";

describe("Market Simulator", () => {
    it("generates a valid market tickers", () => {
        const tickers = getTickers();

        expect(tickers.length).toBe(4)
        expect(tickers.map((ticker) => ticker.symbol)).toEqual(
            expect.arrayContaining(["BTC-USD", "ETH-USD", "SOL-USD", "XRP-USD"])
        );
    });

    it("recognizes valid ticker symbols", () => {
        expect(hasTicker("BTC-USD")).toBe(true);
        expect(hasTicker("ETH-USD")).toBe(true);
        expect(hasTicker("SOL-USD")).toBe(true);
        expect(hasTicker("XRP-USD")).toBe(true);
    });

    it("rejects invalid ticker symbols", () => {
        expect(hasTicker("INVALID")).toBe(false);
    });

    it("returns history for valid tickers", () => {
        const history = getTickerHistory("BTC-USD");
        expect(history.length).toBeGreaterThan(0);
        expect(history[0]?.symbol).toBe("BTC-USD");
    });

    it("generates market updates for all tickers", () => {
        const updates = generateNextMarketTick();
        
        expect(updates.length).toBe(4);

        for (const update of updates) {
            expect(update.symbol).toBeTypeOf("string");
            expect(update.price).toBeTypeOf("number");
            expect(update.timestamp).toBeTypeOf("number");
        }
    });
});