import validator from 'validator';
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

export const schemaProfile = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string().refine( (input) => {
        const states = [
            'AK',
            'AL',
            'AR',
            'AS',
            'AZ',
            'CA',
            'CO',
            'CT',
            'DC',
            'DE',
            'FL',
            'FM',
            'GA',
            'GU',
            'HI',
            'IA',
            'ID',
            'IL',
            'IN',
            'KS',
            'KY',
            'LA',
            'MA',
            'MD',
            'ME',
            'MH',
            'MI',
            'MN',
            'MO',
            'MP',
            'MS',
            'MT',
            'NC',
            'ND',
            'NE',
            'NH',
            'NJ',
            'NM',
            'NV',
            'NY',
            'OH',
            'OK',
            'OR',
            'PA',
            'PR',
            'PW',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VA',
            'VI',
            'VT',
            'WA',
            'WI',
            'WV',
            'WY',
          ];
        return states.includes(input);
    }),
    zip: z.string().refine( (input) => {
        return validator.isPostalCode(input, 'US')
    }),
    phone: z.string().refine( (input) => {
        return validator.isMobilePhone(input, 'en-US')
    }),
    profileComplete: z.boolean(),
})

export type SchemaSignUp = typeof schemaSignUp
export type SchemaSignIn = typeof schemaSignIn
export type SchemaProfile = typeof schemaProfile