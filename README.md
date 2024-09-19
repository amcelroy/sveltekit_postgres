# What this is

A SvelteKit (Typescript) / Postgres template project that is hopefully easy to use with most of the bells and whistles to get a project up and running. 
The project has Lucia pre-installed and configured with Postgres to handle user authentication sessions, so be careful when modifying the database schema.
Vitest is used for unit testing and ESLint (Typescript) is used for linting. These can be run using `make test`.
Logging is provided by Winston and configured to log to console and files, with auto-rotation set. See `src/routes/hooks.server.ts` for more information. Please use `logger` instead of `console.log` for logging; logs are located in the `logs` folder.

See the Features section for more information. 

# Installation

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