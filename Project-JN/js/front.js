
$(document).ready(function(){

		//search
		$('input.searchBtn').click(function(){

			event.preventDefault()
		});

		//intro - rs

		$("#slider4").responsiveSlides({
	        auto: true,
	        pager: false,
	        nav: true,
	        speed: 500,
	        namespace: "callbacks"
  	    });


		/*intro

		$('.owl-carousel').owlCarousel({
				animateOut: 'fadeOut',
		    loop: true,
		    nav: false,
				dots: false,
				autoplay:true,
		    autoplayTimeout:3000,
		    autoplayHoverPause:true,
		    responsive:{
		        0:{
		            items:1
		        },
		        600:{
		            items:1
		        },
		        1000:{
		            items:1
		        }
		    }
		});intro*/


		//notice board

		$('.board h2').on({
			click: function (){

				$(this).addClass('active')
				$(this).parent().siblings().find('h2').removeClass('active')

				$(this).next('div.tab').show()
				$(this).parent().siblings().find('div.tab').hide()
			},
			mouseover: function(){

				$(this).css('text-decoration','underline')
			},
			mouseout: function(){

				$(this).css('text-decoration','none')
			},

		});

		$('.board h2').eq(0).trigger('click');//notice board


		//book recommandation

		$('.book ul.book_tit>li').click(function(){

		$(this).siblings().find('h2.title').removeClass('active')
		$(this).find('h2.title').addClass('active')
		$(this).siblings().find('h2.title span').removeClass('active')
		$(this).find('h2.title span').addClass('active')
		$(this).siblings().find('ul.noticeCon').hide()
		$(this).find('ul.noticeCon').show()

		});

		$('.book ul.book_tit>li').eq(0).trigger('click');//book recommandation

		//banner

		//a scrollTop 방지
		$('a').click(function(){

			event.preventDefault()
		})

		$('p.bn_next a').click(function(){

			event.preventDefault()
			$('ul.banner_lst>li').eq(0).appendTo('ul.banner_lst')
		});

		$('p.bn_prev a').click(function(){

			event.preventDefault()
			$('ul.banner_lst>li').eq(6).prependTo('ul.banner_lst')
		});

		//setInterval(동작,시간)  ---> 매 '시간'마다 동작하는 메소드
		setInterval(function(){$('ul.banner_lst>li').eq(0).appendTo('ul.banner_lst')},3000);


}) //ready
