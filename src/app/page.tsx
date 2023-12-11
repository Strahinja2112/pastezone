"use client";
import Info from "@/components/info";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	categories,
	expirations,
	exposures,
	syntaxLanguages,
} from "@/config/select-values";
import Link from "next/link";
import UserSection from "./_components/user-section";
import { useSession } from "next-auth/react";

export default function Home() {
	const { status } = useSession();

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
				/>
			</div>
			<div className="flex flex-col items-center w-full justify-start mt-1">
				<h2 className="w-full text-lg border-b-2">Optional Paste Settings</h2>
				<div className="w-full mb-3 flex-col md:flex-row flex items-center justify-center md:items-start md:justify-start">
					<div className="w-full text-sm font-light md:w-[65%] pr-0 md:pr-3 flex flex-col items-center justify-center">
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">Category:</span>
							<div className="col-span-2">
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="None">None</SelectItem>
										{categories.map((el) => (
											<SelectItem value={el} key={el}>
												{el}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">Tags:</span>
							<div className="col-span-2">
								<Input />
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">
								Syntax Highlighting:
							</span>
							<div className="col-span-2">
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select a language" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="None">None</SelectItem>
										{syntaxLanguages.map((el) => (
											<SelectItem value={el} key={el}>
												{el}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">
								Paste Expiration:
							</span>
							<div className="col-span-2">
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select Expiration" />
									</SelectTrigger>
									<SelectContent>
										{expirations.map((el) => (
											<SelectItem value={el} key={el}>
												{el}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">Paste Exposure:</span>
							<div className="col-span-2">
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select Exposure" />
									</SelectTrigger>
									<SelectContent>
										{exposures.map((el) => (
											<SelectItem value={el} key={el}>
												{el}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex gap-3 items-start">
								Password:{" "}
								<span className="bg-red-500 px-1 rounded-sm text-xs">NEW</span>
							</span>
							<div className="col-span-2 flex flex-col items-start justify-center gap-2">
								<div className="flex items-center justify-start gap-2">
									<Checkbox id="password" />
									<Label htmlFor="password" className="cursor-pointer">
										Enabled
									</Label>
								</div>
								<div className="w-full">
									<Input />
								</div>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex gap-3 items-start"></span>
							<div className="col-span-2 flex items-center justify-start gap-2">
								<Checkbox id="burnAfterRead" />
								<Label htmlFor="burnAfterRead" className="cursor-pointer">
									Burn after read
								</Label>
								<span className="bg-red-500 px-1 rounded-sm text-xs">NEW</span>
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center">
								Paste Name/Title:
							</span>
							<div className="col-span-2">
								<Input />
							</div>
						</div>
						<div className="grid w-full py-2 grid-cols-3">
							<span className="h-full flex items-center"></span>
							<div className="col-span-2">
								<button className="p-2 px-3 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground">
									Create new Paste
								</button>
							</div>
						</div>
					</div>
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
