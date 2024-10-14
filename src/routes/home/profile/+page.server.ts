import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { profile_get, profile_update } from "$lib/server/profile";
import type { User, UserProfile } from "../../../schema";
import { fail, superValidate } from "sveltekit-superforms";
import { schemaProfile } from "$lib/validationSchemas";
import { zod } from "sveltekit-superforms/adapters";
import { user_get } from "$lib/server/user";

export const load: PageServerLoad = (async (event) => {
    if (!event.locals.user) redirect(302, "/");

    const user: User = {
        id: event.locals.user.id,
        email: event.locals.user.username,
    }

    const profile = await profile_get(user);

    return profile;
})

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod(schemaProfile))
        if (!form.valid) {
			return fail(400, {form})
		}

        const user_profile: UserProfile = {
            id: "", // ignore 
            userId: "", // ignore 
            firstName: form.data.firstName,
            lastName: form.data.lastName,
            address: form.data.address,
            city: form.data.city,
            state: form.data.state,
            zip: form.data.zip,
            phone: form.data.phone,
            profileComplete: true, // manually set
        }

        if (event.locals.user) {
            const user = await user_get(event.locals.user.username);
            if (user) {
                await profile_update(user, user_profile);
            }
        }else{
            return fail(500, {form});
        }
        

        redirect(302, "/home");
    }
};