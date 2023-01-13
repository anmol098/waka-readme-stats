.DEFAULT_GOAL = help
SHELL = /bin/bash

PATH := venv/bin:node_modules/.bin:$(PATH)


help:
	@echo "Welcome to 'waka-readme-stats' GitHub Actions!"
	@echo "The action can be tested locally with: 'make run'."
	@echo "NB! For local testing Python version 3.6+ and NodeJS version between 14 and 16 are required."
	@echo "The action image can be built locally with: 'make container'."
	@echo "NB! For local container building Docker version between ??? and ??? is required."
	@echo "The action directory and image can be cleaned with: 'make clean'."
.PHONY: help

venv:
	python3 -m venv venv
	pip install --upgrade pip
	pip install -r requirements.txt

node_modules:
	npm i npm@next-8
	npm i vega vega-lite vega-cli canvas

dependencies: venv node_modules
.PHONY: dependencies


run: dependencies
	source <(cat .env.example | sed 's/=/=/' | sed 's/^/export /') && python3 ./sources/main.py
.PHONY: run


image:
	docker build -t waka-readme-stats -f Dockerfile .
.PHONY: image


clean:
	rm -rf venv
	rm -rf node_modules
	rm -r package*.json
	docker rmi -f waka-readme-stats 2>/dev/null
.PHONY: clean
