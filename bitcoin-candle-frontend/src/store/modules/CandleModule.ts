import { Module, VuexModule, Action, Mutation } from "vuex-modules-decorators";
import { http } from "@/api/http";
import { Candle } from "@/models/Candle";

@Module()
export class CandleStore extends VuexModule {
  private candles = [] as Candle[];

  get $candles(): Array<unknown> {
    return this.candles.length
      ? this.candles.map((candle) => ({
          x: candle.finalDateTime.toLocaleString(),
          y: [candle.open, candle.high, candle.low, candle.close],
        }))
      : [];
  }

  @Mutation
  private INITIALIZE_CANDLES(candles: Candle[]) {
    this.candles = candles;
  }

  @Mutation
  private APPEND_NEW_CANDLE(candle: Candle) {
    this.candles.push(candle);
  }

  @Action
  public async getFinalCandles(): Promise<void> {
    const candles = await http.get(
      String(process.env.VUE_APP_CANDLES_API_ENDPOINT)
    );

    this.context.commit("INITIALIZE_CANDLES", candles);
  }
}
