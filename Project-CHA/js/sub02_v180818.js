// JavaScript Document

$(document).ready(function() {
    
    gnb();
    footer_link();

    // GNB
    function gnb() {
        $('.gnb>li').on('mouseenter', function() {
            $(this).find('.menu').show()
            $(this).parents('header').stop().animate({'height':'206px'},300)
        });
        $('.gnb>li').on('mouseleave', function() {
            $(this).find('.menu').hide()
            $(this).parents('header').stop().animate({'height':'156px'},300)
        });  
        $('.menu').on('mouseenter', function() {  
            $(this).show()
            $(this).parents('header').stop().animate({'height':'206px'},300)
        });
        $('.menu').on('mouseleave', function() {
            $(this).hide()
            $(this).parents('header').stop().animate({'height':'156px'},300)
        });
        $('.gnb>li>a').on('focus', function() {
            $(this).parents('li').find('.menu').show()
            $(this).parents('header').stop().animate({'height':'206px'},300)
        });
        $('.menu li:last-child a').on('focusout', function() {  
            $(this).parents('.menu').hide()
            $(this).parents('header').stop().animate({'height':'156px'},300)
        });
    } // end of gnb	

	// top 버튼
	$(window).scroll(function(){ 
		var nowScroll = $(window).scrollTop()
		//if(nowScroll < 6500 && nowScroll > 900){
		if(nowScroll >= $('.target').position().top){
			$('p.top').fadeIn()
		} else { $('p.top').hide() }
	}) //scroll

	$('p.top a').click(function(){
			var pos = $('header').position().top
			$('html, body').animate({scrollTop:pos})
	})
	
	// footer family site link
	function footer_link(){
	    var btn = $(".link>div>a");
	    var box_btn = $(".link_list>li>a");

	    $(".link_list").hide();

	    btn.on("click",function (){
	        if($(this).siblings(".link_list").is(":hidden")){
	            $(".link_list").hide();
	            $(this).siblings(".link_list").show();
	            btn.removeClass("on");
	            $(this).addClass("on");
	        }else{
	            $(".link_list").hide();
	            btn.removeClass("on");
	        }
	        return false;
	    });
	    box_btn.on("click",function (){
	        $(this).parents(".link_list").hide();
	        $(this).parents(".link_list").siblings("a").removeClass("on");
	    });
	    $(".link_list>li:last-child>a").on("focusout",function (){
	        $(this).parents(".link_list").hide();
	        $(this).parents(".link_list").siblings("a").removeClass("on");
	    });  
	    $('body').not(".link_list, .link_list>li, .link_list>li>a").on("click",function (){
	        $(".link_list").hide();
	        btn.removeClass("on");
	    });
	}; // end of footer link

})//ready


