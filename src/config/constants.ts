type SyntaxRecord = {
	[key in (typeof syntaxLanguages)[number]]: string;
};

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

export const languageExtensions: SyntaxRecord = {
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

export type TCategory = (typeof categories)[number];
export type TLanguages = (typeof syntaxLanguages)[number];
export type TExposures = (typeof exposures)[number];
export type TExpiration = (typeof expirations)[number];
