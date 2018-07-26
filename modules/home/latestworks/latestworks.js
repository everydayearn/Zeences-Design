define(function(require, exports, module) {
	// 引入工具模块 并使用内部的观察者
	var tools = require("modules/tools");
	var Observer = tools.Observer;

	// 添加视图
	MVC.addView("home.latestworks", function(M) {
		// 创建容器元素
		var dom = document.createElement("div");
		dom.innerHTML = "latestworks";
		return dom;
	});
	// 添加控制器
	MVC.addCtrl("home.latestworks", function(M, V) {
		Observer.on("msg", function() {
			// 当msg事件触发了 说明父模块将信息请求回来了。执行创建视图代码。
			console.log("home.latestworks模块创建视图");
			var dom = V.create("home.latestworks");
			// 将dom元素放入home元素中
			var home = document.getElementById("home");
			home.appendChild(dom);
		});
	});
});