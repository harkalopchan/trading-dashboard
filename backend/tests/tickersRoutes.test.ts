import request from "supertest";
import { app } from "../src/app.js";
import { describe, expect, it } from "vitest";

describe("Tickers Routes", () => {
    it("GET /health returns ok status", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
    });

    it("GET /api/tickers returns the tickers list", async () => {
        const response = await request(app).get("/api/tickers");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
    });

    it("GET /api/tickers/:symbol/history returns the ticker history", async () => {
        const response = await request(app).get("/api/tickers/BTC-USD/history");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]?.symbol).toBe("BTC-USD");
    });

    it("GET /api/tickers/:symbol/history returns 404 for invalid ticker", async () => {
        const response = await request(app).get("/api/tickers/INVALID/history");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Ticker INVALID not found" });
    });

});