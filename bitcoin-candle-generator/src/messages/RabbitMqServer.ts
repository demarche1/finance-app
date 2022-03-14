import { Channel, connect, Connection } from "amqplib";

export class RabbitMqServer {
  private connection!: Connection;
  private channel!: Channel;
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async publishInQueue(queueName: string, payload: any): Promise<void> {
    await this.channel.assertQueue(queueName);
    this.channel.sendToQueue(queueName, Buffer.from(payload));
  }
}
