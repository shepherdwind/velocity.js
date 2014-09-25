version = `cat package.json | grep version | awk -F'"' '{print $$4}'`

parse:
	cd src/parse && jison velocity.yy velocity.l && mv velocity.js index.js

test:
	mocha tests tests/node

spm:
	spm build --skip fs,path -O build

pages:
	cake runner && cp tests/runner/* ../gh-pages/velocity.js/runner/
	cp build/velocityjs/${version}/*.js tests/runner/

publish:
	@git tag ${version}
	@git push origin ${version}
	@npm publish
