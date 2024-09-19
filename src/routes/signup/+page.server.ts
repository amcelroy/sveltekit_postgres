import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { db } from "../hooks.server";
import { userTable } from "../../schema";
import { eq } from "drizzle-orm";

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
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

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

        const users = await db.select().from(userTable).where(eq(userTable.email, email));

		if(users.length > 0) {
			return fail(400, {
				message: "Email already exists"
			});
		}else{
			await db.insert(userTable).values({
				id: userId,
				email: email,
				password_hash: passwordHash
			});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};
