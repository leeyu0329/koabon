# koabon

参考来自https://chenshenhai.github.io/koa2-note/

序言

koabon由来：





8、PM2  实现nodeapp自动重启

首先安装它，需要全局模式安装
npm install -g pm2

进入项目目录
pm2 start app.js   		启动程序
pm2 restart app.js 		重启程序
pm2 stop app.js  			停止程序
pm2 list							列出所有程序的列表
pm2 delete app 				删除进程

监控程序修改实现自动重启
pm2 start app.js --watch


