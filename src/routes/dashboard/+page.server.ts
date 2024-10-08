import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { User } from "../../schema";
import { profile_get } from "$lib/server/profile";

export const load: PageServerLoad = (async (event) => {
    if (!event.locals.user) redirect(302, "/");

    const user: User = {
        id: event.locals.user.id,
        email: event.locals.user.username,
    }

    const profile = await profile_get(user);

    if(profile?.profileComplete) {
        return { profile }
    }else{
        redirect(302, "/dashboard/profile");
    }
})