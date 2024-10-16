import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import {  type User } from "../../schema";
import { lucia } from "$lib/server/auth";

export const load: PageServerLoad = (async (event) => {
    if (!event.locals.user) redirect(302, "/");

    const user: User = {
        id: event.locals.user.id,
        email: event.locals.user.username,
    }

    if(event.locals.session){
        const logout_all = event.url.searchParams.get("all") == 'true';

        if(logout_all){
            await lucia.invalidateUserSessions(user.id);
            event.cookies.delete("auth_session", {path: "/"});
        }else{
            await lucia.invalidateSession(event.locals.session.id);
            event.cookies.delete("auth_session", {path: "/"});
        }
    }

    redirect(302, "/");
})