import { WebSocketServer, type WebSocket } from "ws";
import { generateNextMarketTick } from "../services/marketSimulator.js";
import type { LivePriceMessage } from "../types/market.js";
import type { Server } from "http";

const broadcastMessage = (
    clients: Set<WebSocket>,
    payload: LivePriceMessage
): void => {
    const message = JSON.stringify(payload);

    for(const client of clients) {
        if(client.readyState === client.OPEN) {
            client.send(message);
        }
    }
};

export const setupWebSocketServer = (server: Server): void => {
    const wss = new WebSocketServer({ server });
    
    wss.on("connection", (socket) => {
        console.log("Websocket client connected");

        socket.on("close", () => {
            console.log("Websocket client disconnected");
        });
    });

    setInterval(() => {
        const updates = generateNextMarketTick();
        
        for (const update of updates ) {
            broadcastMessage(wss.clients as Set<WebSocket>, update);
        }
        
    }, 1000);
};