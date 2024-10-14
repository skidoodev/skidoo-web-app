// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { text, integer, int } from "drizzle-orm/sqlite-core";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const createTable = sqliteTableCreator(
  (name) => `skidoo-web-app_${name}`,
);

//TODO: create a user table from clerk webhook

export const travelForm = createTable("travel_form", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),

  //TODO: add foregin key relation ship to user.userId to associate a form response to a user.
  //  User has a one-to-many relationship to travelForm.
  // customerId can be null for guest workflow

  // customerId: text("customerId", { length: 256 })
  //   .references(() => users.userId, { onDelete: "cascade" }),

  destination: text("destination").notNull(),

  startDate: int("startDate", { mode: "timestamp" }).notNull(),
  endDate: int("endDate", { mode: "timestamp" }).notNull(),

  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  pets: integer("pets").notNull(),
  seniors: integer("seniors").notNull(),

  description: text("description"),
  travelerTypes: text("traveler_types", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`'[]'`),
});
