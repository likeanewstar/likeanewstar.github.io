// JavaScript Document

$(document).ready(function() {

    todayIs();
    mSch();
    navMenu();

    // 국민건강알람서비스 오늘 날짜 넣기

    function todayIs() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; // Jan is 0
        var yyyy = today.getFullYear();

        if(dd<10){
            dd = '0'+dd
        }
        if(mm<10){
            mm = '0'+mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        //alert(today);
        document.getElementById("date").innerHTML = today;
        //$('#date').text(today);
    }

    // Mobile search area

    function mSch() {
        $('.m_sch_open').on('click', function() {
    		$('.htop_sch').stop(true).css({'display': 'block', 'opacity': 0}).animate({'opacity': 1}, 300);
    	});
    	$('.m_sch_close').on('click', function() {
    		$('.htop_sch').stop(true).animate({'opacity': 0}, 300, function() {
                $(this).css({'display': 'none'})
            });
    	});
    } // end of mSch
    
    // GNB

    function navMenu() {
	    var nav = $('#gnb>li>a');
	    var navSub = $('#gnb>li>.sub_menu');
	    var subM = $('.sub_menu ul>li>ul>li>a');
	    var smH = 0;

	    nav.on('click mouseover focus',function() {
	        navSub.stop().slideUp('fast');
	        navSub.removeClass('on');
	        $(this).next('.sub_menu').stop().addClass('on');
	        smH = $(this).next('.sub_menu').height();
	       $(this).next('.sub_menu').css('height',smH).stop().slideDown('fast');
	    });
        
	    $('#gnb').on('mouseleave', function() {
	        navSub.stop().slideUp('fast');
	    });
        
	    $('.sub_menu>.inner>ul>li:last-child a').on('focusout',function() {
	        navSub.stop().slideUp('fast');
	    });
        
	    subM.hover(function() {
	       $(this).parent('li').parent('ul').prev('a').addClass('on');
	    },
	    function() {
	        $(this).parent('li').parent('ul').prev('a').removeClass('on');
	    });
	} // end of navMenu
    
    // main visual mobile slide
    
    $('.visual_m').setImageSlide({
        isTimerOn: false,
        timerSpeed: 5000,
        transitionType: 'basic'
    });
    
    // 라이브러리 사용 어렵다. 하나의 html로 하려면, 돌아가는 function 제일 앞에 지금 window 사이즈가 768 이상이면 return false 이런식으로 걸어줘야함.
    // auto play도 마찬가지
    
    // 공지 알림 image slide
    
    $('.ntc_banner').setImageSlide({
        transitionType: 'swipe'
    });
    
    // 배너 모음 banner slide
    $('.slide_banner').setSlideBanner({
        widthMoveUnit: 1
    });
   
    // font size zoom
    
    var count = 0;
    function textZoom(f){
        if (f == 'big' && count <= 1)
        {
            $("*").not(".layer, .layer *").each(function(i){
                var fontSize = parseInt($(this).css("font-size"));
                fontSize = fontSize + 1 + "px";
                $(this).css({'font-size':fontSize});
            });
            count++;

            if (count == 1) $("body").addClass("fontSizeUp");
        }else if (f == 'small' && count >= 1){
            $("*").not(".layer, .layer *").each(function(i){
                var fontSize = parseInt($(this).css("font-size"));
                fontSize = fontSize - 1 + "px";
                $(this).css({'font-size':fontSize});
            });
            count--;

            if (count == 0){
                $("*:not('.tab *, #wrap')").removeAttr("style");
                $("body").removeClass("fontSizeUp");
            }
        }
        $(window).resize(function(){
            if ($(window).width() <= 1160){
                count = 0;
                $("body").removeClass("fontSizeUp")
                $("*").css("font-size","");
            }
        }).resize();
    } // end of textZoom

    
})// ready