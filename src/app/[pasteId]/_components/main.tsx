"use client";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Paste } from "@/db/schema/pastes";
import { Session, User } from "next-auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UnlockPaste from "./unlock-paste";
import BurnAfterRead from "./burn-after-read";
import { Flame } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	paste: Paste;
	session: Session | null;
	user: User;
};

export default function Main({ paste, session }: Props) {
	const [isLocked, setIsLocked] = useState(!!paste.password);
	const [userAgreedToBurn, setUserAgreedToBurn] = useState(false);

	const router = useRouter();

	useEffect(() => {
		async function deletePaste() {
			await fetch(`/api/pastes?id=${paste.id}`, {
				method: "DELETE",
			});

			router.refresh();
		}

		return () => {
			if (userAgreedToBurn) {
				deletePaste();
			}
		};
	}, [paste.id, router, userAgreedToBurn]);

	if (paste.userId !== session?.user?.id || true) {
		if (isLocked) {
			return <UnlockPaste paste={paste} onUnlock={() => setIsLocked(false)} />;
		}
		if (paste.expiration === "Burn after read" && !userAgreedToBurn) {
			return (
				<BurnAfterRead
					paste={paste}
					onClick={() => setUserAgreedToBurn(true)}
				/>
			);
		}
	}

	return (
		<div className="w-full flex gap-3 flex-col items-center justify-center">
			{paste.expiration === "Burn after read" && (
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
			<div className="w-full flex">{/* <Image src={paste} /> */}</div>
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
