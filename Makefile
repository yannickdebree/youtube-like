dc := docker-compose
dr := $(dc) run --rm

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

.PHONY: test-watch
test-watch:
	$(dr) api yarn test:watch

.PHONY: format
format:
	$(dr) api yarn format

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