// JavaScript Document

$(document).ready(function() {
    
    // main title fade in effect
	titFade();
	function titFade() {
        $('.main-copy').stop().delay(1500).animate({'top': 0 + 'px', 'opacity': 1}, 800);
		$('.sub-copy').stop().delay(2000).animate({'top': -30 + 'px', 'opacity': 1}, 800);
	}
    
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
                $(this).parent().stop().animate({'top': -100 + '%'}, 500, 'easeOutElastic');
                menu.stop().delay(300).animate({'top': 0}, 1000, 'easeOutBounce');
                //$('body').addClass('no-scroll');
            }); 
        } // end of open
        
		// menu close
        function close() {
            closeBtn.on('click', function() {
                menu.stop().animate({'top': -100 + '%'}, 100)
                openBtn.parent().stop().animate({'top': -20 + 'px'}, 200);
                $('body').removeClass('no-scroll');
            }); 
        } // end of close

        // menu click
        $('ul.gnb li a').on('click', function() {
            var index = $('ul.gnb li').index($(this).parent()) + 1;
            var pos = $('.menu0' + index).position().top;
            $(this).parents('.menu').fadeOut(500, function() {
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





/*

	

	

	$('a.view').click(function(){
		
		$('div.popupVid').fadeIn()
		$('p.top').hide()
	})

	$('a.close').click(function(){
		
		$(this).parent().fadeOut()
		$('p.top').fadeIn()
	})
	
	
	
	
	
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


	
	


})//ready*/