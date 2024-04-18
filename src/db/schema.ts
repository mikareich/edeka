import {
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("type", ["Kasse"]);

const shifts = pgTable("shifts", {
  id: uuid("id").primaryKey(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  type: typeEnum("type").notNull(),
  location: text("location").notNull(),
  breaks: json("breaks").$type<{ from: Date; to: Date }[]>().notNull(),
});

export type Shift = typeof shifts.$inferInsert;

export default shifts;
