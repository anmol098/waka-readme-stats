.ONESHELL:
.DEFAULT_GOAL = help
SHELL = /bin/bash

PATH := venv/bin:node_modules/.bin:$(PATH)


help:
	@ # Print help commands
	echo "Welcome to 'waka-readme-stats' GitHub Actions!"
	echo "The action can be tested locally with: 'make run'."
	echo "NB! For local testing Python version 3.6+ and NodeJS version between 14 and 16 are required."
	echo "The action image can be built locally with: 'make container'."
	echo "NB! For local container building Docker version 20+ is required."
	echo "The action directory and image can be cleaned with: 'make clean'."
.PHONY: help

venv:
	@ # Install Python virtual environment and dependencies
	python3 -m venv venv
	pip install --upgrade pip
	pip install -r requirements.txt

node_modules:
	@ # Install NodeJS dependencies
	npm i npm@next-8
	npm i vega vega-lite vega-cli canvas


run-locally: venv node_modules
	@ # Run action locally
	source <(cat .env.example | sed 's/=/=/' | sed 's/^/export /') && python3 ./sources/main.py
.PHONY: run-locally

run-container:
	@ # Run action in container
	docker build -t waka-readme-stats -f Dockerfile .
	docker run --env-file .env.example -v ./charts:/waka-readme-stats/charts waka-readme-stats
.PHONY: run-container


clean:
	@ # Clean all build files, including: libraries, package manager configs, docker images and containers
	rm -rf venv
	rm -rf node_modules
	rm -f package*.json
	rm -rf charts
	docker rm -f waka-readme-stats 2>/dev/null || true
	docker rmi $(docker images | grep "waka-readme-stats") 2> /dev/null || true
.PHONY: clean
