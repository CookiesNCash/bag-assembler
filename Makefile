install:
	git pull
	npm ci

lint:
	npx eslint .

fix-lint:
	# npx prettier --write ./src/front/index.html
	# # npx prettier --write ./src/front/personalizationPage.html
	# npx prettier --write ./src/front/styles.css
	npx eslint --fix .

test:
	npx jest

clear-test:
	clear
	npx jest

test-coverage:
	npx jest --coverage
