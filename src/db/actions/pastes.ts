"use server";

import { db } from "..";
import { Paste, pastes } from "../schema/pastes";
import { eq } from "drizzle-orm";
import { users } from "../schema/users";

export async function create(paste: Paste): Promise<boolean> {
	return true;
}

export async function getByUserId(userId: string): Promise<Paste[]> {
	return await db.select().from(pastes).where(eq(pastes.userId, userId));
}
