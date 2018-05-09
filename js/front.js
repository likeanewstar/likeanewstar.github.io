$(document).ready(function(){

			$('#fullpage').fullpage({
				//anchors: ['firstPage', 'secondPage', '3rdPage'],
				//menu: '#menu',
				navigation: true,
				navigationPosition: 'right',
				responsiveWidth: 1100,
				//easingcss3: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    			scrollingSpeed: 400
			})


			$('div.copy').animate({'top':'50%','opacity':'1'},800,function(){
				$('p.scroll').fadeIn(1000)
				setInterval(function(){
					$('p.scroll').animate({'bottom':'50px'})
					$('p.scroll').animate({'bottom':'40px'})
				},500)
			})

	
});//ready