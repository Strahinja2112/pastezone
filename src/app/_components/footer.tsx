import { Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<div className="w-full border-t flex flex-col border-b items-center justify-start bg-main">
			<footer className="flex-1 p-3 text-xs flex flex-row  items-center justify-between w-full max-w-[1340px] bg-main">
				<div className="flex flex-col">
					<p>
						By using Pastezone.com you agree to our cookies policy to enhance
						your experience.
					</p>
					<p>Site design & logo © 2023 Pastezone</p>
				</div>
				<div className="flex gap-2">
					<Link
						href="https://facebook.com"
						className="bg-blue-700 p-2 rounded-full"
					>
						<Facebook className="h-8 w-8" />
					</Link>
					<Link
						href="https://twitter.com"
						className="bg-sky-400 p-2 rounded-full"
					>
						<Twitter className="h-8 w-8" />
					</Link>
				</div>
			</footer>
		</div>
	);
}
