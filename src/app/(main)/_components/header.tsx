"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {};

export default function Header({}: Props) {
	return (
		<div className="w-full fixed top-0 z-[100] flex flex-col border-b items-center justify-start  bg-gradient-to-b from-[rgb(37,37,37)] to-[rgb(43,43,43)]">
			<div className="h-14 w-full p-1 max-w-[1340px] flex items-center justify-between">
				<div className="gap-2 md:gap-7 flex items-center justify-center">
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
						<Link href="/api" className="hover:underline">
							API
						</Link>
						<Link href="/tools" className="hover:underline">
							TOOLS
						</Link>
						<Link href="/faq" className="hover:underline">
							FAQ
						</Link>
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
			</div>
		</div>
	);
}
