// 搭建服务器
var http = require("http");
// 读取文件
var fs = require("fs");
// 引入url
var url = require("url");
// 引入 querystring模块
var qs = require("querystring");

// 定义一个MIMEType类型对象
var MIMEType = {  
	"*"	      :"application/octet-stream",
	"323"	    :"text/h323",
	"acx"	    :"application/internet-property-stream",
	"ai"	    :"application/postscript",
	"aif"	    :"audio/x-aiff",
	"aifc"    :"audio/x-aiff",
	"aiff"    :"audio/x-aiff",
	"asf"	    :"video/x-ms-asf",
	"asr"	    :"video/x-ms-asf",
	"asx"	    :"video/x-ms-asf",
	"au"	    :"audio/basic",
	"avi"	    :"video/x-msvideo",
	"axs"	    :"application/olescript",
	"bas"	    :"text/plain",
	"bcpio"	  :"application/x-bcpio",
	"bin"	    :"application/octet-stream",
	"bmp"	    :"image/bmp",
	"c"	      :"text/plain",
	"cat"	    :"application/vnd.ms-pkiseccat",
	"cdf"	    :"application/x-cdf",
	"cer"	    :"application/x-x509-ca-cert",
	"class"	  :"application/octet-stream",
	"clp"	    :"application/x-msclip",
	"cmx"	    :"image/x-cmx",
	"cod"	    :"image/cis-cod",
	"cpio"	  :"application/x-cpio",
	"crd"	    :"application/x-mscardfile",
	"crl"	    :"application/pkix-crl",
	"crt"	    :"application/x-x509-ca-cert",
	"csh"	    :"application/x-csh",
	"css"	    :"text/css",
	"dcr"	    :"application/x-director",
	"der"	    :"application/x-x509-ca-cert",
	"dir"	    :"application/x-director",
	"dll"	    :"application/x-msdownload",
	"dms"	    :"application/octet-stream",
	"doc"	    :"application/msword",
	"dot"	    :"application/msword",
	"dvi"	    :"application/x-dvi",
	"dxr"	    :"application/x-director",
	"eps"	    :"application/postscript",
	"etx"	    :"text/x-setext",
	"evy"	    :"application/envoy",
	"exe"	    :"application/octet-stream",
	"fif"	    :"application/fractals",
	"flr"	    :"x-world/x-vrml",
	"gif"	    :"image/gif",
	"gtar"	  :"application/x-gtar",
	"gz"	    :"application/x-gzip",
	"h"	      :"text/plain",
	"hdf"	    :"application/x-hdf",
	"hlp"	    :"application/winhlp",
	"hqx"	    :"application/mac-binhex40",
	"hta"	    :"application/hta",
	"htc"	    :"text/x-component",
	"htm"	    :"text/html",
	"html"	  :"text/html",
	"htt"	    :"text/webviewhtml",
	"ico"	    :"image/x-icon",
	"ief"	    :"image/ief",
	"iii"	    :"application/x-iphone",
	"ins"	    :"application/x-internet-signup",
	"isp"	    :"application/x-internet-signup",
	"jfif"	  :"image/pipeg",
	"jpe"	    :"image/jpeg",
	"jpeg"	  :"image/jpeg",
	"jpg"	    :"image/jpeg",
	"js"	    :"application/x-javascript",
	"latex"	  :"application/x-latex",
	"lha"	    :"application/octet-stream",
	"lsf"	    :"video/x-la-asf",
	"lsx"	    :"video/x-la-asf",
	"lzh"	    :"application/octet-stream",
	"m13"	    :"application/x-msmediaview",
	"m14"	    :"application/x-msmediaview",
	"m3u"	    :"audio/x-mpegurl",
	"man"	    :"application/x-troff-man",
	"mdb"	    :"application/x-msaccess",
	"me"	    :"application/x-troff-me",
	"mht"	    :"message/rfc822",
	"mhtml"	  :"message/rfc822",
	"mid"	    :"audio/mid",
	"mny"	    :"application/x-msmoney",
	"mov"	    :"video/quicktime",
	"movie"	  :"video/x-sgi-movie",
	"mp2"	    :"video/mpeg",
	"mp3"	    :"audio/mpeg",
	"mpa"	    :"video/mpeg",
	"mpe"	    :"video/mpeg",
	"mpeg"	  :"video/mpeg",
	"mpg"	    :"video/mpeg",
	"mpp"	    :"application/vnd.ms-project",
	"mpv2"	  :"video/mpeg",
	"ms"	    :"application/x-troff-ms",
	"mvb"	    :"application/x-msmediaview",
	"nws"	    :"message/rfc822",
	"oda"	    :"application/oda",
	"p10"	    :"application/pkcs10",
	"p12"	    :"application/x-pkcs12",
	"p7b"	    :"application/x-pkcs7-certificates",
	"p7c"	    :"application/x-pkcs7-mime",
	"p7m"	    :"application/x-pkcs7-mime",
	"p7r"	    :"application/x-pkcs7-certreqresp",
	"p7s"	    :"application/x-pkcs7-signature",
	"pbm"	    :"image/x-portable-bitmap",
	"pdf"	    :"application/pdf",
	"pfx"	    :"application/x-pkcs12",
	"pgm"	    :"image/x-portable-graymap",
	"pko"	    :"application/ynd.ms-pkipko",
	"pma"	    :"application/x-perfmon",
	"pmc"	    :"application/x-perfmon",
	"pml"	    :"application/x-perfmon",
	"pmr"	    :"application/x-perfmon",
	"pmw"	    :"application/x-perfmon",
	"pnm"	    :"image/x-portable-anymap",
	"pot"	    :"application/vnd.ms-powerpoint",
	"ppm"	    :"image/x-portable-pixmap",
	"pps"	    :"application/vnd.ms-powerpoint",
	"ppt"	    :"application/vnd.ms-powerpoint",
	"prf"	    :"application/pics-rules",
	"ps"	    :"application/postscript",
	"pub"	    :"application/x-mspublisher",
	"qt"	    :"video/quicktime",
	"ra"	    :"audio/x-pn-realaudio",
	"ram"	    :"audio/x-pn-realaudio",
	"ras"	    :"image/x-cmu-raster",
	"rgb"	    :"image/x-rgb",
	"rmi"	    :"audio/mid http://www.dreamdu.com",
	"roff"	  :"application/x-troff",
	"rtf"	    :"application/rtf",
	"rtx"	    :"text/richtext",
	"scd"	    :"application/x-msschedule",
	"sct"	    :"text/scriptlet",
	"setpay"	:"application/set-payment-initiation",
	"setreg"	:"application/set-registration-initiation",
	"sh"	    :"application/x-sh",
	"shar"	  :"application/x-shar",
	"sit"     :"application/x-stuffit",
	"snd"     :"audio/basic",
	"spc"     :"application/x-pkcs7-certificates",
	"spl"     :"application/futuresplash",
	"src"     :"application/x-wais-source",
	"sst"     :"application/vnd.ms-pkicertstore",
	"stl"     :"application/vnd.ms-pkistl",
	"stm"     :"text/html",
	"svg"     :"image/svg+xml",
	"sv4cpio"	:"application/x-sv4cpio",
	"sv4crc"	:"application/x-sv4crc",
	"swf"	    :"application/x-shockwave-flash",
	"t"	      :"application/x-troff",
	"tar"	    :"application/x-tar",
	"tcl"	    :"application/x-tcl",
	"tex"	    :"application/x-tex",
	"texi"	  :"application/x-texinfo",
	"texinfo"	:"application/x-texinfo",
	"tgz"	    :"application/x-compressed",
	"tif"	    :"image/tiff",
	"tiff"	  :"image/tiff",
	"tr"	    :"application/x-troff",
	"trm"	    :"application/x-msterminal",
	"tsv"	    :"text/tab-separated-values",
	"txt"	    :"text/plain",
	"uls"	    :"text/iuls",
	"ustar"	  :"application/x-ustar",
	"vcf"	    :"text/x-vcard",
	"vrml"	  :"x-world/x-vrml",
	"wav"   	:"audio/x-wav",
	"wcm"     :"application/vnd.ms-works",
	"wdb"     :"application/vnd.ms-works",
	"wks"     :"application/vnd.ms-works",
	"wmf"     :"application/x-msmetafile",
	"wps"     :"application/vnd.ms-works",
	"wri"     :"application/x-mswrite",
	"wrl"     :"x-world/x-vrml",
	"wrz"     :"x-world/x-vrml",
	"xaf"     :"x-world/x-vrml",
	"xbm"     :"image/x-xbitmap",
	"xla"     :"application/vnd.ms-excel",
	"xlc"     :"application/vnd.ms-excel",
	"xlm"     :"application/vnd.ms-excel",
	"xls"     :"application/vnd.ms-excel",
	"xlt"     :"application/vnd.ms-excel",
	"xlw"     :"application/vnd.ms-excel",
	"xof"     :"x-world/x-vrml",
	"xpm"     :"image/x-xpixmap",
	"xwd"     :"image/x-xwindowdump",
	"z"	      :"application/x-compress",
	"zip"     :"application/zip"
}
// 定义一个数组 当做临时的数据库
var db = [{username: "wanglaowu", password: "123"}];

// 调用方法创建服务器
var server = http.createServer(function(req, res) {
	// 获取cookie
	var cookie = req.headers.cookie;
	// 定义用户姓名
	var login_obj = qs.parse(cookie, ";");
	var username = login_obj.username;
	var password = login_obj.password;




	var url_obj = url.parse(req.url, true);
	var url_str = url_obj.pathname;

	// 获取query附加数据 
	var query = url_obj.query;
	// 请求方式
	var type = req.method.toLowerCase();
	// 判定注册路由
	if(url_str === "/regist" && type === "post") {
		// 设定响应头
		res.setHeader("content-type", "text/plain;charset=utf-8");
		// 定义变量 负责接受数据
		var str = "";
		// 说明是post请求提交
		req.on("data", function(data_chunk) {
			str += data_chunk;
		});
		// 设定end事件
		req.on("end", function() {
			var query = decodeURIComponent(str);
			var obj = qs.parse(query);
			// console.log(obj);
			for(var i = 0; i < db.length; i++) {
				if(db[i].username === obj.username) {
					// 说明有重复的了 
					res.end("抱歉，用户名已经被占用");
					return;
				} 
			}
			// 说明没有重复的
			db.push(obj);
			// 将数据放入数组 并且提示用户 注册成功
			res.end("恭喜，注册成功");
		});
		// 中止函数的执行
		return;
	}
	// 判定登录路由
	if(url_str === "/login" && type === "post") {
		// 设置响应头
		res.setHeader("content-type", "text/plain;charset=utf-8");
		// 定义变量 
		var data = "";
		// 获取前端提交过来的数据 
		req.on("data", function(data_chunk) {
			data += data_chunk;
		});
		// 监听end事件
		req.on("end", function() {
			// console.log(data);
			// 获取解码后的数据
			var obj = qs.parse(decodeURIComponent(data));
			// console.log(obj);
			// 循环与数组中的每一条数据 比较
			for(var i = 0; i < db.length; i++) {
				if(db[i].username === obj.username && db[i].password === obj.password) {
					// 说明登陆成功
					// 返回信息给前端
					fs.readFile("html/welcome.html", function(err, data) {
						if(err) {
							console.log("读取失败");
							return;
						}
						// 将用户名和密码设置到cookie中去
						res.setHeader("set-cookie", ["username=" + obj.username, "password=" + obj.password]);
						// 设置响应内容编码和类型
						res.setHeader("content-type", "text/html;charset=utf-8");
						// 返回具体的响应内容
						res.end(data);
					})
					return;
				}
			}
			// 如果执行到这里 说明一条数据也没对上
			res.end("抱歉 登录失败");
		});
		return;
	}

	// 设置welcome.html路由
	if(url_str === "/html/welcome.html") {
		// 判断必须要登陆 
		if(username) {
			fs.readFile("html/welcome.html", function(err, data) {
				res.setHeader("content-type", "text/html;charset=utf-8");
				res.end(data);
			});
			return
		} else {
			res.setHeader("content-type", "text/plain;charset=utf-8");
			// 没有登陆 
			res.end("不登录 不让看");
			return;
		}
	}
 	
 	// 判断/checkName路由
 	if(url_str === "/checkName" && type === "get") {
 		// 获取前端提交过来的用户名
 		var username = query.username;
 		console.log(username);
 		// 循环db数组 挨个与username比较 如果存在 那么返回存在如果不存在 返回不存在
 		for(var i = 0; i < db.length; i++) {
 			if(db[i].username === username) {
 				// 说明存在
 				// 定义一个json
 				var resultJSON = {
 					error: 0,
 					data: "用户存在"
 				}
 				// 设置响应头
 				res.setHeader("content-type", "text/plain;charset=utf-8");
 				// 返回数据
 				res.end(JSON.stringify(resultJSON));
 				return;
 			}
 		}
 		// 定义对象
 		var resultJSON = {
 			error: 1,
 			data: "用户不存在"
 		}
 		// 执行完毕 说明没有匹配到
 		// 设置响应头
		res.setHeader("content-type", "text/plain;charset=utf-8");
		// 返回数据
		res.end(JSON.stringify(resultJSON));
 		return;
 	}

	// 获取文件后缀名
	var extName = url_str.slice(url_str.lastIndexOf(".") + 1);
	// 一开始，通过req.url进行判定 并单独读取
	// 后来发现只要是读取的文件那么与读取的文件路径就差一个.
	// 强行读取文件
	fs.readFile("." + url_str, function(err, data) {
		// 判定 如果err是对象说明文件不存在
		if(err) {
			res.setHeader("content-type", "text/plain;charset=utf-8");
			res.end("抱歉，读取的文件" + req.url + "不存在");
			return;
		}
		// 如果出现乱码 那么要设置content-type响应头
		res.setHeader("content-type", MIMEType[extName] + ";charset=utf-8");
		// 如果代码能够执行到这里 说明有文件
		// 返回给前端
		res.end(data);
	});
});

// 监听端口号
server.listen(3000);