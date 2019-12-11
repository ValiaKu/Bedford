 
function is_touch_device() {
    try {
        document.createEvent('TouchEvent');
        return true;
    }
    catch (e) {
        return false;
    }
}

if (is_touch_device()) {
    $('html').addClass('touch');
}
else {
    $('html').addClass('not-touch');
}





$(document).ready(function(){
 




	var w = $(window);
	var wh = w.height();
	var hw = $('.header-wrapper');
	var hi = $('.header-image');
	var h = $('.header');
	var nw = $('.nav-wrapper');
	var n = $('.nav');
	var nu = $('.nav > ul');
	var nextEl = $('.header-wrapper').next();
	var nt = nextEl.offset().top;
	var snapPoint = 768;

	var ts = ['transition', '-webkit-transition', '-moz-transition', '-ms-transition', '-o-transition'];
	var tf = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'oTransform'];
	//var fr = ['filter','-webkit-filter','-moz-filter','-ms-filter','-o-filter'];




	$('.scroll-down-arrow').click(function(){
		$('html, body').animate({ scrollTop: nextEl.offset().top - 50 }, 1000);
	});

	
	
	if($('html').hasClass('touch') || h.hasClass('animated')) {
		ntm = nt;
	}
	else {
		ntm = nt*2;
	}
	
	var navTop = function (){
		var wst = w.scrollTop();
		w.scroll(function() {
			var wst = w.scrollTop();
	
			if(wst >= ntm - 50) {
				n.addClass('fixed');
			}
			else {
				n.removeClass('fixed');
			}
			
			
			if(!h.hasClass('animated') && !$('html').hasClass('touch') && wst >= ntm - wh) {
				$('.header-placeholder').css('height',nt);
			}
			else {
				$('.header-placeholder').css('height',0);
			}
			
		});
	
	};
	
	


	h.find('h1 span').css({opacity:0});

 
w.scroll(function() {
	var wst = w.scrollTop();
	var wh = w.height();
	var wb = wst + wh;
	
	
	
	
	navTop();
	


	if (!$('html').hasClass('touch')) {

	
			/*
			h.css({
				transform: 'translate3d(0, ' + (wst / 2) + 'px ,0)'
			});
			*/
		
			h.find('h1 .first-line').css({
				opacity: 0 + wst / 500
			});
		
		
		
		

			if(wst >= nt/5) {
				var co = hi.css('opacity');
				hi.css({
					opacity: co
				});
			}
			else {
				hi.css({
					opacity: 1 - wst / 500
				});
			}
		
			if(wst >= nt/2) {
			
				h.find('h1 .second-line').css({
					opacity: -1 + wst / 300
				});
			}
			else {
				h.find('h1 .second-line').css({
					opacity: 0
				});
			}



		

			if(wst >= nt) {
		 		if(!h.hasClass('animated')) {
		 			hw.addClass('static');
		 		}
				
				h.addClass('static');
			
			}
			else {
			 
				hw.removeClass('static');
				h.removeClass('static');
			}
	
	
		}
});
 
	


	var navResize = function (){
		var totalHeight = 0;

		nu.children('li').each(function(){
			totalHeight = totalHeight + $(this).outerHeight(true);
		});
		
		if(w.width() <= snapPoint) {
			nu.css('height',totalHeight);
		}
		else {
			nu.css('height','auto');
		}
		 

	};
	
	w.resize(function(){
		
		if(w.width() <= snapPoint) {
		
		}
		else {
		 	hw.removeClass('active');
		
			
		}
		navResize();
		navTop();
	 
	
	});
	
	$(window).on('orientationchange',function(){
		navResize();
		navTop();
	});
	
	
	
	$('body').on('click','.nav > ul > li > a',function(e){
		e.preventDefault();
		if(w.width() <= snapPoint) {
		
			var parentLi = $(this).parent();
			var subnav = parentLi.find('.subnav');
			
			
			
			if(subnav.length){
				if (parentLi.hasClass('active')) {
					parentLi.removeClass('active');
					 
				}
				else {
					$('.nav > ul > li.active').removeClass('active');
					parentLi.addClass('active');
					 
				}
			
			
				navResize();
			}
			
			
			else {
				window.location = $(this).attr('href');
			}
		}
		else {
			window.location = $(this).attr('href');
		}
		return false;
	});
	
	
	$('body').on('click','.subnav a',function(e){
		e.preventDefault();
		var thisParent = $(this).parents('ul').prev('a');
		var parentHref = thisParent.attr('href');
		parentHref = parentHref + $(this).attr('href');
		
		if (thisParent.parent().hasClass('current')) {
			$('.nav-trigger').trigger('click');
		}
		

		window.location = parentHref;
		return false;
	});
	
	
	$('.nav-trigger').click(function(){
		$('html,body').toggleClass('mobile-nav-active');
		navResize();
		hw.toggleClass('active');
		
		
		var activeSub = $('#submenu').find('.active').attr('href');
		
		$('.current').find('a[href="'+activeSub+'"]').addClass('active');
		
		
		/*
		
		if(hw.hasClass('active')) {
			hw.fadeOut(200,function(){
				hw.removeClass('active').show();
			
			});
		}
		else {
			hw.hide().addClass('active').fadeIn();
		}
		
		
		*/
		
		navResize();
		
		$('.nav > ul > li').removeClass('active');
		 
		
	});
	
	
	
});