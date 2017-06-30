/**
 * koa服务入口文件
 */
const Koa=require('koa')
const router=require('koa-router')()

//创建Koa对象
const app=new Koa()

router.get('/', async (ctx, next)=>{
	ctx.response.body='<h1>首页</h1>'
})
router.get('/login', async (ctx, next)=>{
	ctx.response.body='<h1>用户登录页面</h1>'
})

//add router middleware
app.use(router.routes())
app.use(router.allowedMethods())

//监听端口
app.listen(8080)
console.log('koabon server is starting at port 8080')