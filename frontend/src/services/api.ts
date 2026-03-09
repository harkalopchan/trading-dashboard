import axios from "axios";
import type { Ticker, TickerSymbol, PricePoint } from "../types/market";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const fetchTickers = async () : Promise<Ticker[]> => {
    const response = await api.get<Ticker[]>("/tickers");
    return response.data;
};

export const fetchTickerHistory = async (symbol: TickerSymbol) : Promise<PricePoint[]> => {
    const response = await api.get<PricePoint[]>(`/tickers/${symbol}/history`);
    return response.data;
};