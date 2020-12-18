### vuepress搭建的博客静态网站
- 目前github在线浏览有点问题，不过还是先留着链接
- [在线博客链接](https://chenzhenjin.github.io/rqb/)
#### 编写说明
- docs的readme.md用来写首页，首页的放置在public 
- .vuepress用来写博客文章
#### 使用说明
- 安装依赖 yarn 
- 本地开发运行 npm run docs:dev
- 本地打包运行 npm run docs:build 
  - 域名下要有rqb目录能正常打开
- 本地live-server（vscode 插件）运行rqb目录的index.html文件即可查看效果
- 先运行打包 再推送指定目录到远程仓库的在线浏览分支 git subtree push --prefix=rqb origin gh-pages