.PHONY: test


default: dev-install


install: 
	npm install -g .

reinstall: 
	$(MAKE) uninstall
	$(MAKE) install

uninstall:
	npm uninstall -g ${NAME}

dev-install: package.json
	npm install .


publish: 
	git push --tags origin HEAD:master
	npm publish
