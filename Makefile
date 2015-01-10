version = `cat package.json | grep version | awk -F'"' '{print $$4}'`
SRC = $(wildcard src/*.js src/**/*.js)
TESTS = $(wildcard tests/*.js)
BIN := ./node_modules/.bin
REPORTER ?= spec

parse:
	cd src/parse && \
		node ../../$(BIN)/jison velocity.yy velocity.l \
		&& mv velocity.js index.js

test:
	node $(BIN)/_mocha tests

spm:
	spm build --skip fs,path -O build

runner:
	@node tests/script/syncRunner.js

pages: spm runner
	cp build/velocityjs/${version}/*.js tests/runner/
	cp tests/runner/* ../gh-pages/velocity.js/runner/

publish:
	@git tag ${version}
	@git push origin ${version}
	@npm publish

cov: $(SRC) $(TESTS)
	@node $(BIN)/istanbul cover \
	  $(BIN)/_mocha -- \
	    --reporter mocha-lcov-reporter \
	    --timeout 5s \
			$(TESTS) \
			&& cat ./coverage/lcov.info | \
			$(BIN)/coveralls --verbose
