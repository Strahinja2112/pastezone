import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { eq, ne } from "drizzle-orm";
import PasteCard from "@/components/paste-card";

export default async function Pastes() {
	const session = await auth();

	const [allPublicPastes, myPastes] = await Promise.all([
		db
			.select()
			.from(pastes)
			.where(ne(pastes.userId, session?.user?.id || "")),
		db
			.select()
			.from(pastes)
			.where(eq(pastes.userId, session?.user?.id || "")),
	]);

	return (
		<div className="hidden lg:flex flex-col items-stretch justify-center w-[25%]">
			{session?.user ? (
				<>
					<Link href="/archive" className="transition mb-1 hover:text-blue-300">
						My Pastes
					</Link>
					{myPastes.length > 0 ? (
						myPastes.map((paste, idx) => (
							<PasteCard key={paste.id} {...paste} />
						))
					) : (
						<div className="flex border-t p-1 gap-2 text-sm text-muted-foreground">
							<Globe2 className="text-muted-foreground h-5 w-5" />
							<span>Nothing to see here yet...</span>
						</div>
					)}
				</>
			) : null}
			<p className="my-1" />
			<Link href="/archive" className="transition mb-1 hover:text-blue-300">
				Public Pastes
			</Link>
			{allPublicPastes.length > 0 ? (
				allPublicPastes.map((paste, idx) => <PasteCard key={idx} {...paste} />)
			) : (
				<div className="flex gap-2 text-sm text-muted-foreground">
					<Globe2 className="text-muted-foreground h-5 w-5" />
					<span>Nothing to see here yet...</span>
				</div>
			)}
		</div>
	);
}
