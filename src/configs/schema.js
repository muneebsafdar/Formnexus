import { pgTable, serial, text, varchar, integer,boolean } from "drizzle-orm/pg-core";


export const Jsonform = pgTable("form", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
  theme: varchar("theme", { length: 255 }).notNull(),
  background: varchar("background", { length: 255 }).notNull(),
  enabeAuth: boolean("enabeAuth").notNull(),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
  formId: integer("formId").references(() => Jsonform.id, { onDelete: "cascade" }).notNull(),
  
});
