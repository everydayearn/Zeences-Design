define(function(require, exports, module) {
	// 定义一个函数， 接受2个参数， 第一个参数是字符串模板 第二个参数是数据（字典）
	function format(tplStr, dictionary) {
		// 第一步 根据tplStr中的<%a.b.c%> 获取其中的a.b.c
		return tplStr.replace(/<%([a-z_]+(\.[a-z_]+)*)%>/g, function(match, $1) {
			// $1就是分组捕获到的所有层级路径关系
			// console.log($1);
			// 下面这种表达式 只可以单层 不可以多层
			// dictionary[$1]
			// 正确的办法应该是将$1以.进行分层
			var arr = $1.split(".");
			// 定义变量 保存dictionary的地址 而不要直接操作该字典
			var obj = dictionary;
			// 循环
			for(var i = 0; i < arr.length - 1; i++) {
				if(typeof obj[arr[i]] === "object"  && obj[arr[i]] != null) {
					// 经过if判断 那么保证了当前层级是一个对象
					// 指向下一层
					obj = obj[arr[i]];
				} else {
					return "";
				}
			}
			// 循环完毕 说明指向最后一层了 直接返回即可
			return obj[arr[i]];
		});
	}



	// 观察者模式
	var Observer = (function() {
		// 定义一个对象 该对象就是用来存储函数
		var ob = {};
		// 返回接口
		return {
			/*
				 * on方法 用于发布事件
				 * @eventName 事件名称
				 * @handler 事件执行函数
			 */
			on: function(eventName, handler) {
				// 为了能够允许同名事件存在 我们在存储的时候不可以直接将ob的某一个属性设置为函数 而应该设置为数组
				// 检测 eventName在ob中是否已经是数组了
				if(ob[eventName] instanceof Array) {
					// 说明 eventName被使用过
					ob[eventName].push(handler);
				} else {
					// 说明第一次使用
					ob[eventName] = [handler]; 
				}
			},
			/*
			 * trigger方法 用于订阅事件
			 * @eventName 事件名称
			 * @msg 事件函数所需的信息
			 */
			trigger: function(eventName, msg) {
				// 因为ob[eventName] 可能是一个数组 也可能不存在 所以要先确保它是一个数组
				if(ob[eventName]) {
					// 如果存在必定是数组
					ob[eventName].forEach(function(value, index) {
						value(msg);
					});
				} else {
					// 不存在 
					console.log("该" + eventName + "事件不存在");
				}
			},
			/*
			 * off方法 用于移除已经发布的函数
			 * @eventName 事件名称
			 * @handler 事件函数
			 */
			off: function(eventName, handler) {
				// 根据eventName找到对应的数组
				if(ob[eventName]) {
					// 循环 比较数组中的函数是否与handler一致 如果一致就移除 
					ob[eventName].forEach(function(value, index) {
						if(value === handler) {
							// 一致 删除 
							ob[eventName].splice(index, 1);
						}
					});
				}
			}
		}
	})();


	module.exports.format = format;
	module.exports.Observer = Observer;


})