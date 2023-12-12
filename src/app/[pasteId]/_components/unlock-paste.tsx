import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paste } from "@/db/schema/pastes";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
	paste: Paste;
	onUnlock(): void;
};

export default function UnlockPaste({ paste, onUnlock }: Props) {
	const [wrongPasswordEntered, setWrongPasswordEntered] = useState(false);
	const [password, setPassword] = useState("");

	async function tryPassword() {
		toast("Checking password!");
		const res = await fetch("/api/pastes/password/compare", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ paste, password }),
		});

		const {
			success,
		}: {
			success: boolean;
		} = await res.json();

		if (success) {
			toast.success("Password is correct!");
			onUnlock();
		} else {
			toast.error("Password is incorrect!");
			setWrongPasswordEntered(true);
		}
	}

	return (
		<div className="w-full flex flex-col gap-4 items-stretch justify-center">
			<h1 className="border-b-2 pb-1 text-xl">Locked Paste</h1>
			{wrongPasswordEntered ? (
				<Info className="bg-red-900 text-lg">
					<p>Password is incorrect!</p>
				</Info>
			) : null}
			<div className="w-full flex gap-3">
				<Label className="text-lg">Enter password:</Label>
				<div className="flex flex-col gap-2 items-center justify-center">
					<Input
						type="password"
						className="w-[350px]"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="w-full flex gap-2">
						<Button
							variant="pastebin"
							onClick={tryPassword}
							size="sm"
							className="w-full"
						>
							Unlock the paste
						</Button>
						<Button variant="pastebin" size="sm" className="w-full">
							Copy paste link to clipboard
						</Button>
					</div>
					<Link href="/" className="text-blue-300 w-full text-sm mt-8">
						Pastebin home
					</Link>
				</div>
			</div>
		</div>
	);
}
