define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools");
	// 引入观察者
	var Observer = tools.Observer;
	// 定义变量引用format函数
	var format = tools.format;
	// 添加视图
	MVC.addView("home.carousel", function(M) {
		// 创建视图的步骤
		// 1 获取容器元素
		var dom = document.createElement("div");
		dom.id = "car";
		// 2 获取数据
		var data = M.get("home.carousel");
		console.log(data);
		// 3 定义模板
		var tpl = [
			'<div class="container">',
				'<ul id="carousel"><%li_tpl%></ul>',
				'<div id="cirs"><ul><li id="leftbtn"></li><%cir_tpl%><li id="rightbtn"></li></ul></div>',
				'<h2><%title%></h2>',
			'</div>'
		].join("");
		// 3.1 定义img的li的小模板
		var li_tpl = '<li class=""><img src="<%src%>" alt="" /><p class="intro"><%intro%></p></li>';
		// 3.2 定义小圆点的li的小模板
		var cir_tpl = '<li></li>';
		// 4 定义字符串
		var html = '';
		// 4.1 定义imgLI的字符串
		var li_html = '';
		// 4.2 定义小圆点li的字符串
		var cir_html = '';
		// 5 格式化
		// 5.1 格式化小模板
		var list = data.list;
		// 循环格式化
		list.forEach(function(value, index) {
			// 格式化一条数据
			li_html += format(li_tpl, value);
			cir_html += cir_tpl;
		});
		console.log("imgli的字符串", li_html);
		console.log("cir_html", cir_html);
		// 5.2 最终格式化大模板
		html = format(tpl, {
			li_tpl: li_html,
			cir_tpl: cir_html,
			title: data.title
		});
		// 6 填充容器
		dom.innerHTML = html;
		// 7 返回容器
		return dom;
	});
	// 添加控制器
	MVC.addCtrl("home.carousel", function(M, V) {
		// 使用观察者模式 注册消息 msg消息指的是父模块将信息数据请求回来之后触发的事件
		Observer.on("msg", function() {
			console.log("执行创建home.carousel视图方法");
			// 创建视图
			var dom = V.create("home.carousel");
			// 将dom元素放入home元素中
			var home = document.getElementById("home");
			home.appendChild(dom);
			// 添加交互
			// 获取元素
			var $img_lis = $(dom).find("#carousel li");
			var cirs_lis = [].slice.call($(dom).find("#cirs li"));
			var leftBtn = cirs_lis.shift();
			var rightBtn = cirs_lis.pop();
			// 定义信号量
			var idx = 0;
			cirs_lis[idx].className = "active";
			$img_lis[idx].className = "active";
			// 左按钮事件
			leftBtn.onclick = function() {

				// 改变信号量
				idx--;
				idx = idx < 0 ? (cirs_lis.length - 1) : idx;
				// 新图淡入
				$img_lis.eq(idx).fadeIn(1000).siblings().fadeOut(1000);
				changeCur();
			}
			// 右按钮事件
			rightBtn.onclick = function() {
				 
				// 改变信号量
				idx++;
				idx = idx > (cirs_lis.length - 1) ? 0 : idx;
				// 新图淡入
				$img_lis.eq(idx).fadeIn(1000).siblings().fadeOut(1000);
				changeCur();
			}
			// 小圆点事件
			cirs_lis.forEach(function(value, index) {
				value.onclick = function() {
					idx = index;
					// 新图淡入
					$img_lis.eq(idx).fadeIn(1000).siblings().fadeOut(1000);
					changeCur();
				}
			});
			// 定义一个小圆点切换active类的函数
			function changeCur() {
				cirs_lis.forEach(function(value, index) {
					if(index === idx) {
						$(value).addClass("active");
					} else {
						$(value).removeClass("active");
					}
				})
			} 
		});
	});
});