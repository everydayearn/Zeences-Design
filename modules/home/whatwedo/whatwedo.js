define(function(require, exports, module) {
	// 引入观察者
	var Observer = require("modules/tools").Observer;
	// 添加视图
	MVC.addView("home.whatwedo", function(M) {
		var dom = document.createElement("div");
		dom.innerHTML = "whatwedo";
		return dom;
	});

	// 添加控制器
	MVC.addCtrl("home.whatwedo", function(M, V) {
		Observer.on("msg", function() {
			console.log("home.whatwedo模块开始创建视图");
			var dom = V.create("home.whatwedo");
			// 将dom元素放入home元素中
			var home = document.getElementById("home");
			home.appendChild(dom);
		});
	});
});