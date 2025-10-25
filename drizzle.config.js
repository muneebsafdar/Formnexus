import { defineConfig } from "drizzle-kit";

const DbUrl=process.env.NEXT_PUBLIC_DATABASE_URL
 
export default defineConfig({
  schema: "./src/configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: DbUrl
  }
});
