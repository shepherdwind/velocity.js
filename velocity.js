/* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"content":9,"DOLLAR":10,"VAR_BEGIN":11,"ID":12,"attributes":13,"VAR_END":14,"attribute":15,"method":16,"index":17,"property":18,"DOT":19,"params":20,"PARENTHESIS":21,"array":22,"CLOSE_PARENTHESIS":23,"data":24,"CONTENT":25,"BRACKET":26,"CLOSE_BRACKET":27,"STRING":28,"INTEGER":29,"datas":30,"COMMA":31,"ARR_BRACKET":32,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"DOLLAR",11:"VAR_BEGIN",12:"ID",14:"VAR_END",19:"DOT",21:"PARENTHESIS",23:"CLOSE_PARENTHESIS",25:"CONTENT",26:"BRACKET",27:"CLOSE_BRACKET",28:"STRING",29:"INTEGER",31:"COMMA",32:"ARR_BRACKET"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[8,5],[8,3],[8,2],[8,4],[13,1],[13,2],[15,1],[15,1],[15,1],[16,3],[20,3],[20,3],[20,2],[18,2],[18,2],[17,3],[17,3],[17,2],[17,2],[24,1],[24,1],[24,1],[30,1],[30,3],[22,3],[9,1],[9,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: console.log($$[$0-1]); return $$[$0-1]; 
break;
case 2: this.$ = $$[$0]; 
break;
case 3: this.$ = [$$[$0]]; 
break;
case 4: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 5: this.$ = $$[$0]; 
break;
case 6: this.$ = $$[$0]; 
break;
case 7: this.$ = [].concat($$[$0-2], $$[$0-1]); 
break;
case 8: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 9: this.$ = [].concat($$[$0]); 
break;
case 10: this.$ = [].concat($$[$0-1]); 
break;
case 11: this.$ = $$[$0]; 
break;
case 12: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = $$[$0]; 
break;
case 16: this.$ = [$$[$0-1], $$[$0]]; 
break;
case 17: this.$ = $$[$0-1]; 
break;
case 18: this.$ = $$[$0-1]; 
break;
case 19: this.$ = []; 
break;
case 20: this.$ = $$[$0]; 
break;
case 21: this.$ = '<<<' + $$[$0-1] + $$[$0]; 
break;
case 22: this.$ = $$[$0-1]; 
break;
case 23: this.$ = "<<<" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 24: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 25: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 26: this.$ = $$[$0]; 
break;
case 27: this.$ = $$[$0]; 
break;
case 28: this.$ = $$[$0]; 
break;
case 29: this.$ = $$[$0]; 
break;
case 30: this.$ = [].concat($$[$0-2], $$[$0]);
break;
case 31: this.$ = $$[$0-1]; 
break;
case 32: this.$ = $$[$0]; 
break;
case 33: this.$ = $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:[1,7],12:[1,9],25:[1,8]},{1:[3]},{5:[1,10]},{5:[2,2],7:11,8:5,9:6,10:[1,7],12:[1,9],25:[1,8]},{5:[2,3],10:[2,3],12:[2,3],25:[2,3]},{5:[2,5],10:[2,5],12:[2,5],25:[2,5]},{5:[2,6],10:[2,6],12:[2,6],25:[2,6]},{11:[1,12],12:[1,13]},{5:[2,32],10:[2,32],12:[2,32],25:[2,32]},{5:[2,33],10:[2,33],12:[2,33],25:[2,33]},{1:[2,1]},{5:[2,4],10:[2,4],12:[2,4],25:[2,4]},{12:[1,14]},{5:[2,9],10:[2,9],12:[2,9],13:15,15:16,16:17,17:18,18:19,19:[1,20],23:[2,9],25:[2,9],26:[1,21],27:[2,9],31:[2,9]},{13:22,14:[1,23],15:16,16:17,17:18,18:19,19:[1,20],26:[1,21]},{5:[2,8],10:[2,8],12:[2,8],15:24,16:17,17:18,18:19,19:[1,20],23:[2,8],25:[2,8],26:[1,21],27:[2,8],31:[2,8]},{5:[2,11],10:[2,11],12:[2,11],14:[2,11],19:[2,11],23:[2,11],25:[2,11],26:[2,11],27:[2,11],31:[2,11]},{5:[2,13],10:[2,13],12:[2,13],14:[2,13],19:[2,13],23:[2,13],25:[2,13],26:[2,13],27:[2,13],31:[2,13]},{5:[2,14],10:[2,14],12:[2,14],14:[2,14],19:[2,14],23:[2,14],25:[2,14],26:[2,14],27:[2,14],31:[2,14]},{5:[2,15],10:[2,15],12:[2,15],14:[2,15],19:[2,15],23:[2,15],25:[2,15],26:[2,15],27:[2,15],31:[2,15]},{12:[1,25],25:[1,26]},{8:32,10:[1,7],24:27,25:[1,28],27:[1,29],28:[1,30],29:[1,31]},{14:[1,33],15:24,16:17,17:18,18:19,19:[1,20],26:[1,21]},{5:[2,10],10:[2,10],12:[2,10],23:[2,10],25:[2,10],27:[2,10],31:[2,10]},{5:[2,12],10:[2,12],12:[2,12],14:[2,12],19:[2,12],23:[2,12],25:[2,12],26:[2,12],27:[2,12],31:[2,12]},{5:[2,20],10:[2,20],12:[2,20],14:[2,20],19:[2,20],20:34,21:[1,35],23:[2,20],25:[2,20],26:[2,20],27:[2,20],31:[2,20]},{5:[2,21],10:[2,21],12:[2,21],14:[2,21],19:[2,21],23:[2,21],25:[2,21],26:[2,21],27:[2,21],31:[2,21]},{25:[1,37],27:[1,36]},{5:[2,24],10:[2,24],12:[2,24],14:[2,24],19:[2,24],23:[2,24],25:[2,24],26:[2,24],27:[2,24],31:[2,24]},{5:[2,25],10:[2,25],12:[2,25],14:[2,25],19:[2,25],23:[2,25],25:[2,25],26:[2,25],27:[2,25],31:[2,25]},{23:[2,26],25:[2,26],27:[2,26],31:[2,26]},{23:[2,27],25:[2,27],27:[2,27],31:[2,27]},{23:[2,28],25:[2,28],27:[2,28],31:[2,28]},{5:[2,7],10:[2,7],12:[2,7],23:[2,7],25:[2,7],27:[2,7],31:[2,7]},{5:[2,16],10:[2,16],12:[2,16],14:[2,16],19:[2,16],23:[2,16],25:[2,16],26:[2,16],27:[2,16],31:[2,16]},{8:32,10:[1,7],22:38,23:[1,40],24:39,28:[1,30],29:[1,31],32:[1,41]},{5:[2,22],10:[2,22],12:[2,22],14:[2,22],19:[2,22],23:[2,22],25:[2,22],26:[2,22],27:[2,22],31:[2,22]},{5:[2,23],10:[2,23],12:[2,23],14:[2,23],19:[2,23],23:[2,23],25:[2,23],26:[2,23],27:[2,23],31:[2,23]},{23:[1,42]},{23:[1,43]},{5:[2,19],10:[2,19],12:[2,19],14:[2,19],19:[2,19],23:[2,19],25:[2,19],26:[2,19],27:[2,19],31:[2,19]},{8:32,10:[1,7],24:45,28:[1,30],29:[1,31],30:44},{5:[2,17],10:[2,17],12:[2,17],14:[2,17],19:[2,17],23:[2,17],25:[2,17],26:[2,17],27:[2,17],31:[2,17]},{5:[2,18],10:[2,18],12:[2,18],14:[2,18],19:[2,18],23:[2,18],25:[2,18],26:[2,18],27:[2,18],31:[2,18]},{27:[1,46],31:[1,47]},{27:[2,29],31:[2,29]},{23:[2,31]},{8:32,10:[1,7],24:48,28:[1,30],29:[1,31]},{27:[2,30],31:[2,30]}],
defaultActions: {10:[2,1],46:[2,31]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0: if(yy_.yytext.slice(-1) !== "\\") this.begin("mu"); if(yy_.yytext) return 25; 
break;
case 1: return 25; 
break;
case 2: return 10; 
break;
case 3: return 10; 
break;
case 4: /*ignore whitespace*/ 
break;
case 5: return 11; 
break;
case 6: this.popState(); return 14; 
break;
case 7: this.begin("c"); return 21; 
break;
case 8: 
                                        if (this.popState() === "c") {
                                          return 23; 
                                        } else {
                                          return 'CONTENT'; 
                                        }
                                      
break;
case 9: this.begin("i"); return 32; 
break;
case 10: this.begin("i"); return 26; 
break;
case 11: 
                                      if (this.popState() === "i") {
                                        return 27; 
                                      } else {
                                        return 'CONTENT';
                                      }
                                    
break;
case 12: return 19; 
break;
case 13: return 31; 
break;
case 14: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 28; 
break;
case 15: return 29; 
break;
case 16: return 12; 
break;
case 17: this.popState(); return 25; 
break;
case 18: return 5; 
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\$)))/,/^(?:[^\x00]+)/,/^(?:\$!)/,/^(?:\$)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[2,3,4,5,6,7,8,10,11,12,13,16,17,18],"inclusive":false},"c":{"rules":[2,3,4,7,8,9,11,12,13,14,15,16,17],"inclusive":false},"i":{"rules":[2,3,4,7,8,9,11,12,13,14,15,16,17],"inclusive":false},"INITIAL":{"rules":[0,1,18],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = velocity;
exports.Parser = velocity.Parser;
exports.parse = function () { return velocity.parse.apply(velocity, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}