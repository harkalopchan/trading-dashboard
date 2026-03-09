import axios from "axios";
import type { Ticker, TickerSymbol, PricePoint } from "../types/market";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchTickers = async () : Promise<Ticker[]> => {
    const response = await api.get<Ticker[]>("/tickers");
    return response.data;
};

export const fetchTickerHistory = async (symbol: TickerSymbol) : Promise<PricePoint[]> => {
    const response = await api.get<PricePoint[]>(`/tickers/${symbol}/history`);
    return response.data;
};