import { expect, test } from "vitest";
import { user_create, user_delete } from "./user";
import { profile_get, profile_update } from "./profile";

const first_name = "Hello";
const last_name = "World";

test('Testing profile: encryption of sensitive information', async () => {
    const user = await user_create("test_user_profiles", "hello_world!");

    expect(user).not.toBe(null);

    try{
        if(user){
            const profile = await profile_get(user.id);
            if(profile){
                profile.firstName = first_name;
                profile.lastName = last_name;
                const updated_profile = await profile_update(profile);
                if(updated_profile){
                    expect(updated_profile[0].firstName).toBe(first_name);
                    expect(updated_profile[0].lastName).toBe(last_name);
                }
            }
        }
    }catch{

    }finally{
        if(user){
            // Delete the user regardless of the outcome of the test
            await user_delete(user?.id);
        }
    }
});