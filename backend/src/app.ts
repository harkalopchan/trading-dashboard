import express from "express";
import cors from "cors";
import tickerRoutes from "./routes/tickers.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Trading backend is running");
});

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/tickers", tickerRoutes);