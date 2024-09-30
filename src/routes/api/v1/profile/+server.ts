import { db } from "$lib/server/auth";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { userProfileTable } from "../../../../schema";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ( event ) => {
    if (!event.locals.user) return error(401, 'Unauthorized');

    // Check the user can only access their own data
    const user = await db.select().from(userProfileTable).where(eq(userProfileTable.userId, event.locals.user.id));

    if(user) {
        return json({});
    }else{
        return error(401, 'Unauthorized');
    }
};