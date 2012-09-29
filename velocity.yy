%left '>' '<' '=='
%left '||' '&&'
%left '+' '-'
%left '*' '/'
%left '>' '==' '<'
%left '!'
%left UMINUS

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
  : set 
      { $$ = $1; }
  | if 
      { $$ = $1; }
  | elseif
      { $$ = $1; }
  | else 
      { $$ = $1; }
  | end
      { $$ = $1; }
  | foreach
      { $$ = $1; }
  | include
      { $$ = $1; }
  | parse
      { $$ = $1; }
  | evaluate
      { $$ = $1; }
  | define
      { $$ = $1; }
  | macro
      { $$ = $1; }
  ;

set
  : HASH SET PARENTHESIS equal CLOSE_PARENTHESIS 
    { $$ = [].concat($2, $4); }
  ;

if
  : HASH IF PARENTHESIS expression CLOSE_PARENTHESIS
    { $$ = [].concat($2, $4); }
  ;

elseif
  : HASH ELSEIF PARENTHESIS expression CLOSE_PARENTHESIS
    { $$ = [].concat($2, $4); }
  ;

else
  : HASH ELSE
    { $$ = 'else'; }
  ;

end
  : HASH END
    { $$ = 'end'; }
  ;

foreach
  : HASH FOREACH PARENTHESIS DOLLAR ID IN references CLOSE_PARENTHESIS
      { $$ = [].concat($2, $5, $6, $7); }
  ;

include
  : HASH INCLUDE PARENTHESIS params CLOSE_PARENTHESIS
      { $$ = [].concat($2, $4); }
  ;

parse
  : HASH PARSE PARENTHESIS STRING CLOSE_PARENTHESIS
      { $$ = [].concat($2, $4); }
  ;

evaluate
  : HASH EAVL PARENTHESIS DOLLAR ID CLOSE_PARENTHESIS
      { $$ = [].concat($2, $5); }
  ;

define
  : HASH DEFINE PARENTHESIS DOLLAR ID CLOSE_PARENTHESIS
      { $$ = [].concat($2, $5); }
  ;

macro
  : HASH MACRO PARENTHESIS ID arguments CLOSE_PARENTHESIS
      { $$ = [].concat($2, $4, $5); }
  | HASH MACRO PARENTHESIS ID CLOSE_PARENTHESIS
      { $$ = [].concat($2, $4); }
  ;

arguments
  : DOLLAR ID
      { $$ = $2; }
  | arguments DOLLAR ID
      { $$ = [].concat($1, $3); }
  ;

equal
  : references EQUAL expression { $$ = [$1, '=', $3]; }
  ;

expression
  : STRING 
      { $$ = $1; }
  | array
      { $$ = $1; }
  | math
      { $$ = $1; }
  ;

math
  : math '||' math
      { $$ = [].concat($1, $2, $3); }
  | math '&&' math
      { $$ = [].concat($1, $2, $3); }
  | math '>' math
      { $$ = [].concat($1, $2, $3); }
  | math '<' math
      { $$ = [].concat($1, $2, $3); }
  | math '==' math
      { $$ = [].concat($1, $2, $3); }
  | math '+' math
      { $$ = [].concat($1, $2, $3); }
  | math '-' math
      { $$ = [].concat($1, $2, $3); }
  | math '*' math
      { $$ = [].concat($1, $2, $3); }
  | math '/' math
      { $$ = [].concat($1, $2, $3); }
  | PARENTHESIS math CLOSE_PARENTHESIS
      { $$ = [].concat($1, $2, $3); }
  | '-' math %prec UMINUS
      { $$ = [].concat($1, $2); }
  | '!' math
      { $$ = [].concat($1, $2); }
  | references
      { $$ = $1; }
  | INTEGER
      { $$ = $1; }
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
