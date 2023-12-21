import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { comments } from "@/db/schema/comments";

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");
	const method = req.nextUrl.searchParams.get("method") as "like" | "dislike";
	const action = req.nextUrl.searchParams.get("action") as "add" | "remove";

	if (!id || !method) {
		return new NextResponse("No body or method!", {
			status: 400,
		});
	}

	const [comment] = await db.select().from(comments).where(eq(comments.id, id));

	if (!comment) {
		return NextResponse.json({
			success: false,
		});
	}

	try {
		if (method === "like") {
			await db
				.update(comments)
				.set({
					likeCount: (comment.likeCount || 0) + (action === "add" ? 1 : -1),
				})
				.where(eq(comments.id, id));
		}
		if (method === "dislike") {
			await db
				.update(comments)
				.set({
					dislikeCount:
						(comment.dislikeCount || 0) + (action === "add" ? 1 : -1),
				})
				.where(eq(comments.id, id));
		}

		return NextResponse.json({
			success: true,
		});
	} catch (e: any) {
		return NextResponse.json({
			success: false,
		});
	}
}
