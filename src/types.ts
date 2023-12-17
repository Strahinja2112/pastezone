import { LucideIcon } from "lucide-react";
import {
	categories,
	expirations,
	exposures,
	syntaxLanguages,
} from "./config/constants";

export type TApiReturn<T> =
	| {
			success: false;
			error: string;
			status?: number;
	  }
	| {
			success: true;
			data: T;
	  };

export type TCategory = (typeof categories)[number];
export type TLanguages = (typeof syntaxLanguages)[number];
export type TExposures = (typeof exposures)[number];
export type TExpiration = (typeof expirations)[number];

export type TSheetLink = {
	icon?: LucideIcon;
	title: string;
	href?: string;
	onClick?(): void;
};

export type TSyntaxRecord = {
	[key in (typeof syntaxLanguages)[number]]: string;
};
