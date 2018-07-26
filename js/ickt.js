// 定义一个全局变量
var ickt = {
	// 定义get方法 负责发送get请求
	/*
	 * @url  字符串地址   /checkName
	 * @data  携带的数据  可以是字符串 可以是对象 
	 * @callback  回调函数  function() {} 回调函数中 有一个参数就是返回回来的数据
	 */
	get: function(url, data, callback) {
		// 定义变量 用于解析data 
		var str = "";
		// 判定data的类型 如果是字符串 那么直接拼接 如果是对象 转为字符串再拼接
		if(typeof data === "string") {
			str = data;
		} else if(typeof data === "object") {
			for(var i in data) {
				str += i + "=" + data[i] + "&";
			}
			str = str.slice(0, -1);
		}
		// 定义变量
		var xhr = null;
		// 判定兼容性并初始化
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHttp");
		} else {
			console.log("您的浏览器不支持ajax，请升级");
			return;
		}
		// 设置onreadystatechange事件
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				// 执行回调函数
				callback(JSON.parse(xhr.responseText));
			}
		}
		// open方法
		xhr.open("get", url + "?" + str, true);
		// send方法
		xhr.send();
	},

	// 定义post方法 负责发送post请求
	/*
	 * @url  URL地址字符串
	 * @data  携带的数据  可以是字符串 也可以是对象 不可省略
	 * @callback  回调函数  
	 */
 	post: function(url, data, callback) {
 		// 定义字符串变量
 		var str = '';

 		// 判定data是字符串还是对象
 		if(typeof data === "string") {
 			str = data;
 		} else if(typeof data === "object") {
 			// 此时，传递进来的是对象 我们要将该对象格式化成k=v&k1=v1的形式
 			for(var i in data) {
 				str += i + "=" + data[i] + "&";
 			}
 			// 循环完毕之后 多了一个&符号在最后面 要去掉
 			str = str.slice(0, -1);
 		}
 		// 发送ajaxpost请求
 		var xhr = null;
 		// 能力检测
 		if(window.XMLHttpRequest) {
 			xhr = new XMLHttpRequest();
 		} else if(window.ActiveXObject) {
 			xhr = new ActiveXObject("Microsoft.XMLHttp");
 		} else {
 			// 说明不支持ajax
 			console.log("抱歉，您的浏览器不支持AJAX，请升级");
 			return;
 		}
 		// 设置onreadystatechange
 		xhr.onreadystatechange = function() {
 			// 只有在状态码为4时 才可以执行回调函数
 			if(xhr.readyState === 4) {
 				callback(JSON.parse(xhr.responseText));
 			}
 		}
 		// 调用open方法
 		xhr.open("post", url, true);
 		// 模拟成表单提交
 		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
 		// 发送数据
 		xhr.send(str);
 	}
}


// // 使用
// ickt.get("/sdfsdf", "k=v&k1=v1", function(data) {

// });