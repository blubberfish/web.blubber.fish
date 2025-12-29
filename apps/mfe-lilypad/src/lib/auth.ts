import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoDbClient = new MongoClient(process.env.AUTH_MONGO_DB_URI!);
const mongdbTable = mongoDbClient.db(process.env.AUTH_MONGO_DB_TABLE);
export const auth = betterAuth({
  database: mongodbAdapter(mongdbTable, {
    client: mongoDbClient,
  }),
});

export const { api } = auth;
