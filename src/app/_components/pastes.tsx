import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Paste } from "@/db/schema/pastes";
import { auth } from "@/auth";
import { eq, ne } from "drizzle-orm";

export default async function Pastes() {
	const session = await auth();

	const allPublicPastes = await db
		.select()
		.from(pastes)
		.where(ne(pastes.userId, session?.user?.id || ""));

	const myPastes = await db
		.select()
		.from(pastes)
		.where(eq(pastes.userId, session?.user?.id || ""));

	return (
		<div className="hidden lg:flex flex-col items-stretch justify-center w-[25%]">
			{session?.user ? (
				<>
					<Link href="/archive" className="transition mb-1 hover:text-blue-300">
						My Pastes
					</Link>
					{myPastes.length > 0 ? (
						myPastes.map((paste, idx) => <Paste key={idx} {...paste} />)
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
				allPublicPastes.map((paste, idx) => <Paste key={idx} {...paste} />)
			) : (
				<div className="flex gap-2 text-sm text-muted-foreground">
					<Globe2 className="text-muted-foreground h-5 w-5" />
					<span>Nothing to see here yet...</span>
				</div>
			)}
		</div>
	);
}

function Paste(paste: Paste) {
	return (
		<div className="border-t p-1 flex items-start justify-start gap-2">
			<Globe2 className="text-muted-foreground h-5 w-5" />
			<div className="flex text-sm w-full flex-col items-start justify-center">
				<Link
					href={`/${paste.id}`}
					className="text-blue-300 transition hover:text-muted-foreground"
				>
					{paste.title}
				</Link>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{paste.language} | {paste.category} | {paste.size}
				</div>
			</div>
		</div>
	);
}
