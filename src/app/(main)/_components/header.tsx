"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserMenu from "./user-menu";

type Props = {};

export default function Header({}: Props) {
	const user = 1;

	return (
		<div className="w-full fixed top-0 z-[100] flex flex-col border-b items-center justify-start  bg-gradient-to-b from-[rgb(37,37,37)] to-[rgb(43,43,43)]">
			<div className="h-14 w-full p-1 max-w-[1340px] flex items-center justify-between">
				<div className="gap-5 flex items-center justify-start">
					<Link href="/" className="flex gap-1.5 items-center justify-center">
						<Image
							src="/logo-dark.png"
							alt=""
							width={150}
							height={150}
							className="h-10 w-10"
						/>
						<h1 className="text-xl hidden sm:flex leading-8 tracking-widest font-semibold">
							PASTEZONE
						</h1>
					</Link>
					<div className="hidden lg:flex gap-4 text-sm items-center justify-center">
						{["API", "TOOLS", "FAQ"].map((el) => (
							<Link
								key={el}
								href={`/${el.toLowerCase()}`}
								className="hover:underline"
							>
								{el}
							</Link>
						))}
					</div>
					<div className="flex gap-3 text-sm items-center justify-center">
						<Link
							href="/"
							className={buttonVariants({
								size: "tiny",
								variant: "green",
								className: "flex items-center px-2 sm:pl-1 gap-2",
							})}
						>
							<Plus className="font-bold" />
							<span className="hidden sm:flex">paste</span>
						</Link>
					</div>
					<div>
						<Input
							className="w-32 md:w-40 lg:w-[300px]"
							placeholder="Search..."
							onSearch={() => {}}
							showSearch
						/>
					</div>
				</div>
				{user ? (
					<div className="flex items-center gap-1.5 justify-center">
						<div className="flex h-full flex-col items-end justify-start">
							<h4 className="text-xs">Strahinja2112</h4>
							<h6 className="text-[9px] text-muted-foreground">FREE</h6>
						</div>
						<Image
							src="/guest.png"
							alt="guest"
							width={150}
							height={150}
							className="w-[30px] h-[30px] rounded-sm"
						/>
						<UserMenu />
					</div>
				) : (
					<div className="flex gap-3 pr-2">
						<Link
							href="/log-in"
							className={buttonVariants({
								variant: "outline",
								size: "tiny",
							})}
						>
							LOGIN
						</Link>
						<Link
							href="/sign-up"
							className={buttonVariants({
								size: "tiny",
							})}
						>
							SIGNUP
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
