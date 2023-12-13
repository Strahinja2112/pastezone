import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Paste } from "@/db/schema/pastes";
import useOrigin from "@/hooks/useOrigin";
import { Flame } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type Props = {
	paste: Paste;
	onClick(): void;
};

export default function BurfAfterRead({ paste, onClick }: Props) {
	const pathName = usePathname();
	const origin = useOrigin();

	return (
		<div className="w-full flex flex-col gap-4 items-stretch justify-center">
			<h1 className="border-b-2 pb-1 text-xl">Burn After Read paste</h1>
			<Info
				icon={<Flame className="w-8 h-8 text-muted-foreground text-red-600" />}
				className="border-red-500"
			>
				<div className="w-full flex font-normal gap-3 items-start justify-start flex-col">
					<p>
						Once accessed, you can no longer view this paste, it will be
						permanently removed. If you need access to this information again
						please copy the data to a secure location.
					</p>
					<p>
						You&apos;re about to Burn this paste: <b>{paste.id}</b> after
						reading it.
					</p>
				</div>
			</Info>
			<div className="flex gap-3">
				<Button variant="pastebin" size="sm" onClick={onClick}>
					Ok, show me the paste
				</Button>
				<Button
					variant="pastebin"
					size="sm"
					onClick={() => {
						navigator.clipboard.writeText(origin + pathName);
						toast.success("Paste link copied to clipboard!");
					}}
				>
					Copy paste link to clipboard
				</Button>
			</div>
			<Link href="/" className="text-blue-300 w-full text-sm mt-3">
				Pastebin home
			</Link>
		</div>
	);
}
