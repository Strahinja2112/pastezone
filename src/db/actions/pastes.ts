"use server";

import { db } from "..";
import { Paste, pastes } from "../schema/pastes";
import { eq, sql } from "drizzle-orm";
import { users } from "../schema/users";

export async function create(paste: Paste): Promise<boolean> {
	return true;
}

export async function getByUserId(userId: string): Promise<Paste[]> {
	console.log(userId);

	const result = await db
		.select()
		.from(pastes)
		.where(eq(users.email, ""))
		.all();

	return [];
}
