
%x mu c i

%%

[^\x00]*?/("$")                 { if(yytext.slice(-1) !== "\\") this.begin("mu"); if(yytext) return 'CONTENT'; }
[^\x00]+                        { return 'CONTENT'; }
<mu,c,i>"$!"                        { return 'DOLLAR'; }
<mu,c,i>"$"                         { return 'DOLLAR'; }
<mu,c,i>\s+                         { /*ignore whitespace*/ }
<mu>"{"                             { return 'VAR_BEGIN'; }
<mu>"}"                             { this.popState(); return 'VAR_END'; }
<mu,c,i>"("                         { this.begin("c"); return 'PARENTHESIS'; }
<mu,c,i>")"                         { 
                                        if (this.popState() === "c") {
                                          return 'CLOSE_PARENTHESIS'; 
                                        } else {
                                          return 'CONTENT'; 
                                        }
                                      }

<c,i>"["                            { this.begin("i"); return 'ARR_BRACKET'; }
<mu>"["                             { this.begin("i"); return 'BRACKET'; }
<mu,c,i>"]"                         { 
                                      if (this.popState() === "i") {
                                        return 'CLOSE_BRACKET'; 
                                      } else {
                                        return 'CONTENT';
                                      }
                                    }

<mu,c,i>"."                         { return 'DOT'; }
<mu,c,i>","                         { return 'COMMA'; }
<c,i>'"'(\\\"|[^\"])*'"'            { yytext = yytext.substr(1,yyleng-2).replace(/\\"/g,'"'); return 'STRING'; }
<c,i>[0-9]+                         { return 'INTEGER'; }
<mu,c,i>[a-zA-Z][a-zA-Z0-9_]*       { return 'ID'; }
<mu,c,i>.                           { this.popState(); return 'CONTENT'; }
<INITIAL,mu><<EOF>>                 { return 'EOF'; }
