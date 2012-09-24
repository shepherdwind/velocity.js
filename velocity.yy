%start root

%%

root
  : program EOF { console.log($1); return $1; }
  ;

program
  : statements { $$ = $1; }
  ;

statements
  : statement { $$ = [$1]; }
  | statements statement { $1.push($2); $$ = $1; }
  ;

statement
  : references { $$ = $1; }
  | content { $$ = $1; }
  ;

references
  : DOLLAR VAR_BEGIN ID attributes VAR_END { $$ = [].concat($3, $4); }
  | DOLLAR ID attributes { $$ = [].concat($2, $3); }
  | DOLLAR ID { $$ = [].concat($2); }
  | DOLLAR VAR_BEGIN ID VAR_END { $$ = [].concat($3); }
  ;

attributes
  : attribute { $$ = $1; }
  | attributes attribute { $$ = [].concat($1, $2); }
  ;

attribute
  : method { $$ = $1; }
  | index { $$ = $1; }
  | property { $$ = $1; }
  ;

method
  : DOT ID params { $$ = [$2, $3]; }
  ;

params
  : PARENTHESIS array CLOSE_PARENTHESIS { $$ = $2; }
  | PARENTHESIS data CLOSE_PARENTHESIS { $$ = $2; }
  | PARENTHESIS CLOSE_PARENTHESIS { $$ = []; }
  ;

property
  : DOT ID { $$ = $2; }
  | DOT CONTENT { $$ = '<<<' + $1 + $2; }
  ;

index
  : BRACKET data CLOSE_BRACKET { $$ = $2; } 
  | BRACKET data CONTENT { $$ = "<<<" + $1 + $2 + $3; } 
  | BRACKET CONTENT { $$ = "<<<" + $1 + $2; } 
  | BRACKET CLOSE_BRACKET { $$ = "<<<" + $1 + $2; } 
  ;

data
  : STRING { $$ = $1; }
  | INTEGER { $$ = $1; }
  | references { $$ = $1; }
  ;

datas
  : data { $$ = $1; }
  | datas COMMA data { $$ = [].concat($1, $3);}
  ;

array
  : ARR_BRACKET datas CLOSE_BRACKET { $$ = $2; }
  ;

content
  : CONTENT { $$ = $1; }
  | ID { $$ = $1; }
  ;
