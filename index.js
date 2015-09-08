var fis = module.exports = require('fis3');
fis.require.prefixes.unshift('fis273');
fis.cli.name = 'fis273';
fis.cli.info = require('./package.json');

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

    // 非模块
    .match('static/**', {
        isMod : false
    })

    // 打包
    .match('pkg/**.js', {
        isMod : true
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
        release : '$0',
        deploy : fis.plugin('local-deliver', {
            to : '/fis/debug'
        })
    });

// 测试环境
fis.media('test')
    // 发布路径
    .match('*', {
        release : '$0',
        deploy : fis.plugin('local-deliver', {
            to : '/fis/test'
        })
    });

// 生产环境
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

    // png优化
    .match('*.png', {
        optimizer : fis.plugin('png-compressor')
    })

    // 重新定义发布路径
    .match('*', {
        release : '$0',
        deploy : fis.plugin('local-deliver', {
            to : '/fis/online'
        })
    });

