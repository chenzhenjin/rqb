const NODE_ENV = process.env.NODE_ENV
console.log('NODE_ENV', NODE_ENV)
module.exports = {
  title: '人气宝重构3.0',
  description: '细节技术文档',
  dest: './rqb', //打包输出目录
  // base: '/rqb/', //github 的gh-pages设置
  base: NODE_ENV === 'development' ? '/' : '/rqb/', //根目录设置
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  // 这里图标要放在public  dev运行也算是打包过程，只不过看不到文件目录
  // 可以根据rqb目录对项目文件放置做参考
  themeConfig: {
    // search: true, //搜索
    // searchMaxSuggestions: 10,
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: '个人博客',
        items: [
          { text: '简书', link: 'https://www.jianshu.com/u/335754b3b218' },
          { text: 'github', link: 'https://github.com/chenzhenjin/' }
        ]
      }
    ],
    sidebar: {
      '/release/': [
        {
          title: '发布任务',
          collapsable: false, //可折叠
          children: [
            { title: 'computed', path: '/release/computed' },
            { title: 'json', path: '/release/json' },
            { title: 'map', path: '/release/map' },
            { title: '书写md常见问题', path: '/release/writeMD' }
          ],
          sidebarDepth: 2,
          activeHeaderLinks: false
        }
      ]
    }
  }
}
