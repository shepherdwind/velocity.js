parse: 
	cd src/parse && jison velocity.yy velocity.l && mv velocity.js index.js
test: parse
	cd test && node ../src/parse/velocity.js tmp.vm
