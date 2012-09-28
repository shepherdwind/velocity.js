
%x mu c i h

%%

[^#]*?/"$"                        { if(yytext.slice(-1) !== "\\") this.begin("mu"); if(yytext) return 'CONTENT'; }
[^\$]*?/"#"                       { if(yytext.slice(-1) !== "\\") this.begin("h"); if(yytext) return 'CONTENT'; }
[^\x00]+                          { return 'CONTENT'; }
<h>"#"                            { return 'HASH'; }
<h>"set"                          { return 'SET'; }
<mu,c,i>"$!"                      { return 'DOLLAR'; }
<mu,h,c,i>"$"                     { return 'DOLLAR'; }
<h,c,i>"="                        { return 'EQUAL'; }
<h,c,i>\s+                        { /*ignore whitespace*/ }
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

<mu,h,c,i>"."                     { return 'DOT'; }
<mu,h,c,i>","                     { return 'COMMA'; }
<c,h,c,i>'"'(\\\"|[^\"])*'"'      { yytext = yytext.substr(1,yyleng-2).replace(/\\"/g,'"'); return 'STRING'; }
<h,c,i>[0-9]+                     { return 'INTEGER'; }
<mu,h,c,i>[a-zA-Z][a-zA-Z0-9_]*   { return 'ID'; }
<mu>.                             { return 'CONTENT'; }
<h>.                              { return 'CONTENT'; }
<mu>\s+                           { this.popState(); return 'CONTENT'; }
<INITIAL,mu><<EOF>>               { return 'EOF'; }
