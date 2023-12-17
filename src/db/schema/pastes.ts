import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import {
	categories,
	expirations,
	exposures,
	syntaxLanguages,
} from "@/config/constants";
import { users } from "./users";
import { InferInsertModel } from "drizzle-orm";

export const pastes = sqliteTable("pastes", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	userId: text("userId")
		.references(() => users.id, {
			onDelete: "cascade",
		})
		.notNull(),
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
	exposure: text("exposure", {
		enum: exposures,
	}).notNull(),
	createdAt: text("createdAt").notNull(),
	password: text("password").notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	size: text("size").notNull(),
	likeCount: integer("likeCount", { mode: "number" }).default(0),
	dislikeCount: integer("dislikeCount", { mode: "number" }).default(0),
	viewCount: integer("viewCount", { mode: "number" }).default(0),
});

export type Paste = InferInsertModel<typeof pastes>;
