window.onload=function(){
	headerScroll();
	changeTime();
	slide();


}



//顶部通栏背景变色
function headerScroll(){
	var nav=document.getElementsByClassName("jd_nav")[0];
	var navTop=nav.offsetHeight+nav.offsetTop;
	var header=document.getElementsByClassName("jd_header")[0];
	window.onscroll=function(){
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var scrollNum=scrollTop/navTop>1?1:scrollTop/navTop;
		header.style.backgroundColor="rgba(201, 21, 35,"+scrollNum+")";
	}
}


//改变秒杀倒计时时间
function changeTime(){
	var timeDom=document.getElementById("msTime").getElementsByTagName("li");
	var timer=setInterval(function(){
		var date=new Date();   //创建一个时间对象
		var se=date.getTime();  //现在的毫秒
		var d = Date.parse("11-30-2017 10:43:00") //设置一个指定日期的毫秒
		if(d-se<=0){
			clearInterval(timer);
			return false;
		}  
		var totalSecond=Math.floor((d-se)/1000);
		var hour=Math.floor(totalSecond/60/60);
		var minute=Math.floor((totalSecond-(hour*60*60))/60);
		var second=totalSecond%60;
		timeDom[0].innerHTML=Math.floor(hour/10);
		timeDom[1].innerHTML=hour%10;
		timeDom[3].innerHTML=Math.floor(minute/10);
		timeDom[4].innerHTML=minute%10;
		timeDom[6].innerHTML=Math.floor(second/10);
		timeDom[7].innerHTML=second%10;
	},1000)
}

function slide(){
	var bodyWidth=document.body.offsetWidth;
	var ul=document.querySelector(".banner_images");
	//动态在头部插入最后一张和尾部插入第一张
	var ulLastChild=ul.lastElementChild || ul.lastChild;
	var ulFirstChild=ul.firstElementChild || ul.firstChild;;
	ul.insertBefore(ulLastChild.cloneNode(true),ul.childNodes[0]);
	ul.appendChild(ulFirstChild.cloneNode(true));
	ul.appendChild(document.querySelectorAll(".banner_images li")[2].cloneNode(true));
	var bannerIndex=document.querySelectorAll(".banner_index li");
	var liList=document.querySelectorAll(".banner_images li");
	ul.style.width=liList.length*100+"%";//动态设置ul的宽度
	//动态设置子元素li的宽度
	for(var i=0;i<liList.length;i++){
		liList[i].style.width=100/liList.length+"%";
	}
	var imgkey=1;
	var diankey=0;
	ul.parentNode.style.height=ul.offsetHeight+"px";   //动态设置父盒子高度
	ul.style.left=-bodyWidth+"px";

	var timer=setInterval(banner,2000)

	
	//缓动函数
	function animate(ele,attr,target){
	    clearInterval(ele.timer);
	    ele.timer=setInterval(function(){
	        var leader=parseInt(getStyle(ele,attr)) || 0;
	        var step=(target-leader)/10;
	        step=step>0?Math.ceil(step):Math.floor(step);
	        ele.style[attr]=leader+step+"px";
	        if(Math.abs(target-leader)<=Math.abs(step)){
	            ele.style[attr] = target + "px";
	            clearInterval(ele.timer);
	        }
	    },10)
	}
	function getStyle(ele,attr){
	    if(ele.currentStyle){
	        return ele.currentStyle[attr];
	    }else{
	        return getComputedStyle(ele,false)[attr];
	    }
	}
	//控制图片
	function changeImage(){
		animate(ul,"left",-bodyWidth*imgkey);
	}

	//控制小点
	function changeIndex(){
		if(diankey==liList.length-3){
			diankey=0;
		}else if(diankey<0){
			diankey=liList.length-4;
		}
		for(var i=0;i<bannerIndex.length;i++){
			bannerIndex[i].className="";
		}
		bannerIndex[diankey].className="current";
	}

	function banner(){
		imgkey++;
		diankey++;
		if(imgkey==liList.length-1){
			imgkey=2;
			ul.style.left=-bodyWidth+"px";
		}else if(imgkey<0){
			imgkey=liList.length-3;
			ul.style.left=-bodyWidth*liList.length-2+"px";
		}
		changeImage()
		changeIndex();
		
	}



	var startX=0;     //鼠标落点位置
	var moveX=0;      //鼠标拖动距离
	var distanceX = 0;    //ul原来的距离
	ul.addEventListener("touchstart",function(event){
   		clearInterval(timer);
   		startX=event.touches[0].clientX;

	})
	ul.addEventListener("touchmove",function(event){
		moveX=event.touches[0].clientX-startX;
		ul.style.left=-bodyWidth*imgkey+moveX+"px";

	})
	ul.addEventListener("touchend", function(event){
		var maxdistanceX=bodyWidth/3;  //定义一个最大的拖动距离边界
		if(Math.abs(moveX)>=maxdistanceX){
			//大于最大边界距离时向左滑还是向右滑
			if(moveX>0){
				imgkey--;
				diankey--;
			}else{
				imgkey++;
				diankey++;
			}
			if(imgkey==liList.length-1){
				imgkey=2;
				ul.style.left=-bodyWidth+"px";
			}else if(imgkey<1){
				imgkey=liList.length-3;
				ul.style.left=-bodyWidth*liList.length-2+"px";
			}
			changeImage();
			//控制小点
			changeIndex();
		}else{
			//没有大于最大边界距离就还原，不变
			changeImage();
		}
		timer=setInterval(banner,2000);
	})
}

