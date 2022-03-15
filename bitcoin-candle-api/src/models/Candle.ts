import { Schema, Document, model } from "mongoose";

export interface CandleInterface extends Document {
  low: number;
  high: number;
  open: number;
  close: number;
  color: string;
  finalDateTime: Date;
  currency: string;
}

const schema = new Schema<CandleInterface>({
  low: { type: Number, required: true },
  high: { type: Number, required: true },
  open: { type: Number, required: true },
  close: { type: Number, required: true },
  color: { type: String, required: true },
  finalDateTime: { type: Date, required: true },
  currency: { type: String, required: true },
});

export const CandleModel = model<CandleInterface>("Candle", schema);
