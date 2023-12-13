"use client";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Paste } from "@/db/schema/pastes";
import { Session } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UnlockPaste from "./unlock-paste";
import BurnAfterRead from "./burn-after-read";
import { Flame } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
	paste: Paste;
	session: Session | null;
};

export default function Main({ paste, session }: Props) {
	const [isLocked, setIsLocked] = useState(!!paste.password);
	const [shouldBurnAfterRead, setShouldBurnAfterRead] = useState(false);

	const router = useRouter();

	useEffect(() => {
		async function deletePaste() {
			await fetch(`/api/pastes?id=${paste.id}`, {
				method: "DELETE",
			});

			router.refresh();
		}

		return () => {
			if (shouldBurnAfterRead) {
				deletePaste();
			}
		};
	}, [paste.id, router, shouldBurnAfterRead]);

	if (paste.userId !== session?.user?.id || true) {
		if (isLocked) {
			return <UnlockPaste paste={paste} onUnlock={() => setIsLocked(false)} />;
		}
		if (paste.expiration === "Burn after read" && !shouldBurnAfterRead) {
			return (
				<BurnAfterRead
					paste={paste}
					onClick={() => setShouldBurnAfterRead(true)}
				/>
			);
		}
	}

	return (
		<div className="w-full flex gap-3 flex-col items-center justify-center">
			{shouldBurnAfterRead && (
				<Info
					icon={
						<Flame className="w-8 h-8 text-muted-foreground text-red-600" />
					}
					className="border-red-500"
				>
					<p className="text-sm">
						<span className="text-red-500">Burn After Read.</span> Paste was
						created for your eyes only. When this paste is closed there will be
						<span className="text-red-500"> no way </span>to recover or view it
						again!
					</p>
				</Info>
			)}
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
