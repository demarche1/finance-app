import { config } from "dotenv";
import { Candle } from "./models/Candle";
import { Period } from "./enums";
import { sleep } from "./utils";
import { createChannel } from "./messages/messageChannel";
import axios from "axios";

config();

const readMarketPrice = async (): Promise<number | undefined> => {
  try {
    const { data } = await axios.get(`${process.env.PRICE_API}`);
    const price = data.bitcoin.usd;

    return price;
  } catch (error) {
    console.error("Can't fetch to price api", error);
  }
};

const generateCandles = async () => {
  const messageChannel = await createChannel();

  if (!messageChannel) return;

  while (true) {
    const loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS;
    const candle = new Candle("BTC");

    console.log("--------------------------------");
    console.log("Generating new candle.");

    for (let i = 0; i < loopTimes; i++) {
      const price = await readMarketPrice();

      candle.addValues(Number(price));

      console.log(`Market price: ${price}, loop time: ${i + 1}`);

      await sleep(Period.TEN_SECONDS);
    }

    candle.closeClandle();
    console.log("Candle closed");

    const objectCandle = candle.toSimpleObject();

    console.log(objectCandle);

    const stringCandle = JSON.stringify(candle.toSimpleObject());

    messageChannel.sendToQueue(
      `${process.env.QUEUE_NAME}`,
      Buffer.from(stringCandle)
    );
  }
};

(function start() {
  generateCandles();
})();
