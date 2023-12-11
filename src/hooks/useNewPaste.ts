import { Paste } from "@/db/schema/pastes";
import { create } from "zustand";

type PasteWithFunctions = Paste & {};

export const useNewPasteStore = create<Paste>((set, get) => {
	return {
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
		id: "",
		userId: "",
	};
});
