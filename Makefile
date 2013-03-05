parse: 
	cd src/parse && jison velocity.yy velocity.l && mv velocity.js index.js
test: 
	mocha tests tests/node
pages:
	cake build && cp build/velocity/*.js ../gh-pages/velocity.js/try/js/velocity/ && \
	cake runner && cp tests/runner/spec.js ../gh-pages/velocity.js/runner/spec.js
