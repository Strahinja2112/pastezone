"use client";
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
	TSyntax,
	categories,
	expirations,
	exposures,
	syntaxLanguages,
} from "@/config/select-values";
import { Globe2, InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Paste = {
	id: string;
	title: string;
	syntax: TSyntax;
	timeAgo: string;
	size: string;
};

const mockPastes: Paste[] = [
	{
		id: "1",
		title: "Hello World",
		syntax: "Bash",
		timeAgo: "5min ago",
		size: "2KB",
	},
	{
		id: "2",
		title: "gitlab",
		syntax: "JavaScript",
		timeAgo: "15min ago",
		size: "2.12KB",
	},
	{
		id: "3",
		title: "main.java",
		syntax: "Java",
		timeAgo: "2h ago",
		size: "12KB",
	},
];

export default function Home() {
	return (
		<div className="flex-1 w-full flex gap-3 items-start justify-center p-3">
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
					></textarea>
				</div>
				<div className="flex flex-col items-center w-full justify-start mt-1">
					<h2 className="w-full text-lg border-b-2">Optional Paste Settings</h2>
					<div className="w-full mb-3 flex-col md:flex-row flex items-center justify-center md:items-start md:justify-start">
						<div className="w-full text-sm font-light md:w-[65%] pr-3 flex flex-col items-center justify-center">
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
								<span className="h-full flex items-center">
									Paste Exposure:
								</span>
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
									<span className="bg-red-500 px-1 rounded-sm text-xs">
										NEW
									</span>
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
										<span className="bg-red-500 ml-2 px-1 rounded-sm text-xs">
											NEW
										</span>
									</Label>
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
						<div className="md:border-l-2 border-t md:border-t-0 border-b flex items-center justify-start gap-3 w-full md:w-[35%] p-2">
							<Image
								src="/guest.png"
								alt="guest"
								width={150}
								height={150}
								className="w-[60px] h-[60px] border p-[1.5px]"
							/>
							<div className="flex gap-1 w-full text-sm flex-col items-start justify-center">
								<span>
									Hello <b>Guest</b>
								</span>
								<div className="flex gap-2 items-center justify-center">
									<Link
										href="/sign-up"
										className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
									>
										Sign up
									</Link>
									<span>or</span>
									<Link
										href="/log-in"
										className="p-1 px-2 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
									>
										Log in
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full border rounded-sm flex items-center justify-start p-2 text-sm gap-2 bg-bg font-extralight">
						<InfoIcon />
						<p>
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
						</p>
					</div>
				</div>
			</div>
			<div className="hidden lg:flex flex-col items-stretch justify-center w-[25%]">
				<Link href="/public" className="transition mb-1 hover:text-blue-300">
					See Public Pastes
				</Link>
				{mockPastes.map((paste, idx) => (
					<div
						key={idx}
						className="border-t p-1 flex items-start justify-start gap-2"
					>
						<Globe2 className="text-muted-foreground h-5 w-5" />
						<div className="flex text-sm w-full flex-col items-start justify-center">
							<Link
								href={`/${paste.id}`}
								className="text-blue-300 transition hover:text-muted-foreground"
							>
								{paste.title}
							</Link>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								{paste.syntax} | {paste.timeAgo} | {paste.size}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
