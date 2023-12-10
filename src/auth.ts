import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

declare module "@auth/core" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const { handlers, auth, signOut, signIn } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [GitHub],
	callbacks: {
		session({ session, user }) {
			session.user!.id = user.id;
			return session;
		},
	},
});
