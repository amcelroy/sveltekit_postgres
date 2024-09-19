import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from 'dotenv'
import * as schema from '../schema';
import winston from 'winston';
import DailyRotateFile from "winston-daily-rotate-file"; // eslint-disable-line

const { combine, timestamp, printf, colorize, align } = winston.format;

// Winston log rotation settings
const fileRotateTransport = new winston.transports.DailyRotateFile({
	filename: 'logs/combined-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	maxFiles: '14d',
	maxSize: '20m',
});

// Create and export a Winston logger
export const logger = winston.createLogger({
	level: 'info',
	format: combine(
		timestamp({
		  format: 'YYYY-MM-DD hh:mm:ss.SSS A',
		}),
		//align(),
		printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		fileRotateTransport
	],
});

// If not in production, add console logging with all the colors
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: combine(
			colorize({ all: true }),
			timestamp({
			  format: 'YYYY-MM-DD hh:mm:ss.SSS A',
			}),
			align(),
			printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
		),
	}));
}

logger.info("Logging configured");
logger.info("Running hooks.server.ts for the first time");

dotenv.config({
  path: ".env"
})

const url = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
/* Uncomment to debug the Postgres settings*/
// console.log(url);

const client = new pg.Client({
    connectionString: url,
});

await client.connect();
export const db = drizzle(client, {schema});

logger.info("Database connected");

logger.info("One time hooks.server.ts setup complete");

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
