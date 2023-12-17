"use server";

import { TApiReturn } from "@/config/types";
import { Comment, comments } from "../schema/comments";
import { getTextSize } from "@/lib/utils";
import { db } from "..";

export async function createComment(
	data: Comment
): Promise<TApiReturn<Comment>> {
	if (!data) {
		return {
			success: false,
			error: "No body has been passed!",
			status: 400,
		};
	}

	const size = getTextSize(data.content);

	const [newComment] = await db
		.insert(comments)
		.values({
			...data,
			size,
		})
		.returning();

	if (!newComment) {
		return {
			success: false,
			error: "Could not create comment",
			status: 500,
		};
	}

	return {
		success: true,
		data: newComment,
	};
}
