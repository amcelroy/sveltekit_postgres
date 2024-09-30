import { db } from "$lib/server/auth";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { userTable } from "../../../../schema";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ( event ) => {
    if (!event.locals.user) return error(401, 'Unauthorized');

    // Check the user can only access their own data
    const user = await db.select().from(userTable).where(eq(userTable.id, event.locals.user.id));

    if(user) {
        return json({id: user[0].id, email: user[0].email});
    }else{
        return error(401, 'Unauthorized');
    }
};