import { toNextJsHandler } from "better-auth/next-js";
import client from "./service";

export const { DELETE, GET, PATCH, POST, PUT } = toNextJsHandler(client);
