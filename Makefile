dc := docker-compose
dr := $(dc) run --rm

.PHONY: shell-api
shell-api:
	$(dr) --no-deps api bash

.PHONY: serve
serve:
	$(dc) up

.PHONY: stop
stop:
	$(dc) stop

.PHONY: clean
clean:
	$(dc) down --volumes

.PHONY: test
test:
	$(dr) api yarn test

.PHONY: test-watch
test-watch:
	$(dr) api yarn test:watch

.PHONY: format
format:
	$(dr) api yarn format