$(document).ready(function(){
	
	$('a').click(function(){
		
		event.preventDefault()
	})

	$('p.pull a').click(function(){
		
		$('.menu').fadeIn(100,function(){
			
			$('.menu').animate({'top':'0'},1000)
		})
	})

	$('p.close a').click(function(){
		
		$(this).parents('.menu').animate({'top':'-100%'},1000,function(){
		
			$(this).fadeOut(100);
		})
	})

	$('#header p.btn a').click(function(){
		
		var pos = $('.studio').position().top
		$('html, body').animate({scrollTop:pos})
	})

	$('.menu ul.gnb li a').click(function(){
		
		var index = $(this).parent('li').index() + 1
		
		$(this).parents('.menu').fadeOut(500,function(){
		
			$('html, body').animate({scrollTop:$('.con' + index).position().top})
			
		})
		
	})//click

	$('a.view').click(function(){
		
		$('div.popupVid').fadeIn()
		$('p.top').hide()
	})

	$('a.close').click(function(){
		
		$(this).parent().fadeOut()
		$('p.top').fadeIn()
	})
	
	
	$(window).scroll(function(){ 
	
		var nowScroll = $(window).scrollTop()
		console.log(nowScroll)
			//if(nowScroll < 6500 && nowScroll > 900){
			if(nowScroll >= $('.studio').position().top  && nowScroll <=  $('.enjoy').position().top){
				$('p.top').fadeIn()
			} else { $('p.top').hide() }//if
	}) //scroll
	
	
	var pos = 0

		$('a.next').click(function(){
			
			if(pos>-600){
				pos -= 200
				$('div.slide').css('background-position-y',pos)
				//$('div.slide').animate({'background-position-y':pos},1000,'easeOutBounce');
				}
			});

		$('a.prev').click(function(){
			
			if(pos < 0){
				pos += 200
				$('div.slide').css('background-position-y',pos)
				//$('div.slide').animate({'background-position-y':pos},1000,'easeOutBounce');
				}
			});

		$('a').click(function(){
			if(pos==0) {
				$('ul.text li').removeClass('on')
				$('ul.text li').eq(0).addClass('on')
			}
			if(pos==-200) {
				$('ul.text li').removeClass('on')
				$('ul.text li').eq(1).addClass('on')
			}
			if(pos==-400) {
				$('ul.text li').removeClass('on')
				$('ul.text li').eq(2).addClass('on')
			}
			if(pos==-600) {
				$('ul.text li').removeClass('on')
				$('ul.text li').eq(3).addClass('on')
			}
		});

	$('#footer p.scrl a, #container p.top').click(function(){
			
			var pos = $('#header').position().top
			$('html, body').animate({scrollTop:pos})
	})
	
	
	


})//ready