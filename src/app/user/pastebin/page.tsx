import { Calendar } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { eq } from "drizzle-orm";
import Info from "@/components/info";

export default async function MyPasteBin() {
	const session = await auth();

	if (!session || !session.user) {
		return;
	}

	const { user } = session;

	const allPastes = await db
		.select()
		.from(pastes)
		.where(eq(pastes.userId, user.id));

	const active = allPastes.length;

	return (
		<div className="w-full pt-1 flex gap-3 flex-col items-center justify-center">
			<header className="w-full flex gap-3">
				<Image
					src={user.image || "/guest-dark.png"}
					alt="user"
					width={50}
					height={50}
					className="p-[2px] border"
				/>
				<div className="w-full text-sm flex flex-col items-start justify-between py-0.5">
					<div className="w-full flex items-center justify-between">
						<h1 className="text-[18px]">{user.name}&apos;s Pastezone</h1>
						<Input placeholder="search your own pastes..." showSearch />
					</div>
					<div className="flex gap-2 items-center justify-center text-[12px]">
						<div className="flex gap-[3px] items-center justify-center">
							<Calendar className="w-5 h-4" />
							{/* <span>{timeAgo(user)}</span> */}
						</div>
					</div>
				</div>
			</header>
			{/* ADD ITEMS */}
			<Info>
				<div className="w-full flex flex-col items-start justify-center">
					<p>
						Hi {user.name}, this is your personal Pastebin. Feel free to share
						this page with anyone you like.
					</p>
					<br />
					<p>
						Only you (when logged in) can see your folders, unlisted and private
						pastes, and only you see the options to edit and delete.
					</p>
					<br />
					<b>Your stats:</b>
				</div>
			</Info>
		</div>
	);
}
