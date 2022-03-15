import { ICandle, CandleModel } from "../models/CandleModel";

export class CandleController {
  async saveCandle(candle: ICandle): Promise<ICandle> {
    return await CandleModel.create(candle);
  }

  async findLastCandles(quantity = 10): Promise<ICandle[]> {
    return CandleModel.find().sort({ id: -1 }).limit(quantity);
  }
}

export default new CandleController();
