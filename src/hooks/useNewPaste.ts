import { TApiReturn } from "@/config/types";
import { Paste } from "@/db/schema/pastes";
import { Session } from "next-auth";
import { create } from "zustand";

type TNewPasteStore = Paste & {
	publishAsGuest: boolean;
	syntaxHighlighting: boolean;
	setProp<K extends keyof TNewPasteStore>(
		name: K,
		value: TNewPasteStore[K] | string
	): void;
	create(session: Session | null): Promise<{
		success: boolean;
		message: string;
	}>;
};

export const useNewPasteStore = create<TNewPasteStore>((set, get) => ({
	id: undefined,
	category: "None",
	content: "",
	expiration: "Never",
	language: "None",
	syntaxHighlighting: false,
	title: "",
	size: "",
	tags: "",
	createdAt: "",
	exposure: "Public",
	password: "",
	userId: "",
	publishAsGuest: false,
	setProp<K extends keyof TNewPasteStore>(
		name: K,
		value: TNewPasteStore[K] | string
	) {
		if (!name) {
			console.error("NAME IS NOT BEING SET!");
			return;
		}

		set({
			[name]: value,
		});
	},
	async create(session: Session | null) {
		const newPaste = get();
		try {
			const userId = newPaste.publishAsGuest
				? "GUEST_ID"
				: session?.user?.id || "GUEST_ID";

			const res = await fetch("/api/pastes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...newPaste,
					language: newPaste.syntaxHighlighting ? newPaste.language : "None",
					userId,
				}),
			});

			const data: TApiReturn<Paste> = await res.json();

			if (!data.success) {
				return {
					success: false,
					message: `Could not create paste! error: ${data.error}`,
				};
			}

			return {
				success: true,
				message: "New paste has been added!",
			};
		} catch {
			return {
				success: false,
				message: `Something went wrong!`,
			};
		}
	},
}));
