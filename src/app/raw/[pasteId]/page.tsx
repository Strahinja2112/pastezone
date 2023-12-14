import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { eq } from "drizzle-orm";
import React from "react";

type Props = {
	params: {
		pasteId: string;
	};
};

export default async function RawPage({ params }: Props) {
	const [paste] = await db
		.select()
		.from(pastes)
		.where(eq(pastes.id, params.pasteId));

	if (!paste) {
		return <pre>Could not be found!</pre>;
	}

	return <pre>{paste.content}</pre>;
}
