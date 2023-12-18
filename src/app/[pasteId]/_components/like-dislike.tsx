"use client";
import LikeDislike from "@/components/like-dislike";
import { Comment } from "@/db/schema/comments";

type Props = {
	item: Comment;
};

export default function LikeDislikeClient({ item }: Props) {
	async function commentAction(
		method: "like" | "dislike",
		action: "add" | "remove"
	): Promise<boolean> {
		const res = await fetch(
			`/api/comments/like-dislike?id=${item.id}&method=${method}&action=${action}`
		);

		const data: {
			success: boolean;
		} = await res.json();

		return data.success;
	}

	return (
		<LikeDislike
			item={item}
			onLike={() => commentAction("like", "add")}
			onDislike={() => commentAction("dislike", "add")}
			remove={(data) => commentAction(data, "remove")}
		/>
	);
}
