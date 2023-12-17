"use server";

import { TApiReturn } from "@/types";
import { Comment } from "../schema/comments";

export async function createComment(
	data: Comment
): Promise<TApiReturn<Comment>> {
	if (!data) {
	}

	return {
		success: true,
		data: data,
	};
}
