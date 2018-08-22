// JavaScript Document
'use strict';

$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});
    
$(document).ready(function() {

	// disappear spinner
    setTimeout(function() {$('body').removeClass();}, 1100);
    setTimeout(function() {
        $('.spinner').animate({'opacity': 0}, function() {
            $(this).css({'display': 'none'})
        });
    }, 1200);
    
    // background image move effect
	setMoveReverse();
	function setMoveReverse() {
        var startX = 0;
        var startY = 0;
    	var delX = 0;
        var delY = 0;
        var offsetX = 0;
        var offsetY = 0;
        
        $('#header').on('mouseenter', function(e) {
            $(this).find('.main-bg').css({'transition': 'none'});
            startX = e.clientX;
            startY = e.clientY;
            offsetX = $(this).find('.main-bg').position().left;
            offsetY = $(this).find('.main-bg').position().top;
        }) // end of mouseenter
        
    	$('#header').on('mousemove', function(e) {
        	e.preventDefault();
            delX = e.clientX - startX;
            delY = e.clientY - startY;
            $(this).find('.main-bg').css({'left': (offsetX - delX / 30) + 'px', 'top': (offsetY - delY / 50) + 'px'});
            //$(this).find('.main-bg').css({'transform': 'translate(' + (offsetX - delX / 20) + 'px, ' + (offsetY - delY / 60) + 'px)'});
        }); // end of mousemove
        
        $('#header').on('mouseleave', function(e) {
            offsetX = -50;
            offsetY = -50;
            $(this).find('.main-bg').css({'transition': 'all 0.5s'});
            $(this).find('.main-bg').css({'left': offsetX + 'px', 'top': offsetY + 'px'});
        }); // end of mouseleave
    } // end of setMoveReverse

    // main title fade in effect
	titFade();
	function titFade() {
        $('.main-copy').stop().delay(1500).animate({'top': 0 + 'px', 'opacity': 1}, 800);
		$('.sub-copy').stop().delay(2000).animate({'top': -30 + 'px', 'opacity': 1}, 800);
	}
        
    // break rate count
    $.fn.startRateCount = function(options) {
        var settings = $.extend({
            countGap: 729,
            timerSpeed: 1000,
            useComma: true
        }, options)

        var $selector = $(this);
        var numberNow = 0;
        var countGap = settings.countGap;
        var timerSpeed = settings.timerSpeed;
        var useComma = settings.useComma;
        var numberNowComma = '';
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = '0' + (today.getMonth() + 1); // January is 0.
        var dd = today.getDate();

        // 초기값
        numberNow = (yyyy + mm + dd) * countGap;
        updateRate();

        setInterval(function() {updateRate();}, timerSpeed);

        function updateRate() {
            if (useComma === true) {
                numberNowComma = numberNow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                $selector.text(numberNowComma);
            } else {
                $selector.text(numberNow);
            }
            numberNow += countGap;
        } // end of updateBreakRate

    } // end of jquery function - startRateCount

    $('p.counter').startRateCount();

	(function() {
		// easing function
		var baseEasings = {};

		$.extend(baseEasings, {
			Elastic: function(p) {
				return p === 0 || p === 1 ? p :
					-Math.pow(2, 8 * ( p - 1 )) * Math.sin((( p - 1 ) * 80 - 7.5) * Math.PI / 15);
			},
			Bounce: function(p) {
				var pow2,
					bounce = 4;
				while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
				return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
			}
		}); // end of extend
		$.each(baseEasings, function(name, easeIn) {
			$.easing["easeIn" + name] = easeIn;
			$.easing["easeOut" + name] = function(p) {
				return 1 - easeIn(1 - p);
			};
			$.easing["easeInOut" + name] = function(p) {
				return p < 0.5 ?
					easeIn(p * 2) / 2 :
					1 - easeIn(p * -2 + 2) / 2;
			};
		}); // end of each
		// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
	})(); // end of easing function
    
    // menu
	navMenu();
	function navMenu() {
        var menu = $('.menu')
		var openBtn = $('a.menu-open');
		var closeBtn = $('a.menu-close');
        
        open();
        close();
        
		// menu open
        function open() {
            openBtn.on('click', function() {
                $(this).parent().stop().animate({'top': -100 + '%'}, 200);
                menu.stop().delay(300).animate({'top': 0}, 1000, 'easeOutBounce');
            }); 
        } // end of open
        
		// menu close
        function close() {
            closeBtn.on('click', function() {
                menu.stop().animate({'top': -100 + '%'}, 100)
                openBtn.parent().stop().animate({'top': -20 + 'px'}, 200);
            }); 
        } // end of close

        // menu click
        $('ul.gnb li a').on('click', function() {
            var index = $('ul.gnb li').index($(this).parent()) + 1;
            var pos = $('.menu0' + index).position().top;
            $(this).parents('.menu').stop().animate({'top': -100 + '%'}, 100, function() {
            	openBtn.parent().stop().animate({'top': -20 + 'px'}, 200);
                $('html, body').animate({scrollTop: pos});
            });
        }); // end of click
        
	} // end of nav menu
	
    // header scroll down button
	$('a.scroll-down-btn').on('click', function() {
		var pos = $('.studio').position().top;
		$('html, body').animate({scrollTop: pos});
	});

    // top button
    topBtn();
    function topBtn() {
        var btn = $('a.top-btn');
        var scrollTop = 0;
        $(window).on('scroll', function() {
            scrollTop = $(window).scrollTop();
            if (scrollTop >= $('.studio').offset().top && scrollTop <= $('.enjoy').offset().top) {
                btn.css({'display': 'block', 'opacity': 0}).stop().animate({'opacity': 1}, 100);
            } else {
                btn.stop().animate({'opacity': 0}, 100, function() {
                    $(this).css({'display': 'none'});
                });
            }
        }); // end of scroll
        $('a.top-btn, a.top-btn-ft').on('click', function() {
            $('html, body').animate({scrollTop: 0});
        }); // end of click
    } // end of topBtn
    
}) // end of ready