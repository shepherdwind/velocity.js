parse: 
	cd src/parse && jison velocity.yy velocity.l && mv velocity.js index.js

test: 
	mocha tests tests/node

pages:
	cake build && cp build/velocity/*.js ../gh-pages/velocity.js/try/js/velocity/ && \
	cake runner && cp tests/runner/spec.js ../gh-pages/velocity.js/runner/spec.js

version = `cat package.json | grep version | awk -F'"' '{print $$4}'`
publish:
	@git tag ${version}
	@git push origin ${version}
	@npm publish
