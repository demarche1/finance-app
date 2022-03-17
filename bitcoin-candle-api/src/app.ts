import express from "express";
import cors from "cors";
import { candleRouter } from "./routes/CandleRoute";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(candleRouter);
