import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import Header from "./_components/header";
import Pastes from "./_components/pastes";
import Footer from "./_components/footer";
import SessionProvider from "../components/providers/session-provider";
import { Toaster } from "react-hot-toast";

const font = Inter({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pastezone.com - #1 paste tool!",
	description: "This is a full stack pastebin.com clone done in Next.js",
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
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"flex flex-col items-center justify-center bg-bg",
					font.className
				)}
			>
				<Toaster />
				<ThemeProvider
					attribute="class"
					forcedTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<SessionProvider>
						<Header />
						<main className="flex-1 pt-16 w-full h-full flex max-w-[1340px] bg-main gap-3 items-start justify-center p-3">
							<div className="w-full flex flex-col items-center justify-center">
								{children}
							</div>
							<Pastes />
						</main>
						<Footer />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
