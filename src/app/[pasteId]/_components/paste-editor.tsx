import { languageExtensions } from "@/config/constants";
import { Paste } from "@/db/schema/pastes";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
	user: User;
	paste: Paste;
};

export default function PasteEditor({ user, paste }: Props) {
	const [isCopied, setIsCopied] = useState(false);

	return (
		<div className="bg-bg w-full border flex-col rounded-sm">
			<div className="bg-bg p-1 border-b flex flex-col sm:flex-row w-full items-center justify-between">
				<div className="flex gap-2 items-center justify-center text-xs">
					<Link
						href={`/archive/${paste.language}`}
						className="bg-black/20 px-1.5 text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						{paste.language}
					</Link>
					<div className="text-[10px] flex items-center justify-center gap-2">
						<span>{paste.size}</span> | <span>{paste.category}</span> |{" "}
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
					<span
						className={cn(
							"text-emerald-400 transition-all",
							!isCopied && "opacity-0"
						)}
					>
						Copied
					</span>
					<button
						onClick={() => {
							navigator.clipboard.writeText(paste.content);
							setIsCopied(true);
							setTimeout(() => {
								setIsCopied(false);
							}, 1500);
						}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						copy
					</button>
					<Link
						href={`/raw/${paste.id}`}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						raw
					</Link>
					<button
						onClick={() => {
							const extenstion = languageExtensions[paste.language];
							const blob = new Blob([paste.content], {
								type: `text/${extenstion}`,
							});
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.href = url;
							a.download = paste.title + extenstion;
							a.click();
							URL.revokeObjectURL(url);
						}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						download
					</button>
					<button
						onClick={() => {}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						clone
					</button>
					<button
						onClick={() => {}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						print
					</button>
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
				</div>
			</div>
			<div className="w-full flex-col items-center justify-center">
				{paste.content.split("\n").map((el, idx) => (
					<div className="w-full flex text-sm" key={el}>
						<div className="w-[55px] p-1 text-xs text-end text-[#838383]">
							{idx + 1}.
						</div>
						<div className="bg-main p-1 transition-all hover:bg-bg px-3 w-full rounded-r-md">
							{el}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
