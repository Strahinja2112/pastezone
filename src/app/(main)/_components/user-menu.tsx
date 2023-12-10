"use client";
import {
	Bell,
	Cog,
	KeyRound,
	LogOut,
	LucideIcon,
	Mail,
	Menu,
	MessageSquare,
	User,
	UserCircle,
} from "lucide-react";

import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type TSheetLink = {
	icon?: LucideIcon;
	title: string;
	href?: string;
	onClick?(): void;
};

export default function UserMenu() {
	const userId = 12;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Menu size={35} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0 w-[200px] text-sm flex flex-col items-center bg-[rgb(43,43,43)] justify-center">
				<SheetLink icon={User} title="my pastebin" href={`/u/${userId}`} />
				<SheetLink
					icon={Mail}
					title="my comments"
					href={`/u/${userId}/comments`}
				/>
				<SheetLink
					icon={MessageSquare}
					title="my messages [0]"
					href="/messages"
				/>
				<SheetLink icon={Bell} title="my alerts" href="/alerts" />
				<SheetLink
					icon={UserCircle}
					title="Edit profile"
					href="/user/profile"
				/>
				<SheetLink icon={Cog} title="edit settings" href="/user/settings" />
				<SheetLink
					icon={KeyRound}
					title="change password"
					href="/user/password"
				/>
				<SheetLink icon={LogOut} title="log out" onClick={() => {}} />
				<Separator />
				<SheetLink title="api" href="/api" />
				<SheetLink title="tools" href="/tools" />
				<SheetLink title="faq" href="/faq" />
				<SheetLink title="archive" href="/archive" />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function SheetLink({ icon: Icon, title, href }: TSheetLink) {
	return (
		<Link
			href={href || "#"}
			className={cn(
				"w-full gap-2 hover:bg-bg transition flex items-center justify-between p-2",
				!Icon && "justify-end"
			)}
		>
			{Icon ? <Icon className="w-5 h-5" /> : null}
			<span className="text-sm">{title.toUpperCase()}</span>
		</Link>
	);
}
