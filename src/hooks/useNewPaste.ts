import { Paste } from "@/db/schema/pastes";
import { create } from "zustand";

export type FilterKeysByType<T, U> = {
	[K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type TStrings = FilterKeysByType<TNewPasteStore, string>;

type TNewPasteStore = Paste & {
	setProp(name: TStrings, value: string): void;
};

export const useNewPasteStore = create<TNewPasteStore>((set) => ({
	id: undefined,
	category: "None",
	content: "",
	expiration: "Never",
	language: "None",
	title: "",
	size: "",
	tags: "",
	createdAt: "",
	exposure: "Public",
	password: "",
	userId: "",
	setProp(name: TStrings, value: string) {
		if (!name) {
			console.error("NAME IS NOT BEING SET!");
			return;
		}

		set({
			[name]: value,
		});
	},
}));
