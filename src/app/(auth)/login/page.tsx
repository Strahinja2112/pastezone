"use client";
import Info from "@/components/info";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
	const router = useRouter();
	const session = useSession();

	async function auth() {
		try {
			await signIn("github");
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	if (session && session.status === "authenticated") {
		router.push("/");
	}

	return (
		<div className="w-full flex flex-col items-center">
			<h1 className="border-b-2 text-xl w-full pb-1 mb-2">Login page</h1>
			<Info>To login you can use any of these social media accounts:</Info>
			<div className="w-full">
				<Button
					className="text-sm mt-2 bg-green flex justify-center items-center gap-2"
					onClick={auth}
					variant="ghost"
				>
					<Github />
					Login with Github
				</Button>
			</div>
		</div>
	);
}
