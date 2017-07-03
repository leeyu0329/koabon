/**
 * koa服务入口文件
 */
const Koa=require('koa')
const router=require('koa-router')()
const bodyParser=require('koa-bodyparser')
const path=require('path')
const static=require('koa-static')
const views=require('koa-views')

//创建Koa对象
const app=new Koa()

router.get('/', async (ctx, next)=>{
	let url=ctx.url

	let request_query=ctx.request.query
	let request_querystring=ctx.request.querystring

	let ctx_query=ctx.query
	let ctx_querystring=ctx.querystring

	ctx.response.type='aplication/json'
	ctx.response.body={
    url,
    request_query,
    request_querystring,
    ctx_query,
    ctx_querystring
  }
})
router.get('/login', async (ctx, next)=>{
	await ctx.render('login', {
		'title':'用户登录'
	})

	console.log(ctx.cookies.get('uid'))
})

router.post('/login_do', async (ctx, next)=>{
	//直接利用ctx.request.body获取表单提交数据
	let postData=ctx.request.body
	ctx.response.type='aplication/json'
	ctx.response.body=postData
})

router.get('/cookie', async (ctx, next)=>{
	//设置cookie
	
	ctx.cookies.set(
		'uid',
		'koauseraaaaa',
		{
			domain:'localhost', //写cookie所在的域名
			path:'/cookie', //写cookie所在的路径
			maxAge:24*60*60*365, //cookie有效时长
			expires:new Date('2017-12-30'), //cookie失效时间
			httpOnly:false, //是否只用于http请求中获取
			overwrite:false //是否允许重写
		}
	)

	console.log(ctx.cookies.get('uid'))

	let html=`
	<h1>Cookie</h1>
	`
	ctx.response.body=html
})

//session 暂时不提供支持

//add koa-bodyparser middleware
app.use(bodyParser())

// add view middleware
/**
 * 填坑记录
 *
 * 一定要在router加载之前，不然会出现500
 */
app.use(views(path.join(__dirname, './app/view'), {
  extension: 'ejs'
}))

//add static middleware
app.use(static(path.join(__dirname, './static')))

//add router middleware
app.use(router.routes())
app.use(router.allowedMethods())

//监听端口
app.listen(8080)
console.log('koabon server is starting at port 8080')