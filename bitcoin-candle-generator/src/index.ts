import { config } from "dotenv";
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

readMarketPrice();
