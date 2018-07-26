// 开始定义具体的每一个层负责的事情
var MVC = (function() {
	// 定义M层
	var M = (function() {
		// 定义变量 该变量用于存储数据
		var _M = {};
		return {
			/*
			 * add方法 负责向M层中添加数据
			 * @pathName 命名空间字符串 例如: bg、 content.part1
			 * @data 对应的命名空间所存储 的数据 例如: {name: "", age: "", sex: 123}
			 * 
			 */
			add: function(pathName, data) {
				// 当前函数要存储内容 存储的规则是 a.b.c 123  =>  _M: { a: { b: { c: 123}}}
				// 所以，首先要根据.对pathName进行分割
				var arr = pathName.split(".");
				// 定义变量保存_M
				var result = _M;
				// 循环每一层 
				for(var i = 0; i < arr.length - 1; i++) {
					// 判断逻辑 如果是一个引用类型 则无操作 
					if(result[arr[i]] != null && typeof result[arr[i]] === "object" || typeof result[arr[i]] === "function") {
						// 无操作
					} else if(result[arr[i]] === undefined) {
						// 如果是undefined 那么说明当前层级还没有被人使用 
						result[arr[i]] = {};
					} else {
						// 如果是一个值类型 并且不是undefined 说明不可以往下继续迭代了 因为值类型身上添加不上数据
						throw new Error("不可以往值类型身上添加数据");
					}
					// 指向下一层
					result = result[arr[i]];
				}
				// 循环完毕之后 说明到达最后一层了 
				// 直接设置
				// 此时 如果连续两次对同一个命名空间进行操作 那么会改掉上一次的数据
				result[arr[i]] = data;
			},
			/*
			 * get方法负责从_M中提取数据给外部
			 * @pathName 要获取的数据的命名空间字符串  例如: get("a.b.c") => data
			 * 返回值就是对应的pathName的数据
			 */
			get: function(pathName) {
				// 分割pathName 获取命名空间数组
				var arr = pathName.split(".");
				// 备份_M
				var result = _M;
				// 循环
				for(var i = 0; i < arr.length - 1; i++) {
					// 因为是要从_M中取内容，所以如果在循环的过程中遇见引用类型 那么继续循环 如果遇见的是值类型 那么就直接return 
					if(typeof result[arr[i]] === "object" && result[arr[i]] != null || typeof result[arr[i]] === "function") {
						// 指向下一层
						result = result[arr[i]];
					} else {
						// 执行到这里了 说明在循环的中间层级 就遇见值类型了 从值类型数据身上是获取不到属性的 所以直接return null即可
						return null;
					}
				}
				// 如果循环能够完成 说明路径没问题 此时直接返回最后一层数据即可
				return result[arr[i]];
			}
		};
	})();
	// 定义V层
	// V层负责创建视图 
	var V = (function() {
		// 定义一个对象 保存内容
		var _V = {};
		return {
			// 负责添加创建视图的函数
			add: function(pathName, fun) {
				_V[pathName] = fun;
			},
			// 调用创建视图函数
			create: function(pathName) {
				return _V[pathName](M);
			}
		}
	})();
	// 定义C层
	var C = (function() {
		// 定义对象接受函数
		var _C = {}; 
		return {
			add: function(pathName, fun) {
				_C[pathName] = fun;
			},
			init: function() {
				for(var i in _C) {
					_C[i](M, V);
				}
			}
		}
	})();
	// 返回一个接口 该接口就负责提供通过MVC操作内部的M、V、C的方法
	return {
		// 向外暴露的接口 添加模型
		addModel: function(pathName, data) {
			M.add(pathName, data);
		},
		// 添加视图
		addView: function(pathName, fun) {
			V.add(pathName, fun);
		},
		// 添加控制器
		addCtrl: function(pathName, fun) {
			C.add(pathName, fun);
		},
		// 启动控制器
		install: function() {
			// 这里要启动所有的控制器 但是我们又没有办法获取_C对象
			C.init();
		}
	}
})();