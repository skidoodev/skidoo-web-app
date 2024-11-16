import { text, integer, int } from "drizzle-orm/sqlite-core";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const createTable = sqliteTableCreator(
  (name) => `skidoo-web-app_${name}`,
);

// Updated user table to match Clerk webhook payload
export const users = createTable("user", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  clerkId: text("clerk_id", { length: 256 }).notNull().unique(), // Clerk's unique ID
  email: text("email", { length: 256 }).notNull(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  username: text("username", { length: 256 }),
  firstName: text("first_name", { length: 256 }),
  lastName: text("last_name", { length: 256 }),
  imageUrl: text("image_url"),
  // For OAuth providers like Google
  externalAccounts: text("external_accounts", { mode: "json" }).$type<{
    provider: string;
    providerId: string;
  }[]>().default(sql`'[]'`),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // Optional: Add any other fields you might need from the webhook
  lastSignInAt: int("last_sign_in_at", { mode: "timestamp" }),
});

// Define relations between users and travel forms
export const usersRelations = relations(users, ({ many }) => ({
  travelForms: many(travelForm),
}));

export const travelForm = createTable("travel_form", {
  id: text("id", { length: 256 }).primaryKey().notNull().$defaultFn(createId),
  // Reference the user using clerkId for direct mapping with webhook data
  userId: text("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" }),

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
  email: text("email", { length: 256 }),
});

// Define relations between travel forms and users
export const travelFormRelations = relations(travelForm, ({ one }) => ({
  user: one(users, {
    fields: [travelForm.userId],
    references: [users.id],
  }),
}));