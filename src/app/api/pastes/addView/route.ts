import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
	const id = req.nextUrl.searchParams.get("id");

	if (!id) {
		return new NextResponse("No body", {
			status: 400,
		});
	}

	const [paste] = await db.select().from(pastes).where(eq(pastes.id, id));

	if (!paste) {
		return new NextResponse("Paste not found", {
			status: 404,
		});
	}

	await db
		.update(pastes)
		.set({
			viewCount: (paste.viewCount || 0) + 1,
		})
		.where(eq(pastes.id, id));

	return new NextResponse(JSON.stringify(paste), {
		status: 200,
	});
}
