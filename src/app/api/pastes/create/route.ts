import { NextRequest, NextResponse } from "next/server";
import { pastes, type Paste } from "@/db/schema/pastes";
import { db } from "@/db";
import { getTextSize } from "@/lib/utils";
import bcrypt from "bcrypt";

export type TCreateNewPasteReturn =
	| {
			success: true;
			new: Paste;
	  }
	| {
			success: false;
			error: string;
			status: number;
	  };

export async function POST(req: NextRequest) {
	try {
		const paste: Paste = await req.json();

		const password = await bcrypt.hash(paste.password, 13);

		const [newPaste] = await db
			.insert(pastes)
			.values({
				...paste,
				password,
				size: getTextSize(paste.content),
			})
			.returning();

		return NextResponse.json<TCreateNewPasteReturn>({
			success: true,
			new: newPaste,
		});
	} catch {
		return NextResponse.json<TCreateNewPasteReturn>({
			success: false,
			error: "Could not create paste!",
			status: 400,
		});
	}
}
