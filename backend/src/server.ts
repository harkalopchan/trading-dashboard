import express from "express";
import cors from "cors";
import http from "http";
import tickerRoutes from "./routes/tickers.js";
import { setupWebSocketServer } from "./websocket/wsServer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Trading backend is running");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tickers", tickerRoutes);

const PORT = 3000;
const server = http.createServer(app);

setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});