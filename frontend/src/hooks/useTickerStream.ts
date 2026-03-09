import { useEffect, useState } from "react";
import type { LivePriceMessage } from "../types/market";
import { createMarketWebSocket } from "../services/websocket";

export const useTickerStream = () => {
    const [latestMessage, setLatestMessage] = useState<LivePriceMessage | null>(null);

    useEffect(() => {
        const socket = createMarketWebSocket((message) => {
            setLatestMessage(message);
        });

        return () => {
            socket.close();
        };
    }, []);

    return { latestMessage };
};
