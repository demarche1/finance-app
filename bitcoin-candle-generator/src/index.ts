import { config } from "dotenv";
import { Candle } from "./models/Candle";
import { Period } from "./enums";
import { sleep } from "./utils";
import { RabbitMqServer } from "./messages/RabbitMqServer";
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
  try {
    const amqpServerUri = String(process.env.AMQP_SERVER);
    const queueName = String(process.env.QUEUE_NAME);
    const rabbitMqServer = new RabbitMqServer(amqpServerUri);

    await rabbitMqServer.start();

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
      console.log(candle.toSimpleObject());

      await rabbitMqServer.publishInQueue(queueName, candle.toString());
    }
  } catch (error) {
    console.error("Error to connect to RabbitMQServer");
  }
};

(function start() {
  generateCandles();
})();
