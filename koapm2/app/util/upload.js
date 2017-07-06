/**
 * 文件上传功能
 */
const inspect=require('util').inspect
const path=require('path')
const os=require('os')
const fs=require('fs')
const Busboy=require('busboy')

/**
 * 递归同步创建文件目录
 * @param  {string}   dirname 目录绝对地址
 * @return {boolean}          创建目录结果
 */
function mkdirsSync(dirname){
	if(fs.existsSync(dirname)){
		return true
	}else{
		if(mkdirsSync(path.dirname(dirname))){
			fs.mkdirSync(dirname)
			return true
		}
	}
}

/**
 * 获取文件的后缀名
 * @param  {string}   fileName 文件名
 * @return {string}            文件后缀名
 */
function getSuffixName(fileName){
	let nameList=fileName.split('.')
	return nameList[nameList.length-1]
}

/**
 * 上传文件
 * @param  {oject}   ctx     koa上下文
 * @param  {object}  options 文件上传参数 fileType文件类型，path文件存放路径
 * @return {promise} 
 */
function uploadFile(ctx, options){
	console.log('I am comming')

	let req=ctx.req
	let res=ctx.res
	let busboy=new Busboy({headers: req.headers})

	//文件类型
	let fileType=options.fileType || 'common'
	let filePath=path.join(options.path, fileType)
	let mkdirResult=mkdirsSync(filePath)

	return new Promise((resolve, reject)=>{
		console.log('文件上传中...')

		let result={
			success:false,
			message:'',
			data:null
		}

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
			let fileName=Math.random().toString(16).substr(2)+'.'+getSuffixName(filename)
			let _uploadFilePath=path.join(filePath, fileName)
			let saveTo=path.join(_uploadFilePath)

			//文件保持到指定的路径
			file.pipe(fs.createWriteStream(saveTo))

			file.on('end', function(){
				result.success=true
				result.message='文件上传成功！'
				result.data={
					pictureUrl:`//${ctx.host}/upload/${fileType}/${fileName}`
				}

				console.log('文件上传成功！')
				resolve(result)
			})
		})

/*		// 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val))
      result.formData[fieldname] = inspect(val)
    })*/

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
	})
}

module.exports = {
	uploadFile
}