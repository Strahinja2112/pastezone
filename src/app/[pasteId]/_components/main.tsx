"use client";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import type { Paste } from "@/db/schema/pastes";
import { Session, User } from "next-auth";
import Link from "next/link";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import UnlockPaste from "./unlock-paste";
import BurnAfterRead from "./burn-after-read";
import {
	Calendar,
	Copy,
	Eye,
	Facebook,
	Flame,
	MessageSquare,
	Star,
	Timer,
	Twitter,
	UserCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDateString } from "@/lib/utils";
import toast from "react-hot-toast";
import PasteEditor from "./paste-editor";
import { createComment } from "@/db/actions/comments";

type Props = {
	paste: Paste;
	session: Session | null;
	user: User;
	commentCount: number;
};

export default function Main({
	paste,
	session,
	user,
	children,
	commentCount,
}: PropsWithChildren<Props>) {
	const [isLocked, setIsLocked] = useState(!!paste.password);
	const [userAgreedToBurn, setUserAgreedToBurn] = useState(false);

	const router = useRouter();
	const addCommentRef = useRef<HTMLTextAreaElement | null>(null);
	const rawPasteRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		return () => {
			fetch(`/api/pastes/addView?id=${paste.id}`);
			if (userAgreedToBurn) {
				fetch(`/api/pastes?id=${paste.id}`, {
					method: "DELETE",
				}).then(() => {
					router.refresh();
				});
			}
		};
	}, [paste.id, router, userAgreedToBurn]);

	if (paste.userId !== session?.user?.id) {
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

	async function createNewComment() {
		if (!paste.id) {
			toast.error(`Something went wrong!`);
			return;
		}

		if (addCommentRef.current?.value === "") {
			toast.error(`Comment cannot be empty!`);
			return;
		}

		const res = await createComment({
			userId: session?.user?.id!,
			pasteId: paste.id,
			createdAt: new Date().toUTCString(),
			content: addCommentRef.current?.value || "",
			size: "",
			likeCount: 0,
			dislikeCount: 0,
		});

		if (res.success) {
			toast.success("Comment added!");
			addCommentRef.current!.value = "";
			router.refresh();
		} else {
			toast.error(`Could not add comment! error: ${res.error}`);
		}
	}

	return (
		<div className="w-full pt-1 flex gap-3 flex-col items-center justify-center">
			{paste.expiration === "Burn after read" &&
				paste.userId !== session?.user?.id && (
					<Info
						icon={
							<Flame className="w-8 h-8 text-muted-foreground text-red-600" />
						}
						className="border-red-500"
					>
						<p className="text-sm">
							<span className="text-red-500">Burn After Read.</span> Paste was
							created for your eyes only. When this paste is closed there will
							be
							<span className="text-red-500"> no way </span>to recover or view
							it again!
						</p>
					</Info>
				)}
			<header className="w-full flex gap-3">
				<Image
					src={user.image || "/guest-dark.png"}
					alt="user"
					width={50}
					height={50}
					className="p-[2px] border"
				/>
				<div className="w-full text-sm flex flex-col items-start justify-between py-0.5">
					<h1 className="text-[18px]">{paste.title || "Untitled"}</h1>
					<div className="flex gap-2 items-center justify-center text-[12px]">
						<div className="flex gap-[3px] items-center justify-center">
							<UserCircle className="w-5 h-4" />
							<Link
								href={`/user/${user.id}`}
								className="uppercase text-blue-300 transition hover:text-muted-foreground"
							>
								{user.name}
							</Link>
						</div>
						<div className="flex gap-[3px] items-center justify-center">
							<Calendar className="w-5 h-4" />
							<span>{formatDateString(paste.createdAt)}</span>
						</div>
						<div className="flex gap-[3px] items-center justify-center">
							<Eye className="w-5 h-4" />
							<span>{paste.viewCount}</span>
						</div>
						<div className="flex gap-[3px] items-center justify-center">
							<Star className="w-5 h-4" />
							<span>{(paste.likeCount || 0) - (paste.dislikeCount || 0)}</span>
						</div>
						<div className="flex gap-[3px] items-center justify-center">
							<Timer className="w-5 h-4" />
							<span>{paste.expiration.toUpperCase()}</span>
						</div>
						<div className="flex gap-[3px] items-center justify-center">
							<MessageSquare className="w-5 h-4" />
							<button
								onClick={() => {
									addCommentRef.current?.focus();
								}}
								className="uppercase text-blue-300 transition hover:text-muted-foreground"
							>
								{commentCount > 0 ? commentCount : "ADD COMMENT"}
							</button>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center gap-1 flex-col">
					<button className="bg-[rgb(59,89,152)] w-[80px] flex items-center justify-center gap-1 rounded-sm text-xs p-1 pr-1.5">
						<Facebook fill="white" className="w-4 h-4" />
						<span>SHARE</span>
					</button>
					<button className="bg-[rgb(85,172,238)] w-[80px] flex items-center justify-center gap-1 rounded-sm text-xs p-1 pr-1.5">
						<Twitter fill="white" className="w-4 h-4" />
						<span>TWEET</span>
					</button>
				</div>
			</header>
			{!session || !session.user ? (
				<Info>
					<b>Not a member of Pastebin yet?</b>{" "}
					<Link href="/login" className="text-blue-300 underline">
						Sign Up,
					</Link>
					it unlocks many cool features!
				</Info>
			) : null}
			<PasteEditor user={user} paste={paste} />
			<div className="w-full flex gap-2 flex-col items-start justify-start">
				<div className="flex items-center justify-center gap-2">
					<h1>RAW Paste Data</h1>
					<Copy
						className="w-5 h-5 cursor-pointer"
						onClick={() => {
							const text = rawPasteRef.current?.value;
							if (!text) {
								toast.error("There could not be anyting to copy from!");
							} else {
								navigator.clipboard.writeText(text);
								toast.success("Text was copied successfully!");
							}
						}}
					/>
				</div>
				<textarea
					ref={rawPasteRef}
					name=""
					id=""
					rows={4}
					className="bg-bg border-none focus:outline-none rounded-md text-sm p-3 w-full h-full resize-y"
					value={paste.content}
					readOnly
				/>
			</div>
			{children}
			{!session || !session.user ? (
				<>
					<h2 className="w-full text-xl mb-2">Add comment</h2>
					<Info>
						<p>
							Please,{" "}
							<Link href="/login" className="text-blue-300">
								Sign In
							</Link>{" "}
							to add a comment
						</p>
					</Info>
				</>
			) : (
				<>
					<h2 className="w-full text-xl">Your comment</h2>
					<textarea
						ref={addCommentRef}
						name=""
						id=""
						cols={30}
						rows={4}
						className="bg-bg border focus:outline-none rounded-md text-sm p-2 w-full h-full resize-none"
					/>
					<Button variant="pastebin" onClick={createNewComment}>
						Add comment
					</Button>
				</>
			)}
		</div>
	);
}
