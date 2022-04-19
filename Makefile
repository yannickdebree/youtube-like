dc := docker-compose
dr := $(dc) run --rm

# Dependencies
.PHONY: install
install: node_modules/time

node_modules/time: yarn.lock
	$(dr) --no-deps api yarn
	touch node_modules/time

# Containers shells
.PHONY: shell-api
shell-api:
	$(dr) --no-deps api ash

.PHONY: shell-pwa
shell-pwa:
	$(dr) --no-deps pwa ash

# Utils (test, format)
.PHONY: test
test: migrate
	$(dr) api yarn test

.PHONY: format
format:
	$(dr) api yarn format

.PHONY: migrate
migrate: node_modules/time
	$(dr) api yarn migrate:up

.PHONY: build
build: node_modules/time
	$(dr) --no-deps api yarn build:api

# Containers cluster managment
.PHONY: serve
serve: migrate
	$(dc) up

.PHONY: stop
stop:
	$(dc) stop

.PHONY: clean
clean:
	$(dc) down --volumes