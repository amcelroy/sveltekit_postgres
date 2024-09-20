import {z} from 'zod';

const schemaPassword = z
    .string()
    .min(6)
    .max(255)

const schemaEmail = z
    .string()
    .email({ message: "Invalid email address" })

export const schemaSignUp = z
    .object({
        email: schemaEmail,
        password: schemaPassword,
        confirmation: z.string(),
    })
    .refine((data) => data.password === data.confirmation, {
        message: "Passwords do not match.",
        path: ["confirmation"]
    })


export const schemaSignIn = z.object({
    email: z.string(),
    password: z.string(),
})

export type SchemaSignUp = typeof schemaSignUp
export type SchemaSignIn = typeof schemaSignIn