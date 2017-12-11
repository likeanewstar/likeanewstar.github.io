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
			if(nowScroll >= $('.target').position().top){
				$('p.top').fadeIn()
			} else { $('p.top').hide() }//if
	}) //scroll

	$('p.top a').click(function(){
			
			event.preventDefault()

			var pos = $('#header').position().top
			$('html, body').animate({scrollTop:pos})
	})
	
	
	//footer

	$('#footer ul.link>li').hover(function(){
	
		$(this).find('ul').fadeIn(100)
	}, function(){
		
		$(this).find('ul').hide()
	})

})//ready


