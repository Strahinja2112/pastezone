import { auth } from "@/auth";
import { db } from "@/db";
import { Paste, pastes } from "@/db/schema/pastes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body: Paste = await req.json();
	const session = await auth();

	if (!body) {
		return new NextResponse("No body", {
			status: 400,
		});
	}

	if (!session?.user) {
		return new NextResponse("Unauthorized", {
			status: 401,
		});
	}

	await db.insert(pastes).values({
		...body,
		id: undefined,
		userId: session.user.id,
		title: body.title + "(clone)",
		createdAt: new Date().toUTCString(),
	});

	return new NextResponse("ALL GOOD", {
		status: 200,
	});
}
