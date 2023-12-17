import Info from "@/components/info";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { eq } from "drizzle-orm";
import PasteCard from "./_components/paste-card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pastes Archive - Pastezone.com",
};

export default async function ArchivePage() {
	// ! NIJE NAJBOLJE RESENJE AL AJ
	const allPastes = (
		await db
			.select()
			.from(pastes)
			.where(eq(pastes.exposure, "Public"))
			.orderBy(pastes.createdAt)
	).reverse();

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="border-b-2 text-xl w-full mb-2">Pastes Archive</h1>
			<Info>
				<span>
					This page contains the most recently created &apos;public&apos;
					pastes.
				</span>
			</Info>
			<div className="flex flex-col items-center justify-center w-full">
				<div className="p-1 hover:bg-bg border-b transition-all text-sm py-2  flex items-start justify-start gap-2 w-full">
					<div className="w-full sm:w-[65%]">NAME/TITLE</div>
					<div className="hidden sm:flex w-[20%]">
						<span className="w-full text-end">POSTED</span>
					</div>
					<div className="hidden sm:flex w-[15%] text-end">
						<span className="w-full text-end">SYNTAX</span>
					</div>
				</div>
				{allPastes.map((paste) => (
					<PasteCard key={paste.id} {...paste} />
				))}
			</div>
		</div>
	);
}
