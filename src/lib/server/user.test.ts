import { expect, test } from 'vitest'
import { user_create, user_delete, user_get } from './user';

const email = "hello@world.com";
const password = "super_secure_password";

test('Testing user', async () => {
    const user = await user_create(email, password);
    expect(user).not.toBe(null);
    if(user) {
        expect(user.email).toBe(email);

        let user1 = await user_get(email);
        expect(user1).not.toBe(null);
        if(user1) {
            expect(user1.email).toBe(user.email);
            expect(user1.id).toBe(user.id);
            await user_delete(user1);
        }

        user1 = await user_get(email);
        expect(user1).toBe(undefined);
    }
});