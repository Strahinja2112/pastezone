import { SheetClose } from "@/components/ui/sheet";
import {
	Cog,
	Globe2,
	LockIcon,
	LogInIcon,
	LogOut,
	LucideIcon,
	Menu,
	User,
	User2,
	UserCheck,
} from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type TSheetLink = {
	icon: LucideIcon;
	title: string;
	href: string;
};

export default function MobileMenu() {
	const userId = 12;

	return (
		<Sheet>
			<SheetTrigger className="pr-2 sm:hidden">
				<Menu />
			</SheetTrigger>
			<SheetContent side="bottom" className="p-0">
				<SheetHeader>
					<SheetTitle className="p-3">Options</SheetTitle>
				</SheetHeader>
				<div className="w-full flex flex-col text-xl items-center gap-2 bg-main rounded-t-lg p-2 justify-center">
					<h1 className="w-full border-b text-3xl py-3 font-semibold">
						Authentification
					</h1>
					<SheetLink icon={LockIcon} title="Sign up" href="/sign-up" />
					<SheetLink icon={LogInIcon} title="Log in" href="/log-in" />
					<h1 className="w-full border-b text-3xl py-3 font-semibold">
						Pastes
					</h1>
					<SheetLink icon={Globe2} title="Public pastes" href={`/archive`} />
					<SheetLink
						icon={User2}
						title="Your pastes"
						href={`/archive/${userId}`}
					/>

					<h1 className="w-full border-b text-3xl py-3 font-semibold">
						Profile
					</h1>
					<SheetLink icon={UserCheck} title="Profile" href="/profile" />
					<SheetLink icon={Cog} title="Settings" href="/settings" />
					<Separator />
					<Button
						className="w-full text-lg gap-2 flex items-center justify-center"
						variant="destructive"
					>
						Log Out
						<LogOut />
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function SheetLink({ icon: Icon, title, href }: TSheetLink) {
	return (
		<SheetClose asChild>
			<Link
				href={href}
				className="w-full bg-main gap-2 rounded-md hover:bg-bg transition flex items-center justify-start p-1"
			>
				<Icon />
				{title}
			</Link>
		</SheetClose>
	);
}
