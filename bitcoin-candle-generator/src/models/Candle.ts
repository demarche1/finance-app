import { CandleColor } from "../enums";

export class Candle {
  low: number;
  high: number;
  open: number;
  close: number;
  color: CandleColor;
  finalDateTime: Date | undefined;
  values: number[];
  currency: string;

  constructor(currency: string) {
    this.low = Infinity;
    this.high = 0;
    this.open = 0;
    this.close = 0;
    this.color = CandleColor.UNDETERMINED;
    this.values = [];
    this.currency = currency;
  }

  addValues(value: number) {
    if (this.values.length === 0) {
      this.open = value;
    }

    if (value > this.high) {
      this.high = value;
    }

    if (value < this.low) {
      this.low = value;
    }

    this.values.push(value);
  }

  setClandleColor() {
    if (this.open > this.close) {
      this.color = CandleColor.RED;
      return;
    }

    if (this.open < this.close) {
      this.color = CandleColor.GREEN;
      return;
    }
  }

  closeClandle() {
    if (!this.values.length) return;

    this.close = this.values[this.values.length - 1];
    this.finalDateTime = new Date();

    this.setClandleColor();
  }

  toSimpleObject() {
    const { values, ...obj } = this;

    return obj;
  }

  toString(): string {
    return JSON.stringify(this.toSimpleObject());
  }
}
