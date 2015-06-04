all: main

.PHONY: main
main:
	jekyll build

.PHONY: watch
watch:
	jekyll build --watch

.PHONY: serve
serve:
	jekyll server

.PHONY: divshot
divshot: all
	divshot push

.PHONY: staging
staging:
	divshot promote development staging

.PHONY: prod
prod:
	divshot promote staging production
