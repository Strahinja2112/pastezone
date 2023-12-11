import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import {
	categories,
	expirations,
	syntaxLanguages,
} from "@/config/select-values";
import { users } from "./users";
import { InferInsertModel, sql } from "drizzle-orm";

export const pastes = sqliteTable("pastes", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	// TODO: MAKE THIS BE WITH GUEST ALSO
	userId: text("userId").references(() => users.id),
	category: text("category", {
		enum: categories,
	}).notNull(),
	tags: text("tags").notNull(),
	language: text("language", {
		enum: syntaxLanguages,
	}).notNull(),
	expiration: text("expiration", {
		enum: expirations,
	}).notNull(),
	createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
	password: text("password").notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	size: text("size").notNull(),
});

export type Paste = InferInsertModel<typeof pastes>;