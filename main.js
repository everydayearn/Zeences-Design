// 定义入口模块
define(function(require, exports, module) {
	// 一个一个的引入模块
	require("css/reset.css");
	require("css/common.css");
	require("modules/bg/bg.css");
	require("modules/bg/bg");
	require("modules/header/header.css");
	require("modules/header/header");
	require("modules/home/carousel/carousel.css");
	require("modules/home/carousel/carousel");
	require("modules/home/whatwedo/whatwedo");
	require("modules/home/latestworks/latestworks");
	require("modules/home/home.css");
	require("modules/home/home");
});