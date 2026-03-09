import http from "http";
import { app } from "./app.js";
import { setupWebSocketServer } from "./websocket/wsServer.js";

const PORT = 3000;
const server = http.createServer(app);

setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});