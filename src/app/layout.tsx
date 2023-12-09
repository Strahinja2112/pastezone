import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import Header from "./(main)/_components/header";
import Footer from "./(main)/_components/footer";
import PublicPastes from "./(main)/_components/public-pastes";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pastezone.com - #1 paste tool!",
	description: "Generated by create next app",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/logo.png",
				href: "/logo.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logo-dark.png",
				href: "/logo-dark.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"flex flex-col items-center justify-center bg-bg",
					font.className
				)}
			>
				<ThemeProvider
					attribute="class"
					forcedTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="flex-1 pt-16 w-full h-full flex max-w-[1340px] bg-main gap-3 items-start justify-center p-3">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
