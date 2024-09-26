![Test and Linting](https://github.com/amcelroy/sveltekit_postgres/actions/workflows/main.yaml/badge.svg)

# What this is

A SvelteKit (Typescript) / Postgres template project that is hopefully easy to use with most of the bells and whistles to get a project up and running. 
The project has Lucia pre-installed and configured with Postgres to handle user authentication sessions, so be careful when modifying the database schema.
Vitest is used for unit testing and ESLint (Typescript) is used for linting. These can be run using `make test`.
Logging is provided by Winston and configured to log to console and files, with auto-rotation set. See `src/routes/hooks.server.ts` for more information. Please use `logger` instead of `console.log` for logging; logs are located in the `logs` folder.

See the Features section for more information. 

# Installation

NOTE: This project uses Docker to run the Postgres database. Make sure you have Docker installed on your machine and running before starting the project.

1. Create a .env file in the root directory of the project and add the following variables:
```
POSTGRES_USER=PICK A USER NAME (i.e. "project_admin")
POSTGRES_PASSWORD=PICK A PASSWORD (i.e. "this is a super awesome and long password!2#4%6)
POSTGRES_DB=PICK A DATABASE NAME (i.e. "project_db")
POSTGRES_HOST="localhost" # No need to change
POSTGRES_PORT="5432" # No need to change
NODE_ENV="development" # No need to change, unless you are deploying
```
2. Run `make install`. This will install the Node.js dependencies.
3. (Optional) In VS Code, create a new "JavaScript Debug Terminal" and then follow step 5 in the terminal. This will allow server side debugging.
4. Run `make run`. This will start the docker file that has the postgres database and the SvelteKit app.
5. Open your browser and go to `http://localhost:5173` to see the app (unless you are running another Vite instance, then check the logs)
6. After the Postgres container is running, run `make migrations`

# Now what?

### Adding pages
Add new pages in the `src/routes` folder. There are 2 types of pages:
1. `+page.svelte` - These can be seen by anyone and don't have a server side component. 
2. `+page.server.svelte and +page.svelte` - These pages have a server side component and can be used to fetch data from the database. To ensure that a user has proper permissions to view the path, YOU MUST MANUALLY check the users session, for example:

```
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = (async (event) => {
    if (!event.locals.user) redirect(302, "/");

    /* Your code here to access the database*/
})
```

This code checks that the user session is valid and if not, redirects the user to the home page to login. See `hooks.server.ts` for more information on how the session is validated. 

### Added POST / PATCH / GET / DELETE routes
`+server.ts` files can be added to the `src/routes` folder. For example, if I want to `GET` from `http://localhost:5173/api/v1/username`, I would create a `+server.ts` file in the `src/routes/api/v1` folder and add: 

```
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ( event ) => {
	if (!event.locals.user) return error(401, 'Unauthorized');
    
    /* Your code here to access the database*/
}
```
The main difference here is that we are returning an error and not redirecting the user, since this is an API route.


# Extra Makefile Commands
- `make db-gui` - Starts up Drizzle Kit Studio in the browser for inspecting the database.
- `make test` - Runs the Vitest and ESLint tests.

# Features
- SvelteKit - Super awesome front / backend framework
- Drizzle - Postgres data migration tool. Look at `schema.ts` to create new tables and columns.
- Docker - Starts up the PostgreSQL database.
- TailwindCSS - Very easy to use CSS styling framework.
- Shadcn-Svelte - Nice looking Svelte component library.
- Lucia - User authentication and authorization with session management using PostgreSQL.
- drizzle-kit - A tool to help with drizzle. Run `make db-gui` to use Drizzle Kit Studio.
- Vitest - Unit Test framework for Typescript. See `src/lib/lib.test.ts` for an example.
- Winston - Logging framework. See `src/routes/hooks.server.ts` for configuration.
