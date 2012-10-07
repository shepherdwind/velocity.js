/* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"directives":9,"content":10,"COMMENT":11,"set":12,"if":13,"elseif":14,"else":15,"end":16,"foreach":17,"break":18,"include":19,"parse":20,"evaluate":21,"define":22,"macro":23,"macro_call":24,"HASH":25,"SET":26,"PARENTHESIS":27,"equal":28,"CLOSE_PARENTHESIS":29,"IF":30,"expression":31,"ELSEIF":32,"ELSE":33,"END":34,"FOREACH":35,"DOLLAR":36,"ID":37,"IN":38,"array":39,"BREAK":40,"INCLUDE":41,"params":42,"PARSE":43,"string":44,"EAVL":45,"DEFINE":46,"MACRO":47,"macro_args":48,"arguments":49,"EQUAL":50,"map":51,"math":52,"||":53,"&&":54,">":55,"<":56,"==":57,"+":58,"-":59,"*":60,"/":61,"!":62,"literal":63,"VAR_BEGIN":64,"attributes":65,"VAR_END":66,"attribute":67,"method":68,"index":69,"property":70,"DOT":71,"literals":72,"COMMA":73,"CONTENT":74,"BRACKET":75,"CLOSE_BRACKET":76,"INTEGER":77,"STRING":78,"EVAL_STRING":79,"RANGE":80,"MAP_BEGIN":81,"map_item":82,"MAP_END":83,"MAP_SPLIT":84,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"COMMENT",25:"HASH",26:"SET",27:"PARENTHESIS",29:"CLOSE_PARENTHESIS",30:"IF",32:"ELSEIF",33:"ELSE",34:"END",35:"FOREACH",36:"DOLLAR",37:"ID",38:"IN",40:"BREAK",41:"INCLUDE",43:"PARSE",45:"EAVL",46:"DEFINE",47:"MACRO",50:"EQUAL",53:"||",54:"&&",55:">",56:"<",57:"==",58:"+",59:"-",60:"*",61:"/",62:"!",64:"VAR_BEGIN",66:"VAR_END",71:"DOT",73:"COMMA",74:"CONTENT",75:"BRACKET",76:"CLOSE_BRACKET",77:"INTEGER",78:"STRING",79:"EVAL_STRING",80:"RANGE",81:"MAP_BEGIN",83:"MAP_END",84:"MAP_SPLIT"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[7,1],[7,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[12,5],[13,5],[14,5],[15,2],[16,2],[17,8],[17,8],[18,2],[19,5],[20,5],[21,6],[22,6],[23,6],[23,5],[48,1],[48,2],[24,5],[24,4],[49,2],[49,3],[28,3],[31,1],[31,1],[31,1],[52,3],[52,3],[52,3],[52,3],[52,3],[52,3],[52,3],[52,3],[52,3],[52,3],[52,2],[52,2],[52,1],[52,1],[8,5],[8,3],[8,2],[8,4],[65,1],[65,2],[67,1],[67,1],[67,1],[68,5],[68,4],[42,1],[42,1],[42,3],[42,3],[70,2],[70,2],[69,3],[69,3],[69,3],[69,2],[69,2],[63,1],[63,1],[44,1],[44,1],[72,1],[72,1],[72,1],[39,3],[39,5],[39,2],[51,3],[82,3],[82,3],[82,5],[82,5],[10,1],[10,1],[10,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: console.log(JSON.stringify($$[$0-1])); return $$[$0-1]; 
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
case 24: this.$ = {type: $$[$0-3], condition: $$[$0-1]}; 
break;
case 25: this.$ = {type: 'else'}; 
break;
case 26: this.$ = {type: 'end'}; 
break;
case 27: this.$ = {type: $$[$0-6], to: $$[$0-3], from: $$[$0-1]}; 
break;
case 28: this.$ = {type: $$[$0-6], to: $$[$0-3], from: $$[$0-1]}; 
break;
case 29: this.$ = {type: $$[$0]}; 
break;
case 30: this.$ = {type: $$[$0-3], args: $$[$0-1]}; 
break;
case 31: this.$ = {type: $$[$0-3], id: $$[$0-1]}; 
break;
case 32: this.$ = {type: $$[$0-4], id: $$[$0-1]}; 
break;
case 33: this.$ = {type: $$[$0-4], id: $$[$0-1]}; 
break;
case 34: this.$ = {type: $$[$0-4], id: $$[$0-2], args: $$[$0-1]}; 
break;
case 35: this.$ = {type: $$[$0-3], id: $$[$0-1]}; 
break;
case 36: this.$ = [$$[$0]]; 
break;
case 37: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 38: this.$ = {type:"macro_call", id: $$[$0-3], args: $$[$0-1]}; 
break;
case 39: this.$ = $$[$0-2]; 
break;
case 40: this.$ = $$[$0]; 
break;
case 41: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 42: this.$ = [$$[$0-2], $$[$0]]; 
break;
case 43: this.$ = $$[$0]; 
break;
case 44: this.$ = $$[$0]; 
break;
case 45: this.$ = $$[$0]; 
break;
case 46: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 47: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 48: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 49: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 50: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 51: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 52: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 53: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 54: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 55: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 56: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 57: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 58: this.$ = $$[$0]; 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = {type: "references", id: $$[$0-2], path: $$[$0-1], isWraped: true, leader: $$[$0-4]}; 
break;
case 61: this.$ = {type: "references", id: $$[$0-1], path: $$[$0], leader: $$[$0-2]}; 
break;
case 62: this.$ = {type: "references", id: $$[$0], leader: $$[$0-1]}; 
break;
case 63: this.$ = {type: "references", id: $$[$0-1], isWraped: true, leader: $$[$0-3]}; 
break;
case 64: this.$ = [$$[$0]]; 
break;
case 65: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 66: this.$ = {type:"method", id: $$[$0].id, args: $$[$0].args}; 
break;
case 67: this.$ = {type: "index", id: $$[$0]}; 
break;
case 68: this.$ = {type: "property", id: $$[$0]}; 
break;
case 69: this.$ = {id: $$[$0-3], args: $$[$0-1]}; 
break;
case 70: this.$ = {id: $$[$0-2], args: false}; 
break;
case 71: this.$ = [$$[$0]]; 
break;
case 72: this.$ = [$$[$0]]; 
break;
case 73: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 74: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 75: this.$ = $$[$0]; 
break;
case 76: this.$ = '<<<' + $$[$0-1] + $$[$0]; 
break;
case 77: this.$ = $$[$0-1]; 
break;
case 78: this.$ = $$[$0-1]; 
break;
case 79: this.$ = "<<<" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 80: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 81: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 82: this.$ = $$[$0]; 
break;
case 83: this.$ = {type: 'integer', value: $$[$0]}; 
break;
case 84: this.$ = {type: 'string', value: $$[$0]}; 
break;
case 85: this.$ = {type: 'string', value: $$[$0], isEval: true}; 
break;
case 86: this.$ = $$[$0];
break;
case 87: this.$ = $$[$0];
break;
case 88: this.$ = $$[$0]; 
break;
case 89: this.$ = {type: 'array', value: $$[$0-1]}; 
break;
case 90: this.$ = {type: 'array', isRange: true, value: [$$[$0-3], $$[$0-1]]}; 
break;
case 91: this.$ = {type: 'array', value: []}; 
break;
case 92: this.$ = {type: 'map', value: $$[$0-1]}; 
break;
case 93: this.$ = {}; this.$[$$[$0-2]] = $$[$0-2]; 
break;
case 94: this.$ = {}; this.$[$$[$0-2]] = $$[$0]; 
break;
case 95: this.$ = $$[$0-4]; this.$[$$[$0-2]] = $$[$0]; 
break;
case 96: this.$ = $$[$0-4]; this.$[$$[$0-2]] = $$[$0]; 
break;
case 97: this.$ = $$[$0]; 
break;
case 98: this.$ = $$[$0]; 
break;
case 99: this.$ = $$[$0-1]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:21,24:22,25:[1,25],36:[1,9],37:[1,24],74:[1,23]},{1:[3]},{5:[1,26]},{5:[2,2],7:27,8:5,9:6,10:7,11:[1,8],12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:20,23:21,24:22,25:[1,25],36:[1,9],37:[1,24],74:[1,23]},{5:[2,3],11:[2,3],25:[2,3],36:[2,3],37:[2,3],74:[2,3]},{5:[2,5],11:[2,5],25:[2,5],36:[2,5],37:[2,5],74:[2,5]},{5:[2,6],11:[2,6],25:[2,6],36:[2,6],37:[2,6],74:[2,6]},{5:[2,7],11:[2,7],25:[2,7],36:[2,7],37:[2,7],74:[2,7]},{5:[2,8],11:[2,8],25:[2,8],36:[2,8],37:[2,8],74:[2,8]},{37:[1,29],64:[1,28]},{5:[2,9],11:[2,9],25:[2,9],36:[2,9],37:[2,9],74:[2,9]},{5:[2,10],11:[2,10],25:[2,10],36:[2,10],37:[2,10],74:[2,10]},{5:[2,11],11:[2,11],25:[2,11],36:[2,11],37:[2,11],74:[2,11]},{5:[2,12],11:[2,12],25:[2,12],36:[2,12],37:[2,12],74:[2,12]},{5:[2,13],11:[2,13],25:[2,13],36:[2,13],37:[2,13],74:[2,13]},{5:[2,14],11:[2,14],25:[2,14],36:[2,14],37:[2,14],74:[2,14]},{5:[2,15],11:[2,15],25:[2,15],36:[2,15],37:[2,15],74:[2,15]},{5:[2,16],11:[2,16],25:[2,16],36:[2,16],37:[2,16],74:[2,16]},{5:[2,17],11:[2,17],25:[2,17],36:[2,17],37:[2,17],74:[2,17]},{5:[2,18],11:[2,18],25:[2,18],36:[2,18],37:[2,18],74:[2,18]},{5:[2,19],11:[2,19],25:[2,19],36:[2,19],37:[2,19],74:[2,19]},{5:[2,20],11:[2,20],25:[2,20],36:[2,20],37:[2,20],74:[2,20]},{5:[2,21],11:[2,21],25:[2,21],36:[2,21],37:[2,21],74:[2,21]},{5:[2,97],11:[2,97],25:[2,97],36:[2,97],37:[2,97],74:[2,97]},{5:[2,98],11:[2,98],25:[2,98],36:[2,98],37:[2,98],74:[2,98]},{26:[1,31],30:[1,32],32:[1,33],33:[1,34],34:[1,35],35:[1,36],37:[1,43],40:[1,37],41:[1,38],43:[1,39],45:[1,40],46:[1,41],47:[1,42],74:[1,30]},{1:[2,1]},{5:[2,4],11:[2,4],25:[2,4],36:[2,4],37:[2,4],74:[2,4]},{37:[1,44]},{5:[2,62],11:[2,62],25:[2,62],29:[2,62],36:[2,62],37:[2,62],50:[2,62],53:[2,62],54:[2,62],55:[2,62],56:[2,62],57:[2,62],58:[2,62],59:[2,62],60:[2,62],61:[2,62],65:45,67:46,68:47,69:48,70:49,71:[1,50],73:[2,62],74:[2,62],75:[1,51],76:[2,62],83:[2,62]},{5:[2,99],11:[2,99],25:[2,99],36:[2,99],37:[2,99],74:[2,99]},{27:[1,52]},{27:[1,53]},{27:[1,54]},{5:[2,25],11:[2,25],25:[2,25],36:[2,25],37:[2,25],74:[2,25]},{5:[2,26],11:[2,26],25:[2,26],36:[2,26],37:[2,26],74:[2,26]},{27:[1,55]},{5:[2,29],11:[2,29],25:[2,29],36:[2,29],37:[2,29],74:[2,29]},{27:[1,56]},{27:[1,57]},{27:[1,58]},{27:[1,59]},{27:[1,60]},{27:[1,61]},{65:62,66:[1,63],67:46,68:47,69:48,70:49,71:[1,50],75:[1,51]},{5:[2,61],11:[2,61],25:[2,61],29:[2,61],36:[2,61],37:[2,61],50:[2,61],53:[2,61],54:[2,61],55:[2,61],56:[2,61],57:[2,61],58:[2,61],59:[2,61],60:[2,61],61:[2,61],67:64,68:47,69:48,70:49,71:[1,50],73:[2,61],74:[2,61],75:[1,51],76:[2,61],83:[2,61]},{5:[2,64],11:[2,64],25:[2,64],29:[2,64],36:[2,64],37:[2,64],50:[2,64],53:[2,64],54:[2,64],55:[2,64],56:[2,64],57:[2,64],58:[2,64],59:[2,64],60:[2,64],61:[2,64],66:[2,64],71:[2,64],73:[2,64],74:[2,64],75:[2,64],76:[2,64],83:[2,64]},{5:[2,66],11:[2,66],25:[2,66],29:[2,66],36:[2,66],37:[2,66],50:[2,66],53:[2,66],54:[2,66],55:[2,66],56:[2,66],57:[2,66],58:[2,66],59:[2,66],60:[2,66],61:[2,66],66:[2,66],71:[2,66],73:[2,66],74:[2,66],75:[2,66],76:[2,66],83:[2,66]},{5:[2,67],11:[2,67],25:[2,67],29:[2,67],36:[2,67],37:[2,67],50:[2,67],53:[2,67],54:[2,67],55:[2,67],56:[2,67],57:[2,67],58:[2,67],59:[2,67],60:[2,67],61:[2,67],66:[2,67],71:[2,67],73:[2,67],74:[2,67],75:[2,67],76:[2,67],83:[2,67]},{5:[2,68],11:[2,68],25:[2,68],29:[2,68],36:[2,68],37:[2,68],50:[2,68],53:[2,68],54:[2,68],55:[2,68],56:[2,68],57:[2,68],58:[2,68],59:[2,68],60:[2,68],61:[2,68],66:[2,68],71:[2,68],73:[2,68],74:[2,68],75:[2,68],76:[2,68],83:[2,68]},{37:[1,65],74:[1,66]},{8:68,36:[1,9],44:71,63:67,74:[1,69],76:[1,70],77:[1,72],78:[1,73],79:[1,74]},{8:76,28:75,36:[1,9]},{8:86,27:[1,83],31:77,36:[1,9],39:78,44:71,51:79,52:80,59:[1,84],62:[1,85],63:87,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{8:86,27:[1,83],31:88,36:[1,9],39:78,44:71,51:79,52:80,59:[1,84],62:[1,85],63:87,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{36:[1,89]},{8:92,36:[1,9],39:93,42:90,44:71,51:94,63:95,72:91,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{44:96,78:[1,73],79:[1,74]},{36:[1,97]},{36:[1,98]},{37:[1,99]},{8:102,29:[1,101],36:[1,9],48:100},{66:[1,103],67:64,68:47,69:48,70:49,71:[1,50],75:[1,51]},{5:[2,63],11:[2,63],25:[2,63],29:[2,63],36:[2,63],37:[2,63],50:[2,63],53:[2,63],54:[2,63],55:[2,63],56:[2,63],57:[2,63],58:[2,63],59:[2,63],60:[2,63],61:[2,63],73:[2,63],74:[2,63],76:[2,63],83:[2,63]},{5:[2,65],11:[2,65],25:[2,65],29:[2,65],36:[2,65],37:[2,65],50:[2,65],53:[2,65],54:[2,65],55:[2,65],56:[2,65],57:[2,65],58:[2,65],59:[2,65],60:[2,65],61:[2,65],66:[2,65],71:[2,65],73:[2,65],74:[2,65],75:[2,65],76:[2,65],83:[2,65]},{5:[2,75],11:[2,75],25:[2,75],27:[1,104],29:[2,75],36:[2,75],37:[2,75],50:[2,75],53:[2,75],54:[2,75],55:[2,75],56:[2,75],57:[2,75],58:[2,75],59:[2,75],60:[2,75],61:[2,75],66:[2,75],71:[2,75],73:[2,75],74:[2,75],75:[2,75],76:[2,75],83:[2,75]},{5:[2,76],11:[2,76],25:[2,76],29:[2,76],36:[2,76],37:[2,76],50:[2,76],53:[2,76],54:[2,76],55:[2,76],56:[2,76],57:[2,76],58:[2,76],59:[2,76],60:[2,76],61:[2,76],66:[2,76],71:[2,76],73:[2,76],74:[2,76],75:[2,76],76:[2,76],83:[2,76]},{74:[1,106],76:[1,105]},{76:[1,107]},{5:[2,80],11:[2,80],25:[2,80],29:[2,80],36:[2,80],37:[2,80],50:[2,80],53:[2,80],54:[2,80],55:[2,80],56:[2,80],57:[2,80],58:[2,80],59:[2,80],60:[2,80],61:[2,80],66:[2,80],71:[2,80],73:[2,80],74:[2,80],75:[2,80],76:[2,80],83:[2,80]},{5:[2,81],11:[2,81],25:[2,81],29:[2,81],36:[2,81],37:[2,81],50:[2,81],53:[2,81],54:[2,81],55:[2,81],56:[2,81],57:[2,81],58:[2,81],59:[2,81],60:[2,81],61:[2,81],66:[2,81],71:[2,81],73:[2,81],74:[2,81],75:[2,81],76:[2,81],83:[2,81]},{29:[2,82],53:[2,82],54:[2,82],55:[2,82],56:[2,82],57:[2,82],58:[2,82],59:[2,82],60:[2,82],61:[2,82],73:[2,82],74:[2,82],76:[2,82],83:[2,82]},{29:[2,83],53:[2,83],54:[2,83],55:[2,83],56:[2,83],57:[2,83],58:[2,83],59:[2,83],60:[2,83],61:[2,83],73:[2,83],74:[2,83],76:[2,83],83:[2,83]},{29:[2,84],53:[2,84],54:[2,84],55:[2,84],56:[2,84],57:[2,84],58:[2,84],59:[2,84],60:[2,84],61:[2,84],73:[2,84],74:[2,84],76:[2,84],83:[2,84],84:[2,84]},{29:[2,85],53:[2,85],54:[2,85],55:[2,85],56:[2,85],57:[2,85],58:[2,85],59:[2,85],60:[2,85],61:[2,85],73:[2,85],74:[2,85],76:[2,85],83:[2,85],84:[2,85]},{29:[1,108]},{50:[1,109]},{29:[1,110]},{29:[2,43]},{29:[2,44]},{29:[2,45],53:[1,111],54:[1,112],55:[1,113],56:[1,114],57:[1,115],58:[1,116],59:[1,117],60:[1,118],61:[1,119]},{8:92,36:[1,9],39:93,42:120,44:71,51:94,63:95,72:91,75:[1,81],76:[1,122],77:[1,121],78:[1,73],79:[1,74],81:[1,82]},{44:124,78:[1,73],79:[1,74],82:123},{8:86,27:[1,83],36:[1,9],44:71,52:125,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:126,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:127,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{29:[2,58],53:[2,58],54:[2,58],55:[2,58],56:[2,58],57:[2,58],58:[2,58],59:[2,58],60:[2,58],61:[2,58]},{29:[2,59],53:[2,59],54:[2,59],55:[2,59],56:[2,59],57:[2,59],58:[2,59],59:[2,59],60:[2,59],61:[2,59]},{29:[1,128]},{37:[1,129]},{29:[1,130],73:[1,131]},{29:[2,71],73:[2,71],76:[2,71]},{29:[2,72],73:[2,72],76:[2,72]},{29:[2,86],73:[2,86],76:[2,86]},{29:[2,87],73:[2,87],76:[2,87]},{29:[2,88],73:[2,88],76:[2,88]},{29:[1,132]},{37:[1,133]},{37:[1,134]},{8:102,29:[1,136],36:[1,9],48:135},{8:138,29:[1,137],36:[1,9]},{5:[2,39],11:[2,39],25:[2,39],36:[2,39],37:[2,39],74:[2,39]},{29:[2,36],36:[2,36]},{5:[2,60],11:[2,60],25:[2,60],29:[2,60],36:[2,60],37:[2,60],50:[2,60],53:[2,60],54:[2,60],55:[2,60],56:[2,60],57:[2,60],58:[2,60],59:[2,60],60:[2,60],61:[2,60],73:[2,60],74:[2,60],76:[2,60],83:[2,60]},{8:92,29:[1,140],36:[1,9],39:93,42:139,44:71,51:94,63:95,72:91,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{5:[2,77],11:[2,77],25:[2,77],29:[2,77],36:[2,77],37:[2,77],50:[2,77],53:[2,77],54:[2,77],55:[2,77],56:[2,77],57:[2,77],58:[2,77],59:[2,77],60:[2,77],61:[2,77],66:[2,77],71:[2,77],73:[2,77],74:[2,77],75:[2,77],76:[2,77],83:[2,77]},{5:[2,79],11:[2,79],25:[2,79],29:[2,79],36:[2,79],37:[2,79],50:[2,79],53:[2,79],54:[2,79],55:[2,79],56:[2,79],57:[2,79],58:[2,79],59:[2,79],60:[2,79],61:[2,79],66:[2,79],71:[2,79],73:[2,79],74:[2,79],75:[2,79],76:[2,79],83:[2,79]},{5:[2,78],11:[2,78],25:[2,78],29:[2,78],36:[2,78],37:[2,78],50:[2,78],53:[2,78],54:[2,78],55:[2,78],56:[2,78],57:[2,78],58:[2,78],59:[2,78],60:[2,78],61:[2,78],66:[2,78],71:[2,78],73:[2,78],74:[2,78],75:[2,78],76:[2,78],83:[2,78]},{5:[2,22],11:[2,22],25:[2,22],36:[2,22],37:[2,22],74:[2,22]},{8:86,27:[1,83],31:141,36:[1,9],39:78,44:71,51:79,52:80,59:[1,84],62:[1,85],63:87,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{5:[2,23],11:[2,23],25:[2,23],36:[2,23],37:[2,23],74:[2,23]},{8:86,27:[1,83],36:[1,9],44:71,52:142,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:143,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:144,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:145,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:146,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:147,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:148,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:149,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{8:86,27:[1,83],36:[1,9],44:71,52:150,59:[1,84],62:[1,85],63:87,77:[1,72],78:[1,73],79:[1,74]},{73:[1,131],76:[1,151]},{73:[2,83],76:[2,83],80:[1,152]},{29:[2,91],73:[2,91],76:[2,91]},{73:[1,154],83:[1,153]},{84:[1,155]},{29:[1,156],53:[1,111],54:[1,112],55:[1,113],56:[1,114],57:[1,115],58:[1,116],59:[1,117],60:[1,118],61:[1,119]},{29:[2,56],53:[2,56],54:[2,56],55:[2,56],56:[2,56],57:[2,56],58:[2,56],59:[2,56],60:[2,56],61:[2,56]},{29:[2,57],53:[2,57],54:[2,57],55:[2,57],56:[2,57],57:[2,57],58:[2,57],59:[2,57],60:[2,57],61:[2,57]},{5:[2,24],11:[2,24],25:[2,24],36:[2,24],37:[2,24],74:[2,24]},{38:[1,157]},{5:[2,30],11:[2,30],25:[2,30],36:[2,30],37:[2,30],74:[2,30]},{8:159,36:[1,9],39:93,44:71,51:94,63:95,72:158,75:[1,81],77:[1,72],78:[1,73],79:[1,74],81:[1,82]},{5:[2,31],11:[2,31],25:[2,31],36:[2,31],37:[2,31],74:[2,31]},{29:[1,160]},{29:[1,161]},{8:138,29:[1,162],36:[1,9]},{5:[2,35],11:[2,35],25:[2,35],36:[2,35],37:[2,35],74:[2,35]},{5:[2,38],11:[2,38],25:[2,38],36:[2,38],37:[2,38],74:[2,38]},{29:[2,37],36:[2,37]},{29:[1,163],73:[1,131]},{5:[2,70],11:[2,70],25:[2,70],29:[2,70],36:[2,70],37:[2,70],50:[2,70],53:[2,70],54:[2,70],55:[2,70],56:[2,70],57:[2,70],58:[2,70],59:[2,70],60:[2,70],61:[2,70],66:[2,70],71:[2,70],73:[2,70],74:[2,70],75:[2,70],76:[2,70],83:[2,70]},{29:[2,42]},{29:[2,46],53:[2,46],54:[2,46],55:[1,113],56:[1,114],57:[1,115],58:[1,116],59:[1,117],60:[1,118],61:[1,119]},{29:[2,47],53:[2,47],54:[2,47],55:[1,113],56:[1,114],57:[1,115],58:[1,116],59:[1,117],60:[1,118],61:[1,119]},{29:[2,48],53:[2,48],54:[2,48],55:[2,48],56:[2,48],57:[2,48],58:[2,48],59:[2,48],60:[2,48],61:[2,48]},{29:[2,49],53:[2,49],54:[2,49],55:[2,49],56:[2,49],57:[2,49],58:[2,49],59:[2,49],60:[2,49],61:[2,49]},{29:[2,50],53:[2,50],54:[2,50],55:[2,50],56:[2,50],57:[2,50],58:[2,50],59:[2,50],60:[2,50],61:[2,50]},{29:[2,51],53:[2,51],54:[2,51],55:[1,113],56:[1,114],57:[1,115],58:[2,51],59:[2,51],60:[1,118],61:[1,119]},{29:[2,52],53:[2,52],54:[2,52],55:[1,113],56:[1,114],57:[1,115],58:[2,52],59:[2,52],60:[1,118],61:[1,119]},{29:[2,53],53:[2,53],54:[2,53],55:[1,113],56:[1,114],57:[1,115],58:[2,53],59:[2,53],60:[2,53],61:[2,53]},{29:[2,54],53:[2,54],54:[2,54],55:[1,113],56:[1,114],57:[1,115],58:[2,54],59:[2,54],60:[2,54],61:[2,54]},{29:[2,89],73:[2,89],76:[2,89]},{77:[1,164]},{29:[2,92],73:[2,92],76:[2,92]},{44:165,78:[1,73],79:[1,74]},{8:167,36:[1,9],44:71,63:166,77:[1,72],78:[1,73],79:[1,74]},{29:[2,55],53:[2,55],54:[2,55],55:[2,55],56:[2,55],57:[2,55],58:[2,55],59:[2,55],60:[2,55],61:[2,55]},{8:168,36:[1,9],39:169,75:[1,81]},{29:[2,73],73:[2,73],76:[2,73]},{29:[2,74],73:[2,74],76:[2,74]},{5:[2,32],11:[2,32],25:[2,32],36:[2,32],37:[2,32],74:[2,32]},{5:[2,33],11:[2,33],25:[2,33],36:[2,33],37:[2,33],74:[2,33]},{5:[2,34],11:[2,34],25:[2,34],36:[2,34],37:[2,34],74:[2,34]},{5:[2,69],11:[2,69],25:[2,69],29:[2,69],36:[2,69],37:[2,69],50:[2,69],53:[2,69],54:[2,69],55:[2,69],56:[2,69],57:[2,69],58:[2,69],59:[2,69],60:[2,69],61:[2,69],66:[2,69],71:[2,69],73:[2,69],74:[2,69],75:[2,69],76:[2,69],83:[2,69]},{76:[1,170]},{84:[1,171]},{73:[2,93],83:[2,93]},{73:[2,94],83:[2,94]},{29:[1,172]},{29:[1,173]},{29:[2,90],73:[2,90],76:[2,90]},{8:174,36:[1,9],44:71,63:175,77:[1,72],78:[1,73],79:[1,74]},{5:[2,27],11:[2,27],25:[2,27],36:[2,27],37:[2,27],74:[2,27]},{5:[2,28],11:[2,28],25:[2,28],36:[2,28],37:[2,28],74:[2,28]},{73:[2,95],83:[2,95]},{73:[2,96],83:[2,96]}],
defaultActions: {26:[2,1],78:[2,43],79:[2,44],141:[2,42]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    var ranges = this.lexer.options && this.lexer.options.ranges;

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            var errStr = '';
            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state === 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol == 2 ? null : symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
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
                                    if(yy_.yytext) return 74; 
                                  
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
                                    if(yy_.yytext) return 74; 
                                  
break;
case 2: return 74; 
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
case 28: return 50; 
break;
case 29: /*ignore whitespace*/ 
break;
case 30: return 81; 
break;
case 31: return 83; 
break;
case 32: return 84; 
break;
case 33: return 64; 
break;
case 34: this.popState(); return 66; 
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
case 37: this.begin("i"); return 75; 
break;
case 38: 
                                    if (this.popState() === "i") {
                                      return 76; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  
break;
case 39: return 80; 
break;
case 40: return 71; 
break;
case 41: return 73; 
break;
case 42: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\"/g,'"'); return 79; 
break;
case 43: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2).replace(/\\'/g,"'"); return 78; 
break;
case 44: return 77; 
break;
case 45: return 37; 
break;
case 46: this.begin('h'); return 25; 
break;
case 47: this.popState(); return 74; 
break;
case 48: this.popState(); return 74; 
break;
case 49: this.popState(); return 74; 
break;
case 50: return 5; 
break;
}
};
lexer.rules = [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#\*[\s\S]+?\*#)/,/^(?:##[^\n]+(?=\n))/,/^(?:#(?=[^\s]))/,/^(?:set\b)/,/^(?:if\b)/,/^(?:elseif\b)/,/^(?:else\b)/,/^(?:\{else\})/,/^(?:end\b)/,/^(?:break\b)/,/^(?:foreach\b)/,/^(?:include\b)/,/^(?:parse\b)/,/^(?:evaluate\b)/,/^(?:define\b)/,/^(?:macro\b)/,/^(?:in\b)/,/^(?:[\+\-\*/])/,/^(?:[><])/,/^(?:==)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:\$!)/,/^(?:\$)/,/^(?:!)/,/^(?:=)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?::)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:'(\\'|[^\'])*')/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:#)/,/^(?:.)/,/^(?:\s+)/,/^(?:[\$#])/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[25,26,33,34,35,36,37,38,40,41,45,46,47,48,50],"inclusive":false},"c":{"rules":[19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,40,41,42,42,43,43,44,45],"inclusive":false},"i":{"rules":[19,20,21,22,23,24,25,26,27,28,29,35,36,37,38,39,40,41,42,43,44,45],"inclusive":false},"h":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,35,36,37,38,40,41,42,43,44,45,47,50],"inclusive":false},"esc":{"rules":[49],"inclusive":false},"INITIAL":{"rules":[0,1,2,50],"inclusive":true}};
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