Velocity Template Language(VTL) for JavaScript
---------------------------------------------

JavaScript版本VTL，Velocity是基于Java的模板引擎，veloctiy.js是JS版本的实现，实现
依据[velocity user guide](http://velocity.apache.org/engine/devel/user-guide.html)。

##Doc

[velocity user guide](http://velocity.apache.org/engine/devel/user-guide.html)

##Use

velocity.js使用分为web端和本地使用，web端作为一个模板引擎，本地作为node模板使用。

###On Web

web浏览器使用，作为KISSY的一个模块，编译通过`Cakefile`完成，同样可以编译适用其他
库，使用js在`build/veloctiy/`目录中: 

- `index.js` Velocity解释器
- `parse.js` Velocity语法分析器

把语法分析和解释器分开，为了方便在本地编译语法书，在web端少做一些计算。本地编译
模板的思路，源自KISSY的[xtemplate](http://docs.kissyui.com/docs/html/api/component/xtemplate/)。

虽然语法解释器可以在浏览器端执行，但是，不推荐那么使用。

第一种方式，解释和语法分析同时执行：

  ```js
KISSY.use('velocity/index, velocity/parse', function(S, Velocity, Parser){
  var html = (S.all('#tpl').html());
  var asts = Parser.parse(html);
  var compile = new Velocity(asts);
  console.log(compile.render());
});
  ```
  
第二种方式，线下编译：

```
使用velocity命令行工具打包
veloctiy --build *.vm
veloctiy -b *.vm
```

浏览器使用：

```js
KISSY.use('velocity/index, web/directives', function(S, Velocity, asts){
  var compile = new Velocity(asts);
  console.log(compile.render());
});
```

###模板引用

支持模板使用`#parse('file.vm')`形式引用其他模板，在web端引用依据kissy的模块加载
机制。

```html
#parse("web/macro.vm")
#set( $parts = ["volva","stipe","annulus","gills","pileus"] )
#set( $cellbgcol = "#CC00FF" )
<table>
  #tablerows( $cellbgcol $parts )
</table>
```

macro.vm中定义：

```
#macro( tablerows $color $somelist )
  #foreach( $something in $somelist )
    <tr><td bgcolor=$color>$something</td></tr>
  #end
#end
```

###On nodejs

node端和web端api使用一致。
