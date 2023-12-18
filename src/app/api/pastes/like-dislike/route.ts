import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");
	const method = req.nextUrl.searchParams.get("method") as "like" | "dislike";
	const action = req.nextUrl.searchParams.get("action") as "add" | "remove";

	if (!id || !method) {
		return new NextResponse("No body or method!", {
			status: 400,
		});
	}

	const [paste] = await db.select().from(pastes).where(eq(pastes.id, id));

	if (!paste) {
		return NextResponse.json({
			success: false,
		});
	}

	try {
		if (method === "like") {
			await db
				.update(pastes)
				.set({
					likeCount: (paste.likeCount || 0) + (action === "add" ? 1 : -1),
				})
				.where(eq(pastes.id, id));
		}
		if (method === "dislike") {
			await db
				.update(pastes)
				.set({
					dislikeCount: (paste.dislikeCount || 0) + (action === "add" ? 1 : -1),
				})
				.where(eq(pastes.id, id));
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
