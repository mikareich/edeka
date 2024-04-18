import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: "./src/db/migrations",
});
