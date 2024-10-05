// import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";

// import { env } from "@/env.js";
// import * as schema from "./schema";

// export const db = drizzle(
//   new Database(env.DATABASE_URL, {
//     fileMustExist: false,
//   }),
//   { schema },
// );

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as schema from "./schema";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
