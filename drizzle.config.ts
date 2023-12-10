import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
	path: "./.env.local",
});

const {
	NEXT_PUBLIC_DATABASE_URL: url,
	NEXT_PUBLIC_DATABASE_AUTH_TOKEN: authToken,
} = process.env;

if (!url || !authToken) {
	throw new Error("ENV FILES ARE NOT LOADED!");
}

export default {
	schema: "./src/db/schema/",
	driver: "turso",
	dbCredentials: { url, authToken },
	out: "./src/db/migrations/",
} satisfies Config;
