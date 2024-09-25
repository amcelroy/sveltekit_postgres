import { Lucia } from "lucia";
import { dev } from "$app/environment";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from '../../schema';
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import * as dotenv from 'dotenv'
import { logger } from "./logger";

dotenv.config({
	path: ".env"
})

const url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const client = new pg.Client({
    connectionString: url,
});

await client.connect();
export const db = drizzle(client, {schema});

export const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessionTable, schema.userTable);
logger.info("Lucia adapter created");

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.email
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
}
