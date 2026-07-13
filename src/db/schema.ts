import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pickupOrders = pgTable("pickup_orders", {
  id: serial("id").primaryKey(),
  item: text("item").notNull(),
  customerName: text("customer_name").notNull(),
  pickupTime: text("pickup_time").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  status: text("status").notNull().default("received"),
  quantity: integer("quantity").notNull().default(1),
});
