import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { pastes } from "./pastes";
import { InferSelectModel } from "drizzle-orm";

export const comments = sqliteTable("comment", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	userId: text("userId")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	pasteId: text("pasteId")
		.references(() => pastes.id, { onDelete: "cascade" })
		.notNull(),
	content: text("content").notNull(),
	createdAt: integer("createdAt", {
		mode: "timestamp_ms",
	}).notNull(),
	numberOfLikes: integer("numberOfLikes").notNull(),
	numberOfDislikes: integer("numberOfDislikes").notNull(),
	size: text("size").notNull(),
});

export type Comment = InferSelectModel<typeof comments>;
