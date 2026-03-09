import { useQuery } from "@tanstack/react-query";
import type { TickerSymbol } from "../types/market";
import { fetchTickerHistory } from "../services/api";

export const useTickerHistory = (symbol?: TickerSymbol) => {
    return useQuery({
        queryKey: ['ticker-history', symbol],
        queryFn: () => fetchTickerHistory(symbol as TickerSymbol),
        enabled: Boolean(symbol),
    });
};