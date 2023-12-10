import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {};

export default function UserSection({}: Props) {
	const { data: session, status } = useSession();

	return (
		<div className="md:border-l-2 border-t md:border-t-0 border-b flex items-center justify-start gap-3 w-full md:w-[35%] p-2">
			<Image
				src={session?.user?.image || "/guest.png"}
				alt="guest"
				width={150}
				height={150}
				className="w-[60px] h-[60px] border p-[1.5px]"
			/>
			<div className="flex gap-1 w-full text-sm flex-col items-start justify-center">
				<span>
					Hello <b>{session?.user?.name || "Guest"}</b>
				</span>
				{status === "unauthenticated" && (
					<div className="flex gap-2 items-center justify-center">
						<Link
							href="/sign-up"
							className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
						>
							Sign up
						</Link>
						<span>or</span>
						<Link
							href="/log-in"
							className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
						>
							Log in
						</Link>
					</div>
				)}
				{status === "authenticated" && (
					<div className="flex gap-2 items-center justify-center">
						<Link
							href={`/u/${session.user?.name}`}
							className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
						>
							My pastebin
						</Link>
						<Link
							href="/user/settings"
							className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
						>
							Edit settings
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
