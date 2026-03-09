import { Router } from "express";
import { getTickers, getTickerHistory, hasTicker } from "../services/marketSimulator.js";

const router = Router();

router.get("/", (_req, res) => {
    res.json(getTickers());
});

router.get("/:symbol/history", (_req, res) => {
    const { symbol } = _req.params;
    
    if(!hasTicker(symbol)) {
        return res.status(404).json({ error: `Ticker ${symbol} not found` });
    }

    res.json(getTickerHistory(symbol));
});

export default router;