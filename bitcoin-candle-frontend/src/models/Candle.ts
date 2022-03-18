export class Candle {
  low = 0;
  high = 0;
  open = 0;
  close = 0;
  color = "";
  finalDateTime = new Date();
  currency = "";

  constructor(candleObj: unknown) {
    Object.assign(this, candleObj);
    this.finalDateTime = new Date(this.finalDateTime);
  }
}
