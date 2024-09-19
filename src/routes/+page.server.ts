import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { db } from "./hooks.server";
import { userTable } from "../schema";
import { eq } from "drizzle-orm";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");
		const password = formData.get("password");

		if (
			typeof email !== "string" ||
			email.length < 3 ||
			email.length > 31 ||
			!/^[/^\S+@\S+\.\S+$/]+$/.test(email.toLowerCase()) // eslint-disable-line
		) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		// const existingUser = await db
		// 	.table("username")
		// 	.where("username", "=", username.toLowerCase())
		// 	.get();

		const existingUser = await db.select().from(userTable).where(eq(userTable.email, email));

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

        const user = existingUser[0];

		const validPassword = await verify(user.password_hash!, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/dashboard");
	}
};