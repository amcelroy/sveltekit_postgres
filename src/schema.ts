import { cypherEncryptedText } from '../src/lib/server/encrypt';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';


export const userTable = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull().unique(),
	password_hash: text('password'),
});

export const sessionTable = pgTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const userProfileTable = pgTable('user_profiles', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	firstName: cypherEncryptedText('first_name').notNull().default(''),
	lastName: cypherEncryptedText('last_name').notNull().default(''),
	address: cypherEncryptedText('address').notNull().default(''),
	city: cypherEncryptedText('city').notNull().default(''),
	state: cypherEncryptedText('state').notNull().default(''),
	zip: cypherEncryptedText('zip').notNull().default(''),
	phone: cypherEncryptedText('phone').notNull().default(''),
	profileComplete: boolean('profile_complete').notNull().default(false),
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type Session = typeof sessionTable.$inferInsert;
export type UserProfile = typeof userProfileTable.$inferInsert;