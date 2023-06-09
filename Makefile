install:
	git pull
	npm ci

run:
	clear
	node ./bin/main.js


reboot-dir-users:
	rm -rf ./database/users
	mkdir ./database/users
	touch ./database/users/defaultFile.json

lint:
	npx eslint .

fix-lint:
	npx prettier --write ./src/front/index.html
	npx prettier --write ./src/front/personalizationPage.html
	npx prettier --write ./src/front/styles.css
	npx eslint --fix .

test:
	npx jest

clear-test:
	clear
	npx jest

test-coverage:
	npx jest --coverage
