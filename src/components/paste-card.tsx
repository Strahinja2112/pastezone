import { Globe2 } from "lucide-react";
import Link from "next/link";
import type { Paste } from "@/db/schema/pastes";

export default function PasteCard(paste: Paste) {
	return (
		<div className="border-t p-1 flex items-start justify-start gap-2">
			<Globe2 className="text-muted-foreground h-5 w-5" />
			<div className="flex text-sm w-full flex-col items-start justify-center">
				<Link
					href={`/${paste.id}`}
					className="text-blue-300 transition hover:text-muted-foreground"
				>
					{paste.title || "Untitled"}
				</Link>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{paste.language} | {paste.category} | {paste.size}
				</div>
			</div>
		</div>
	);
}
