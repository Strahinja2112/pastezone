"use client";
import Info from "@/components/info";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import UserSection from "./_components/user-section";
import { useSession } from "next-auth/react";
import PasteSettings from "./_components/paste-settings";
import { useNewPasteStore } from "@/hooks/useNewPaste";

export default function Home() {
	const { status } = useSession();
	const newPaste = useNewPasteStore();

	return (
		<div className="flex-1 w-full flex flex-col gap-1.5 items-center justify-start">
			<div className="w-full text-sm flex items-center justify-between pr-1">
				<h2>New Paste</h2>
				<div className="flex items-center gap-2 justify-center">
					<span>Syntax Highlighting</span>
					<Switch onChange={() => {}} />
				</div>
			</div>
			<div className="w-full">
				<textarea
					name=""
					id=""
					cols={30}
					rows={17}
					className="bg-bg border-none focus:outline-none rounded-md text-sm p-2 w-full h-full resize-none"
					value={newPaste.content}
					onChange={(e) => newPaste.setProp("content", e.target.value)}
				/>
			</div>
			<div className="flex flex-col items-center w-full justify-start mt-1">
				<h2 className="w-full text-lg border-b-2">Optional Paste Settings</h2>
				<div className="w-full mb-3 flex-col md:flex-row flex items-center justify-center md:items-start md:justify-start">
					<PasteSettings />
					<UserSection />
				</div>
				{status === "unauthenticated" ? (
					<Info>
						<span>
							You are currently not logged in, this means you can not edit or
							delete anything you paste.
							<Link
								href="/sign-up"
								className="mx-1 text-blue-300 transition hover:text-muted-foreground"
							>
								Sign Up
							</Link>
							<span className="mx-1">or</span>
							<Link
								href="/log-in"
								className="mx-1 text-blue-300 transition hover:text-muted-foreground"
							>
								Log in
							</Link>
						</span>
					</Info>
				) : null}
			</div>
		</div>
	);
}
