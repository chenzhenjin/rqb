module.exports = {
  title: "人气宝重构3.0",
  description: "细节技术文档",
  dest: './rqb',
  base: '/rqb/',
  themeConfig: {
    // search: true, //搜索
    // searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    nav: [
      { text: '个人文章', items: [
        { text: '简书', link: 'https://www.jianshu.com/u/335754b3b218' }
      ]}
    ],
    sidebar: {
      '/release/': [{
				title: '发布流量',
				collapsable: false, 
				children: [
					{ title: 'computed', path:'/release/computed'},
					{ title: 'json', path:'/release/json'},
					{ title: 'map', path:'/release/map'}
				]
			}],
    },
  },
};
