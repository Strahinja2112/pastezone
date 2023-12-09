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
] as const;
export type TCategory = (typeof categories)[number];

export const syntaxLanguages = [
	"Bash",
	"C",
	"C#",
	"C++",
	"CSS",
	"HTML",
	"JSON",
	"Java",
	"JavaScript",
	"TypeScript",
] as const;
export type TSyntax = (typeof syntaxLanguages)[number];

export const exposures = ["Public", "Unlisted", "Private"] as const;
export type TExposures = (typeof exposures)[number];

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
] as const;
export type TExpiration = (typeof expirations)[number];