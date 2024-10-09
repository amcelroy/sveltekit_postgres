import { eq } from "drizzle-orm";
import { sessionTable, userProfileTable, userTable, type User } from "../../schema";
import { db } from "./auth";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { profile_create } from "./profile";

export async function user_update(user: User) {
    return await db.update(userTable).set(user).where(eq(userTable.id, user.id));
}

export async function user_get(email: string) {
    return await db.query.userTable.findFirst({ where: eq(userTable.email, email) });
}

export async function user_delete(user: User) {
    // Check if any sessions are stored in the table and delete
    const sessions = await db.select().from(sessionTable).where(eq(sessionTable.userId, user.id));
    if(sessions.length > 0){
        await db.delete(sessionTable).where(eq(sessionTable.userId, user.id));
    }
    // Delete user profile
    await db.delete(userProfileTable).where(eq(userProfileTable.userId, user.id));
    // Delete user
    return await db.delete(userTable).where(eq(userTable.id, user.id));
}

export async function user_exists(email: string) {
    const user = await db.query.userTable.findFirst({ where: eq(userTable.email, email) });
    if(user) {
        return true;
    }else{
        return false;
    }
}

export async function user_create(email: string, password: string) {
    const userId = generateIdFromEntropySize(10); 
    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    await db.insert(userTable).values({id: userId, email: email, password_hash: passwordHash});

    const user = await user_get(email);
    await profile_create(user!);

    return user;
}