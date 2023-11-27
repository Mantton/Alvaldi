/** @type { import("drizzle-kit").Config } */
export default {
  // Source & Destination
  schema: "./src/db/schema",
  out: "./db/migrations/",

  // Connection
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },

  // Push
  verbose: false,
  strict: false,
};
