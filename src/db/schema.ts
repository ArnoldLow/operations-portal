import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const buildings = sqliteTable("buildings", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  description: text("description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Buildings = typeof buildings.$inferSelect;
export type NewBuildings = typeof buildings.$inferInsert;
