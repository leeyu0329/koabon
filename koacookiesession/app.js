/**
 * koa服务入口文件
 */
const Koa=require('koa')
const router=require('koa-router')()
const bodyParser=require('koa-bodyparser')
const path=require('path')
const static=require('koa-static')

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
	let html=`
	<h1>用户登录页面</h1>
  <form method="POST" action="/login_do">
    <p>UserName</p>
    <input type="text" name="username" /><br/>
    <p>Password</p>
    <input type="password" name="password" /><br/><br/>
    <button type="submit">submit</button>
  </form>
	`
	ctx.response.body=html
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

//add router middleware
app.use(router.routes())
app.use(router.allowedMethods())

//add static middleware
app.use(static(path.join(__dirname, './static')))

//监听端口
app.listen(8080)
console.log('koabon server is starting at port 8080')