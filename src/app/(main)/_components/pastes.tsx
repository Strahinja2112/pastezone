import { TSyntax } from "@/config/select-values";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

type Paste = {
	id: string;
	title: string;
	syntax: TSyntax;
	timeAgo: string;
	size: string;
};

const myPastes: Paste[] = [];

const mockPastes: Paste[] = [
	{
		id: "1",
		title: "Hello World",
		syntax: "Bash",
		timeAgo: "5min ago",
		size: "2KB",
	},
	{
		id: "2",
		title: "gitlab",
		syntax: "JavaScript",
		timeAgo: "15min ago",
		size: "2.12KB",
	},
	{
		id: "3",
		title: "main.java",
		syntax: "Java",
		timeAgo: "2h ago",
		size: "12KB",
	},
];

export default function Pastes({}: Props) {
	return (
		<div className="hidden lg:flex flex-col items-stretch justify-center w-[25%]">
			<Link href="/archive" className="transition mb-1 hover:text-blue-300">
				My Pastes
			</Link>
			{myPastes.length > 0 ? (
				myPastes.map((paste, idx) => <Paste key={idx} {...paste} />)
			) : (
				<div className="flex border-t p-1 gap-2 text-sm text-muted-foreground">
					<Globe2 className="text-muted-foreground h-5 w-5" />
					<span>Nothing to see here yet...</span>
				</div>
			)}
			<p className="my-3" />
			<Link href="/archive" className="transition mb-1 hover:text-blue-300">
				Public Pastes
			</Link>
			{mockPastes.length > 0 ? (
				mockPastes.map((paste, idx) => <Paste key={idx} {...paste} />)
			) : (
				<div className="flex gap-2 text-sm text-muted-foreground">
					<Globe2 className="text-muted-foreground h-5 w-5" />
					<span>Nothing to see here yet...</span>
				</div>
			)}
		</div>
	);
}

function Paste(paste: Paste) {
	return (
		<div className="border-t p-1 flex items-start justify-start gap-2">
			<Globe2 className="text-muted-foreground h-5 w-5" />
			<div className="flex text-sm w-full flex-col items-start justify-center">
				<Link
					href={`/${paste.id}`}
					className="text-blue-300 transition hover:text-muted-foreground"
				>
					{paste.title}
				</Link>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{paste.syntax} | {paste.timeAgo} | {paste.size}
				</div>
			</div>
		</div>
	);
}
