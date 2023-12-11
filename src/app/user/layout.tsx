import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default async function UserLayout({ children }: PropsWithChildren) {
	const session = await auth();

	if (!session || !session.user) {
		redirect("/api/auth/signin");
	}

	return <>{children}</>;
}
