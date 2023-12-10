import Info from "@/components/info";
import React from "react";

export default function page() {
	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="border-b-2 w-full mb-2">Pastes Archive</h1>
			<Info>
				<span>
					This page contains the most recently created &apos;public&apos;
					pastes.
				</span>
			</Info>
		</div>
	);
}
