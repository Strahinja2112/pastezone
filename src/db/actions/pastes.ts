"use server";

import { TApiReturn } from "@/config/types";
import { Paste, pastes } from "../schema/pastes";
import bcrypt from "bcrypt";
import { db } from "..";
import { getTextSize } from "@/lib/utils";

export async function createPaste(data: Paste): Promise<TApiReturn<Paste>> {
	try {
		const password =
			data.password !== "" ? await bcrypt.hash(data.password, 13) : "";

		const [newPaste] = await db
			.insert(pastes)
			.values({
				...data,
				password,
				size: getTextSize(data.content),
				createdAt: new Date().toUTCString(),
			})
			.returning();

		return {
			success: true,
			data: newPaste,
		};
	} catch (e: any) {
		return {
			success: false,
			error: `Could not create paste! ${e.message}`,
			status: 400,
		};
	}
}
