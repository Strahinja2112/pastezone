import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {};

export default function Header({}: Props) {
	return (
		<div className="h-14 w-full p-1 max-w-[1340px] flex items-center justify-between">
			<div className="gap-7 flex items-center justify-center">
				<Link href="/" className="flex gap-1.5 items-center justify-center">
					<Image
						src="/logo-dark.png"
						alt=""
						width={150}
						height={150}
						className="h-10 w-10"
					/>
					<h1 className="text-xl leading-8 tracking-widest font-semibold">
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
							className: "flex items-center px-2 pl-1 gap-2",
						})}
					>
						<Plus className="font-bold" />
						<span>paste</span>
					</Link>
				</div>
				<div>
					<Input placeholder="Search..." onSearch={() => {}} />
				</div>
			</div>
			<div className="flex gap-3 pr-2">
				<Button variant="outline" size="tiny">
					LOGIN
				</Button>
				<Button className="bg-white" size="tiny">
					SIGNUP
				</Button>
			</div>
		</div>
	);
}
