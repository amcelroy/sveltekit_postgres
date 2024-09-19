run:
	@docker compose -p bsm up -d
	npm run generate
	npm run migrate
	npm run dev

stop:
	@docker compose -p bsm down

migrations:
	npm run generate
	npm run migrate

install:
	npm install

db-gui:
	npx drizzle-kit studio

test:
	npm run test -- --run
	npx eslint src/**