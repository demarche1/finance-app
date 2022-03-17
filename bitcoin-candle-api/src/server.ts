import { app } from "./app";
import { config } from "dotenv";
import { MongoDBClient } from "./config/MongoDbClient";
import { CandleMessageConsumer } from "./messages/CandleMessage";

const startServer = async () => {
  try {
    config();

    const mongoDbUri = String(process.env.MONGODB_CONNECTION_URI);
    const db = new MongoDBClient(mongoDbUri);
    const PORT = process.env.PORT;

    const server = app.listen(PORT, () => {
      console.log(`Server is up at PORT: ${PORT}`);
    });

    const candleMessageConsumer = new CandleMessageConsumer(server);

    await candleMessageConsumer.consume();

    process.on("SIGINT", async () => {
      await db.close();
      server.close();
      console.log(`Server closed`);
    });

    db.start();
  } catch (error) {
    console.error("Error to start server", error);
  }
};

startServer();
