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
  | directives { $$ = $1; }
  | content { $$ = $1; }
  ;

directives
  : set { $$ = $1; }
  | conditionals { $$ = $1; }
  ;

conditionals
  : if CONTENT end
  | if CONTENT else CONTENT end
  | if CONTENT elseif else CONTENT end
  ;

end
  : HASH END
  ;

else
  : HASH ELSE
  ;

elseifs
  : elseif CONTENT
  | elseifs elseifs
  ;

elseif
  : HASH ELSEIF PARENTHESIS logical CLOSE_BRACKET 
  ;

if
  : HASH IF PARENTHESIS logical CLOSE_BRACKET
  ;

logical
  : not
  | or
  | and
  | compare
  ;

not
  : NOT references
  ;

not
  : NOT references
  ;

set
  : HASH SET PARENTHESIS equal CLOSE_PARENTHESIS 
    { $$ = [].concat($2, $4); }
  ;

equal
  : references EQUAL references { $$ = [$1, '=', $3]; }
  | references EQUAL literals { $$ = [$1, '=', $3]; }
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
  : DOT ID PARENTHESIS params CLOSE_PARENTHESIS { $$ = [$2, $4]; }
  | DOT ID PARENTHESIS CLOSE_PARENTHESIS { $$ = []; }
  ;

params
  : literals { $$ = $1; }
  | references { $$ = $1; }
  | params COMMA literals { $$ = [].concat($1, $3); }
  | params COMMA references { $$ = [].concat($1, $3); }
  ;

property
  : DOT ID { $$ = $2; }
  | DOT CONTENT { $$ = '<<<' + $1 + $2; }
  ;

index
  : BRACKET literal CLOSE_BRACKET { $$ = $2; } 
  | BRACKET references CLOSE_BRACKET { $$ = $2; } 
  | BRACKET literal CONTENT { $$ = "<<<" + $1 + $2 + $3; } 
  | BRACKET CONTENT { $$ = "<<<" + $1 + $2; } 
  | BRACKET CLOSE_BRACKET { $$ = "<<<" + $1 + $2; } 
  ;

literal
  : STRING { $$ = $1; }
  | INTEGER { $$ = $1; }
  ;

literals
  : literal { $$ = $1; }
  | array { $$ = $1;}
  ;

array
  : BRACKET params CLOSE_BRACKET { $$ = $2; }
  | BRACKET CLOSE_BRACKET { $$ = []; }
  ;

content
  : CONTENT { $$ = $1; }
  | ID { $$ = $1; }
  ;
