import { Comment } from "@/db/schema/comments";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
	comment: Comment;
};

export default function CommentCard({ comment }: Props) {
	const { data: session } = useSession();

	return (
		<div className="bg-bg w-full border flex-col rounded-sm">
			<div className="bg-bg p-1 border-b flex flex-col sm:flex-row w-full items-center justify-between">
				<div className="flex gap-2 items-center justify-center text-xs">
					<Link
						href={`#`}
						className="bg-black/20 px-1.5 text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						#
					</Link>
					<Link
						href={`/archive/text`}
						className="bg-black/20 px-1.5 text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						text
					</Link>
					<div className="text-[10px] flex items-center justify-center gap-2">
						<span>{comment.size}</span> |
						<span className="bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition cursor-pointer hover:text-muted-foreground flex items-center justify-center gap-1">
							<ThumbsUp className="w-4 h-4" />
							<span>0</span>
						</span>
						<span className="bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition cursor-pointer hover:text-muted-foreground flex items-center justify-center gap-1">
							<ThumbsDown className="w-4 h-4" />
							<span>0</span>
						</span>
					</div>
				</div>
				<div className="flex gap-2 items-center justify-center text-xs">
					{session && session.user && (
						<>
							<button
								onClick={() => {}}
								className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
							>
								edit
							</button>
							<button
								onClick={() => {}}
								className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
							>
								delete
							</button>
						</>
					)}
					<button
						onClick={() => {}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						reply
					</button>
				</div>
			</div>
			<div className="w-full flex-col items-center justify-center">
				{comment.content.split("\n").map((el, idx) => (
					<div className="w-full flex text-sm" key={el}>
						<div className="w-[55px] p-1 text-xs text-end text-[#838383]">
							{idx + 1}.
						</div>
						<div className="bg-main p-1 transition-all hover:bg-bg px-3 w-full rounded-r-md">
							{/* chatgpt: used for replacing \t with &nbsp; */}
							{el.replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
