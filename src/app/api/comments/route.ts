import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/db/schema/comments";

export async function POST(req: NextRequest) {
	const body: Comment = await req.json();

	if (!body) {
		return new NextResponse("No body", {
			status: 400,
		});
	}
}
