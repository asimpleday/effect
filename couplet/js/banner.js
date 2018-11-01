$(function(){




	var style="<style type='text\/css'>.main{margin: 0 auto;}.leftAd,.rightAd{width: 120px;height: 288px;position: absolute;left: 0;top:50%;margin-top:-144px;text-align: right;}.rightAd{left: auto;right: 0;}.closeBtn{cursor: pointer;}<\/style>"
	$("title").before(style);



	var left_div="<div class='leftAd'><img src='image\/png01.png' height='270' width='120' \/><img src='image/close-h.jpg' height='18' width='40' class='closeBtn' \/><\/div>";
	$("body").append(left_div);
	var right_div="<div class='rightAd'><img src='image/png01.png' height='270' width='120' \/><img src='image/close-h.jpg' height='18' width='40' class='closeBtn' \/><\/div>";
	$("body").append(right_div);


	var leftAd=$('.leftAd');
	var rightAd=$('.rightAd');
	var closeBtn=$('.closeBtn');
	
		$(window).scroll(function(event) {
			var h=$(window).height()/2;
			var windowEatHight=$(window).scrollTop()+h;		
			leftAd.stop().animate({
				'top':windowEatHight,
			}, 500)
			rightAd.stop().animate({
				'top':windowEatHight,
			}, 500)
		});
		closeBtn.click(function(event) {
			$(this).parent().hide();
		});



})


