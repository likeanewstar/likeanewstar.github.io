// JavaScript Document

$(document).ready(function() {
    'use strict';

    // a 링크 이벤트 위임
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });

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

            // 초기화
            $selector.find('ul.slide li').each(function(i) {
                $selector.find('ul.indicator').append('<li><a href="#">' + (i + 1) + '번 이미지</a></li>\n');
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
    
    $.fn.setSlideBanner = function(options) {
        var settings = $.extend ({
            isTimerOn: true,
            timerSpeed: 3000,
            widthMove: 300,
            widthMoveUnit: 1
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
            } // 어짜피 widthMove 길이만큼 움직이기 때문에 widthMoveUnit은 여기서 선언해주지 않아도 됨
             /*
            4가지 경우의 수
                1. 둘 다 정의했을 때
                2. move만 정의했을 때
                3. moveUnit만 정의했을 때
                4. 둘 다 정의하지 않았을 때

            이것을 모두 고려하여 어떤 속성이 우위를 가질지 정해야 함. 이 라이브러리에서는 widthMoveUnit 값을 우선으로 가진다.
            따라서 조건으로 뽑을 내용은
            if (options.widthMove !== undefined && options.widthMoveUnit === undefined) // 사용자가 widthMove의 값만 입력하고 && widthMoveUnit 값을 비워뒀을 때
                widthMove = settings.widthMove; // widthMove 값을 취하고
            아닐 때는 unit 값을 취한다.
            else 가 없는 이유는 아예 변수 선언시 widthMove 값을 unit 구하는 식으로 정의했기 때문이다.

            - options 안에 사용자가 넣은 값만 뽑을 떄는 options.widthMove / 넣든 말든 관계 없이 최종적인 값을 뽑을 때는 settings.widthMove
            */
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
            } // 초기상태. 타이머가 처음에 딱 한번만 돌아가게 하는 설정

            // 이벤트
            $selector.find('p.control a.prev').on('click', function() {
                //$(this).find('i').stop(true).animate({'left': '-5px'}, 50).animate({'left': 0}, 100);
                moveSlide('prev', 'manual');
            });
            $selector.find('p.control a.next').on('click', function() {
                //$(this).find('i').stop(true).animate({'rigth': '-5px'}, 50).animate({'left': 0}, 100);
                moveSlide('next', 'manual');
            });
            $selector.find('p.control a.play').on('click', function() {
                if (isTimerOn === true) {
                    clearTimeout(timerId);
                    isTimerOn = false;
                    $(this).removeClass('on');
                } else {
                    timerId = setTimeout(function() {moveSlide('next', 'auto')}, timerSpeed);
                    isTimerOn = true;
                    $(this).addClass('on');
                }
            });

            // 공통함수
            function moveSlide(direction, type) { // 왼쪽, 오른쪽 버튼의 하는 일이 많이 다르기 때문에 변수를 이런 식으로 설정, // timer가 돌리는 next와 사람이 누르는 next를 구분하는 변수
                clearTimeout(timerId); // 버튼 클릭과 타이머 겹치지 않게 하기
                if (direction === 'prev') {
                    if (offsetLeft === 0) {
                        $selector.find('ul.banner').stop(true).animate({'left': '10px'}, 50).animate({'left': 0}, 100);
                    } else {
                        offsetLeft += widthMove;
                        if (offsetLeft > 0) offsetLeft = 0; // if 뒤에 문장 하나만 올 때는 중괄호 생략 가능
                        $selector.find('ul.banner').stop().animate({'left': offsetLeft + 'px'}, 300);
                    }
                } else {
                    if (offsetLeft === minOffsetLeft) {
                        if (type === 'auto') { // timer가 돌리는 next와 사람이 누르는 next를 구분하는 if문
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
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {moveSlide('next', 'auto');}, timerSpeed);
                } // 타이머를 지속적으로 돌려주는 설정

            } // end of moveSlide

        }); // end of each

    } // end of jquery function - setSlideBanner
    
}); //ready
