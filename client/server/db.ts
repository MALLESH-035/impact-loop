import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// For this prototype, we don't enforce a real DB connection if not present,
// but we set it up for standard compliance.
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/db" 
});

// We wrap this in a try-catch or optional check in a real scenario, 
// but for the template we assume it exists or we mock it.
export const db = drizzle(pool, { schema });
