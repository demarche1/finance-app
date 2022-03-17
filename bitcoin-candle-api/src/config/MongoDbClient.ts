import { connect, connection } from "mongoose";

export class MongoDBClient {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async start() {
    await connect(this.uri);
  }

  async close() {
    await connection.close();
  }
}
