import React, { PropsWithChildren } from "react";
import Pastes from "./_components/pastes";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<main className="flex-1 w-full h-full flex max-w-[1340px] bg-main gap-3 items-start justify-center">
			{children}
			<Pastes />
		</main>
	);
}
