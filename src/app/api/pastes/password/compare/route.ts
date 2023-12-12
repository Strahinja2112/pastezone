import { Paste } from "@/db/schema/pastes";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
	const {
		password,
		paste,
	}: {
		password: string;
		paste: Paste;
	} = await req.json();

	const success = await bcrypt.compare(password, paste.password);

	return NextResponse.json({
		success: success,
	});
}
