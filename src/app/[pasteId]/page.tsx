import { auth } from "@/auth";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import Link from "next/link";
import { eq } from "drizzle-orm";
import React from "react";

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
		// TODO MAKE IT PRETTIER
		return <div>Couldnt be found! sorry</div>;
	}

	return (
		<div className="w-full flex gap-3 flex-col items-center justify-center">
			<pre>{JSON.stringify(paste, null, 2)}</pre>
			{!session || !session.user ? (
				<>
					<h2 className="w-full text-xl mt-7 mb-2">Add comment</h2>
					<Info>
						<p>
							Please,{" "}
							<Link href="/api/auth/signin" className="text-blue-300">
								Sign In
							</Link>{" "}
							to add a comment
						</p>
					</Info>
				</>
			) : (
				<>
					<h2 className="w-full text-xl mt-7">Your comment</h2>
					<textarea
						name=""
						id=""
						cols={30}
						rows={8}
						className="bg-bg border-none focus:outline-none rounded-md text-sm p-2 w-full h-full resize-none"
					/>
					<Button variant="pastebin">Add comment</Button>
				</>
			)}
		</div>
	);
}
