import Info from "@/components/info";
import React from "react";
import PasteCard from "../_components/paste-card";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { pastes } from "@/db/schema/pastes";
import Link from "next/link";
import { TLanguages } from "@/config/types";

type Props = {
	params: {
		language: TLanguages;
	};
};

export default async function SyntaxPage({ params }: Props) {
	// ! NIJE NAJBOLJE RESENJE AL AJ
	const allPastes = (
		await db
			.select()
			.from(pastes)
			.where(
				and(eq(pastes.exposure, "Public"), eq(pastes.language, params.language))
			)
			.orderBy(pastes.createdAt)
	).reverse();

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="border-b-2 text-xl w-full mb-2">Pastes Archive</h1>
			<Info>
				<span>
					This page contains the most recently created &apos;public&apos; pastes
					with syntax &apos;{params.language}&apos;.{" "}
					<Link href="/archive">
						[ <span className="text-blue-300">show full archive</span> ]
					</Link>
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
				{allPastes.map((paste, idx) => (
					<PasteCard key={idx} {...paste} />
				))}
			</div>
		</div>
	);
}
