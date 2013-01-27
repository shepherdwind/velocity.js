##Velocity - Template Engine [![Build Status](https://secure.travis-ci.org/shepherdwind/velocity.js.png)](https://travis-ci.org/shepherdwind/velocity.js)

*注意*

velocityjs在npm中包名从原来的`velocity.js`改为`velocityjs`，感觉`require("velocity.js")`
比较不好看，所以改名，从`0.3.0`之后的版本都在`velocityjs`下更新。

查看最新版本

```bash
$ npm info velocityjs version
```

velocity.js是velocity模板语法的javascript实现。
[Velocity](http://velocity.apache.org/) 是基于Java的模板引擎，广泛应用在阿里集
体各个子公司。Velocity模板适用于大量模板使用的场景，支持复杂的逻辑运算，包含
基本数据类型、变量赋值和函数等功能。


##Features

- 支持客户端和服务器端使用
- 语法是富逻辑的，构成门微型的语言
- 语法分析和模板渲染分离
- 基本完全支持velocity语法
- 浏览器使用支持模板之间相互引用，依据js模块加载机制，比如kissy
- 三个Helper，友好的数据模拟解决方案
- [Vim Syntax](https://github.com/shepherdwind/vim-velocity)

##Install

via npm:

```bash
$ npm install velocityjs
```

##Broswer Support

兼容ie6+，chrome等其他浏览器，[test case](http://shepherdwind.com/velocity/runner/tests.html)

点击[此处](http://shepherdwind.com/velocity/try/index.html)可以体验web
端velocity语法解析过程，注：使用ACE作为代码编辑器，仅支持高级浏览器访问。

执行`cake`命令进行打包velocity.js浏览器端脚本:

```bash
$ make parse
```

需要cli下安装coffeejs，暂时打包是为kissy所使用的，velocity.js需要的一些常用的
ecma5功能，比如`foreach, some, isArray`等，在node环境下是自带的功能，而web端的兼
容是交给已有的类库解决。需要自行提供一组跨浏览器的api，比如kissy打包：

```js
  //api map
  var utils = {
    forEach : S.each,
    some    : S.some,
    mixin   : S.mix,
    guid    : S.guid,
    isArray : S.isArray,
    indexOf : S.indexOf,
    keys    : S.keys,
    now     : S.now
  };

```

Velocity语法具有很高的容错能力，类似于html结构的解析，同时语法规则复杂，所以语法
解释器执行性能可能比较慢，`velocity.js`把语法结构分析运算和语法执行两个过程独立出来，
第一步，语法结构分析返回一个数组(语法树)，描述velocity语法，语法执行使用数据和语
法树，计算模板最终结果。

执行build后，得到两个文件，分别是`build/velocity/`下的`index.js`和`parse.js`，两者
相互独立，`parse.js`语法分析过程可以放在本地完成，执行命令：

把语法分析和模板拼接分开，为了方便在本地编译语法树，减少在web端js运算。本地编译
模板的思路，源自KISSY的[xtemplate](http://docs.kissyui.com/docs/html/api/component/xtemplate/)。

虽然语法解释器可以在浏览器端执行，但是，不推荐那么使用。

```bash
#使用velocity命令行工具打包
veloctiy --build *.vm
veloctiy -b *.vm
```

源码中`test/web/`目录的js，一部分就是线下编译后的得到的，此处可[直接访问](http://shepherdwind.com/velocity/web/index.html)。

##Public API

###node_module

```js
var Velocity = require('../src/velocity');

//1. 直接解析
Velocity.render('string of velocity', context);

//2. 使用Parser和Compile
var Parser = Velocity.Parser;
var Compile = Velocity.Compile;

var asts = Parser.parse('string of velocity');
(new Compile(asts)).render(context);
```
####context

`context`是一个对象，可以为空，执行中`$foo.bar`，访问路径是`context.foo.bar`，
`context`的属性可以是函数，和vm中定义保持一致。

###On Broswer

1 . 使用线下打包方案：

```js
KISSY.use('velocity/index, web/directives', function(S, Velocity, asts){
  var compile = new Velocity(asts);
  S.all('body').html(compile.render());
});
```

2 . 使用线上编译：

```js
KISSY.use('velocity/index, velocity/parse', function(S, Velocity, Parser){
  var html = (S.all('#tpl').html());
  var asts = Parser.parse(html);
  var compile = new Velocity(asts);
  console.log(compile.render());
});
```

两者的区别在于asts的获取，第一种方式，直接取asts，第二种，需要首先执行语法分析过
程。

##Syntax

具体语法请访问官网文档：[velocity user guide](http://velocity.apache.org/engine/devel/user-guide.html)。

###Directives

Directives支持`set`, `foreach`, `if|else|elseif`, `macro`, `parse`, `break`。不
支持有，`stop`, `evaluate`, `define`，感觉这些语法比较偏，用处不大，暂时没有实现。
其中`parse`，在web端，使用kissy的模块加载器加载，需要首先线下编译打包，[例子](http://shepherdwind.com/velocity/web/index.html)。

###macro

宏分为系统的宏，比如`parse, include`，和用户自定义宏，通过`#macro`在vm中定义，此
外可以使用自定义的js函数替代在vm中定义。对于系统宏和自定义宏，不做区分，对于
`#parse`和`#include`的调用，可以使用自定义函数来执行。具体见[issue #3](https://github.com/shepherdwind/velocity.js/issues/3)。

###foreach

foreach在velocity中对对象的遍历，和js有区别，java中对象是一个map，需要通过方法
`keyset`来获取map中的key，foreach循环写法等同于js的for in循环，感觉有点怪异。在
一个foreach，有一个`$foreach`的对象可以使用，此变量作用域为当前循环范围。

```
#foreach($num in [1..5])
  index => $foreach.index 
  count => $foreach.count
  #if (!$foreach.hasNext) end #end
#end
结果：
index => 0
count => 1

index => 1
count => 2
...
index => 4
count => 5
end
```

###string

velocity中字符串求值和php类似，双引号字符串里面的变量会被替换变量对应的值，单引
号原样返回，推荐尽量使用单引号，那样性能好一些。此外，双引号中变量替换，没有再次
调用语法分析器，而是使用正则，只支持简单的引用替换，比如`"$varname1 $foo.bar"`，
`"$foo.bar[1] $foo.bar()"`都不支持。如果需要完整支持字符串双引号，需要反复调用语
法分析器，考虑到性能，基本引用基本够用了，vm本身支持强大的变量赋值，可以先赋值，
在放入字符串，或者使用加法进行字符串拼接。

在java中可能大量使用双引号方式，因为java对象无法自动转换类型，双引号做类型转换用，
而在web端，js无此需要。

###velocity

```
Usage: velocity [options] [file ...]

Options:

  -h, --help         output usage information
  -V, --version      output the version number
  -b, --build        build .vm file to js ast module of kissy

Example:

  # parse vm file
  $ velocity a.vm 

  # parse vm file with json data
  $ velocity a.vm  a.json

  # build asts module of kissy
  $ velocity *.vm
```

##Helper

Helper提供一些额外的功能，主要用于解决vm数据模拟问题。

- `structure` 获取vm中所有变量的结构: `$foo.bar` => `foo: {bar: 'string'}`
- `backstep` vm逆推，根据velocity文件和解析后的结果，计算数据结构和内容
- `jsonify` 把vm转换为json结构，去除其中的html标签，比如：

jsonify文档[issue #11](https://github.com/shepherdwind/velocity.js/issues/11)

```
hello world $foo.name.
=>
{foo: { name: $foo.name }}
```

##License

(The MIT License)

Copyright (c) 2012-2013 Eward Song<eward.song@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
