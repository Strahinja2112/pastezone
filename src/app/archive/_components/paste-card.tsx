import { Paste } from "@/db/schema/pastes";
import { timeAgo } from "@/lib/utils";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PasteCard(paste: Paste) {
	return (
		<div className="border-t p-1 hover:bg-bg border-b text-xs transition-all py-2  flex items-start justify-start gap-2 w-full">
			<div className="w-full flex items-center text-xs justify-start gap-1 sm:w-[65%]">
				<Globe2 className="w-5 h-5" />
				<Link
					href={`/${paste.id}`}
					className="text-blue-300 transition hover:text-muted-foreground"
				>
					{paste.title}
				</Link>
			</div>
			<h1 className="hidden sm:flex items-center justify-center w-[20%] text-end">
				<span className="w-full h-full text-end">
					{timeAgo(paste.createdAt)}
				</span>
			</h1>
			<Link
				href={`/archive/${paste.language}`}
				className="text-blue-300 hidden sm:flex w-[15%] transition hover:text-muted-foreground"
			>
				<span className="w-full text-end">{paste.language}</span>
			</Link>
		</div>
	);
}
