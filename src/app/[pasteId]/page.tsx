import { auth } from "@/auth";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { getByUserId } from "@/db/actions/pastes";
import { users } from "@/db/schema/users";
import Link from "next/link";
import React from "react";

type Props = {
	params: {
		pasteId: string;
	};
};

export default async function PasteIdPage({ params }: Props) {
	const session = await auth();

	const all = await db.select().from(users);

	return (
		<div className="w-full flex gap-3 flex-col items-center justify-center">
			{params.pasteId}
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
