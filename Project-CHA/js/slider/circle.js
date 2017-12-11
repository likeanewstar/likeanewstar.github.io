function initJqueryCycle(target, p_opt) {
	var _defaults = {
		cycle_opt : {
			'fx' : 'scrollHorz',
			'slides' : '.slide',
			'continueAuto' : false,
			'prev' : "#prevOther",
			'next' : "#nextOther",
			'log' : false
		}
		, site_opt : {
			isImgSrcChg : false
			, isCycle : true
		}
	};
	
	var options = $.extend(_defaults, p_opt);
	var slides 	= options.cycle_opt["slides"];
	var tot_pg	= target.find(slides).length; 
	
	target.cycle(options.cycle_opt).find(slides).css("z-index", "20");
	target.find(".btn_cycleLM, .btn_cycleRM").show();
	
	if (options.site_opt.isImgSrcChg) {
		fnImgSrcChange(target.find(slides).eq(0));
	}
	
	if (tot_pg < 2) {
		target.find(".btn_cycleLM, .btn_cycleRM").hide();
	}
	
	if (!options.site_opt.isCycle) {
		target.find(".btn_cycleLM").hide();
	}
		
		target.on("cycle-before", function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			var box = jQuery(event.target);
			box.css("z-index", "20");
			box.find(slides).css("z-index", "20");
			box.find(".btn_cycleLM, .btn_cycleRM, .cycle-pager").css("z-index", "999");
			
			if (!options.site_opt.isCycle) {
				if (optionHash.slideNum == 1) {
					target.find(".btn_cycleLM").hide();
				}
				else {
					target.find(".btn_cycleLM").show();
				}
				
				if (tot_pg == optionHash.slideNum) {
					target.find(".btn_cycleRM").hide();
				}
				else {
					target.find(".btn_cycleRM").show();
				}
			}
			
			if (options.site_opt.isImgSrcChg) {
				var slide = $(incomingSlideEl);
				if (!slide.hasClass("img_chg_ok")) {
					slide.addClass("img_chg_ok");
					fnImgSrcChange(slide);
				}
			}
		});
	
	target.on("cycle-after", function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		var box = jQuery(event.target);
		box.find(slides).css("z-index", "20");
		box.find(".btn_cycleRM, .btn_cycleLM, .cycle-pager").css("z-index", "21");
	});
}




var WebMain = {
	init : function () {
		
		WebMain.initPcMainBnr();
	}
	// pc_main 배너
	, initPcMainBnr : function () {
		
		var mainCycle = $("#mainCycle");
		var pager = $("#pager01");
		
		initJqueryCycle(mainCycle, { 
			cycle_opt : {
				'fx' : 'scrollHorz',
				'timeout' : 3000,
				'slides' : '> .slide',
				'pauseOnHover' : true,
				// 'continueAuto' : false,
				'prev' : "#prev_main",
				'next' : "#next_main",
				'log' : false
			}
			
		});
	
	/*** pager ***/
		mainCycle.on("cycle-before", function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
			
			var div_slide = mainCycle.find("> .slide").eq(optionHash.slideNum); 
			
			if (div_slide.hasClass("cycle-bg_chg")) {
				div_slide.removeClass("cycle-bg_chg");
				div_slide.css("background-image", "url(" + div_slide.attr("data-bg_chg_url") + ")");
			}
			
			var a_pager = pager.find(".a_cycle-pager");
			a_pager.removeClass("cycle-pager-active").find('.balloon').stop(true, false).fadeOut(150);
			a_pager.eq(optionHash.slideNum - 1).addClass("cycle-pager-active").find('.balloon').stop(true, false).fadeIn(150);

		});
		
		pager.find("> a").mouseenter(function(){
			pager.find('> a').find('.balloon').css({opacity: 0});
			$(this).find('.balloon').css({opacity: 1});
		}).click(function() {
			var actSlide = $(this).index();
			mainCycle.cycle(actSlide);
			return false;
		});
		
		pager.mouseleave(function(){
			pager.find('.balloon').attr('style', '');
		});
	}
		
		
}