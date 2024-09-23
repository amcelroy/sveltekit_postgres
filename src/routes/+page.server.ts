import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { db } from "./hooks.server";
import { userTable } from "../schema";
import { eq } from "drizzle-orm";

import { superValidate, setError, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters"
import { schemaSignIn } from "$lib/validationSchemas";

export const load = (async () => {
	const form = await superValidate(zod(schemaSignIn));
	return { form }
})

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(schemaSignIn))
		if (!form.valid) {
			return fail(400, {form})
		}

		const existingUser = await db.select().from(userTable).where(eq(userTable.email, form.data.email));

		if (existingUser.length < 1) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return setError(form, "password", "Incorrect username or password")
		}

        const user = existingUser[0];

		const validPassword = await verify(user.password_hash!, form.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return setError(form, "password", "Incorrect username or password")
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