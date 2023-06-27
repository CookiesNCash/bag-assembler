install:
	git pull
	npm ci

lint:
	npx eslint .

fix-lint:
	npx prettier --write ./src/index.html
	npx prettier --write ./src/styles/mainStyles.css
	npx prettier --write ./src/styles/reset.css
	npx eslint --fix .

test:
	npx jest

clear-test:
	clear
	npx jest

test-coverage:
	npx jest --coverage
