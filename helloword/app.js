const Koa=require('koa')
const app=new Koa()

app.use(async (ctx)=>{
	ctx.body='hello koa2'
})

app.listen(8080)
console.log('koabon server is starting at port 8080')