;(function(){
//插入loading
	var info={
		//loading背景色
		cor_bg:"#fff",
		// 外部圆圈颜色
		cor_circle:"rgba(204, 204, 204, .2)",
		// 内部圆圈颜色
		cor_subCircle:"#e7992a"
	};
	var loading="<div class='loading' id='loading' ontouchmove='return !1'><p class='bg-back-loading' style='background:"+ info.cor_bg +"'></p><p class='bg-loading' style='background:"+ info.cor_circle +"'></p><div class='content-loading' style='background:"+ info.cor_subCircle +"'><p class='logo-loading'><span class='logo-inner-loading'></span></p></div></div>";
	document.write(loading);
})();