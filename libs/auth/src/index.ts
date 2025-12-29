import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoDbClient = new MongoClient(process.env.AUTH_MONGO_DB_URI!);
const mongdbTable = mongoDbClient.db(process.env.AUTH_MONGO_DB_TABLE);

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
  },
  database: mongodbAdapter(mongdbTable, {
    client: mongoDbClient,
  }),
});

export const { api } = auth;
