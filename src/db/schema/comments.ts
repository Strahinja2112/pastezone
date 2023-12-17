import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { pastes } from "./pastes";
import { InferInsertModel } from "drizzle-orm";

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
	createdAt: text("createdAt").notNull(),
	likeCount: integer("likeCount").default(0),
	dislikeCount: integer("dislikeCount").default(0),
	size: text("size").notNull(),
});

export type Comment = InferInsertModel<typeof comments>;
