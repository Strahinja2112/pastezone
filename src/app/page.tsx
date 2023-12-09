"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex-1 w-full flex flex-col gap-1.5 items-center p-3 justify-start">
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
				></textarea>
			</div>
			<div className="flex flex-col items-center w-full justify-start">
				<h2 className="w-full text-lg border-b-2">Optional Paste Settings</h2>
				<div className="w-full flex-col md:flex-row flex items-center justify-center md:items-start md:justify-start">
					<div className="w-full md:w-[50%]">asd</div>
					<div className="md:border-l-2 border-b flex items-center justify-start gap-3 w-full md:w-[30%] p-2">
						<Image
							src="/guest.png"
							alt="guest"
							width={150}
							height={150}
							className="w-[50px] h-[50px]"
						/>
						<div className="flex gap-1 text-sm flex-col items-start justify-center">
							<span>
								Hello <b>Guest</b>
							</span>
							<div className="flex gap-2 items-center justify-center">
								<Link
									href="/sign-up"
									className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground "
								>
									Sign up
								</Link>
								<span>or</span>
								<Link
									href="/log-in"
									className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground "
								>
									Log in
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
