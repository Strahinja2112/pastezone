import { NextRequest, NextResponse } from "next/server";
import { pastes, type Paste } from "@/db/schema/pastes";
import { db } from "@/db";
import { getTextSize } from "@/lib/utils";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

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

		const password =
			paste.password !== "" ? await bcrypt.hash(paste.password, 13) : "";

		const [newPaste] = await db
			.insert(pastes)
			.values({
				...paste,
				password,
				size: getTextSize(paste.content),
				createdAt: new Date().toUTCString(),
			})
			.returning();

		console.log({ newPaste });

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

export async function DELETE(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id");

		if (!id) {
			return NextResponse.json({
				success: false,
				error: "Could not delete paste",
				status: 500,
			});
		}

		const [deletedPaste] = await db
			.delete(pastes)
			.where(eq(pastes.id, id))
			.returning();

		return NextResponse.json({
			success: true,
			message: `Deleted paste with ID: ${deletedPaste.id}`,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			success: false,
			error: "Could not delete paste",
			status: 500,
		});
	}
}