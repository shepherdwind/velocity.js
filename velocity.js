/* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"directives":9,"content":10,"set":11,"HASH":12,"SET":13,"PARENTHESIS":14,"equal":15,"CLOSE_PARENTHESIS":16,"EQUAL":17,"literals":18,"DOLLAR":19,"VAR_BEGIN":20,"ID":21,"attributes":22,"VAR_END":23,"attribute":24,"method":25,"index":26,"property":27,"DOT":28,"params":29,"COMMA":30,"CONTENT":31,"BRACKET":32,"literal":33,"CLOSE_BRACKET":34,"STRING":35,"INTEGER":36,"array":37,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",12:"HASH",13:"SET",14:"PARENTHESIS",16:"CLOSE_PARENTHESIS",17:"EQUAL",19:"DOLLAR",20:"VAR_BEGIN",21:"ID",23:"VAR_END",28:"DOT",30:"COMMA",31:"CONTENT",32:"BRACKET",34:"CLOSE_BRACKET",35:"STRING",36:"INTEGER"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[7,1],[9,1],[11,5],[15,3],[15,3],[8,5],[8,3],[8,2],[8,4],[22,1],[22,2],[24,1],[24,1],[24,1],[25,5],[25,4],[29,1],[29,1],[29,3],[29,3],[27,2],[27,2],[26,3],[26,3],[26,3],[26,2],[26,2],[33,1],[33,1],[18,1],[18,1],[37,3],[37,2],[10,1],[10,1]],
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
case 7: this.$ = $$[$0]; 
break;
case 8: this.$ = $$[$0]; 
break;
case 9: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 10: this.$ = [$$[$0-2], '=', $$[$0]]; 
break;
case 11: this.$ = [$$[$0-2], '=', $$[$0]]; 
break;
case 12: this.$ = [].concat($$[$0-2], $$[$0-1]); 
break;
case 13: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 14: this.$ = [].concat($$[$0]); 
break;
case 15: this.$ = [].concat($$[$0-1]); 
break;
case 16: this.$ = $$[$0]; 
break;
case 17: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0]; 
break;
case 20: this.$ = $$[$0]; 
break;
case 21: this.$ = [$$[$0-3], $$[$0-1]]; 
break;
case 22: this.$ = []; 
break;
case 23: this.$ = $$[$0]; 
break;
case 24: this.$ = $$[$0]; 
break;
case 25: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 26: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 27: this.$ = $$[$0]; 
break;
case 28: this.$ = '<<<' + $$[$0-1] + $$[$0]; 
break;
case 29: this.$ = $$[$0-1]; 
break;
case 30: this.$ = $$[$0-1]; 
break;
case 31: this.$ = "<<<" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 32: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 33: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 34: this.$ = $$[$0]; 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = $$[$0]; 
break;
case 37: this.$ = $$[$0];
break;
case 38: this.$ = $$[$0-1]; 
break;
case 39: this.$ = []; 
break;
case 40: this.$ = $$[$0]; 
break;
case 41: this.$ = $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:9,12:[1,12],19:[1,8],21:[1,11],31:[1,10]},{1:[3]},{5:[1,13]},{5:[2,2],7:14,8:5,9:6,10:7,11:9,12:[1,12],19:[1,8],21:[1,11],31:[1,10]},{5:[2,3],12:[2,3],19:[2,3],21:[2,3],31:[2,3]},{5:[2,5],12:[2,5],19:[2,5],21:[2,5],31:[2,5]},{5:[2,6],12:[2,6],19:[2,6],21:[2,6],31:[2,6]},{5:[2,7],12:[2,7],19:[2,7],21:[2,7],31:[2,7]},{20:[1,15],21:[1,16]},{5:[2,8],12:[2,8],19:[2,8],21:[2,8],31:[2,8]},{5:[2,40],12:[2,40],19:[2,40],21:[2,40],31:[2,40]},{5:[2,41],12:[2,41],19:[2,41],21:[2,41],31:[2,41]},{13:[1,17]},{1:[2,1]},{5:[2,4],12:[2,4],19:[2,4],21:[2,4],31:[2,4]},{21:[1,18]},{5:[2,14],12:[2,14],16:[2,14],17:[2,14],19:[2,14],21:[2,14],22:19,24:20,25:21,26:22,27:23,28:[1,24],30:[2,14],31:[2,14],32:[1,25],34:[2,14]},{14:[1,26]},{22:27,23:[1,28],24:20,25:21,26:22,27:23,28:[1,24],32:[1,25]},{5:[2,13],12:[2,13],16:[2,13],17:[2,13],19:[2,13],21:[2,13],24:29,25:21,26:22,27:23,28:[1,24],30:[2,13],31:[2,13],32:[1,25],34:[2,13]},{5:[2,16],12:[2,16],16:[2,16],17:[2,16],19:[2,16],21:[2,16],23:[2,16],28:[2,16],30:[2,16],31:[2,16],32:[2,16],34:[2,16]},{5:[2,18],12:[2,18],16:[2,18],17:[2,18],19:[2,18],21:[2,18],23:[2,18],28:[2,18],30:[2,18],31:[2,18],32:[2,18],34:[2,18]},{5:[2,19],12:[2,19],16:[2,19],17:[2,19],19:[2,19],21:[2,19],23:[2,19],28:[2,19],30:[2,19],31:[2,19],32:[2,19],34:[2,19]},{5:[2,20],12:[2,20],16:[2,20],17:[2,20],19:[2,20],21:[2,20],23:[2,20],28:[2,20],30:[2,20],31:[2,20],32:[2,20],34:[2,20]},{21:[1,30],31:[1,31]},{8:33,19:[1,8],31:[1,34],33:32,34:[1,35],35:[1,36],36:[1,37]},{8:39,15:38,19:[1,8]},{23:[1,40],24:29,25:21,26:22,27:23,28:[1,24],32:[1,25]},{5:[2,15],12:[2,15],16:[2,15],17:[2,15],19:[2,15],21:[2,15],30:[2,15],31:[2,15],34:[2,15]},{5:[2,17],12:[2,17],16:[2,17],17:[2,17],19:[2,17],21:[2,17],23:[2,17],28:[2,17],30:[2,17],31:[2,17],32:[2,17],34:[2,17]},{5:[2,27],12:[2,27],14:[1,41],16:[2,27],17:[2,27],19:[2,27],21:[2,27],23:[2,27],28:[2,27],30:[2,27],31:[2,27],32:[2,27],34:[2,27]},{5:[2,28],12:[2,28],16:[2,28],17:[2,28],19:[2,28],21:[2,28],23:[2,28],28:[2,28],30:[2,28],31:[2,28],32:[2,28],34:[2,28]},{31:[1,43],34:[1,42]},{34:[1,44]},{5:[2,32],12:[2,32],16:[2,32],17:[2,32],19:[2,32],21:[2,32],23:[2,32],28:[2,32],30:[2,32],31:[2,32],32:[2,32],34:[2,32]},{5:[2,33],12:[2,33],16:[2,33],17:[2,33],19:[2,33],21:[2,33],23:[2,33],28:[2,33],30:[2,33],31:[2,33],32:[2,33],34:[2,33]},{16:[2,34],30:[2,34],31:[2,34],34:[2,34]},{16:[2,35],30:[2,35],31:[2,35],34:[2,35]},{16:[1,45]},{17:[1,46]},{5:[2,12],12:[2,12],16:[2,12],17:[2,12],19:[2,12],21:[2,12],30:[2,12],31:[2,12],34:[2,12]},{8:50,16:[1,48],18:49,19:[1,8],29:47,32:[1,53],33:51,35:[1,36],36:[1,37],37:52},{5:[2,29],12:[2,29],16:[2,29],17:[2,29],19:[2,29],21:[2,29],23:[2,29],28:[2,29],30:[2,29],31:[2,29],32:[2,29],34:[2,29]},{5:[2,31],12:[2,31],16:[2,31],17:[2,31],19:[2,31],21:[2,31],23:[2,31],28:[2,31],30:[2,31],31:[2,31],32:[2,31],34:[2,31]},{5:[2,30],12:[2,30],16:[2,30],17:[2,30],19:[2,30],21:[2,30],23:[2,30],28:[2,30],30:[2,30],31:[2,30],32:[2,30],34:[2,30]},{5:[2,9],12:[2,9],19:[2,9],21:[2,9],31:[2,9]},{8:54,18:55,19:[1,8],32:[1,53],33:51,35:[1,36],36:[1,37],37:52},{16:[1,56],30:[1,57]},{5:[2,22],12:[2,22],16:[2,22],17:[2,22],19:[2,22],21:[2,22],23:[2,22],28:[2,22],30:[2,22],31:[2,22],32:[2,22],34:[2,22]},{16:[2,23],30:[2,23],34:[2,23]},{16:[2,24],30:[2,24],34:[2,24]},{16:[2,36],30:[2,36],34:[2,36]},{16:[2,37],30:[2,37],34:[2,37]},{8:50,18:49,19:[1,8],29:58,32:[1,53],33:51,34:[1,59],35:[1,36],36:[1,37],37:52},{16:[2,10]},{16:[2,11]},{5:[2,21],12:[2,21],16:[2,21],17:[2,21],19:[2,21],21:[2,21],23:[2,21],28:[2,21],30:[2,21],31:[2,21],32:[2,21],34:[2,21]},{8:61,18:60,19:[1,8],32:[1,53],33:51,35:[1,36],36:[1,37],37:52},{30:[1,57],34:[1,62]},{16:[2,39],30:[2,39],34:[2,39]},{16:[2,25],30:[2,25],34:[2,25]},{16:[2,26],30:[2,26],34:[2,26]},{16:[2,38],30:[2,38],34:[2,38]}],
defaultActions: {13:[2,1],54:[2,10],55:[2,11]},
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
case 0: if(yy_.yytext.slice(-1) !== "\\") this.begin("mu"); if(yy_.yytext) return 31; 
break;
case 1: if(yy_.yytext.slice(-1) !== "\\") this.begin("h"); if(yy_.yytext) return 31; 
break;
case 2: return 31; 
break;
case 3: return 12; 
break;
case 4: return 13; 
break;
case 5: return 19; 
break;
case 6: return 19; 
break;
case 7: return 17; 
break;
case 8: /*ignore whitespace*/ 
break;
case 9: return 20; 
break;
case 10: this.popState(); return 23; 
break;
case 11: this.begin("c"); return 14; 
break;
case 12: 
                                    if (this.popState() === "c") {
                                      var len = this.conditionStack.length;
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && this.conditionStack[1] === "h"){
                                        this.popState();
                                      }
                                      return 16; 
                                    } else {
                                      return 'CONTENT'; 
                                    }
                                  
break;
case 13: this.begin("i"); return 32; 
break;
case 14: 
                                    if (this.popState() === "i") {
                                      return 34; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  
break;
case 15: return 28; 
break;
case 16: return 30; 
break;
case 17: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 35; 
break;
case 18: return 36; 
break;
case 19: return 21; 
break;
case 20: return 31; 
break;
case 21: return 31; 
break;
case 22: this.popState(); return 31; 
break;
case 23: return 5; 
break;
}
};
lexer.rules = [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#)/,/^(?:set\b)/,/^(?:\$!)/,/^(?:\$)/,/^(?:=)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:.)/,/^(?:.)/,/^(?:\s+)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[5,6,9,10,11,12,13,14,15,16,19,20,22,23],"inclusive":false},"c":{"rules":[5,6,7,8,11,12,13,14,15,16,17,17,18,19],"inclusive":false},"i":{"rules":[5,6,7,8,11,12,13,14,15,16,17,18,19],"inclusive":false},"h":{"rules":[3,4,6,7,8,11,12,13,14,15,16,17,18,19,21],"inclusive":false},"INITIAL":{"rules":[0,1,2,23],"inclusive":true}};
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