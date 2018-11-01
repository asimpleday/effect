$(function() {
	var aimgList=$('.imgList li');
	var dianList=$('.dianList li');
	aimgList.first().show();
	dianList.last().css('margin-right',0);
	var timer;
	var banner=$('.banner');
	banner.hover(function() {
		clearInterval(timer);
	}, function() {
		clearInterval(timer);
		timer=setInterval(nextFn,2000);
	});
	var rightBtn=$('.rightBtn');
	//定义一个模拟变量
	var num=0;
	var cover=$('.cover');
	//封装下一张的功能
	function nextFn(event){

		//让蒙版淡入进来
		cover.fadeIn(800, function() {
			num++;
			if (num>2) {
				num=0;
			};
			aimgList.eq(num).show().siblings('li').hide();
			dianList.eq(num).addClass('current').siblings('li').removeClass('current');

			//再把蒙版掀掉
			cover.fadeOut(800);

		});

		//下一张切换
		rightBtn.click(nextFn);


		timer=setInterval(nextFn, 2000);

		var leftBtn=$('.leftBtn');

		leftBtn.click(function(event) {
			cover.fadeIn(800, function() {
				num--;
				if (num<0) {
					num=2;
				};
				aimgList.eq(num).show().siblings('li').hide();
			    dianList.eq(num).addClass('current').siblings('li').removeClass('current');
			    cover.fadeOut(300);
			});
		});
	};
});