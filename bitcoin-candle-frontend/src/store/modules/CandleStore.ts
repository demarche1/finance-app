/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { http } from "@/api/http";
import { Candle } from "@/models/Candle";

@Module({ name: "CandleStore" })
export class CandleStore extends VuexModule {
  private candles = [] as Candle[];

  get $candles() {
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
  public async loadCandles() {
    const { data } = await http.get("/candles");

    const candles: Candle[] = data.map((candle: Candle) => new Candle(candle));

    this.context.commit("INITIALIZE_CANDLES", candles.reverse());
  }

  @Action
  public async addCandle(candle: Candle): Promise<void> {
    this.context.commit("APPEND_NEW_CANDLE", candle);
  }
}
