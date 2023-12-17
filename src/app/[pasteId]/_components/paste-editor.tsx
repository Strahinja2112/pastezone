import ConfirmModal from "@/components/confirm-modal";
import { languageExtensions } from "@/config/constants";
import { Paste } from "@/db/schema/pastes";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";

type Props = {
	user: User;
	paste: Paste;
};

export default function PasteEditor({ user, paste }: Props) {
	const [isCopied, setIsCopied] = useState(false);
	const router = useRouter();

	async function clonePaste() {
		const res = await fetch("/api/pastes/clone", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(paste),
		});

		if (res.status !== 200) {
			toast.error(`Could not clone paste :(`);
		} else {
			toast.success("Successfully cloned your paste!");
			router.push("/user/pastezone");
		}
	}

	function downloadPaste() {
		const extenstion = languageExtensions[paste.language];
		const blob = new Blob([paste.content], {
			type: `text/${extenstion}`,
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = paste.title + extenstion;
		a.click();
		URL.revokeObjectURL(url);
	}

	function printPaste() {}

	const printDivRef = useRef<HTMLInputElement | null>(null);

	return (
		<div className="bg-bg w-full border flex-col rounded-sm">
			<div ref={printDivRef} className="print w-full flex flex-col px-2">
				<div className="w-full flex items-center justify-between">
					<h2>{new Date().toDateString()}</h2>
					<h2>Pastezone.com - Printed Paste ID: {paste.id}</h2>
				</div>
				<div className="w-full flex-col items-center justify-center">
					{paste.content.split("\n").map((el, idx) => (
						<div className="w-full flex text-sm" key={el}>
							<div className="w-[55px] p-1 text-xs text-end text-[#838383]">
								{idx + 1}.
							</div>
							<div className="bg-main p-1 transition-all hover:bg-bg px-3 w-full rounded-r-md">
								{/* chatgpt: used for replacing \t with &nbsp; */}
								{el.replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}{" "}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="bg-bg p-1 border-b flex flex-col sm:flex-row w-full items-center justify-between">
				<div className="flex gap-2 items-center justify-center text-xs">
					<Link
						href={`/archive/${paste.language}`}
						className="bg-black/20 px-1.5 text-sm rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						{paste.language}
					</Link>
					<div className="text-[10px] flex items-center justify-center gap-2">
						<span>{paste.size}</span> | <span>{paste.category}</span> |{" "}
						<span className="bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition cursor-pointer hover:text-muted-foreground flex items-center justify-center gap-1">
							<ThumbsUp className="w-4 h-4" />
							<span>0</span>
						</span>
						<span className="bg-black/20 p-[1px] text-sm rounded-sm text-blue-300/75 transition cursor-pointer hover:text-muted-foreground flex items-center justify-center gap-1">
							<ThumbsDown className="w-4 h-4" />
							<span>0</span>
						</span>
					</div>
				</div>
				<div className="flex gap-2 items-center justify-center text-xs">
					<span
						className={cn(
							"text-emerald-400 transition-all",
							!isCopied && "opacity-0"
						)}
					>
						Copied
					</span>
					<button
						onClick={() => {
							navigator.clipboard.writeText(paste.content);
							setIsCopied(true);
							setTimeout(() => {
								setIsCopied(false);
							}, 1500);
						}}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						copy
					</button>
					<Link
						href={`/raw/${paste.id}`}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						raw
					</Link>
					<button
						onClick={downloadPaste}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						download
					</button>
					<button
						onClick={clonePaste}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						clone
					</button>
					<ReactToPrint
						trigger={() => (
							<button
								onClick={printPaste}
								className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
							>
								print
							</button>
						)}
						content={() => printDivRef.current}
					/>
					<Link
						href={`/edit/${paste.id}`}
						className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground"
					>
						edit
					</Link>
					<ConfirmModal
						onConfirm={() => {
							fetch(`/api/pastes?id=${paste.id}`, {
								method: "DELETE",
							}).then(() => {
								router.replace("/");
								toast.success("Deleted!");
							});
						}}
					>
						<button className="bg-black/20 p-1 px-1.5 rounded-sm text-blue-300/75 transition hover:text-muted-foreground">
							delete
						</button>
					</ConfirmModal>
				</div>
			</div>
			<div className="w-full flex-col items-center justify-center">
				{paste.content.split("\n").map((el, idx) => (
					<div className="w-full flex text-sm" key={el}>
						<div className="w-[55px] p-1 text-xs text-end text-[#838383]">
							{idx + 1}.
						</div>
						<div className="bg-main p-1 transition-all hover:bg-bg px-3 w-full rounded-r-md">
							{/* chatgpt: used for replacing \t with &nbsp; */}
							{el.replace(/\t/g, "\u00a0\u00a0\u00a0\u00a0")}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
