/**
 * koa服务入口文件
 */
const Koa=require('koa')
const router=require('koa-router')()
const bodyParser=require('koa-bodyparser')

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

//add koa-bodyparser middleware
app.use(bodyParser())

//add router middleware
app.use(router.routes())
app.use(router.allowedMethods())

//监听端口
app.listen(8080)
console.log('koabon server is starting at port 8080')