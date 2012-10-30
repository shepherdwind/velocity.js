
%x mu c i h esc

%%

[^#]*?/"$"                        {
                                    var _reg = /\\+$/;
                                    var _esc = yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    /*转义实现，非常恶心，暂时没有好的解决方案*/
                                    if (!_num || !(_num % 2)) {
                                      this.begin("mu");
                                    } else {
                                      yytext = yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yytext = yytext.replace(/(\\\\)+$/, '\\');
                                    if(yytext) return 'CONTENT'; 
                                  }

[^\$]*?/"#"                       { 
                                    var _reg = /\\+$/;
                                    var _esc = yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    if (!_num || !(_num % 2)) {
                                      this.begin("h");
                                    } else {
                                      yytext = yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yytext = yytext.replace(/(\\\\)+$/, '\\');
                                    if(yytext) return 'CONTENT'; 
                                  }

[^\x00]+                          { return 'CONTENT'; }
<h>"#"\*[\s\S]+?\*"#"             { this.popState(); return 'COMMENT'; }
<h>"##"[^\n]+/\n                  { this.popState(); return 'COMMENT'; }
<h>"#"/[^\s]                      { return 'HASH'; }
<h>"set"[ ]*                      { return 'SET'; }
<h>"if"[ ]*                       { return 'IF'; }
<h>"elseif"[ ]*                   { return 'ELSEIF'; }
<h>"else"                         { this.popState(); return 'ELSE'; }
<h>"{else}"                       { this.popState(); return 'ELSE'; }
<h>"end"                          { this.popState(); return 'END'; }
<h>"break"                        { this.popState(); return 'BREAK'; }
<h>"foreach"[ ]*                  { return 'FOREACH'; }
<h>"include"[ ]*                  { return 'INCLUDE'; }
<h>"parse"[ ]*                    { return 'PARSE'; }
<h>"evaluate"                     { return 'EVAL'; }
<h>"define"[ ]*                   { return 'DEFINE'; }
<h>"macro"[ ]*                    { return 'MACRO'; }
<c,i>"in"                         { return 'IN'; }
<c,i>[\+\-\*/]                    { return yytext; }
<c,i>[><]                         { return yytext; }
<c,i>"=="                         { return yytext; }
<c,i>"||"                         { return yytext; }
<c,i>"&&"                         { return yytext; }
<mu,c,i>"$!"                      { return 'DOLLAR'; }
<mu,h,c,i>"$"                     { return 'DOLLAR'; }
<h,c,i>"!"                        { return yytext; }
<h,c,i>"="                        { return 'EQUAL'; }
<c,i>\s+                          { /*ignore whitespace*/ }
<h,c>"{"                          { return 'MAP_BEGIN'; }
<h,c>"}"                          { return 'MAP_END'; }
<h,c>":"                          { return 'MAP_SPLIT'; }
<mu>"{"                           { return 'VAR_BEGIN'; }
<mu>"}"                           { this.popState(); return 'VAR_END'; }
<mu,h,c,i>"("                     { this.begin("c"); return 'PARENTHESIS'; }
<mu,h,c,i>")"                     { 
                                    if (this.popState() === "c") {
                                      var len = this.conditionStack.length;
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && this.conditionStack[1] === "h"){
                                        this.popState();
                                      }
                                      return 'CLOSE_PARENTHESIS'; 
                                    } else {
                                      return 'CONTENT'; 
                                    }
                                  }

<mu,h,c,i>"["                     { this.begin("i"); return 'BRACKET'; }
<mu,h,c,i>"]"                     { 
                                    if (this.popState() === "i") {
                                      return 'CLOSE_BRACKET'; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  }

<i>".."                           { return 'RANGE'; }
<mu,h,c,i>"."                     { return 'DOT'; }
<mu,h,c,i>","                     { return 'COMMA'; }
<c,i>'"'(\\\"|[^\"])*'"'          { yytext = yytext.substr(1, yyleng-2).replace(/\\"/g,'"'); return 'EVAL_STRING'; }
<c,i>"'"(\\\'|[^\'])*"'"          { yytext = yytext.substr(1, yyleng-2).replace(/\\'/g,"'"); return 'STRING'; }
<h,c,i>[0-9]+                     { return 'INTEGER'; }
<mu,h,c,i>[a-zA-Z][a-zA-Z0-9_]*   { return 'ID'; }
<mu>"#"                           { this.begin('h'); return 'HASH'; }
<h,mu>.                           { this.popState(); return 'CONTENT'; }
<h,mu>\s+                         { this.popState(); return 'CONTENT'; }
<esc>[\$#]                        { this.popState(); return 'CONTENT'; }
<mu,h><<EOF>>                     { this.popState(); return 'EOF'; }
<INITIAL><<EOF>>                  { return 'EOF'; }
