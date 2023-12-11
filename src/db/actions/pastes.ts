import { db } from "..";
import { Paste, pastes } from "../schema/pastes";

export async function create(paste: Paste) {
	try {
		return (await db.insert(pastes).values(paste).returning())[0];
	} catch {
		return null;
	}
}
