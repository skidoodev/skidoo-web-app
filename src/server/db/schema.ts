// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTable, text, integer, date, serial, array } from "drizzle-orm/pg-core";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const createTable = sqliteTableCreator(
  (name) => `skidoo-web-app_${name}`,
);

// export const posts = createTable(
//   "post",
//   {
//     id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//     name: text("name", { length: 256 }),
//     createdAt: int("created_at", { mode: "timestamp" })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: int("updatedAt", { mode: "timestamp" }),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

export const travelForm = pgTable('travel_form', {
  id: serial("id").primaryKey(),
  destination: text("destination").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  pets: integer("pets").notNull(),
  seniors: integer("seniors").notNull(),
  description: text("description"),
  travelerTypes: array(text("traveler_types")).notNull()
});