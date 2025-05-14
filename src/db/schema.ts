import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export enum BookingType {
  MEETING = "meeting",
  VIEWING = "viewing",
  MOVE = "move",
}

export const buildings = sqliteTable("buildings", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
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

export const customerForce = sqliteTable("customer_force", {
  id: integer("id").primaryKey({ autoIncrement: true }).unique().notNull(),
  roomName: text("room_name").notNull(),
  companyName: text("company_name").notNull(),
  startTime: integer("start_time").notNull(),
  endTime: integer("end_time").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  qrCode: text("qr_code").unique().notNull(),
  bookingType: text("booking_type", {
    enum: ["meeting", "viewing", "move"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Buildings = typeof buildings.$inferSelect;
export type NewBuildings = typeof buildings.$inferInsert;

export type CustomerForce = typeof customerForce.$inferSelect;
export type NewCustomerForce = typeof customerForce.$inferInsert;
