import { Router } from "express";
import CandleController from "../controllers/CandleController";

export const candleRouter = Router();

candleRouter.get("/:quantity", async (req, res) => {
  const quantity = Number(req.params.quantity);
  const lastCandles = await CandleController.findLastCandles(quantity);

  res.json(lastCandles);
});
