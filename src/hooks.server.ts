import { lucia } from "$lib/server/auth";
import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const cookieSessionId = event.cookies.get(lucia.sessionCookieName);
	const authorizationHeader = event.request.headers.get("Authorization");
	const authSessionId = lucia.readBearerToken(authorizationHeader ?? "");

	// Javascript || a string returns the first truthy value, prefer cookies over bearer tokens if both are present
	const sessionId =  cookieSessionId || authSessionId;

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
