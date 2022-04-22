dc := docker-compose
dr := $(dc) run --rm

# DEVELOPMENT

## Dependencies
.PHONY: install
install: node_modules/time

node_modules/time: yarn.lock
	$(dr) --no-deps api yarn
	touch node_modules/time

## Containers shells
.PHONY: shell-api
shell-api:
	$(dr) --no-deps api ash

.PHONY: shell-pwa
shell-pwa:
	$(dr) --no-deps pwa ash

## Utils (test, format)
.PHONY: test
test: migrate
	$(dr) api yarn test

.PHONY: test-watch
test-watch: migrate
	$(dr) api yarn test:watch

.PHONY: format
format:
	$(dr) api yarn format

.PHONY: migrate
migrate: node_modules/time
	$(dr) api dockerize -wait tcp://youtube-like-mysql:3306 -timeout 60s yarn migrate:up

## Containers cluster managment
.PHONY: serve
serve: migrate
	$(dc) up

.PHONY: stop
stop:
	$(dc) stop

.PHONY: clean
clean:
	$(dc) down --volumes

# PRODUCTION

.PHONY: build
build: node_modules/time
	$(dr) --no-deps api yarn build:api
	$(dr) --no-deps pwa yarn build:pwa

.PHONY: deploy
deploy:
	export $(cat ./.env | sed -e /^$/d -e /^#/d | xargs)
	docker stack deploy -c stack.yml youtube-like

.PHONY: undeploy
undeploy:
	docker stack rm youtube-like