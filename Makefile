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
	$(dr) --no-deps api bash

.PHONY: shell-pwa
shell-pwa:
	$(dr) --no-deps pwa bash

# Utils (test, format)
.PHONY: test
test:
	$(dr) api yarn test

.PHONY: format
format:
	$(dr) api yarn format

.PHONY: build
build:
	$(dr) api yarn build:api

# Containers cluster managment
.PHONY: serve
serve:
	$(dc) up

.PHONY: stop
stop:
	$(dc) stop

.PHONY: clean
clean:
	$(dc) down --volumes