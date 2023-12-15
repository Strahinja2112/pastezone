/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import { useNewPasteStore } from "@/hooks/useNewPaste";
import React, { useEffect, useState } from "react";

type Props = {};

export default function TagsInput({}: Props) {
	const newPaste = useNewPasteStore();
	const [tags, setTags] = useState<string[]>([]);
	const [currentTag, setCurrentTag] = useState("");

	useEffect(() => {
		newPaste.setProp("tags", tags.join("; "));
	}, [tags]);

	return (
		<div className="w-full border rounded-sm overflow-hidden flex flex-wrap justify-start items-center">
			{tags.map((tag) => (
				<span
					key={tag}
					className="bg-black/30 text-blue-300 m-0.5 px-1 text-[11px]"
				>
					{tag}
					<button
						className="ml-2"
						onClick={() => setTags(tags.filter((el) => el !== tag))}
					>
						x
					</button>
				</span>
			))}
			<Input
				multiple
				value={currentTag}
				onChange={(e) => setCurrentTag(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						if (tags.includes(currentTag)) {
							setCurrentTag("");
							return;
						}
						setTags([...tags, currentTag]);
						setCurrentTag("");
					}
				}}
				className="border-none px-0 first:px-1"
			/>
		</div>
	);
}
