import {neon} from "@neondatabase/serverless";

import "dotenv/config";

// Initialize the Neon database connection using the DATABASE_URL from environment variables
export const sql = neon(process.env.DATABASE_URL);