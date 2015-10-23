安装
====
```javascript
cnpm install -g fis273
```
或
```javascript
npm install -g fis273
```

目录规范
=======

**文件名一律英文！**
------------------

**双下划线__开头的JS文件编译时不会被加上define头**
------------------

html
----
html模板存放目录，包括其依赖的样式以及图片资源，目前有两个子目录，pc表示主站，m表示m站

app
----
内部应用，该目录下的每个js文件在编译的时候会被加上define头

components
----------
第三方组件存放目录，通常为FIS组件，包含诸如jQuery、zepto等基础库

widget
----------
内部组件存放目录

pkg
---
打包文件存放目录

mod.js
------
模块加载器

map.json
------
资源映射关系表

fis273-conf.js
------
配置文件

编译
========
编译，$ENV为环境参数，可选值为：local|test|sim|online|debug，编译后的文件会分发到/fis/$ENV
```javascript
fis273 release $ENV
```
调试模式（纯前端加载，无需后端提供map.json）
```javascript
fis273 release debug -w
```
启动内置服务器进行预览，dist_path为对应的编译输出路径
```javascript
fis273 server start --root dist_path
```

打包配置
========
编辑fis273-conf.js，例：
```javascript
fis.config.set('pack', {
    'pkg/a_b.js': [
        'static/a.js',
        'static/b.js'
    ],
    'pkg/x_y.js': [
        'mod/x.js',
        'mod/y.js'
    ]
});
```
