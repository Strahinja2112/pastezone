import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateRandomPassword(length: number = 15): string {
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>?/";
	let password = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}

	return password;
}

export function getTextSize(text: string): string {
	const byteSize = new TextEncoder().encode(text).length;

	if (byteSize < 1024) {
		return `${byteSize} B`;
	} else if (byteSize < 1024 * 1024) {
		return `${(byteSize / 1024).toFixed(2)} kB`;
	} else {
		return `${(byteSize / (1024 * 1024)).toFixed(2)} MB`;
	}
}

export function formatDateString(dateString: string): string {
	const date = new Date(dateString);

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);

	return `${formattedDate.toUpperCase()}`;
}

export function timeAgo(dateString: string): string {
	return new TimeAgo("en-US").format(new Date(dateString));
}
