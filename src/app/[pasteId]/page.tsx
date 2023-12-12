import { auth } from "@/auth";
import Info from "@/components/info";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import Link from "next/link";
import { eq } from "drizzle-orm";
import React from "react";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Main from "./_components/main";

type Props = {
	params: {
		pasteId: string;
	};
};

export default async function PasteIdPage({ params }: Props) {
	const session = await auth();

	const [paste] = await db
		.select()
		.from(pastes)
		.where(eq(pastes.id, params.pasteId));

	if (!paste) {
		return (
			<div className="w-full h-full gap-5 flex flex-col items-center">
				<h1 className="mt-10 text-center text-4xl font-semibold">
					The paste you are looking for does not exist :(
				</h1>
				<Link
					href="/"
					className={cn(
						buttonVariants({
							size: "lg",
						}),
						"text-xl flex gap-3"
					)}
				>
					<Home />
					Go home
				</Link>
			</div>
		);
	}

	return <Main paste={paste} session={session} />;
}
