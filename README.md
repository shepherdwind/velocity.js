Velocity - Template Engine 
==========================
[![Build Status](https://secure.travis-ci.org/shepherdwind/velocity.js.png)](https://travis-ci.org/shepherdwind/velocity.js)
[![NPM version](https://badge.fury.io/js/velocityjs.png)](http://badge.fury.io/js/velocityjs)

velocity.js是velocity模板语法的javascript实现。
[Velocity](http://velocity.apache.org/) 是基于Java的模板引擎，广泛应用在阿里集
体各个子公司。Velocity模板适用于大量模板使用的场景，支持复杂的逻辑运算，包含
基本数据类型、变量赋值和函数等功能。

在此，推荐一下沉鱼写的[velocity](https://github.com/fool2fish/velocity)。也是一个velocity模板的语法解释器，比我的写得好，错误处理很给力。

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

兼容ie6+，chrome等其他浏览器，[test case](http://git.shepherdwind.com/velocity.js/runner/tests.html)

点击[此处](http://git.shepherdwind.com/velocity.js/try/index.html)可以体验web
端velocity语法解析过程，注：使用ACE作为代码编辑器，仅支持高级浏览器访问。

虽然语法解释器可以在浏览器端执行，但是，不推荐那么用，后续不再打包浏览器版本。

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

context中得函数，有一个固定的`eval`方法，可以用来运算vm语法字符串，比如webx对应的
`$control.setTemplate`的[实现](https://github.com/shepherdwind/velocity.js/blob/master/tests/compile.js#L532)。

##Syntax

具体语法请访问官网文档：[velocity user guide](http://velocity.apache.org/engine/devel/user-guide.html)。

###Directives

Directives支持`set`, `foreach`, `if|else|elseif`, `macro`, `break`。不
支持有，`stop`, `evaluate`, `define`, `parse`。不过可以通过context来实现，比如
`parse` [实现](https://github.com/shepherdwind/velocity.js/blob/master/tests/compile.js#L458)。

###macro与parse

宏分为系统的宏，比如`parse, include`，和用户自定义宏，通过`#macro`在vm中定义，此
外可以使用自定义的js函数替代在vm中定义。对于系统宏和自定义宏，不做区分，对于
`#parse`和`#include`的调用，可以使用自定义函数来执行，可以参考测试用例中self defined macro部分。


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

##Questions

提问有几种方式

1. 新建[issue](https://github.com/shepherdwind/velocity.js/issues/new)
2. 邮件到eward.song at gmail.com
3. 阿里内部员工，可以通过hanwen.sah搜到我的旺旺

##License

(The MIT License)

Copyright (c) 2012-2013 Eward Song<eward.song at gmail.com>

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
