import { useQuery } from "@tanstack/react-query";
import { fetchTickers } from "../services/api";

export const useTickers = () => {
    return useQuery({
        queryKey: ['tickers'],
        queryFn: fetchTickers,
    });
};