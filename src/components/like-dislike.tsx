"use client";
import { Paste } from "@/db/schema/pastes";
import { Comment } from "@/db/schema/comments";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

type Props = {
	item: Paste | Comment;
	onLike(): Promise<boolean>;
	onDislike(): Promise<boolean>;
	remove(data: "like" | "dislike"): void;
};

type Action = "liked" | "disliked" | "none";

export default function LikeDislike({
	item,
	onLike,
	onDislike,
	remove,
}: Props) {
	const [likeCount, setLikeCount] = useState(item.likeCount || 0);
	const [dislikeCount, setDislikeCount] = useState(item.dislikeCount || 0);
	const [action, setAction] = useState<Action>("none");

	async function like() {
		if (action === "liked") {
			setAction("none");
			setLikeCount(likeCount - 1);
			return;
		}

		const success = await onLike();
		if (success) {
			setAction("liked");
			setLikeCount(likeCount + 1);
			if (action === "disliked") {
				remove("dislike");
				setDislikeCount(dislikeCount - 1);
			}
		}
	}

	async function dislike() {
		if (action === "disliked") {
			setAction("none");
			setDislikeCount(dislikeCount - 1);
			return;
		}

		const success = await onDislike();
		if (success) {
			setAction("disliked");
			setDislikeCount(dislikeCount + 1);
			if (action === "liked") {
				remove("like");
				setLikeCount(likeCount - 1);
			}
		}
	}

	return (
		<>
			<button
				onClick={like}
				className={cn(
					"bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground flex items-center justify-center gap-1",
					action === "liked" && "bg-green text-white"
				)}
			>
				<ThumbsUp className="w-4 h-4" />
				<span>{likeCount}</span>
			</button>
			<button
				onClick={dislike}
				className={cn(
					"bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground flex items-center justify-center gap-1",
					action === "disliked" && "bg-red-800 text-white"
				)}
			>
				<ThumbsDown className="w-4 h-4" />
				<span>{dislikeCount}</span>
			</button>
		</>
	);
}
