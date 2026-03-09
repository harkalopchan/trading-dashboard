import type { LivePriceMessage } from "../types/market";

const WS_URL = "ws://localhost:3000";

export const createMarketWebSocket = (
    onMessage: (message: LivePriceMessage) => void
) : WebSocket => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
        try {
            const parsed = JSON.parse(event.data) as LivePriceMessage;
            onMessage(parsed);
        } catch (error) {
            console.error("Failed to parse message:", error);
        }
    };
    return socket;
};