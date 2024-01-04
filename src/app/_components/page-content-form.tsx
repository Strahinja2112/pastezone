import { Switch } from "@/components/ui/switch";
import { useNewPasteStore } from "@/hooks/useNewPaste";
import React from "react";

type Props = {};

export default function PasteContentForm({}: Props) {
	const newPaste = useNewPasteStore();

	return (
		<>
			<div className="w-full text-sm flex items-center justify-between pr-1">
				<h2>New Paste</h2>
				<div className="flex items-center gap-2 justify-center">
					<span>Syntax Highlighting</span>
					<Switch
						onCheckedChange={(e) => {
							newPaste.setProp("syntaxHighlighting", e);
						}}
					/>
				</div>
			</div>
			<div className="w-full">
				<textarea
					name=""
					id=""
					cols={30}
					rows={17}
					className="js bg-bg border-none focus:outline-none rounded-md text-sm p-2 w-full h-full resize-none"
					value={newPaste.content}
					onChange={(e) => newPaste.setProp("content", e.target.value)}
				/>
			</div>
		</>
	);
}
