import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
