import { Channel, connect, Connection } from "amqplib";
import { Server } from "socket.io";
import http from "http";
import CandleController from "../controllers/CandleController";
import { CandleController as CandleControllerType } from "../controllers/CandleController";

export class CandleMessageConsumer {
  private channel!: Channel;
  private io: Server;
  private candleController: CandleControllerType;
  private amqpUri: string;
  private queueName: string;

  constructor(server: http.Server) {
    this.amqpUri = String(process.env.AMQP_SERVER);
    this.queueName = String(process.env.QUEUE_NAME);
    this.candleController = CandleController;

    this.io = new Server(server, {
      cors: {
        origin: String(process.env.SOCKET_CLIENT_SERVER),
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", () => {
      console.log("Socket io is connected");
    });
  }

  private async createChannel() {
    try {
      const connection: Connection = await connect(this.amqpUri);

      this.channel = await connection.createChannel();

      this.channel.assertQueue(this.queueName);
    } catch (error) {
      console.error("Error to create RabbitMQ connection", error);
    }
  }

  async consume() {
    await this.createChannel();

    if (!this.channel) return;

    this.channel.consume(this.queueName, async (msg) => {
      const message = msg && msg.content;

      if (!message) return;

      const candleObj = JSON.parse(message.toString());

      this.channel.ack(msg);

      console.log("Candle consumed", candleObj);

      this.candleController.saveCandle(candleObj);

      this.io.emit(String(process.env.SOCKET_EVENT_NAME), candleObj);
    });
  }
}
