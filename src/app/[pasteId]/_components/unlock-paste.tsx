import Info from "@/components/info";
import { Paste } from "@/db/schema/pastes";
import React, { useState } from "react";

type Props = { paste: Paste; onUnlock(): void };

export default function UnlockPaste({ paste, onUnlock }: Props) {
	const [wrongPasswordEntered, setWrongPasswordEntered] = useState(true);

	return (
		<div className="w-full flex flex-col gap-3 items-stretch justify-center">
			<h1 className="border-b-2 pb-1 text-xl">Locked Paste</h1>
			{wrongPasswordEntered ? (
				<Info className="bg-red-900 text-lg">
					<p>Password is incorrect!</p>
				</Info>
			) : null}
			<div className="w-full max-w-[650px] flex items-center justify-between"></div>
		</div>
	);
}
