import { NextRequest, NextResponse } from "next/server";
import { pastes, type Paste } from "@/db/schema/pastes";
import { db } from "@/db";
import { getTextSize } from "@/lib/utils";
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
		delete paste.id;

		const fileSize = getTextSize(paste.content);

		const [newPaste] = await db
			.insert(pastes)
			.values({
				...paste,
				size: fileSize,
			})
			.returning();

		return NextResponse.json<TCreateNewPasteRet>({
			success: true,
			new: newPaste,
		});
	} catch {
		return NextResponse.json<TCreateNewPasteRet>({
			success: false,
			error: "Could not create paste!",
			status: 400,
		});
	}
}
