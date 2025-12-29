import { createAuthClient } from "better-auth/client";

export const auth = createAuthClient({
  baseURL: process.env.AUTH_BASE_URL!,
  basePath: "/api/auth",
});
