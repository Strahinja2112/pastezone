import Info from "@/components/info";
import PasteCard from "@/components/paste-card";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { eq } from "drizzle-orm";
import React from "react";

export default async function ArchivePage() {
	const allPastes = await db
		.select()
		.from(pastes)
		.where(eq(pastes.exposure, "Public"));

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="border-b-2 text-xl w-full mb-2">Pastes Archive</h1>
			<Info>
				<span>
					This page contains the most recently created &apos;public&apos;
					pastes.
				</span>
			</Info>
			{allPastes.map((paste) => (
				<PasteCard key={paste.id} {...paste} />
			))}
		</div>
	);
}
