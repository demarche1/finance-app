import { Router } from "express";
import CandleController from "../controllers/CandleController";

export const candleRouter = Router();

candleRouter.get("/candles", async (req, res) => {
  const lastCandles = await CandleController.findLastCandles(0);

  res.json(lastCandles);
});

candleRouter.get("/candles/:quantity", async (req, res) => {
  const quantity = Number(req.params.quantity);
  const lastCandles = await CandleController.findLastCandles(quantity);

  res.json(lastCandles);
});
