var fis = module.exports = require('fis3');
fis.require.prefixes.unshift('fis273');
fis.cli.name = 'fis273';
fis.cli.info = require('./package.json');

// 忽略文件
fis.set('project.ignore', [
    'output/**',
    'node_modules/**',
    '.git/**',
    'fis273-conf.js',
    '.svn/**',
    '*.md'
]);

// 公共模式
fis
    // 应用模块
    .match('app/**.js', {
        isMod : true
    })

    // fis3组件
    .match('components/**.js', {
        isMod : true
    })

    // 内部组件
    .match('widget/**.js', {
        isMod : true
    })

    // 两个下划线开头js文件为非模块
    .match(/__.*\.js$/, {
        isMod : false
    })

    // 图片纳入map.json
    .match('image', {
        useMap : true
    })

    // tpl2js
    .match('*.tpl', {
        useMap: true,
        rExt: '.js',
        isJsLike: true,
        parser: fis.plugin('tpl2js')
    })

    // 模块化加载方式 modJS
    .hook('module', {
        mod : 'commonJS'
    });

// 调试环境
fis.media('debug')
    // 纯前端方式加载
    .match('::package', {
        postpackager : fis.plugin('loader', {})
    })

    // 发布路径
    .match('*', {
        deploy : fis.plugin('local-deliver', {
            to : '/fis/debug'
        })
    });

// 本地环境
fis.media('local')
    // 发布路径
    .match('*', {
        deploy : fis.plugin('local-deliver', {
            to : '/fis/local'
        })
    });

// 测试环境
fis.media('test')
    // 发布路径
    .match('*', {
        deploy : fis.plugin('local-deliver', {
            to : '/fis/test'
        })
    });

// 模拟环境
fis.media('sim')
    // js压缩、加版本号
    .match('*.js', {
        useHash : true,
        optimizer : fis.plugin('uglify-js')
    })

    // css压缩、加版本号
    .match('*.css', {
        useHash : true,
        optimizer : fis.plugin('clean-css')
    })

    // 图片加版本号
    .match('image', {
        useHash : true
    })

    // png优化 该选项引起过core dump 故废除
    //.match('*.png', {
    //    optimizer : fis.plugin('png-compressor')
    //})

    // 发布路径
    .match('*', {
        deploy : fis.plugin('local-deliver', {
            to : '/fis/sim'
        })
    });

// 线上环境
fis.media('online')
    // js压缩、加版本号
    .match('*.js', {
        useHash : true,
        optimizer : fis.plugin('uglify-js')
    })

    // css压缩、加版本号
    .match('*.css', {
        useHash : true,
        optimizer : fis.plugin('clean-css')
    })

    // 图片加版本号
    .match('image', {
        useHash : true
    })

    // png优化 该选项引起过core dump 故废除
    //.match('*.png', {
    //    optimizer : fis.plugin('png-compressor')
    //})

    // 定义发布路径
    .match('*', {
        deploy : fis.plugin('local-deliver', {
            to : '/fis/online'
        })
    });

// 按项目输出
fis.match('*', {
    release : '${project}/$0'
});

