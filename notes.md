# Notes

## Setup Notes

### Error
Error on step 3 `make run` the first time I ran it, but succeeded on subsequent tries (without changing anything. I suspect it took too long to build the docker container since it needed to download the images)
```
> sveltekit_postgres_template@0.0.1 migrate
> drizzle-kit migrate

Debugger attached.
No config path provided, using default 'drizzle.config.ts'
Reading config file '/Users/timphillips/Documents/Code/sveltekit_postgres/drizzle.config.ts'
Postgres URL: postgres://project-admin:jointed-olga-jill-OUTWORN-plenum-inferno@localhost:5432/project_db
Using 'pg' driver for database querying
[⣷] applying migrations...Error: read ECONNRESET
    at /Users/timphillips/Documents/Code/sveltekit_postgres/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at PgDialect.migrate (/Users/timphillips/Documents/Code/sveltekit_postgres/node_modules/src/pg-core/dialect.ts:72:3)
    at migrate (/Users/timphillips/Documents/Code/sveltekit_postgres/node_modules/src/node-postgres/migrator.ts:10:2) {
  errno: -54,
  code: 'ECONNRESET',
  syscall: 'read'
}
```

## Changes

- Created validationSchemas.ts to define zod form schemas
- Changed AuthForm and SignUpForm to use zod and superforms for client-side validation. 
  - Authform
    - I removed schema checks on the individual fields and only return an error on submit (e.g., it doesn't matter if the email is malformed if it and a matching password do not exist the DB. It only matters if an email-password pair exist). This could be changed by modifying the validationSchemas.ts schemaSignIn to use the same types as schemaSignUp
    - The form was refactored to use shadcn's built-in `Form` type
  - SignUpForm
    - Added a password validation box
    - Implemented client-side checks on the fields. If the form fields do not match the schema, an error message is immediately raised and submitting the form will not work until all fields match the schema (i.e., the server is only called when the form data is well-formed).
    - The form was refactored to use shadcn's built-in `Form` type
    - Fixed silent failing when user already exists
    - Changed sign up procedure to route to dashboard upon successful creation instead of sign in page