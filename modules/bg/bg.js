define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools");
	var format = tools.format;
	// 添加数据
	MVC.addModel("bg", {
		arr: ["imgs/art/bg1.jpg", "imgs/art/bg2.jpg", "imgs/art/bg3.jpg", "imgs/art/bg4.jpg", "imgs/art/bg5.jpg", "imgs/art/bg6.jpg"],
		idx: parseInt(Math.random() * 6)
	});

	// 添加视图 --- 创建元素方式
	MVC.addView("bg", function(M) {
		// 创建视图 
		// 创建dom结构，与数据进行渲染，让用户看到
		// 1 获取容器元素
		var dom = document.getElementById("bg");
		// 2 获取数据
		var data = M.get("bg");
		// 3 创建元素
		var ul = document.createElement("ul");
		for(var i = 0; i < data.arr.length; i++) {
			var li = document.createElement("li");
			if(i === data.idx) {
				li.className = "active";
			}
			var img = new Image();
			img.src = data.arr[i];
			li.appendChild(img);
			ul.appendChild(li);
		}
		// 4 填充容器
		dom.appendChild(ul);
		// 5 返回容器
		return dom;
	});


	// 添加视图 --- 模板创建方式
	// MVC.addView("bg", function(M) {
	// 	// 创建视图 
	// 	// 创建dom结构，与数据进行渲染，让用户看到
	// 	// 1 获取容器元素
	// 	var dom = document.getElementById("bg");
	// 	// 2 获取数据
	// 	var data = M.get("bg");
	//  	// 3 定义模板
	//  	var tpl = '<ul><%tpl%></ul>';
	//  	// 4 定义小模板
	//  	var li_tpl = '<li><img src="<%item%>" alt="" /></li>';
	//  	// 5 定义字符串 准备接受数据
	//  	var html = '';
	//  	var li_html = ''; 
	//  	// 6 格式化小模板
	//  	for(var i = 0; i < data.arr.length; i++) {
	//  		li_html += format(li_tpl, {item: data.arr[i]});
	//  	}
	//  	// 7 格式化模板
	//  	html = format(tpl, {tpl: li_html});
	//  	// 8 填充容器
	//  	dom.innerHTML = html;
	//  	// 9 返回容器
	//  	return dom;
	// });
	
	// 添加控制器
	MVC.addCtrl("bg", function(M, V) {
		// 控制器里面调用V去创建视图
		var dom = V.create("bg");
		// 背景模块的交互就是一个呼吸轮播图
		var $dom = $(dom);
		// 获取信号量
		var idx = M.get("bg.idx");
		// 获取内部的所有li
		var $lis = $dom.find("li");
		// 设置一个定时器
		var timer = setInterval(function() {
			$lis.eq(idx).animate({opacity: 0}, 1000);
			idx++;
			if(idx >= $lis.length) {
				idx = 0;
			}
			$lis.eq(idx).animate({opacity: 1}, 1000);
		}, 2000)
	});
});