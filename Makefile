run:
	@docker compose -p project_x up -d --wait
	npm run generate
	npm run migrate
	npm run dev

stop:
	@docker compose -p project_x down

migrations:
	npm run generate
	npm run migrate

install:
	npm install

cypher:
	openssl rand -hex 16 | tr -d '\n' >> cypher.key
	openssl rand -hex 8 | tr -d '\n' >> iv.key

db-gui:
	npx drizzle-kit studio

test:
	npm run test -- --run

lint:
	npx eslint src/**