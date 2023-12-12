import { NextRequest, NextResponse } from "next/server";
import { pastes, type Paste } from "@/db/schema/pastes";
import { db } from "@/db";
import { getTextSize } from "@/lib/utils";
import bcrypt from "bcrypt";

export type TCreateNewPasteRet =
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

		const passHash = await hashPassword("password");

		// const [newPaste] = await db
		// 	.insert(pastes)
		// 	.values({
		// 		...paste,
		// 		size: getTextSize(paste.content),
		// 	})
		// 	.returning();

		return NextResponse.json<TCreateNewPasteRet>({
			success: true,
			new: paste,
		});
	} catch {
		return NextResponse.json<TCreateNewPasteRet>({
			success: false,
			error: "Could not create paste!",
			status: 400,
		});
	}
}

async function hashPassword(plainText: string) {
	const hash = await bcrypt.hash(plainText, 10);

	console.log(hash);
}
