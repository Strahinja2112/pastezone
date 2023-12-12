import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const comments = sqliteTable("comment", {
	id: text("id").notNull().primaryKey(),
	content: text("content").notNull(),
	createdAt: integer("createdAt", {
		mode: "timestamp_ms",
	}).notNull(),
	updatedAt: integer("updatedAt", {
		mode: "timestamp_ms",
	}).notNull(),
});
