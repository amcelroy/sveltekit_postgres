import { lucia } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { superValidate, setError, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters"
import { schemaSignUp } from "$lib/validationSchemas";
import { user_create, user_exists, user_get } from "$lib/server/user";

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

		let user;
		if(await user_exists(form.data.email)) {
			user = await user_get(form.data.email);
		}else{
			user = await user_create(form.data.email, form.data.password);
		}

		if(!user) {
			return setError(form, "email", "Email already exists.")
		}

		const userId = user.id;

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/dashboard");
	}
};