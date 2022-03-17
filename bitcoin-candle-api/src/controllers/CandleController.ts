import { ICandle, CandleModel } from "../models/CandleModel";

export class CandleController {
  async saveCandle(candle: ICandle): Promise<ICandle> {
    return await CandleModel.create(candle);
  }

  async findLastCandles(n: number): Promise<ICandle[]> {
    const quantity = n ? n : 10;
    return CandleModel.find().sort({ id: -1 }).limit(quantity);
  }
}

export default new CandleController();
