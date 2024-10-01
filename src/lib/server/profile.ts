import { eq } from "drizzle-orm";
import { userProfileTable, type User, type UserProfile } from "../../schema";
import { db } from "./auth";
import { generateIdFromEntropySize } from "lucia";

export async function profile_create(user: User) {
    const profile: UserProfile = {
        id: generateIdFromEntropySize(10),
        userId: user.id,
        firstName: 'first',
        lastName: 'last',
    }
    return await db.insert(userProfileTable).values(profile);
}

export async function profile_get(user_id: string) {
    return await db.query.userProfileTable.findFirst({ where: eq(userProfileTable.userId, user_id) });
}

export async function profile_update(profile: UserProfile) {
    return await db.update(userProfileTable).set(profile).where(eq(userProfileTable.userId, profile.userId)).returning();
}