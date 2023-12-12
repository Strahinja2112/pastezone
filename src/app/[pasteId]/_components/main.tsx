"use client";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Paste } from "@/db/schema/pastes";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import UnlockPaste from "./unlock-paste";

type Props = {
	paste: Paste;
	session: Session | null;
};

export default function Main({ paste, session }: Props) {
	const [isLocked, setIsLocked] = useState(paste.password !== "");

	if (paste.userId !== session?.user?.id && isLocked) {
		return <UnlockPaste paste={paste} onUnlock={() => setIsLocked(false)} />;
	}

	return (
		<div className="w-full flex gap-3 flex-col items-center justify-center">
			<pre>{JSON.stringify(paste, null, 2)}</pre>
			{isLocked.toString()}
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
