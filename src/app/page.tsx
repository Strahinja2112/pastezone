"use client";
import Info from "@/components/info";
import Link from "next/link";
import UserSection from "./_components/user-section";
import { useSession } from "next-auth/react";
import PasteSettings from "./_components/paste-settings";
import PasteContentForm from "./_components/page-content-form";

export default function Home() {
	const { status } = useSession();

	return (
		<div className="flex-1 w-full flex flex-col gap-1.5 items-center justify-start">
			<PasteContentForm />
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
