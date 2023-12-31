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
import {
	categories,
	expirations,
	exposures,
	syntaxLanguages,
} from "@/config/constants";
import { useNewPasteStore } from "@/hooks/useNewPaste";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { generateRandomPassword } from "@/lib/utils";
import { useRef } from "react";
import TagsInput from "./tags-input";

type Props = {};

export default function PasteSettings({}: Props) {
	const router = useRouter();
	const { data: session } = useSession();

	const passCheckBox = useRef<HTMLButtonElement | null>(null);

	const newPaste = useNewPasteStore();

	async function createPaste() {
		const res = await newPaste.create(session);
		if (res.success) {
			toast.success(res.message);
			router.refresh();
		} else {
			toast.error(res.message);
		}
	}

	return (
		<div className="w-full text-sm font-light md:w-[65%] pr-0 md:pr-3 flex flex-col items-center justify-center">
			<div className="grid w-full py-2 grid-cols-3">
				<span className="h-full flex items-center">Category:</span>
				<div className="col-span-2">
					<Select
						value={newPaste.category}
						onValueChange={(value) => newPaste.setProp("category", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a category">
								{newPaste.category}
							</SelectValue>
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
					<TagsInput />
				</div>
			</div>
			<div className="grid w-full py-2 grid-cols-3">
				<span className="h-full flex items-center">Syntax Highlighting:</span>
				<div className="col-span-2">
					<Select
						value={newPaste.language}
						onValueChange={(value) => newPaste.setProp("language", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a language">
								{newPaste.language}
							</SelectValue>
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
				<span className="h-full flex items-center">Paste Expiration:</span>
				<div className="col-span-2">
					<Select
						value={newPaste.expiration}
						onValueChange={(value) => newPaste.setProp("expiration", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Expiration">
								{newPaste.expiration}
							</SelectValue>
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
					<Select
						value={newPaste.exposure}
						onValueChange={(value) => newPaste.setProp("exposure", value)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select Exposure">
								{newPaste.exposure}
							</SelectValue>
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
						<Checkbox
							id="password"
							ref={passCheckBox}
							onCheckedChange={(e) => {
								newPaste.setProp(
									"password",
									e.valueOf() === true ? generateRandomPassword() : ""
								);
							}}
						/>
						<Label htmlFor="password" className="cursor-pointer">
							Enabled
						</Label>
					</div>
					<div className="w-full">
						<Input
							disabled={passCheckBox.current?.dataset.state === "unchecked"}
							value={newPaste.password || ""}
							onChange={(e) => {
								newPaste.setProp("password", e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="grid w-full py-2 grid-cols-3">
				<span className="h-full flex gap-3 items-start"></span>
				<div className="col-span-2 flex items-center justify-start gap-2">
					<Checkbox
						id="burnAfterRead"
						onCheckedChange={(e) => {
							if (e.valueOf() === true) {
								newPaste.setProp("expiration", "Burn after read");
							} else {
								newPaste.setProp("expiration", "None");
							}
						}}
					/>
					<Label htmlFor="burnAfterRead" className="cursor-pointer">
						Burn after read
					</Label>
					<span className="bg-red-500 px-1 rounded-sm text-xs">NEW</span>
				</div>
			</div>
			<div className="grid w-full py-2 grid-cols-3">
				<span className="h-full flex items-center">Paste Name/Title:</span>
				<div className="col-span-2">
					<Input
						value={newPaste.title}
						onChange={(e) => newPaste.setProp("title", e.target.value)}
					/>
				</div>
			</div>
			<div className="grid w-full py-2 grid-cols-3">
				<span className="h-full flex items-center"></span>
				<div className="col-span-2 flex items-center justify-start gap-3">
					<button
						className="p-2 px-3 rounded-[3px] border-b-2 bg-[rgb(43,43,43)] transition hover:text-muted-foreground"
						onClick={createPaste}
					>
						Create new Paste
					</button>
					<Checkbox
						id="pasteAsGuest"
						onCheckedChange={(e) => {
							newPaste.setProp("publishAsGuest", e.valueOf() === true);
						}}
					/>
					<Label htmlFor="pasteAsGuest" className="cursor-pointer -ml-2">
						Paste as a guest
					</Label>
				</div>
			</div>
		</div>
	);
}
