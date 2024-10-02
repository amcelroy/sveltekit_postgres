import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { profile_get } from "$lib/server/profile";
import type { User } from "../../../schema";

export const load: PageServerLoad = (async (event) => {
    if (!event.locals.user) redirect(302, "/");

    const user: User = {
        id: event.locals.user.id,
        email: event.locals.user.username,
    }

    const profile = await profile_get(user);

    return { profile }
})