define(function(require, exports, module) {
	// 引入观察者
	var Observer = require("modules/tools").Observer;
	// 因为home模块并没有具体的创建视图方法 它只是负责发送请求 将数据放入M层即可。
	MVC.addCtrl("home", function(M, V) {
		$.ajax({
			url: "/data/home.json",
			type: "get",
			dataType: "json",
			data: "",
			success: function(data) {
				console.log("home数据请求回来了");
				// 数据请求回来了 放入M层
				M.add("home", data.data);
				// 通过观察者将消息发布出去
				Observer.trigger("msg");
			}
		});
	});
});