import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { db } from "../hooks.server";
import { userTable } from "../../schema";
import { eq } from "drizzle-orm";

import { superValidate, setError, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters"
import { schemaSignUp } from "$lib/validationSchemas";

export const load = (async () => {
	const form = await superValidate(zod(schemaSignUp));
	return { form }
})

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(schemaSignUp))
		if (!form.valid) {
			return fail(400, {form})
		}
		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(form.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

        const users = await db.select().from(userTable).where(eq(userTable.email, form.data.email));

		if(users.length > 0) {
			return setError(form, "email", "Email already exists.")
		}else{
			await db.insert(userTable).values({
				id: userId,
				email: form.data.email,
				password_hash: passwordHash
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/dashboard");
	}
};