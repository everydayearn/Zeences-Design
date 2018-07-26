define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools");
	// 定义格式化函数
	var format = tools.format;
	// 因为数据在服务器上，所以没有办法直接addModel了 需要先发送ajax请求 将数据请求回来 再放入model层
	// 添加视图
	MVC.addView("header", function(M) {
		// 1 获取元素
		var dom = document.getElementById("header");
		// 2 获取数据
		var data = M.get("header");
		// 3 定义模板
		var tpl = [
			'<div class="container">',
				'<div class="top clearfix">',
					'<h1 class="fl"><img src="imgs/logo.png" alt="" /></h1>',
					'<ul class="fr clearfix"><%icon_tpl%></ul>',
				'</div>',
				'<div class="nav">',
					'<ul class="clearfix"><%nav_tpl%></ul>',
				'</div>',
			'</div>'
		].join("");
		// 3.1 定义小模板 用于格式化icons
		var icon_tpl = '<li class="fl"><a href="<%href%>"><img src="imgs/<%img%>" alt="" /></a></li>';
		// 3.2 定义小模板 用于格式化nav
		var nav_tpl = '<li class="fl"><a href="<%href%>"><%title%></a><ul><%li_tpl%></ul></li>';
		// 3.3 定义小模板 用于格式化nav中的li
		var nav_li_tpl = '<li><a href="<%href%>"><%title%></a></li>';
		// 4 定义字符串
		var html = '';
		// 4.1 定义小字符串 用于承接icons的html文案
		var icon_html = '';
		// 4.2 定义小字符串 用于承接格式化nav文案
		var nav_html = '';

		// 5 格式化
		// 5.1 先格式化icon_tpl
		var icons = data.icon;
		icons.forEach(function(value, index) {
			icon_html += format(icon_tpl, value);
		});
		console.log(icon_html);
		// 5.2 再格式化nav_tpl
		var navs = data.nav;
		navs.forEach(function(value, index) {
			// 循环格式化nav_tpl 但是在格式化之前需要3个值 一个是href我们可以从value中得到 一个是title 也可以从value中得到 但是li_tpl得不到
			// 在格式之前先把需要的li_tpl格式化出来
			var li_html = '';
			var list = value.list || [];
			list.forEach(function(val, idx) {
				li_html += format(nav_li_tpl, val);
			});
			nav_html += format(nav_tpl, {
				href: value.href,
				title: value.title,
				li_tpl: li_html
			});
		});
		// 循环完毕之后就得到nav的字符串了
		console.log(nav_html);
		// 最终格式化
		html = format(tpl, {
			icon_tpl: icon_html,
			nav_tpl: nav_html
		});
		// 6 填充容器
		dom.innerHTML = html;
		// 7 返回容器
		return dom;
	});

	// 添加控制器
	MVC.addCtrl("header", function(M, V) {
		// 发送ajax 请求数据
		$.ajax({
			// URL表示将请求发送到那个位置
			url: "/data/header.json",
			// data 表示本次请求携带的数据
			data: "",
			// type 表示本次请求的具体方式
			type: "get",
			// dataType 表示本次请求 请求回来的数据的类型
			dataType: "json",
			// success 成功之后的回调函数
			success: function(data) {
				console.log(data);
				// 将回来的数据加入模型层
				M.add("header", data);
				// 执行创建视图方法 因为已经可以从M层中获取数据了
				var dom = V.create("header");
				// 获取元素
				var $lis = $(dom).find(".nav>ul>li");
				// 添加鼠标进入事件
				$lis.mouseenter(function() {
					if($(this).children("ul").is(":empty")) {
						return;
					}
					$(this).children("ul").slideDown();
				});
				$lis.mouseleave(function() {
					$(this).children("ul").slideUp();
				});
			}
		});
	});
});