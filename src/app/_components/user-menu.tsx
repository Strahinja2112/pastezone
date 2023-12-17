"use client";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { sheetLinks } from "@/config/constants";
import { TSheetLink } from "@/config/types";

export default function UserMenu({ user }: { user: User }) {
	const { status } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center cursor-pointer gap-1.5 justify-center">
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
			<DropdownMenuContent className="p-0 w-[200px] border text-sm flex flex-col items-center bg-[rgb(37,37,37)] justify-center">
				{sheetLinks.map((link) => (
					<SheetLink
						key={link.title}
						icon={link.icon}
						title={link.title}
						href={link.href}
					/>
				))}
				<SheetLink
					icon={LogOut}
					title="log out"
					onClick={async () => await signOut()}
				/>
				<div className="lg:hidden w-full">
					<Separator />
					{["api", "tools", "faq", "archive"].map((el) => (
						<SheetLink key={el} title={el.toUpperCase()} href={`/${el}`} />
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function SheetLink({ icon: Icon, title, href, onClick }: TSheetLink) {
	return (
		<Link
			onClick={onClick}
			href={href || "#"}
			className="w-full hover:bg-bg transition"
		>
			<DropdownMenuItem
				className={cn(
					"w-full cursor-pointer flex items-center justify-between p-2",
					!Icon && "justify-end"
				)}
			>
				{Icon ? <Icon className="w-5 h-5" /> : null}
				<span className="text-sm">{title.toUpperCase()}</span>
			</DropdownMenuItem>
		</Link>
	);
}
