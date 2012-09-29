/* Jison generated parser */
var velocity = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"statement":7,"references":8,"directives":9,"content":10,"set":11,"if":12,"elseif":13,"else":14,"end":15,"foreach":16,"include":17,"parse":18,"evaluate":19,"define":20,"macro":21,"HASH":22,"SET":23,"PARENTHESIS":24,"equal":25,"CLOSE_PARENTHESIS":26,"IF":27,"expression":28,"ELSEIF":29,"ELSE":30,"END":31,"FOREACH":32,"DOLLAR":33,"ID":34,"IN":35,"INCLUDE":36,"params":37,"PARSE":38,"STRING":39,"EAVL":40,"DEFINE":41,"MACRO":42,"arguments":43,"EQUAL":44,"array":45,"math":46,"||":47,"&&":48,">":49,"<":50,"==":51,"+":52,"-":53,"*":54,"/":55,"!":56,"INTEGER":57,"VAR_BEGIN":58,"attributes":59,"VAR_END":60,"attribute":61,"method":62,"index":63,"property":64,"DOT":65,"literals":66,"COMMA":67,"CONTENT":68,"BRACKET":69,"literal":70,"CLOSE_BRACKET":71,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",22:"HASH",23:"SET",24:"PARENTHESIS",26:"CLOSE_PARENTHESIS",27:"IF",29:"ELSEIF",30:"ELSE",31:"END",32:"FOREACH",33:"DOLLAR",34:"ID",35:"IN",36:"INCLUDE",38:"PARSE",39:"STRING",40:"EAVL",41:"DEFINE",42:"MACRO",44:"EQUAL",47:"||",48:"&&",49:">",50:"<",51:"==",52:"+",53:"-",54:"*",55:"/",56:"!",57:"INTEGER",58:"VAR_BEGIN",60:"VAR_END",65:"DOT",67:"COMMA",68:"CONTENT",69:"BRACKET",71:"CLOSE_BRACKET"},
productions_: [0,[3,2],[4,1],[6,1],[6,2],[7,1],[7,1],[7,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[11,5],[12,5],[13,5],[14,2],[15,2],[16,8],[17,5],[18,5],[19,6],[20,6],[21,6],[21,5],[43,2],[43,3],[25,3],[28,1],[28,1],[28,1],[46,3],[46,3],[46,3],[46,3],[46,3],[46,3],[46,3],[46,3],[46,3],[46,3],[46,2],[46,2],[46,1],[46,1],[8,5],[8,3],[8,2],[8,4],[59,1],[59,2],[61,1],[61,1],[61,1],[62,5],[62,4],[37,1],[37,1],[37,3],[37,3],[64,2],[64,2],[63,3],[63,3],[63,3],[63,2],[63,2],[70,1],[70,1],[66,1],[66,1],[45,3],[45,2],[10,1],[10,1]],
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
case 19: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 20: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 21: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 22: this.$ = 'else'; 
break;
case 23: this.$ = 'end'; 
break;
case 24: this.$ = [].concat($$[$0-6], $$[$0-3], $$[$0-2], $$[$0-1]); 
break;
case 25: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 26: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 27: this.$ = [].concat($$[$0-4], $$[$0-1]); 
break;
case 28: this.$ = [].concat($$[$0-4], $$[$0-1]); 
break;
case 29: this.$ = [].concat($$[$0-4], $$[$0-2], $$[$0-1]); 
break;
case 30: this.$ = [].concat($$[$0-3], $$[$0-1]); 
break;
case 31: this.$ = $$[$0]; 
break;
case 32: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 33: this.$ = [$$[$0-2], '=', $$[$0]]; 
break;
case 34: this.$ = $$[$0]; 
break;
case 35: this.$ = $$[$0]; 
break;
case 36: this.$ = $$[$0]; 
break;
case 37: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 38: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 39: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 40: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 41: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 42: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 43: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 44: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 45: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 46: this.$ = [].concat($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 47: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 48: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 49: this.$ = $$[$0]; 
break;
case 50: this.$ = $$[$0]; 
break;
case 51: this.$ = [].concat($$[$0-2], $$[$0-1]); 
break;
case 52: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 53: this.$ = [].concat($$[$0]); 
break;
case 54: this.$ = [].concat($$[$0-1]); 
break;
case 55: this.$ = $$[$0]; 
break;
case 56: this.$ = [].concat($$[$0-1], $$[$0]); 
break;
case 57: this.$ = $$[$0]; 
break;
case 58: this.$ = $$[$0]; 
break;
case 59: this.$ = $$[$0]; 
break;
case 60: this.$ = [$$[$0-3], $$[$0-1]]; 
break;
case 61: this.$ = []; 
break;
case 62: this.$ = $$[$0]; 
break;
case 63: this.$ = $$[$0]; 
break;
case 64: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 65: this.$ = [].concat($$[$0-2], $$[$0]); 
break;
case 66: this.$ = $$[$0]; 
break;
case 67: this.$ = '<<<' + $$[$0-1] + $$[$0]; 
break;
case 68: this.$ = $$[$0-1]; 
break;
case 69: this.$ = $$[$0-1]; 
break;
case 70: this.$ = "<<<" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 71: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 72: this.$ = "<<<" + $$[$0-1] + $$[$0]; 
break;
case 73: this.$ = $$[$0]; 
break;
case 74: this.$ = $$[$0]; 
break;
case 75: this.$ = $$[$0]; 
break;
case 76: this.$ = $$[$0];
break;
case 77: this.$ = $$[$0-1]; 
break;
case 78: this.$ = []; 
break;
case 79: this.$ = $$[$0]; 
break;
case 80: this.$ = $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:[1,22],33:[1,8],34:[1,21],68:[1,20]},{1:[3]},{5:[1,23]},{5:[2,2],7:24,8:5,9:6,10:7,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:19,22:[1,22],33:[1,8],34:[1,21],68:[1,20]},{5:[2,3],22:[2,3],33:[2,3],34:[2,3],68:[2,3]},{5:[2,5],22:[2,5],33:[2,5],34:[2,5],68:[2,5]},{5:[2,6],22:[2,6],33:[2,6],34:[2,6],68:[2,6]},{5:[2,7],22:[2,7],33:[2,7],34:[2,7],68:[2,7]},{34:[1,26],58:[1,25]},{5:[2,8],22:[2,8],33:[2,8],34:[2,8],68:[2,8]},{5:[2,9],22:[2,9],33:[2,9],34:[2,9],68:[2,9]},{5:[2,10],22:[2,10],33:[2,10],34:[2,10],68:[2,10]},{5:[2,11],22:[2,11],33:[2,11],34:[2,11],68:[2,11]},{5:[2,12],22:[2,12],33:[2,12],34:[2,12],68:[2,12]},{5:[2,13],22:[2,13],33:[2,13],34:[2,13],68:[2,13]},{5:[2,14],22:[2,14],33:[2,14],34:[2,14],68:[2,14]},{5:[2,15],22:[2,15],33:[2,15],34:[2,15],68:[2,15]},{5:[2,16],22:[2,16],33:[2,16],34:[2,16],68:[2,16]},{5:[2,17],22:[2,17],33:[2,17],34:[2,17],68:[2,17]},{5:[2,18],22:[2,18],33:[2,18],34:[2,18],68:[2,18]},{5:[2,79],22:[2,79],33:[2,79],34:[2,79],68:[2,79]},{5:[2,80],22:[2,80],33:[2,80],34:[2,80],68:[2,80]},{23:[1,27],27:[1,28],29:[1,29],30:[1,30],31:[1,31],32:[1,32],36:[1,33],38:[1,34],40:[1,35],41:[1,36],42:[1,37]},{1:[2,1]},{5:[2,4],22:[2,4],33:[2,4],34:[2,4],68:[2,4]},{34:[1,38]},{5:[2,53],22:[2,53],26:[2,53],33:[2,53],34:[2,53],44:[2,53],47:[2,53],48:[2,53],49:[2,53],50:[2,53],51:[2,53],52:[2,53],53:[2,53],54:[2,53],55:[2,53],59:39,61:40,62:41,63:42,64:43,65:[1,44],67:[2,53],68:[2,53],69:[1,45],71:[2,53]},{24:[1,46]},{24:[1,47]},{24:[1,48]},{5:[2,22],22:[2,22],33:[2,22],34:[2,22],68:[2,22]},{5:[2,23],22:[2,23],33:[2,23],34:[2,23],68:[2,23]},{24:[1,49]},{24:[1,50]},{24:[1,51]},{24:[1,52]},{24:[1,53]},{24:[1,54]},{59:55,60:[1,56],61:40,62:41,63:42,64:43,65:[1,44],69:[1,45]},{5:[2,52],22:[2,52],26:[2,52],33:[2,52],34:[2,52],44:[2,52],47:[2,52],48:[2,52],49:[2,52],50:[2,52],51:[2,52],52:[2,52],53:[2,52],54:[2,52],55:[2,52],61:57,62:41,63:42,64:43,65:[1,44],67:[2,52],68:[2,52],69:[1,45],71:[2,52]},{5:[2,55],22:[2,55],26:[2,55],33:[2,55],34:[2,55],44:[2,55],47:[2,55],48:[2,55],49:[2,55],50:[2,55],51:[2,55],52:[2,55],53:[2,55],54:[2,55],55:[2,55],60:[2,55],65:[2,55],67:[2,55],68:[2,55],69:[2,55],71:[2,55]},{5:[2,57],22:[2,57],26:[2,57],33:[2,57],34:[2,57],44:[2,57],47:[2,57],48:[2,57],49:[2,57],50:[2,57],51:[2,57],52:[2,57],53:[2,57],54:[2,57],55:[2,57],60:[2,57],65:[2,57],67:[2,57],68:[2,57],69:[2,57],71:[2,57]},{5:[2,58],22:[2,58],26:[2,58],33:[2,58],34:[2,58],44:[2,58],47:[2,58],48:[2,58],49:[2,58],50:[2,58],51:[2,58],52:[2,58],53:[2,58],54:[2,58],55:[2,58],60:[2,58],65:[2,58],67:[2,58],68:[2,58],69:[2,58],71:[2,58]},{5:[2,59],22:[2,59],26:[2,59],33:[2,59],34:[2,59],44:[2,59],47:[2,59],48:[2,59],49:[2,59],50:[2,59],51:[2,59],52:[2,59],53:[2,59],54:[2,59],55:[2,59],60:[2,59],65:[2,59],67:[2,59],68:[2,59],69:[2,59],71:[2,59]},{34:[1,58],68:[1,59]},{8:61,33:[1,8],39:[1,64],57:[1,65],68:[1,62],70:60,71:[1,63]},{8:67,25:66,33:[1,8]},{8:76,24:[1,73],28:68,33:[1,8],39:[1,69],45:70,46:71,53:[1,74],56:[1,75],57:[1,77],69:[1,72]},{8:76,24:[1,73],28:78,33:[1,8],39:[1,69],45:70,46:71,53:[1,74],56:[1,75],57:[1,77],69:[1,72]},{33:[1,79]},{8:82,33:[1,8],37:80,39:[1,64],45:84,57:[1,65],66:81,69:[1,72],70:83},{39:[1,85]},{33:[1,86]},{33:[1,87]},{34:[1,88]},{60:[1,89],61:57,62:41,63:42,64:43,65:[1,44],69:[1,45]},{5:[2,54],22:[2,54],26:[2,54],33:[2,54],34:[2,54],44:[2,54],47:[2,54],48:[2,54],49:[2,54],50:[2,54],51:[2,54],52:[2,54],53:[2,54],54:[2,54],55:[2,54],67:[2,54],68:[2,54],71:[2,54]},{5:[2,56],22:[2,56],26:[2,56],33:[2,56],34:[2,56],44:[2,56],47:[2,56],48:[2,56],49:[2,56],50:[2,56],51:[2,56],52:[2,56],53:[2,56],54:[2,56],55:[2,56],60:[2,56],65:[2,56],67:[2,56],68:[2,56],69:[2,56],71:[2,56]},{5:[2,66],22:[2,66],24:[1,90],26:[2,66],33:[2,66],34:[2,66],44:[2,66],47:[2,66],48:[2,66],49:[2,66],50:[2,66],51:[2,66],52:[2,66],53:[2,66],54:[2,66],55:[2,66],60:[2,66],65:[2,66],67:[2,66],68:[2,66],69:[2,66],71:[2,66]},{5:[2,67],22:[2,67],26:[2,67],33:[2,67],34:[2,67],44:[2,67],47:[2,67],48:[2,67],49:[2,67],50:[2,67],51:[2,67],52:[2,67],53:[2,67],54:[2,67],55:[2,67],60:[2,67],65:[2,67],67:[2,67],68:[2,67],69:[2,67],71:[2,67]},{68:[1,92],71:[1,91]},{71:[1,93]},{5:[2,71],22:[2,71],26:[2,71],33:[2,71],34:[2,71],44:[2,71],47:[2,71],48:[2,71],49:[2,71],50:[2,71],51:[2,71],52:[2,71],53:[2,71],54:[2,71],55:[2,71],60:[2,71],65:[2,71],67:[2,71],68:[2,71],69:[2,71],71:[2,71]},{5:[2,72],22:[2,72],26:[2,72],33:[2,72],34:[2,72],44:[2,72],47:[2,72],48:[2,72],49:[2,72],50:[2,72],51:[2,72],52:[2,72],53:[2,72],54:[2,72],55:[2,72],60:[2,72],65:[2,72],67:[2,72],68:[2,72],69:[2,72],71:[2,72]},{26:[2,73],67:[2,73],68:[2,73],71:[2,73]},{26:[2,74],67:[2,74],68:[2,74],71:[2,74]},{26:[1,94]},{44:[1,95]},{26:[1,96]},{26:[2,34]},{26:[2,35]},{26:[2,36],47:[1,97],48:[1,98],49:[1,99],50:[1,100],51:[1,101],52:[1,102],53:[1,103],54:[1,104],55:[1,105]},{8:82,33:[1,8],37:106,39:[1,64],45:84,57:[1,65],66:81,69:[1,72],70:83,71:[1,107]},{8:76,24:[1,73],33:[1,8],46:108,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:109,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:110,53:[1,74],56:[1,75],57:[1,77]},{26:[2,49],47:[2,49],48:[2,49],49:[2,49],50:[2,49],51:[2,49],52:[2,49],53:[2,49],54:[2,49],55:[2,49]},{26:[2,50],47:[2,50],48:[2,50],49:[2,50],50:[2,50],51:[2,50],52:[2,50],53:[2,50],54:[2,50],55:[2,50]},{26:[1,111]},{34:[1,112]},{26:[1,113],67:[1,114]},{26:[2,62],67:[2,62],71:[2,62]},{26:[2,63],67:[2,63],71:[2,63]},{26:[2,75],67:[2,75],71:[2,75]},{26:[2,76],67:[2,76],71:[2,76]},{26:[1,115]},{34:[1,116]},{34:[1,117]},{26:[1,119],33:[1,120],43:118},{5:[2,51],22:[2,51],26:[2,51],33:[2,51],34:[2,51],44:[2,51],47:[2,51],48:[2,51],49:[2,51],50:[2,51],51:[2,51],52:[2,51],53:[2,51],54:[2,51],55:[2,51],67:[2,51],68:[2,51],71:[2,51]},{8:82,26:[1,122],33:[1,8],37:121,39:[1,64],45:84,57:[1,65],66:81,69:[1,72],70:83},{5:[2,68],22:[2,68],26:[2,68],33:[2,68],34:[2,68],44:[2,68],47:[2,68],48:[2,68],49:[2,68],50:[2,68],51:[2,68],52:[2,68],53:[2,68],54:[2,68],55:[2,68],60:[2,68],65:[2,68],67:[2,68],68:[2,68],69:[2,68],71:[2,68]},{5:[2,70],22:[2,70],26:[2,70],33:[2,70],34:[2,70],44:[2,70],47:[2,70],48:[2,70],49:[2,70],50:[2,70],51:[2,70],52:[2,70],53:[2,70],54:[2,70],55:[2,70],60:[2,70],65:[2,70],67:[2,70],68:[2,70],69:[2,70],71:[2,70]},{5:[2,69],22:[2,69],26:[2,69],33:[2,69],34:[2,69],44:[2,69],47:[2,69],48:[2,69],49:[2,69],50:[2,69],51:[2,69],52:[2,69],53:[2,69],54:[2,69],55:[2,69],60:[2,69],65:[2,69],67:[2,69],68:[2,69],69:[2,69],71:[2,69]},{5:[2,19],22:[2,19],33:[2,19],34:[2,19],68:[2,19]},{8:76,24:[1,73],28:123,33:[1,8],39:[1,69],45:70,46:71,53:[1,74],56:[1,75],57:[1,77],69:[1,72]},{5:[2,20],22:[2,20],33:[2,20],34:[2,20],68:[2,20]},{8:76,24:[1,73],33:[1,8],46:124,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:125,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:126,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:127,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:128,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:129,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:130,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:131,53:[1,74],56:[1,75],57:[1,77]},{8:76,24:[1,73],33:[1,8],46:132,53:[1,74],56:[1,75],57:[1,77]},{67:[1,114],71:[1,133]},{26:[2,78],67:[2,78],71:[2,78]},{26:[1,134],47:[1,97],48:[1,98],49:[1,99],50:[1,100],51:[1,101],52:[1,102],53:[1,103],54:[1,104],55:[1,105]},{26:[2,47],47:[2,47],48:[2,47],49:[2,47],50:[2,47],51:[2,47],52:[2,47],53:[2,47],54:[2,47],55:[2,47]},{26:[2,48],47:[2,48],48:[2,48],49:[2,48],50:[2,48],51:[2,48],52:[2,48],53:[2,48],54:[2,48],55:[2,48]},{5:[2,21],22:[2,21],33:[2,21],34:[2,21],68:[2,21]},{35:[1,135]},{5:[2,25],22:[2,25],33:[2,25],34:[2,25],68:[2,25]},{8:137,33:[1,8],39:[1,64],45:84,57:[1,65],66:136,69:[1,72],70:83},{5:[2,26],22:[2,26],33:[2,26],34:[2,26],68:[2,26]},{26:[1,138]},{26:[1,139]},{26:[1,140],33:[1,141]},{5:[2,30],22:[2,30],33:[2,30],34:[2,30],68:[2,30]},{34:[1,142]},{26:[1,143],67:[1,114]},{5:[2,61],22:[2,61],26:[2,61],33:[2,61],34:[2,61],44:[2,61],47:[2,61],48:[2,61],49:[2,61],50:[2,61],51:[2,61],52:[2,61],53:[2,61],54:[2,61],55:[2,61],60:[2,61],65:[2,61],67:[2,61],68:[2,61],69:[2,61],71:[2,61]},{26:[2,33]},{26:[2,37],47:[2,37],48:[2,37],49:[1,99],50:[1,100],51:[1,101],52:[1,102],53:[1,103],54:[1,104],55:[1,105]},{26:[2,38],47:[2,38],48:[2,38],49:[1,99],50:[1,100],51:[1,101],52:[1,102],53:[1,103],54:[1,104],55:[1,105]},{26:[2,39],47:[2,39],48:[2,39],49:[2,39],50:[2,39],51:[2,39],52:[2,39],53:[2,39],54:[2,39],55:[2,39]},{26:[2,40],47:[2,40],48:[2,40],49:[2,40],50:[2,40],51:[2,40],52:[2,40],53:[2,40],54:[2,40],55:[2,40]},{26:[2,41],47:[2,41],48:[2,41],49:[2,41],50:[2,41],51:[2,41],52:[2,41],53:[2,41],54:[2,41],55:[2,41]},{26:[2,42],47:[2,42],48:[2,42],49:[1,99],50:[1,100],51:[1,101],52:[2,42],53:[2,42],54:[1,104],55:[1,105]},{26:[2,43],47:[2,43],48:[2,43],49:[1,99],50:[1,100],51:[1,101],52:[2,43],53:[2,43],54:[1,104],55:[1,105]},{26:[2,44],47:[2,44],48:[2,44],49:[1,99],50:[1,100],51:[1,101],52:[2,44],53:[2,44],54:[2,44],55:[2,44]},{26:[2,45],47:[2,45],48:[2,45],49:[1,99],50:[1,100],51:[1,101],52:[2,45],53:[2,45],54:[2,45],55:[2,45]},{26:[2,77],67:[2,77],71:[2,77]},{26:[2,46],47:[2,46],48:[2,46],49:[2,46],50:[2,46],51:[2,46],52:[2,46],53:[2,46],54:[2,46],55:[2,46]},{8:144,33:[1,8]},{26:[2,64],67:[2,64],71:[2,64]},{26:[2,65],67:[2,65],71:[2,65]},{5:[2,27],22:[2,27],33:[2,27],34:[2,27],68:[2,27]},{5:[2,28],22:[2,28],33:[2,28],34:[2,28],68:[2,28]},{5:[2,29],22:[2,29],33:[2,29],34:[2,29],68:[2,29]},{34:[1,145]},{26:[2,31],33:[2,31]},{5:[2,60],22:[2,60],26:[2,60],33:[2,60],34:[2,60],44:[2,60],47:[2,60],48:[2,60],49:[2,60],50:[2,60],51:[2,60],52:[2,60],53:[2,60],54:[2,60],55:[2,60],60:[2,60],65:[2,60],67:[2,60],68:[2,60],69:[2,60],71:[2,60]},{26:[1,146]},{26:[2,32],33:[2,32]},{5:[2,24],22:[2,24],33:[2,24],34:[2,24],68:[2,24]}],
defaultActions: {23:[2,1],69:[2,34],70:[2,35],123:[2,33]},
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
case 0: if(yy_.yytext.slice(-1) !== "\\") this.begin("mu"); if(yy_.yytext) return 68; 
break;
case 1: if(yy_.yytext.slice(-1) !== "\\") this.begin("h"); if(yy_.yytext) return 68; 
break;
case 2: return 68; 
break;
case 3: return 22; 
break;
case 4: return 23; 
break;
case 5: return 27; 
break;
case 6: return 29; 
break;
case 7: this.popState(); return 30; 
break;
case 8: this.popState(); return 30; 
break;
case 9: this.popState(); return 31; 
break;
case 10: return 32; 
break;
case 11: return 36; 
break;
case 12: return 38; 
break;
case 13: return 'EVAL'; 
break;
case 14: return 41; 
break;
case 15: return 42; 
break;
case 16: return 35; 
break;
case 17: return yy_.yytext; 
break;
case 18: return yy_.yytext; 
break;
case 19: return yy_.yytext; 
break;
case 20: return yy_.yytext; 
break;
case 21: return yy_.yytext; 
break;
case 22: return 33; 
break;
case 23: return 33; 
break;
case 24: return yy_.yytext; 
break;
case 25: return 44; 
break;
case 26: /*ignore whitespace*/ 
break;
case 27: return 58; 
break;
case 28: this.popState(); return 60; 
break;
case 29: this.begin("c"); return 24; 
break;
case 30: 
                                    if (this.popState() === "c") {
                                      var len = this.conditionStack.length;
                                      /** 遇到#set(a = b)括号结束后结束状态h*/
                                      if (len === 2 && this.conditionStack[1] === "h"){
                                        this.popState();
                                      }
                                      return 26; 
                                    } else {
                                      return 'CONTENT'; 
                                    }
                                  
break;
case 31: this.begin("i"); return 69; 
break;
case 32: 
                                    if (this.popState() === "i") {
                                      return 71; 
                                    } else {
                                      return 'CONTENT';
                                    }
                                  
break;
case 33: return 65; 
break;
case 34: return 67; 
break;
case 35: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 39; 
break;
case 36: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'"); return 39; 
break;
case 37: return 57; 
break;
case 38: return 34; 
break;
case 39: this.popState(); return 68; 
break;
case 40: this.popState(); return 68; 
break;
case 41: this.popState(); return 68; 
break;
case 42: return 5; 
break;
}
};
lexer.rules = [/^(?:[^#]*?(?=\$))/,/^(?:[^\$]*?(?=#))/,/^(?:[^\x00]+)/,/^(?:#)/,/^(?:set\b)/,/^(?:if\b)/,/^(?:elseif\b)/,/^(?:else\b)/,/^(?:\{else\})/,/^(?:end\b)/,/^(?:foreach\b)/,/^(?:include\b)/,/^(?:parse\b)/,/^(?:evaluate\b)/,/^(?:define\b)/,/^(?:macro\b)/,/^(?:in\b)/,/^(?:[\+\-\*/])/,/^(?:[><])/,/^(?:==)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:\$!)/,/^(?:\$)/,/^(?:!)/,/^(?:=)/,/^(?:\s+)/,/^(?:\{)/,/^(?:\})/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\.)/,/^(?:,)/,/^(?:"(\\"|[^\"])*")/,/^(?:'(\\'|[^\'])*')/,/^(?:[0-9]+)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:.)/,/^(?:.)/,/^(?:\s+)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[22,23,27,28,29,30,31,32,33,34,38,39,41,42],"inclusive":false},"c":{"rules":[16,17,18,19,20,21,22,23,24,25,26,29,30,31,32,33,34,35,35,36,36,37,38],"inclusive":false},"i":{"rules":[16,17,18,19,20,21,22,23,24,25,26,29,30,31,32,33,34,35,36,37,38],"inclusive":false},"h":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,29,30,31,32,33,34,35,36,37,38,40],"inclusive":false},"INITIAL":{"rules":[0,1,2,42],"inclusive":true}};
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