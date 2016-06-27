;(function(){
	//需要加载的图片(这些图片加载完成后才会触发，可为空)
	var array_img=[];
//页面加载完毕后移除loading
	function loadFinish(){
		var loadingMask = document.getElementById('loading');
		loadingMask.className="loading moveOut";
		setTimeout(function(){
			loadingMask.parentNode.removeChild(loadingMask);
		},1500);
	}

	var index_loadImg=0;
	function loadImg(){
		var newImg=new Image();
		newImg.src=array_img[index_loadImg];
		newImg.onload=function(){
			if(index_loadImg >= (array_img.length-1)){
				loadFinish();
				return;
			}
			index_loadImg++;
			loadImg();
		};
	}
	function completeFn(){
		if (document.readyState == "complete") {
	        if(array_img.length>0){
	        	//需要加载图片
	        	loadImg();
	        }else{
	        	//不需要加载图片
	        	loadFinish();
	        }
	        //取消监听document事件
	        document.removeEventListener("readystatechange",completeFn); 
	    }
	}
	document.addEventListener("readystatechange",completeFn);
})();