import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoDbClient = new MongoClient();
export const auth = betterAuth({
  socialProviders: {},
  database: mongodbAdapter(mongoDbClient.db(), {
    client: mongoDbClient,
  }),
});
