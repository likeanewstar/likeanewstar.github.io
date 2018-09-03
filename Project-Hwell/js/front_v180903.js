// JavaScript Document
'use strict';

$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {

    // mobile 검색 영역
    mSch();
    function mSch() {
        $('.m-sch-open').on('click', function() {
    		$('.htop-sch').stop(true).css({'display': 'block', 'opacity': 0}).animate({'opacity': 1}, 300);
    	});
    	$('.m-sch-close').on('click', function() {
    		$('.htop-sch').stop(true).animate({'opacity': 0}, 300, function() {
                $(this).css({'display': 'none'})
            });
    	});
    } // end of mSch
    
    // GNB
    navMenu();
    function navMenu() {
	    var nav = $('#gnb > li > a');
	    var navSub = $('#gnb > li > .sub-menu');
	    var subM = $('#gnb > li > .sub-menu > .inner > ul > li > ul > li > a');
	    var smH = 0;

	    nav.on('mouseenter focus',function() {
            if ($(window).width() <= 850) return false;
	        navSub.stop().slideUp('fast');
	        smH = $(this).next('.sub-menu').height();
	        $(this).next('.sub-menu').css('height', smH).stop().slideDown('fast');
	    });
	    $('#gnb').on('mouseleave', function() {
            if ($(window).width() <= 850) return false;
	        navSub.stop().slideUp('fast');
	    });
	    $('.sub-menu > .inner > ul > li:last-child a').on('focusout',function() {
	        navSub.stop().slideUp('fast');
	    });
	    subM.hover(function() {
	       $(this).parent('li').parent('ul').prev('a').addClass('on');
	    },
	    function() {
	        $(this).parent('li').parent('ul').prev('a').removeClass('on');
	    });
	} // end of navMenu
    
    // GNB Mobile
    navMenuMobile();
    function navMenuMobile() {
        $(window).on('resize', function() {
            if ($(window).width() > 850) {
                $('#gnb, #gnb ul').css({'height': 'auto'});
            } else {
                $('#gnb, #gnb ul').css({'height': 0});
            }
        });
        $('#header a.menu').on('click', function() {
            $(this).find('.hamburger-menu').toggleClass('open');
            $('.gnb-wrap').toggleClass('open');
            $('#gnb ul').css({'height': 0});
            $('#gnb li').removeClass('open'); 
            $('#gnb > li.on > a').trigger('click');
            $('#gnb > li.on > .sub-menu > .inner > ul > li.on > a').trigger('click');
        });
        $('#gnb > li').each(function() {
            if ($(this).find('li').length > 0) {
                $(this).find('> a').append('<i class="fas fa-chevron-down mobile"></i>');
            }
        });
        $('#gnb > li > .sub-menu > .inner >  ul > li').each(function() {
            if ($(this).find('li').length > 0) {
                $(this).find('> a').append('<i class="fas fa-plus mobile plus"></i><i class="fas fa-minus mobile minus"></i>');
            }
        });
        $('#gnb > li > a').on('click', function(e) {
            if ($(this).parent().find('li').length > 0 && $(window).width() <= 850) {
                e.preventDefault();
                if ($(this).parent().hasClass('open')) return false;
                //if ($(this).parent().attr('class').indexOf('open') >= 0) return false;
                var height = 0;
                $(this).parent().find('> .sub-menu > .inner > ul > li').each(function() {
                    height += $(this).outerHeight();
                });
                var originalHeight = $('#gnb > li.open > .sub-menu > .inner > ul').outerHeight();
                $('#gnb > li.open').find('> .sub-menu > .inner > ul').css({'height': originalHeight + 'px'});
                $('#gnb > li > .sub-menu > .inner > ul').css({'height': 0});
                $('#gnb > li > .sub-menu > .inner > ul > li > ul').css({'height': 0});
                $(this).next().find('> .inner > ul').css({'height': height + 'px'});
                $('#gnb > li').removeClass('open'); 
                $('#gnb > li > .sub-menu > .inner > ul > li').removeClass('open');
                $(this).parent().addClass('open');
            }
        });
        $('#gnb > li > .sub-menu > .inner > ul > li > a').on('click', function(e) {
            if ($(this).parent().find('li').length > 0 && $(window).width() <= 850) {
                e.preventDefault();
                var height = 0;
                $(this).parent().find('> ul > li').each(function() {
                    height += $(this).outerHeight();
                });
                $(this).parent().parent().css({'height': 'auto'}); // 서브 메뉴 누를 때 대 메뉴 높이 안 잡히는 현상 해결
                $('#gnb > li > .sub-menu > .inner > ul > li > ul').css({'height': 0});
                $(this).next().css({'height': height + 'px'});
                $('#gnb > li > .sub-menu > .inner > ul > li').removeClass('open');
                $(this).parent().addClass('open');
            }
        });
    } // end of navMenuMobile
    
    // image slide
    $.fn.setImageSlide = function(options) {
        var settings = $.extend({
            slideFirst: 1,
            isTimerOn: true,
            timerSpeed: 3000,
            fadeSpeed: 500,
            transitionType: 'basic'
        }, options);

        this.each(function() {
            var $selector = $(this);
            var numSlide = $selector.find('ul.slide li').length;
            var slideNow = 0;
            var slideNext = 0;
            var slidePrev = 0;
            var slideFirst = settings.slideFirst;
            var timerId = '';
            var timerSpeed = settings.timerSpeed;
            var fadeSpeed = settings.fadeSpeed;
            var isTimerOn = settings.isTimerOn;
            var onPlaying = false;
            var showSlide = '';
            var startX = 0;
            var startY = 0;
            var delX = 0;
            var delY = 0;
            var offsetX = 0;
            var isDrag = false;
            

            // 초기화
            $selector.find('ul.slide li').each(function(i) {
                $selector.find('ul.indicator').append('<li > <a href="#" > ' + (i + 1) + '번 이미지</a > </li > \n');
            });
            if (isTimerOn === true) {
                $selector.find('p.control a.play').addClass('on');
            } else {
                $selector.find('p.control a.play').removeClass('on');
            }
            switch (settings.transitionType) {
                case 'basic': showSlide = showSlideBasic; break;
                case 'fade': showSlide = showSlideFade; break;
                case 'swipe': showSlide = showSlideSwipe; break;
                case 'animation': showSlide = showSlideAnimation; break;
                default: showSlide = showSlideBasic;
            }
            showSlide(slideFirst);
            
            // 이벤트
            $selector.find('ul.indicator li a').on('click', function() {
                var index = $selector.find('ul.indicator li').index($(this).parent());
                showSlide(index + 1);
            });
            $selector.find('p.control a.prev').on('click', function() {
                $(this).stop(true).animate({'left': '-70px'}, 50).animate({'left': '-60px'}, 100);
                showSlide(slidePrev);
            });
            $selector.find('p.control a.next').on('click', function() {
                $(this).stop(true).animate({'right': '-70px'}, 50).animate({'right': '-60px'}, 100);
                showSlide(slideNext);
            });
            $selector.find('p.control a.play').on('click', function() {
                if (isTimerOn === true) {
                    clearTimeout(timerId);
                    isTimerOn = false;
                    $(this).removeClass('on');
                } else {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                    isTimerOn = true;
                    $(this).addClass('on');
                }
            });
            
            // 이벤트 mobile swipe
            $selector.find('ul.indicator li a').on('click', function() {
                var index = $selector.find('ul.indicator li').index($(this).parent());
                showSlide(index + 1);
            }); // end of click

            $selector.find('ul.slide').on('touchstart', function(e) {
                isDrag = true;
                $selector.find('ul.slide').css({'transition': 'none'});
                clearTimeout(timerId); // 손 댔을 때도 타이머 끄기
                $selector.find('ul.indicator li span.bar span').stop(true).css({'width': '0'});
                startX = e.originalEvent.touches[0].clientX; //터치했을 때 두 번째 닿는게 두 번째 손가락.
                startY = e.originalEvent.touches[0].clientY;
                offsetX = $selector.find('ul.slide').position().left;
            }); // end of touchstart
            document.addEventListener('touchmove', function(e) {
                if (isDrag === false) return false;
                delX = e.touches[0].clientX - startX;
                delY = e.touches[0].clientY - startY;
                if (direction === '') {
                    if (Math.abs(delX) > 5 && Math.abs(delY) < 5) {
                        direction = 'horizon';
                    } else if (Math.abs(delX) < 5 && Math.abs(delY) > 5) {
                        direction = 'vertical';
                    }
                } else if (direction === 'vertical') {
                    delX = 0;
                    delY = 0;
                } else if (direction === 'horizon') {
                    e.preventDefault();
                    if ((delX < 0 && slideNow === numSlide) || (delX > 0 && slideNow === 1)) {
                        delX = delX / 5;
                    }
                    $(selector).find('ul.slide').css({'left': (offsetX + delX) + 'px'});
                }
            }, {passive: false}); // end of touchmove
            $(document).on('touchend', function(e) {
                if (isDrag === false) return false;
                if (delX < -50 && slideNow !== numSlide) {
                    showSlide(slideNext);
                } else if (delX > 50 && slideNow !== 1) {
                    showSlide(slidePrev);
                } else {
                    showSlide(slideNow);
                }
                isDrag = false;
            }); // end of touchend

            // 공통함수
            function showSlideBasic(n) {
                clearTimeout(timerId);
                $selector.find('ul.slide li').css({'display': 'none'});
                $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
                $selector.find('ul.indicator li').removeClass('on');
                $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideBasic

            function showSlideFade(n) {
                if (slideNow === n || onPlaying === true) return false; // 현재 위치 네비 누르면 재실행 막기 || 애니메이션 중 클릭해서 애니메이션 쌓이는 것 막기
                clearTimeout(timerId);
                if (slideNow === 0) {
                    $selector.find('ul.slide li').css({'display': 'none'});
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
                } else {
                    onPlaying = true;
                    $selector.find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({'opacity': 0}, fadeSpeed, function() {
                        onPlaying = false;
                    });
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, fadeSpeed);
                }
                $selector.find('ul.indicator li').removeClass('on');
                $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideFade

            function showSlideSwipe(n) {
                clearTimeout(timerId);
                if (slideNow === 0) { // 시작할 때
                    $selector.find('ul.slide li').each(function(i) {
                        $(this).css({'left': (i * 100) + '%', 'display': 'block'}); // 옆으로 밀 때 흰 화면 안 보이게 하기 위한 display: block;
                    });
                    $selector.find('ul.slide').css({'transition': 'none', 'left': (-(n - 1) * 100) + '%'});
                } else {
                    $selector.find('ul.slide').css({'transition': 'all .5s', 'left': (-(n - 1) * 100) + '%'});
                }
                $selector.find('ul.indicator li').removeClass('on');
                $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideSwipe
            
            function showSlideAnimation(n) {
                if (slideNow === n || onPlaying === true) return false; // 현재 위치 네비 누르면 재실행 막기 || 애니메이션 중 클릭해서 애니메이션 쌓이는 것 막기
                clearTimeout(timerId);
                if (slideNow === 0) {
                    $selector.find('ul.slide li').css({'display': 'none'});
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
                } else {
                    onPlaying = true;
                    $selector.find('ul.slide li:eq(' + (slideNow - 1) + ')').attr({'class': 'off'}).one('animationend', function() {
                        onPlaying = false;
                    });
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).attr({'class': 'on'});
                }
                $selector.find('ul.indicator li').removeClass('on');
                $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideAnimation
        });  // end of each
    } // end of jquery function - setImageSlide
    
    // 메인 비쥬얼 mobile용 image slide 실행
    $('.visual-m').setImageSlide({
        isTimerOn: false,
        timerSpeed: 5000,
        transitionType: 'swipe'
    });
    // 하단 이벤트 알림 배너 image slide 실행
    $('.ntc-banner').setImageSlide({
        transitionType: 'swipe'
    });
    
    // 국민건강알람서비스 오늘 날짜 넣기
    todayIs();
    function todayIs() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; // Jan is 0
        var yyyy = today.getFullYear();

        if (dd < 10) {dd = '0' + dd}
        if (mm < 10) {mm = '0' + mm}
        
        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("date").innerHTML = today;
    } // end of todayIs

    // 국민건강알림서비스 탭
    $('.graph-wrap ul li a').on('click', function() {
        $('.graph-wrap ul li').removeClass('on');
        $(this).parent().addClass('on');
        $('.graph-wrap ul li .graph').css({'display': 'none'});
        $(this).next('.graph').css({'display': 'block'});
    });
    
    // slide banner
    $.fn.setSlideBanner = function(options) {
        var settings = $.extend ({
            isTimerOn: true,
            timerSpeed: 3000,
            widthMove: 300,
            widthMoveUnit: 2
        }, options);

        this.each(function() {
            var $selector = $(this);
            var offsetLeft = 0;
            var minOffsetLeft = 0;
            var widthBox = $selector.find('div.box').innerWidth();
            var widthBar = 0;
            var widthMove = $selector.find('ul.banner li:eq(0)').outerWidth(true) * settings.widthMoveUnit;
            if (options.widthMove !== undefined && options.widthMoveUnit === undefined) {
                widthMove = settings.widthMove;
            }
            var timerId = '';
            var timerSpeed = settings.timerSpeed;
            var isTimerOn = settings.isTimerOn;

            // 초기화
            $selector.find('ul.banner li').each(function() {
                widthBar += $(this).outerWidth(true);
            });
            $selector.find('ul.banner').css({'width': widthBar + 'px'});
            minOffsetLeft = -(widthBar - widthBox);
            if (isTimerOn === true) {
                timerId = setTimeout(function() {moveSlide('next', 'auto');}, timerSpeed);
                $selector.find('p.control a.play').addClass('on');
            } else {
                $selector.find('p.control a.play').removeClass('on');
            }

            // 이벤트
            $selector.find('p.control a.prev').on('click', function() {
                moveSlide('prev', 'manual');
            });
            $selector.find('p.control a.next').on('click', function() {
                moveSlide('next', 'manual');
            });
            $selector.find('p.control a.play').on('click', function() {
                if (isTimerOn === true) {
                    clearTimeout(timerId);
                    $selector.find('p.control a.play').removeClass('on');
                    isTimerOn = false;
                } else {
                    timerId = setTimeout(function() {moveSlide('next', 'auto');}, timerSpeed);
                    $selector.find('p.control a.play').addClass('on');
                    isTimerOn = true;
                }
            });

            // 공통함수
            function moveSlide(direction, type) { // type: timer가 돌리는 next와 사람이 누르는 next를 구분하는 변수
                clearTimeout(timerId);
                if (direction === 'prev') {
                    if (offsetLeft === 0) {
                        $selector.find('ul.banner').stop(true).animate({'left': '10px'}, 50).animate({'left': 0}, 100);
                    } else {
                        offsetLeft += widthMove;
                        if (offsetLeft > 0) offsetLeft = 0;
                        $selector.find('ul.banner').stop().animate({'left': offsetLeft + 'px'}, 300);
                    }
                } else {
                    if (offsetLeft === minOffsetLeft) {
                        if (type === 'auto') {
                            offsetLeft = 0;
                            $selector.find('ul.banner').stop(true).animate({'left': offsetLeft + 'px'}, 300);
                        } else {
                            $selector.find('ul.banner').stop(true).animate({'left': (offsetLeft - 10) + 'px'}, 50).animate({'left': offsetLeft + 'px'}, 100);
                        }
                    } else {
                        offsetLeft -= widthMove;
                        if (offsetLeft < minOffsetLeft) offsetLeft = minOffsetLeft;
                        $selector.find('ul.banner').stop().animate({'left': offsetLeft + 'px'}, 300);
                    }
                } // end of if
                if (isTimerOn === true) { // 타이머를 지속적으로 돌려주는 설정
                    timerId = setTimeout(function() {moveSlide('next', 'auto');}, timerSpeed);
                }
            } // end of moveSlide
        }); // end of each
    } // end of jquery function - setSlideBanner
    
    $('.slide-banner').setSlideBanner({
        widthMoveUnit: 1
    });


})// ready