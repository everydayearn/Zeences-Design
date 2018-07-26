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