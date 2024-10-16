import { eq } from "drizzle-orm";
import { userProfileTable, type User, type UserProfile } from "../../schema";
import { db } from "./auth";
import { generateIdFromEntropySize } from "lucia";

export async function profile_create(user: User) {
    const profile: UserProfile = {
        id: generateIdFromEntropySize(10),
        userId: user.id,
        firstName: '',
        lastName: '',
    }
    return await db.insert(userProfileTable).values(profile);
}

export async function profile_get(user: User) {
    return await db.query.userProfileTable.findFirst({ 
        where: eq(userProfileTable.userId, user.id) });
}

export async function profile_update(user: User, profile: UserProfile) {
    return await db.update(userProfileTable).set({
        firstName: profile!.firstName,
        lastName: profile!.lastName,
        address: profile!.address,
        city: profile!.city,
        state: profile!.state,
        zip: profile!.zip,
        phone: profile!.phone,
        profileComplete: profile!.profileComplete,
    }).where(eq(userProfileTable.userId, user.id)).returning();
}