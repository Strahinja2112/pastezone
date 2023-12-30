import { auth } from "@/auth";
import { db } from "@/db";
import { Comment } from "@/db/schema/comments";
import { users } from "@/db/schema/users";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { timeAgo } from "@/lib/utils";
import LikeDislike from "./like-dislike";

type Props = {
	comment: Comment;
};

export default async function CommentCard({ comment }: Props) {
	const [session, [user]] = await Promise.all([
		auth(),
		db.select().from(users).where(eq(users.id, comment.userId)),
	]);

	return (
		<div className="w-full flex-col rounded-sm">
			<div className="flex gap-2 text-muted-foreground w-full text-xs items-center justify-start mb-1">
				<Image
					src={user.image || "/guest-dark.png"}
					alt=""
					className="rounded-sm"
					height={20}
					width={20}
				/>
				<Link
					href={`/user/${user.id}`}
					className="text-blue-300 uppercase transition hover:text-muted-foreground"
				>
					{user.name}
				</Link>
				<span className="flex items-center gap-1 justify-center">
					<Calendar className="h-4 w-4" />
					{timeAgo(comment.createdAt)}
				</span>
			</div>
			<div className="bg-bg w-full border overflow-hidden flex-col rounded-sm">
				<div className="bg-bg p-1 flex flex-col sm:flex-row w-full items-center justify-between">
					<div className="flex gap-2 items-center justify-center text-xs">
						<Link
							href={`#`}
							className="bg-black/20 px-1.5 text-xs rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
						>
							#
						</Link>
						<Link
							href={`/archive/text`}
							className="bg-black/20 px-1.5 text-xs rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
						>
							text
						</Link>
						<div className="text-[10px] flex items-center justify-center gap-2">
							<span>{comment.size}</span> |
							<LikeDislike item={comment} />
						</div>
					</div>
					<div className="flex gap-2 items-center justify-center text-xs">
						{session && session.user && (
							<>
								<Link
									href={`#`}
									className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
								>
									edit
								</Link>
								<Link
									href={`#`}
									className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
								>
									delete
								</Link>
							</>
						)}
						<button className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground">
							reply
						</button>
					</div>
				</div>
				<div className="w-full flex-col items-center justify-center">
					{comment.content.split("\n").map((el, idx) => (
						<div
							key={idx}
							className="bg-main text-sm p-1 transition-all hover:bg-bg px-2 w-full rounded-r-md"
						>
							{/* chatgpt: used for replacing \t with &nbsp; */}
							{el.replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
