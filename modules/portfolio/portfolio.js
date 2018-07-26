// 定义成模块
define(function(require, exports, module) {
	// 引入underscore
	var underscore = require("js/underscore");
	console.log(underscore);
	// 需要格式化函数 所以引入工具
	var tools = require("modules/tools");
	// 定义格式化变量
	var format = tools.format;
	// 添加视图
	MVC.addView("portfolio", function(M) {
		// 1 获取容器元素
		var dom = document.getElementById("portfolio");
		// 2 获取数据
		var data = M.get("portfolio");
		// 3 定义模板
		var tpl = [
			'<div class="container">',
				'<h2><%title%></h2>',
				'<p><%content%></p>',
				'<div class="list"><span>FILTER:</span><%categories%></div>',
				'<ul id="list"></ul>',
			'</div>'
		].join("");
		// 3.1 定义小模板
		var span_tpl = '<span class="item"><%key%></span>';
		// 4 定义字符串变量
		var html = '';
		var span_html = '';
		// 5 格式化
		var filter = data.filter;
		for(var i in filter) {
			span_html += format(span_tpl, {
				key: i
			});
		}
		// 5.1 格式化大模板
		html = format(tpl, {
			title: data.title,
			content: data.content,
			categories: span_html
		});
		// 6 填充容器
		dom.innerHTML = html;
		// 7 返回容器
		return dom;
	});

	// 添加控制器
	MVC.addCtrl("portfolio", function(M, V) {
		// 发送ajax
		$.ajax({
			url: "/data/portfolio.json",
			type: "get",
			dataType: "json",
			success: function(data) {
				// 数据请求回来了，将数据添加到模型层中
				M.add("portfolio", data);
				// 创建视图
				var dom = V.create("portfolio"); 
				// 定义宽度
				var width = 184;
				// 定义一个映射数组
				var height_arr = [0, 0, 0, 0, 0];
				// 获取元素
				var $list = $(dom).find("#list");
				// 获取数据
				var all_arr = data.filter["All"]; 
				var catI_arr = data.filter["CategoryI"]; 
				var catII_arr = data.filter["CategoryII"]; 
				var video_arr = data.filter["Video"]; 
				console.log(all_arr, catI_arr, catII_arr, video_arr);
				function aaa(one, two) {
					var other = _.difference(one, two);
					// 循环让其他li消失
					other.forEach(function(value) {
						$(value).animate({opacity: 0}, 1000)
					});
					// 清空高度映射数组
					height_arr = [0, 0, 0, 0, 0];
					// 循环每一个符合的li元素 重新排序
					two.forEach(function(value) {
						// 获取高度数组中最小的minIdx索引值
						var minIdx = getMinIdx(height_arr);
						// value.style.left =+ "px";
						// value.style.top = height_arr[minIdx] + 10 + "px";
						$(value).animate({left:  minIdx * width, top: height_arr[minIdx] + 10, opacity: 1}, 1000)
						height_arr[minIdx] += value.clientHeight + 10;
					});
				}


				// 定义四个空数组
				var all_ele_arr = [];
				var catI_ele_arr = [];
				var catII_ele_arr = [];
				var video_ele_arr = [];
				// 根据all数组中的图片渲染li并添加到$list中
				all_arr.forEach(function(value) {
					// 创建一个li元素
					var li = document.createElement("li");
					// 创建一个img元素
					var img = new Image();
					// 设置src属性 
					img.src = "imgs/art/" + value + ".jpg";
					// 如果value属于某一个数组 那么将li放入对应的数组
					for(var i = 0; i < all_arr.length; i++) {
						if(value === all_arr[i]) {
							all_ele_arr.push(li);
						}
					}
					for(var i = 0; i < catI_arr.length; i++) {
						if(value === catI_arr[i]) {
							catI_ele_arr.push(li);
						}
					}
					for(var i = 0; i < catII_arr.length; i++) {
						if(value === catII_arr[i]) {
							catII_ele_arr.push(li);
						}
					}
					for(var i = 0; i < video_arr.length; i++) {
						if(value === video_arr[i]) {
							video_ele_arr.push(li);
						}
					}
					// 设置load事件 当加载完成时 执行某些事情
					img.onload = function() {
						// 将图片加入li中
						li.appendChild(this);
						// 为了方便区分li 所以要给每一个li添加自定义属性
						li.setAttribute("data-id", value);
						// 为了模拟出多列的布局方式 所以要给li添加绝对定位
						li.style.position = "absolute";
						// 获取当前数组中的最小值
						var minIdx = getMinIdx(height_arr);
						// 设置第几个列的位置
						li.style.left = minIdx * width + "px";
						// 设置高度 高度就是数组中的数值所代表的高度
						li.style.top = height_arr[minIdx] + 10 + "px";
						// 设置li的宽度
						li.style.width = 164 + "px";
						// 将li加入到$list中
						$list.append(li);
						// 改变数组的最小项的数值
						height_arr[minIdx] += this.height + 10;
						// 设置父元素的高度
						$list.height(Math.max.apply(null, height_arr));
					}
				});

				// 获取元素
				var all_btn = $(dom).find(".list span").eq(1);
				var catI_btn = $(dom).find(".list span").eq(2);
				var catII_btn = $(dom).find(".list span").eq(3);
				var video_btn = $(dom).find(".list span").eq(4);
				
				// 设置点击事件
				all_btn.click(function() {
					aaa(all_ele_arr, all_ele_arr);
				});

				catI_btn.click(function() {
					aaa(all_ele_arr, catI_ele_arr);
				});

				catII_btn.click(function() {
					aaa(all_ele_arr, catII_ele_arr);
				});

				video_btn.click(function() {
					aaa(all_ele_arr, video_ele_arr);
				})
			}
		});
		
		// 定义函数 获取最小值在数组中的下标
		function getMinIdx(arr) {
			// 默认第0项是最小值
			var min = arr[0];
			// 记录最小值的下标
			var idx = 0;
			// 开始循环
			for(var i = 1; i < arr.length; i++) {
				if(min > arr[i]) {
					// 如果min不是最小的 那么将min替换成最小的
					min = arr[i];
					// 改变最小值的下标
					idx = i;
				}
			}
			// 返回最小值的下标
			return idx;
		}

	});
});