  KISSY.add(function(S){    /* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"directives":9,"content":10,"COMMENT":11,"set":12,"if":13,"elseif":14,"else":15,"end":16,"foreach":17,"break":18,"include":19,"parse":20,"evaluate":21,"define":22,"macro":23,"macro_call":24,"HASH":25,"SET":26,"PARENTHESIS":27,"equal":28,"CLOSE_PARENTHESIS":29,"IF":30,"expression":31,"ELSEIF":32,"ELSE":33,"END":34,"FOREACH":35,"DOLLAR":36,"ID":37,"IN":38,"array":39,"BREAK":40,"INCLUDE":41,"params":42,"PARSE":43,"string":44,"EAVL":45,"DEFINE":46,"MACRO":47,"macro_args":48,"macro_call_args":49,"literal":50,"arguments":51,"EQUAL":52,"map":53,"math":54,"||":55,"&&":56,"+":57,"-":58,"*":59,"/":60,">":61,"<":62,"==":63,"!":64,"VAR_BEGIN":65,"attributes":66,"VAR_END":67,"attribute":68,"method":69,"index":70,"property":71,"DOT":72,"literals":73,"COMMA":74,"CONTENT":75,"BRACKET":76,"CLOSE_BRACKET":77,"integer":78,"INTEGER":79,"STRING":80,"EVAL_STRING":81,"RANGE":82,"MAP_BEGIN":83,"map_item":84,"MAP_END":85,"MAP_SPLIT":86,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"COMMENT",25:"HASH",26:"SET",27:"PARENTHESIS",29:"CLOSE_PARENTHESIS",30:"IF",32:"ELSEIF",33:"ELSE",34:"END",35:"FOREACH",36:"DOLLAR",37:"ID",38:"IN",40:"BREAK",41:"INCLUDE",43:"PARSE",45:"EAVL",46:"DEFINE",47:"MACRO",52:"EQUAL",55:"||",56:"&&",57:"+",58:"-",59:"*",60:"/",61:">",62:"<",63:"==",64:"!",65:"VAR_BEGIN",67:"VAR_END",72:"DOT",74:"COMMA",75:"CONTENT",76:"BRACKET",77:"CLOSE_BRACKET",79:"INTEGER",80:"STRING",81:"EVAL_STRING",82:"RANGE",83:"MAP_BEGIN",85:"MAP_END",86:"MAP_SPLIT"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[7,1],[7,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[12,5],[13,5],[14,5],[15,2],[16,2],[17,8],[17,8],[18,2],[19,5],[20,5],[21,6],[22,6],[23,6],[23,5],[48,1],[48,2],[24,5],[24,4],[49,1],[49,1],[49,1],[49,2],[49,2],[51,2],[51,3],[28,3],[31,1],[31,1],[31,1],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,3],[54,2],[54,2],[54,1],[54,1],[8,5],[8,3],[8,2],[8,4],[66,1],[66,2],[68,1],[68,1],[68,1],[69,5],[69,4],[42,1],[42,1],[42,3],[42,3],[71,2],[71,2],[70,3],[70,3],[70,3],[70,2],[70,2],[50,1],[50,1],[78,1],[78,2],[44,1],[44,1],[73,1],[73,1],[73,1],[39,3],[39,5],[39,2],[53,3],[84,3],[84,3],[84,5],[84,5],[10,1],[10,1],[10,2],[10,3],[10,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = $$[$0]; 
break;
case 3: this.$ = [$$[$0]]; 
break;
case 4: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 5: this.$ = $$[$0]; 
break;
case 6: this.$ = $$[$0]; 
break;
case 7: this.$ = $$[$0]; 
break;
case 8: this.$ = {type: 'comment', value: $$[$0]}; 
break;
case 9: this.$ = $$[$0]; 
break;
case 10: this.$ = $$[$0]; 
break;
case 11: this.$ = $$[$0]; 
break;
case 12: this.$ = $$[$0]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0]; 
break;
case 15: this.$ = $$[$0]; 
break;
case 16: this.$ = $$[$0]; 
break;
case 17: this.$ = $$[$0]; 
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0]; 
break;
case 20: this.$ = $$[$0]; 
break;
case 21: this.$ = $$[$0]; 
break;
case 22: this.$ = {type: $$[$0-3], equal: $$[$0-1]}; 
break;
case 23: this.$ = {type: $$[$0-3], condition: $$[$0-1]}; 
break;
case 24: this.$ = {type: 'elseif', condition: $$[$0-1]}; 
break;
case 25: this.$ = {type: 'else'}; 
break;
case 26: this.$ = {type: 'end'}; 
break;
case 27: this.$ = {type: 'foreach', to: $$[$0-3], from: $$[$0-1]}; 
break;
case 28: this.$ = {type: 'foreach', to: $$[$0-3], from: $$[$0-1]}; 
break;
case 29: this.$ = {type: $$[$0]}; 
break;
case 30: this.$ = {type: 'include', args: $$[$0-1]}; 
break;
case 31: this.$ = {type: 'parse', id: $$[$0-1]}; 
break;
case 32: this.$ = {type: 'evaluate', id: $$[$0-1]}; 
break;
case 33: this.$ = {type: 'define', id: $$[$0-1]}; 
break;
case 34: this.$ = {type: 'macro', id: $$[$0-2], args: $$[$0-1]}; 
break;
case 35: this.$ = {type: 'macro', id: $$[$0-1]}; 
break;
case 36: this.$ = [$$[$0]]; 
break;
case 37: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 38: this.$ = {type:"macro_call", id: $$[$0-3], args: $$[$0-1]}; 
break;
case 39: this.$ = {type:"macro_call", id: $$[$0-2]}; 
break;
case 40: this.$ = [$$[$0]]; 
break;
case 41: this.$ = [$$[$0]]; 
break;
case 42: this.$ = [$$[$0]]; 
break;
case 43: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 44: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 45: this.$ = $$[$0]; 
break;
case 46: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 47: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 48: this.$ = $$[$0]; 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 52: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 53: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 54: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 55: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 56: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 57: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 58: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 59: this.$ = {type: 'math', expression: [$$[$0-2], $$[$0]], operator: $$[$0-1]}; 
break;
case 60: this.$ = {type: 'math', expression: [$$[$0-1]], operator: 'parenthesis'}; 
break;
case 61: this.$ = {type: 'math', expression: [$$[$0]], operator: 'not'}; 
break;
case 62: this.$ = {type: 'math', expression: [$$[$0]], operator: 'minus'}; 
break;
case 63: this.$ = $$[$0]; 
break;
case 64: this.$ = $$[$0]; 
break;
case 65: this.$ = {type: "references", id: $$[$0-2], path: $$[$0-1], isWraped: true, leader: $$[$0-4]}; 
break;
case 66: this.$ = {type: "references", id: $$[$0-1], path: $$[$0], leader: $$[$0-2]}; 
break;
case 67: this.$ = {type: "references", id: $$[$0], leader: $$[$0-1]}; 
break;
case 68: this.$ = {type: "references", id: $$[$0-1], isWraped: true, leader: $$[$0-3]}; 
break;
case 69: this.$ = [$$[$0]]; 
break;
case 70: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 71: this.$ = {type:"method", id: $$[$0].id, args: $$[$0].args}; 
break;
case 72: this.$ = {type: "index", id: $$[$0]}; 
break;
case 73: this.$ = {type: "property", id: $$[$0]}; 
break;
case 74: this.$ = {id: $$[$0-3], args: $$[$0-1]}; 
break;
case 75: this.$ = {id: $$[$0-2], args: false}; 
break;
case 76: this.$ = [$$[$0]]; 
break;
case 77: this.$ = [$$[$0]]; 
break;
case 78: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 79: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 80: this.$ = $$[$0]; 
break;
case 81: this.$ = '<<<' + $$[$0-1] + $$[$0]; 
break;
case 82: this.$ = $$[$0-1]; 
break;
case 83: this.$ = $$[$0-1]; 
break;
case 84: this.$ = "<<<" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 85: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 86: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 87: this.$ = $$[$0]; 
break;
case 88: this.$ = {type: 'integer', value: $$[$0]}; 
break;
case 89: this.$ = $$[$0]; 
break;
case 90: this.$ = - parseInt($$[$0], 10); 
break;
case 91: this.$ = {type: 'string', value: $$[$0]}; 
break;
case 92: this.$ = {type: 'string', value: $$[$0], isEval: true}; 
break;
case 93: this.$ = $$[$0];
break;
case 94: this.$ = $$[$0];
break;
case 95: this.$ = $$[$0]; 
break;
case 96: this.$ = {type: 'array', value: $$[$0-1]}; 
break;
case 97: this.$ = {type: 'array', isRange: true, value: [$$[$0-3], $$[$0-1]]}; 
break;
case 98: this.$ = {type: 'array', value: []}; 
break;
case 99: this.$ = {type: 'map', value: $$[$0-1]}; 
break;
case 100: this.$ = {}; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 101: this.$ = {}; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 102: this.$ = $$[$0-4]; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 103: this.$ = $$[$0-4]; this.$[$$[$0-2].value] = $$[$0]; 
break;
case 104: this.$ = $$[$0]; 
break;
case 105: this.$ = $$[$0]; 
break;
case 106: this.$ = $$[$0-1] + $$[$0]; 
break;
case 107: this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 108: this.$ = $$[$0-2] + $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:21,24:22,25:[1,25],36:[1,9],37:[1,24],75:[1,23]},{1:[3]},{5:[1,26]},{5:[2,2],7:27,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:21,24:22,25:[1,25],36:[1,9],37:[1,24],75:[1,23]},{5:[2,3],11:[2,3],25:[2,3],36:[2,3],37:[2,3],75:[2,3]},{5:[2,5],11:[2,5],25:[2,5],36:[2,5],37:[2,5],75:[2,5]},{5:[2,6],11:[2,6],25:[2,6],36:[2,6],37:[2,6],75:[2,6]},{5:[2,7],11:[2,7],25:[2,7],36:[2,7],37:[2,7],75:[2,7]},{5:[2,8],11:[2,8],25:[2,8],36:[2,8],37:[2,8],75:[2,8]},{37:[1,29],65:[1,28]},{5:[2,9],11:[2,9],25:[2,9],36:[2,9],37:[2,9],75:[2,9]},{5:[2,10],11:[2,10],25:[2,10],36:[2,10],37:[2,10],75:[2,10]},{5:[2,11],11:[2,11],25:[2,11],36:[2,11],37:[2,11],75:[2,11]},{5:[2,12],11:[2,12],25:[2,12],36:[2,12],37:[2,12],75:[2,12]},{5:[2,13],11:[2,13],25:[2,13],36:[2,13],37:[2,13],75:[2,13]},{5:[2,14],11:[2,14],25:[2,14],36:[2,14],37:[2,14],75:[2,14]},{5:[2,15],11:[2,15],25:[2,15],36:[2,15],37:[2,15],75:[2,15]},{5:[2,16],11:[2,16],25:[2,16],36:[2,16],37:[2,16],75:[2,16]},{5:[2,17],11:[2,17],25:[2,17],36:[2,17],37:[2,17],75:[2,17]},{5:[2,18],11:[2,18],25:[2,18],36:[2,18],37:[2,18],75:[2,18]},{5:[2,19],11:[2,19],25:[2,19],36:[2,19],37:[2,19],75:[2,19]},{5:[2,20],11:[2,20],25:[2,20],36:[2,20],37:[2,20],75:[2,20]},{5:[2,21],11:[2,21],25:[2,21],36:[2,21],37:[2,21],75:[2,21]},{5:[2,104],11:[2,104],25:[2,104],36:[2,104],37:[2,104],75:[2,104]},{5:[2,105],11:[2,105],25:[2,105],36:[2,105],37:[2,105],75:[2,105]},{26:[1,32],30:[1,33],32:[1,34],33:[1,35],34:[1,36],35:[1,37],37:[1,31],40:[1,38],41:[1,39],43:[1,40],45:[1,41],46:[1,42],47:[1,43],75:[1,30]},{1:[2,1]},{5:[2,4],11:[2,4],25:[2,4],36:[2,4],37:[2,4],75:[2,4]},{37:[1,44]},{5:[2,67],11:[2,67],25:[2,67],29:[2,67],36:[2,67],37:[2,67],52:[2,67],55:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],60:[2,67],61:[2,67],62:[2,67],63:[2,67],66:45,68:46,69:47,70:48,71:49,72:[1,50],74:[2,67],75:[2,67],76:[1,51],77:[2,67],79:[2,67],80:[2,67],81:[2,67],85:[2,67]},{5:[2,106],11:[2,106],25:[2,106],36:[2,106],37:[2,106],75:[2,106]},{5:[1,53],27:[1,54],75:[1,52]},{27:[1,55]},{27:[1,56]},{27:[1,57]},{5:[2,25],11:[2,25],25:[2,25],36:[2,25],37:[2,25],75:[2,25]},{5:[2,26],11:[2,26],25:[2,26],36:[2,26],37:[2,26],75:[2,26]},{27:[1,58]},{5:[2,29],11:[2,29],25:[2,29],36:[2,29],37:[2,29],75:[2,29]},{27:[1,59]},{27:[1,60]},{27:[1,61]},{27:[1,62]},{27:[1,63]},{66:64,67:[1,65],68:46,69:47,70:48,71:49,72:[1,50],76:[1,51]},{5:[2,66],11:[2,66],25:[2,66],29:[2,66],36:[2,66],37:[2,66],52:[2,66],55:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],60:[2,66],61:[2,66],62:[2,66],63:[2,66],68:66,69:47,70:48,71:49,72:[1,50],74:[2,66],75:[2,66],76:[1,51],77:[2,66],79:[2,66],80:[2,66],81:[2,66],85:[2,66]},{5:[2,69],11:[2,69],25:[2,69],29:[2,69],36:[2,69],37:[2,69],52:[2,69],55:[2,69],56:[2,69],57:[2,69],58:[2,69],59:[2,69],60:[2,69],61:[2,69],62:[2,69],63:[2,69],67:[2,69],72:[2,69],74:[2,69],75:[2,69],76:[2,69],77:[2,69],79:[2,69],80:[2,69],81:[2,69],85:[2,69]},{5:[2,71],11:[2,71],25:[2,71],29:[2,71],36:[2,71],37:[2,71],52:[2,71],55:[2,71],56:[2,71],57:[2,71],58:[2,71],59:[2,71],60:[2,71],61:[2,71],62:[2,71],63:[2,71],67:[2,71],72:[2,71],74:[2,71],75:[2,71],76:[2,71],77:[2,71],79:[2,71],80:[2,71],81:[2,71],85:[2,71]},{5:[2,72],11:[2,72],25:[2,72],29:[2,72],36:[2,72],37:[2,72],52:[2,72],55:[2,72],56:[2,72],57:[2,72],58:[2,72],59:[2,72],60:[2,72],61:[2,72],62:[2,72],63:[2,72],67:[2,72],72:[2,72],74:[2,72],75:[2,72],76:[2,72],77:[2,72],79:[2,72],80:[2,72],81:[2,72],85:[2,72]},{5:[2,73],11:[2,73],25:[2,73],29:[2,73],36:[2,73],37:[2,73],52:[2,73],55:[2,73],56:[2,73],57:[2,73],58:[2,73],59:[2,73],60:[2,73],61:[2,73],62:[2,73],63:[2,73],67:[2,73],72:[2,73],74:[2,73],75:[2,73],76:[2,73],77:[2,73],79:[2,73],80:[2,73],81:[2,73],85:[2,73]},{37:[1,67],75:[1,68]},{8:70,36:[1,9],44:73,50:69,58:[1,78],75:[1,71],77:[1,72],78:74,79:[1,77],80:[1,75],81:[1,76]},{5:[2,107],11:[2,107],25:[2,107],36:[2,107],37:[2,107],75:[2,107]},{5:[2,108],11:[2,108],25:[2,108],36:[2,108],37:[2,108],75:[2,108]},{8:83,29:[1,80],36:[1,9],39:82,44:73,49:79,50:81,58:[1,78],76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:86,28:85,36:[1,9]},{8:95,27:[1,92],31:87,36:[1,9],39:88,44:73,50:96,53:89,54:90,58:[1,94],64:[1,93],76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{8:95,27:[1,92],31:97,36:[1,9],39:88,44:73,50:96,53:89,54:90,58:[1,94],64:[1,93],76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{36:[1,98]},{8:101,36:[1,9],39:102,42:99,44:73,50:104,53:103,58:[1,78],73:100,76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{44:105,80:[1,75],81:[1,76]},{36:[1,106]},{36:[1,107]},{37:[1,108]},{67:[1,109],68:66,69:47,70:48,71:49,72:[1,50],76:[1,51]},{5:[2,68],11:[2,68],25:[2,68],29:[2,68],36:[2,68],37:[2,68],52:[2,68],55:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],60:[2,68],61:[2,68],62:[2,68],63:[2,68],74:[2,68],75:[2,68],77:[2,68],79:[2,68],80:[2,68],81:[2,68],85:[2,68]},{5:[2,70],11:[2,70],25:[2,70],29:[2,70],36:[2,70],37:[2,70],52:[2,70],55:[2,70],56:[2,70],57:[2,70],58:[2,70],59:[2,70],60:[2,70],61:[2,70],62:[2,70],63:[2,70],67:[2,70],72:[2,70],74:[2,70],75:[2,70],76:[2,70],77:[2,70],79:[2,70],80:[2,70],81:[2,70],85:[2,70]},{5:[2,80],11:[2,80],25:[2,80],27:[1,110],29:[2,80],36:[2,80],37:[2,80],52:[2,80],55:[2,80],56:[2,80],57:[2,80],58:[2,80],59:[2,80],60:[2,80],61:[2,80],62:[2,80],63:[2,80],67:[2,80],72:[2,80],74:[2,80],75:[2,80],76:[2,80],77:[2,80],79:[2,80],80:[2,80],81:[2,80],85:[2,80]},{5:[2,81],11:[2,81],25:[2,81],29:[2,81],36:[2,81],37:[2,81],52:[2,81],55:[2,81],56:[2,81],57:[2,81],58:[2,81],59:[2,81],60:[2,81],61:[2,81],62:[2,81],63:[2,81],67:[2,81],72:[2,81],74:[2,81],75:[2,81],76:[2,81],77:[2,81],79:[2,81],80:[2,81],81:[2,81],85:[2,81]},{75:[1,112],77:[1,111]},{77:[1,113]},{5:[2,85],11:[2,85],25:[2,85],29:[2,85],36:[2,85],37:[2,85],52:[2,85],55:[2,85],56:[2,85],57:[2,85],58:[2,85],59:[2,85],60:[2,85],61:[2,85],62:[2,85],63:[2,85],67:[2,85],72:[2,85],74:[2,85],75:[2,85],76:[2,85],77:[2,85],79:[2,85],80:[2,85],81:[2,85],85:[2,85]},{5:[2,86],11:[2,86],25:[2,86],29:[2,86],36:[2,86],37:[2,86],52:[2,86],55:[2,86],56:[2,86],57:[2,86],58:[2,86],59:[2,86],60:[2,86],61:[2,86],62:[2,86],63:[2,86],67:[2,86],72:[2,86],74:[2,86],75:[2,86],76:[2,86],77:[2,86],79:[2,86],80:[2,86],81:[2,86],85:[2,86]},{29:[2,87],36:[2,87],55:[2,87],56:[2,87],57:[2,87],58:[2,87],59:[2,87],60:[2,87],61:[2,87],62:[2,87],63:[2,87],74:[2,87],75:[2,87],77:[2,87],79:[2,87],80:[2,87],81:[2,87],85:[2,87]},{29:[2,88],36:[2,88],55:[2,88],56:[2,88],57:[2,88],58:[2,88],59:[2,88],60:[2,88],61:[2,88],62:[2,88],63:[2,88],74:[2,88],75:[2,88],77:[2,88],79:[2,88],80:[2,88],81:[2,88],85:[2,88]},{29:[2,91],36:[2,91],55:[2,91],56:[2,91],57:[2,91],58:[2,91],59:[2,91],60:[2,91],61:[2,91],62:[2,91],63:[2,91],74:[2,91],75:[2,91],77:[2,91],79:[2,91],80:[2,91],81:[2,91],85:[2,91],86:[2,91]},{29:[2,92],36:[2,92],55:[2,92],56:[2,92],57:[2,92],58:[2,92],59:[2,92],60:[2,92],61:[2,92],62:[2,92],63:[2,92],74:[2,92],75:[2,92],77:[2,92],79:[2,92],80:[2,92],81:[2,92],85:[2,92],86:[2,92]},{29:[2,89],36:[2,89],55:[2,89],56:[2,89],57:[2,89],58:[2,89],59:[2,89],60:[2,89],61:[2,89],62:[2,89],63:[2,89],74:[2,89],75:[2,89],77:[2,89],79:[2,89],80:[2,89],81:[2,89],82:[2,89],85:[2,89]},{79:[1,114]},{8:117,29:[1,115],36:[1,9],44:73,50:116,58:[1,78],78:74,79:[1,77],80:[1,75],81:[1,76]},{5:[2,39],11:[2,39],25:[2,39],36:[2,39],37:[2,39],75:[2,39]},{29:[2,40],36:[2,40],58:[2,40],79:[2,40],80:[2,40],81:[2,40]},{29:[2,41],36:[2,41],58:[2,41],79:[2,41],80:[2,41],81:[2,41]},{29:[2,42],36:[2,42],58:[2,42],79:[2,42],80:[2,42],81:[2,42]},{8:101,36:[1,9],39:102,42:118,44:73,50:104,53:103,58:[1,78],73:100,76:[1,84],77:[1,120],78:119,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{29:[1,121]},{52:[1,122]},{29:[1,123]},{29:[2,48]},{29:[2,49]},{29:[2,50],55:[1,124],56:[1,125],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[1,130],62:[1,131],63:[1,132]},{44:134,80:[1,75],81:[1,76],84:133},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:135,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:136,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:137,36:[1,9],79:[1,114]},{29:[2,63],55:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],60:[2,63],61:[2,63],62:[2,63],63:[2,63]},{29:[2,64],55:[2,64],56:[2,64],57:[2,64],58:[2,64],59:[2,64],60:[2,64],61:[2,64],62:[2,64],63:[2,64]},{29:[1,138]},{37:[1,139]},{29:[1,140],74:[1,141]},{29:[2,76],74:[2,76],77:[2,76]},{29:[2,77],74:[2,77],77:[2,77]},{29:[2,93],74:[2,93],77:[2,93]},{29:[2,94],74:[2,94],77:[2,94]},{29:[2,95],74:[2,95],77:[2,95]},{29:[1,142]},{37:[1,143]},{37:[1,144]},{8:147,29:[1,146],36:[1,9],48:145},{5:[2,65],11:[2,65],25:[2,65],29:[2,65],36:[2,65],37:[2,65],52:[2,65],55:[2,65],56:[2,65],57:[2,65],58:[2,65],59:[2,65],60:[2,65],61:[2,65],62:[2,65],63:[2,65],74:[2,65],75:[2,65],77:[2,65],79:[2,65],80:[2,65],81:[2,65],85:[2,65]},{8:101,29:[1,149],36:[1,9],39:102,42:148,44:73,50:104,53:103,58:[1,78],73:100,76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{5:[2,82],11:[2,82],25:[2,82],29:[2,82],36:[2,82],37:[2,82],52:[2,82],55:[2,82],56:[2,82],57:[2,82],58:[2,82],59:[2,82],60:[2,82],61:[2,82],62:[2,82],63:[2,82],67:[2,82],72:[2,82],74:[2,82],75:[2,82],76:[2,82],77:[2,82],79:[2,82],80:[2,82],81:[2,82],85:[2,82]},{5:[2,84],11:[2,84],25:[2,84],29:[2,84],36:[2,84],37:[2,84],52:[2,84],55:[2,84],56:[2,84],57:[2,84],58:[2,84],59:[2,84],60:[2,84],61:[2,84],62:[2,84],63:[2,84],67:[2,84],72:[2,84],74:[2,84],75:[2,84],76:[2,84],77:[2,84],79:[2,84],80:[2,84],81:[2,84],85:[2,84]},{5:[2,83],11:[2,83],25:[2,83],29:[2,83],36:[2,83],37:[2,83],52:[2,83],55:[2,83],56:[2,83],57:[2,83],58:[2,83],59:[2,83],60:[2,83],61:[2,83],62:[2,83],63:[2,83],67:[2,83],72:[2,83],74:[2,83],75:[2,83],76:[2,83],77:[2,83],79:[2,83],80:[2,83],81:[2,83],85:[2,83]},{29:[2,90],36:[2,90],55:[2,90],56:[2,90],57:[2,90],58:[2,90],59:[2,90],60:[2,90],61:[2,90],62:[2,90],63:[2,90],74:[2,90],75:[2,90],77:[2,90],79:[2,90],80:[2,90],81:[2,90],82:[2,90],85:[2,90]},{5:[2,38],11:[2,38],25:[2,38],36:[2,38],37:[2,38],75:[2,38]},{29:[2,43],36:[2,43],58:[2,43],79:[2,43],80:[2,43],81:[2,43]},{29:[2,44],36:[2,44],58:[2,44],79:[2,44],80:[2,44],81:[2,44]},{74:[1,141],77:[1,150]},{74:[2,88],77:[2,88],82:[1,151]},{29:[2,98],36:[2,98],58:[2,98],74:[2,98],77:[2,98],79:[2,98],80:[2,98],81:[2,98]},{5:[2,22],11:[2,22],25:[2,22],36:[2,22],37:[2,22],75:[2,22]},{8:95,27:[1,92],31:152,36:[1,9],39:88,44:73,50:96,53:89,54:90,58:[1,94],64:[1,93],76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{5:[2,23],11:[2,23],25:[2,23],36:[2,23],37:[2,23],75:[2,23]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:153,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:154,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:155,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:156,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:157,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:158,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:159,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:160,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{8:95,27:[1,92],36:[1,9],44:73,50:96,54:161,58:[1,94],64:[1,93],78:74,79:[1,77],80:[1,75],81:[1,76]},{74:[1,163],85:[1,162]},{86:[1,164]},{29:[1,165],55:[1,124],56:[1,125],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[1,130],62:[1,131],63:[1,132]},{29:[2,61],55:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],60:[2,61],61:[2,61],62:[2,61],63:[2,61]},{29:[2,62],55:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],60:[2,62],61:[2,62],62:[2,62],63:[2,62]},{5:[2,24],11:[2,24],25:[2,24],36:[2,24],37:[2,24],75:[2,24]},{38:[1,166]},{5:[2,30],11:[2,30],25:[2,30],36:[2,30],37:[2,30],75:[2,30]},{8:168,36:[1,9],39:102,44:73,50:104,53:103,58:[1,78],73:167,76:[1,84],78:74,79:[1,77],80:[1,75],81:[1,76],83:[1,91]},{5:[2,31],11:[2,31],25:[2,31],36:[2,31],37:[2,31],75:[2,31]},{29:[1,169]},{29:[1,170]},{8:172,29:[1,171],36:[1,9]},{5:[2,35],11:[2,35],25:[2,35],36:[2,35],37:[2,35],75:[2,35]},{29:[2,36],36:[2,36]},{29:[1,173],74:[1,141]},{5:[2,75],11:[2,75],25:[2,75],29:[2,75],36:[2,75],37:[2,75],52:[2,75],55:[2,75],56:[2,75],57:[2,75],58:[2,75],59:[2,75],60:[2,75],61:[2,75],62:[2,75],63:[2,75],67:[2,75],72:[2,75],74:[2,75],75:[2,75],76:[2,75],77:[2,75],79:[2,75],80:[2,75],81:[2,75],85:[2,75]},{29:[2,96],36:[2,96],58:[2,96],74:[2,96],77:[2,96],79:[2,96],80:[2,96],81:[2,96]},{58:[1,78],78:174,79:[1,77]},{29:[2,47]},{29:[2,51],55:[2,51],56:[2,51],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[1,130],62:[1,131],63:[1,132]},{29:[2,52],55:[2,52],56:[2,52],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[1,130],62:[1,131],63:[1,132]},{29:[2,53],55:[2,53],56:[2,53],57:[2,53],58:[2,53],59:[1,128],60:[1,129],61:[2,53],62:[2,53],63:[2,53]},{29:[2,54],55:[2,54],56:[2,54],57:[2,54],58:[2,54],59:[1,128],60:[1,129],61:[2,54],62:[2,54],63:[2,54]},{29:[2,55],55:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],60:[2,55],61:[2,55],62:[2,55],63:[2,55]},{29:[2,56],55:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],60:[2,56],61:[2,56],62:[2,56],63:[2,56]},{29:[2,57],55:[2,57],56:[2,57],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[2,57],62:[2,57],63:[2,57]},{29:[2,58],55:[2,58],56:[2,58],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[2,58],62:[2,58],63:[2,58]},{29:[2,59],55:[2,59],56:[2,59],57:[1,126],58:[1,127],59:[1,128],60:[1,129],61:[2,59],62:[2,59],63:[2,59]},{29:[2,99],74:[2,99],77:[2,99]},{44:175,80:[1,75],81:[1,76]},{8:177,36:[1,9],44:73,50:176,58:[1,78],78:74,79:[1,77],80:[1,75],81:[1,76]},{29:[2,60],55:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],60:[2,60],61:[2,60],62:[2,60],63:[2,60]},{8:178,36:[1,9],39:179,76:[1,84]},{29:[2,78],74:[2,78],77:[2,78]},{29:[2,79],74:[2,79],77:[2,79]},{5:[2,32],11:[2,32],25:[2,32],36:[2,32],37:[2,32],75:[2,32]},{5:[2,33],11:[2,33],25:[2,33],36:[2,33],37:[2,33],75:[2,33]},{5:[2,34],11:[2,34],25:[2,34],36:[2,34],37:[2,34],75:[2,34]},{29:[2,37],36:[2,37]},{5:[2,74],11:[2,74],25:[2,74],29:[2,74],36:[2,74],37:[2,74],52:[2,74],55:[2,74],56:[2,74],57:[2,74],58:[2,74],59:[2,74],60:[2,74],61:[2,74],62:[2,74],63:[2,74],67:[2,74],72:[2,74],74:[2,74],75:[2,74],76:[2,74],77:[2,74],79:[2,74],80:[2,74],81:[2,74],85:[2,74]},{77:[1,180]},{86:[1,181]},{74:[2,100],85:[2,100]},{74:[2,101],85:[2,101]},{29:[1,182]},{29:[1,183]},{29:[2,97],36:[2,97],58:[2,97],74:[2,97],77:[2,97],79:[2,97],80:[2,97],81:[2,97]},{8:184,36:[1,9],44:73,50:185,58:[1,78],78:74,79:[1,77],80:[1,75],81:[1,76]},{5:[2,27],11:[2,27],25:[2,27],36:[2,27],37:[2,27],75:[2,27]},{5:[2,28],11:[2,28],25:[2,28],36:[2,28],37:[2,28],75:[2,28]},{74:[2,102],85:[2,102]},{74:[2,103],85:[2,103]}],
defaultActions: {26:[2,1],88:[2,48],89:[2,49],152:[2,47]},
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
case 0:
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    /*转义实现，非常恶心，暂时没有好的解决方案*/
                                    if (!_num || !(_num % 2)) {
                                      this.begin("mu");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 75; 
                                  
break;
case 1: 
                                    var _reg = /\\+$/;
                                    var _esc = yy_.yytext.match(_reg);
                                    var _num = _esc ? _esc[0].length: null;
                                    if (!_num || !(_num % 2)) {
                                      this.begin("h");
                                    } else {
                                      yy_.yytext = yy_.yytext.replace(/\\$/, '');
                                      this.begin('esc');
                                    }
                                    if (_num > 1) yy_.yytext = yy_.yytext.replace(/(\\\\)+$/, '\\');
                                    if(yy_.yytext) return 75; 
                                  
break;
case 2: return 75; 
break;
case 3: this.popState(); return 11; 
break;
case 4: this.popState(); return 11; 
break;
case 5: return 25; 
break;
case 6: return 26; 
break;
case 7: return 30; 
break;
case 8: return 32; 
break;
case 9: this.popState(); return 33; 
break;
case 10: this.popState(); return 33; 
break;
case 11: this.popState(); return 34; 
break;
case 12: this.popState(); return 40; 
break;
case 13: return 35; 
break;
case 14: return 41; 
break;
case 15: return 43; 
break;
case 16: return 'EVAL'; 
break;
case 17: return 46; 
break;
case 18: return 47; 
break;
case 19: return 38; 
break;
case 20: return yy_.yytext; 
break;
case 21: return yy_.yytext; 
break;
case 22: return yy_.yytext; 
break;
case 23: return yy_.yytext; 
break;
case 24: return yy_.yytext; 
break;
case 25: return 36; 
break;
case 26: return 36; 
break;
case 27: return yy_.yytext; 
break;
case 28: return 52; 
break;
case 29: /*ignore whitespace*/ 
break;
case 30: return 83; 
break;
case 31: return 85; 
break;
case 32: return 86; 
break;
case 33: return 65; 
break;
case 34: this.popState(); return 67; 
break;
case 35: this.begin("c"); return 27; 
break;
case 36: 
                                    if (this.popState() === "c") {
                                      var len = this.conditionStack.length;
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && this.conditionStack[1] === "h"){
                                        this.popState();
                                      }
                                      return 29; 
                                    } else {
                                      return 'CONTENT'; 
                                    }
                                  
break;
case 37: this.begin("i"); return 76; 
break;
case 38: 
                                    if (this.popState() === "i") {
                                      return 77; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  
break;
case 39: return 82; 
break;
case 40: return 72; 
break;
case 41: return 74; 
break;
case 42: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\"/g,'"'); return 81; 
break;
case 43: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\'/g,"'"); return 80; 
break;
case 44: return 79; 
break;
case 45: return 37; 
break;
case 46: this.begin('h'); return 25; 
break;
case 47: this.popState(); return 75; 
break;
case 48: this.popState(); return 75; 
break;
case 49: this.popState(); return 75; 
break;
case 50: this.popState(); return 5; 
break;
case 51: return 5; 
break;
}
};
lexer.rules = [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#\*[\s\S]+?\*#)/,/^(?:##[^\n]+(?=\n))/,/^(?:#(?=[^\s]))/,/^(?:set[ ]*)/,/^(?:if[ ]*)/,/^(?:elseif[ ]*)/,/^(?:else\b)/,/^(?:\{else\})/,/^(?:end\b)/,/^(?:break\b)/,/^(?:foreach[ ]*)/,/^(?:include[ ]*)/,/^(?:parse[ ]*)/,/^(?:evaluate\b)/,/^(?:define[ ]*)/,/^(?:macro[ ]*)/,/^(?:in\b)/,/^(?:[\+\-\*/])/,/^(?:[><])/,/^(?:==)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:\$!)/,/^(?:\$)/,/^(?:!)/,/^(?:=)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?::)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:'(\\'|[^\'])*')/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:#)/,/^(?:.)/,/^(?:\s+)/,/^(?:[\$#])/,/^(?:$)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[25,26,33,34,35,36,37,38,40,41,45,46,47,48,50],"inclusive":false},"c":{"rules":[19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,40,41,42,43,44,45],"inclusive":false},"i":{"rules":[19,20,21,22,23,24,25,26,27,28,29,35,36,37,38,39,40,41,42,43,44,45],"inclusive":false},"h":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,26,27,28,30,31,32,35,36,37,38,40,41,44,45,47,48,50],"inclusive":false},"esc":{"rules":[49],"inclusive":false},"INITIAL":{"rules":[0,1,2,51],"inclusive":true}};
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
}    return velocity;  });  