import { TSyntaxRecord, TSheetLink } from "@/config/types";
import {
	Bell,
	Cog,
	KeyRound,
	Mail,
	MessageSquare,
	User as UserIcon,
	UserCircle,
} from "lucide-react";

export const categories = [
	"Cryptocurrency",
	"Cybersecurity",
	"Fixit",
	"Food",
	"Gaming",
	"Haiku",
	"Help",
	"History",
	"Housing",
	"Jokes",
	"Legal",
	"Money",
	"Movies",
	"Music",
	"Pets",
	"Photo",
	"Science",
	"Software",
	"Source Code",
	"Spirit",
	"Sports",
	"Travel",
	"TV",
	"Writing",
	"None",
] as const;

export const syntaxLanguages = [
	"Bash",
	"C",
	"CSharp",
	"C++",
	"CSS",
	"HTML",
	"JSON",
	"Java",
	"JavaScript",
	"TypeScript",
	"None",
] as const;

export const languageExtensions: TSyntaxRecord = {
	Bash: ".sh",
	C: ".c",
	CSharp: ".cs",
	"C++": ".cpp",
	CSS: ".css",
	HTML: ".html",
	JSON: ".json",
	Java: ".java",
	JavaScript: ".js",
	TypeScript: ".ts",
	None: ".txt",
};

export const exposures = ["Public", "Unlisted", "Private", "None"] as const;

export const expirations = [
	"Never",
	"Burn after read",
	"10 Minutes",
	"1 Hour",
	"1 Day",
	"1 Week",
	"2 Weeks",
	"1 Month",
	"6 Months",
	"1 Year",
	"None",
] as const;

export const sheetLinks: TSheetLink[] = [
	{
		icon: UserIcon,
		title: "my pastebin",
		href: `/user/pastezone`,
	},
	{
		icon: Mail,
		title: "my comments",
		href: "/user/comments",
	},
	{
		icon: MessageSquare,
		title: "my messages [0]",
		href: "/messages",
	},
	{
		icon: Bell,
		title: "my alerts",
		href: "/alerts",
	},
	{
		icon: UserCircle,
		title: "Edit profile",
		href: "/user/profile",
	},
	{
		icon: Cog,
		title: "edit settings",
		href: "/user/settings",
	},
	{
		icon: KeyRound,
		title: "change password",
		href: "/user/password",
	},
];
