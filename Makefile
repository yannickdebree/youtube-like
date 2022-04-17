dc := docker-compose
dr := $(dc) run --rm

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
