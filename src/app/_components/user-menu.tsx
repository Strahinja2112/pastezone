"use client";
import {
	Bell,
	ChevronDown,
	Cog,
	KeyRound,
	LogOut,
	LucideIcon,
	Mail,
	MessageSquare,
	User as UserIcon,
	UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";

type TSheetLink = {
	icon?: LucideIcon;
	title: string;
	href?: string;
	onClick?(): void;
};

export default function UserMenu({ user }: { user: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<div className="flex items-center gap-1.5 justify-center">
					<div className="flex h-full flex-col items-end justify-start">
						<h4 className="text-xs">{user.name}</h4>
						<h6 className="text-[9px] text-muted-foreground">FREE</h6>
					</div>
					<Image
						src={user.image || "/guest.png"}
						alt="guest"
						width={150}
						height={150}
						className="w-[30px] h-[30px] rounded-sm"
					/>
					<ChevronDown size={35} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0 w-[200px] text-sm flex flex-col items-center bg-[rgb(43,43,43)] justify-center">
				<SheetLink icon={UserIcon} title="my pastebin" href={`/u/${user.id}`} />
				<SheetLink
					icon={Mail}
					title="my comments"
					href={`/u/${user.id}/comments`}
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
				<SheetLink
					icon={LogOut}
					title="log out"
					onClick={async () => await signOut()}
				/>
				<Separator />
				{["api", "tools", "faq", "archive"].map((el) => (
					<SheetLink key={el} title={el.toUpperCase()} href={`/${el}`} />
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function SheetLink({ icon: Icon, title, href, onClick }: TSheetLink) {
	return (
		<Link
			onClick={onClick}
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
