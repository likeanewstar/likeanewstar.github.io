// JavaScript Document

$(document).ready(function() {
    
    gnb();
    footer_link();	
    
    // 메인 비쥬얼 롤링 배너
    $('.visual').setImageSlide({
        timerSpeed: 5000,
        fadeSpeed: 1000,
        transitionType: 'fade'
    });

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

	// 문화유산정보 롤링 배너 플러그인
	$("#owl-demo").owlCarousel({
      autoPlay: 3000,
      items : 4
 	 });

	// 공지사항 카테고리 클릭시 해당 메뉴 열기
	$('.notice .ntc_tit>li').click(function() {
		$(this).siblings().find('a').removeClass('active')
		$(this).find('a').addClass('active')
		$(this).siblings().find('span').removeClass('active')
		$(this).find('span').addClass('active')
		$(this).siblings().find('ul').hide()
		$(this).find('ul').show()
	});
	$('.notice .ntc_tit>li').eq(0).trigger('click');

	// 비디오 재생 버튼 클릭시 풀스크린으로 아이프레임 연결
	$('.video .play a').click(function() {
		$('.video .popup_vid').fadeIn()
		$('.top').fadeOut()
	});
	$('.video .close a').click(function() {
		$('.video .popup_vid').fadeOut()
		$('.top').fadeIn()
	});

	// top button
	$(window).scroll(function() {
		var nowScroll = $(window).scrollTop()
		console.log(nowScroll)
			//if(nowScroll < 6500 && nowScroll > 900){
			if(nowScroll >= $('.search').position().top){
				$('.top').fadeIn()
			} else { $('.top').hide() }//if
	}); //scroll
	$('.top a').click(function() {
        var pos = $('header').position().top
        $('html, body').animate({scrollTop:pos})
	});

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
    
}) // ready

