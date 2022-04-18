dc := docker-compose
dr := $(dc) run --rm

.PHONY: shell-api
shell-api:
	$(dr) api bash

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
