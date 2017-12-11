$(function() {
				WebMain.init();
			});

$(document).ready(function(){
	
	//gnb

	$('ul.gnb>li').hover(function(){
	
		var num = $(this).index()
		
		$(this).find('ul.menu').show()
		$(this).parents('#header').stop().animate({'height':'206px'},100)
	},function(){
		
		$(this).find('ul.menu').hide()
		$(this).parents('#header').stop().animate({'height':'156px'},100)
	})

	$('ul.menu').hover(function(){

		$(this).show()
		$(this).parents('#header').stop().animate({'height':'206px'},100)
	},function(){
		
		$(this).hide()
		$(this).parents('#header').stop().animate({'height':'156px'},100)
	})


	//top
	
	$(window).scroll(function(){ 
	
		var nowScroll = $(window).scrollTop()
		console.log(nowScroll)
			//if(nowScroll < 6500 && nowScroll > 900){
			if(nowScroll >= $('.search').position().top){
				$('p.top').fadeIn()
			} else { $('p.top').hide() }//if
	}) //scroll

	$('p.top a').click(function(){
			
			event.preventDefault()
			
			var pos = $('#header').position().top
			$('html, body').animate({scrollTop:pos})
	})


	//search
	
	$('div.searchBar a.btn').click(function(){
		
		event.preventDefault()
	})

	//info

	$("#owl-demo").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 4,

 
  });

	//notice

	$('.notice ul.noticeTit>li').click(function(){
	
		event.preventDefault()

		$(this).siblings().find('a').removeClass('active')
		$(this).find('a').addClass('active')
		$(this).siblings().find('span').removeClass('active')
		$(this).find('span').addClass('active')
		$(this).siblings().find('ul').hide()
		$(this).find('ul').show()

	})

	$('.notice ul.noticeTit>li').eq(0).trigger('click');

	//video

	$('.video p.play a').click(function(){
	
		event.preventDefault()

		$('.video div.popupVid').fadeIn()
		$('p.top').fadeOut()
	})

	$('.video p.close a').click(function(){

		event.preventDefault()
		
		$('.video div.popupVid').fadeOut()
		$('p.top').fadeIn()
	})

	//footer

	$('#footer ul.link>li').hover(function(){
	
		$(this).find('ul').fadeIn(100)
	}, function(){
		
		$(this).find('ul').hide()
	})

})//ready


