/********************SCRIPTS*******************/

var menuState = "default";
var menuStateSub = "default";
var introState = "hidden";
var distance;
var distanceSub;
var carousel;
var middleOfTheScreen;

var travelCarousel = false;

var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var middleOfTheScreen = windowHeight / 2;
alert(middleOfTheScreen);
$( document ).ready(function() {
	setDistance ();
	setDistanceSub();
	$( window ).scroll(scrollhandler);
	
	scrollhandler();
	eventHandlers ();
	
	panElement ('.map-overview');
	panElement ('.map-regeneration');
	resizeWindow();

});

function setDistance () {
	distance = $('.content').offset().top - middleOfTheScreen;
}

function setDistanceSub () {
	distanceSub = $('.content').offset().top - 250;
}

$( window ).resize(resizeWindow);


function resizeWindow () {
  
  setDistance ();
  syncHeights ('.amenity .copy p');
  scrollhandler();
  $( ".top" ).height(windowHeight);
  
  if ($( window ).width() < 550 && travelCarousel==false) {
	  
		$('.traveloptions .inner').carouFredSel({
			prev: '.traveloptions .prev', next: '.traveloptions .next', 
			responsive:true, align: false, scroll: 1000, 
			swipe: {
				onMouse: true,
				onTouch: true,
				options: {
					excludedElements: ".noSwipe",
				}
			}
		})
		
		
		$('.occupiers .inner').carouFredSel({
			prev: '.occupiers .prev', next: '.occupiers .next', 
			responsive:true, align: false, scroll: 1000, height:300,
			swipe: {
				onMouse: true,
				onTouch: true,
				options: {
					excludedElements: ".noSwipe",
				}
			}
		})
		
		
		$('.activities .inner').carouFredSel({
			prev: '.activities .prev', next: '.activities .next', 
			responsive:true, align: false, scroll: 1000, height:380,
			swipe: {
				onMouse: true,
				onTouch: true,
				options: {
					excludedElements: ".noSwipe",
				}
			}
		})
		
		travelCarousel = true;
		
  } else if ($( window ).width() > 550) {
	  
	  	$('.traveloptions .inner').trigger("destroy").attr('style', '');
		$('.traveloption').attr('style', '');
		
		
		$('.occupiers .inner').trigger("destroy").attr('style', '');
		$('.occupier').attr('style', '');
		
		$('.activities .inner').trigger("destroy").attr('style', '');
		$('.activity').attr('style', '');
		
		
		travelCarousel = false;
		
  }
  
}


function syncHeights (target) {
	var maxHeight = -1;
	
	 $(target).css('height', 'auto');
	 $(target).each(function() {
     	maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	 });

   	$(target).each(function() {
     	$(this).css('height', maxHeight);
   	});
}

function panElement (target) {
	
	var $container = $(target);
    var $img = $(target+" .inner");
    var cHeight = $container.height();
    var cWidth = $container.width();
    var iHeight = $img.height();
    var iWidth = $img.width();
    
    var top = (iHeight - cHeight) / 2;
    var left = (iWidth - cWidth) / 2;
    
    $container.scrollLeft(left);
    $container.scrollTop(top);

	var clicking = false;
	var previousX;
	var previousY;
	
	$(target).mousedown(function(e) {
		e.preventDefault();
		previousX = e.clientX;
		previousY = e.clientY;
		clicking = true;
	});
	
	$(document).mouseup(function() { 
		clicking = false;
	});
	
	$(target).mousemove(function(e) {
	
		if (clicking) {
			e.preventDefault();
			var directionX = (previousX - e.clientX) > 0 ? 1 : -1;
			var directionY = (previousY - e.clientY) > 0 ? 1 : -1;
			$(target).scrollLeft($(target).scrollLeft() + (previousX - e.clientX));
			previousX = e.clientX;
			previousY = e.clientY;
		}
	});
}


function scrollhandler () {
	if ( $( window ).scrollTop() < distance && menuState == "alternate") {
		altermenu("default");
	} else if ( $( window ).scrollTop() >= distance && menuState == "default") 	{
		altermenu("alternate");
		hideintro ();
	} 
	else if ( $( window ).scrollTop() > 0 && introState == "visible" ) {
		hideintro();
	} else if ( $( window ).scrollTop() == 0 && introState == "hidden" ){
		intro();
	}	
	if ( $( window ).scrollTop() < distanceSub && menuStateSub == "alternateSub") 	{
		
		altermenuSub("default");
	
	}
	else if ( $( window ).scrollTop() >= distanceSub && menuStateSub == "default")  {
		altermenuSub("alternateSub");
	
	} 	
	
}

function intro () {
	
	introState = "visible";
	$( ".message" ).stop().show();
	$( ".message ._1, .message ._2, .top .bg" ).stop().hide();
	$( ".top .bg" ).stop().delay(0).fadeIn(2000);
	$( ".message ._1" ).stop().delay(0).fadeIn(1500);
	$( ".message ._2" ).stop().delay(500).fadeIn(1500);
	
	
}

function hideintro () {
	
	introState = "hidden";
	$( ".top .bg, .message" ).stop().fadeOut(1000);
	
	/*$( ".column article, .column div" ).each(function() {
		console.log($(this));
		TweenMax.staggerFrom($(this), 1, {y:150+Math.random()*450});
	});*/
}

function altermenu (state) {
	
	menuState = state;
	var otherState = (menuState == "default")?"alternate":"default";
	
	$( "header.menu" ).stop().animate({top:0, opacity:0}, 250, function() {
		$(this).removeClass(otherState).addClass(menuState).animate({top:0, opacity:1});
	});
	
}

function altermenuSub (state) {
	
	menuStateSub = state;
	var otherStateSub = (menuStateSub == "default")?"alternateSub":"default";
	
		$( ".submenu" ).removeClass(otherStateSub).addClass(menuStateSub);


	
}



function eventHandlers () {
	
	
	
	$('.slideIn').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
		   if ($(this).hasClass('done')==false) {
			   	var dely = ($(this).attr('data-delay'))?$(this).attr('data-delay'):0;
				TweenMax.staggerFrom($(this), 1, {y:250, opacity:0, delay:dely});
				$(this).addClass('done');
		   }
	   }
	});
	
	$('.slideInTop').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
		   if ($(this).hasClass('done')==false) {
			   	var dely = ($(this).attr('data-delay'))?$(this).attr('data-delay'):0;
				TweenMax.staggerFrom($(this), 1, {y:-250, opacity:0, delay:dely});
				$(this).addClass('done');
		   }
	   }
	});
	
	$('.fadeIn').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
		   if ($(this).hasClass('done')==false) {
			   	var dely = ($(this).attr('data-delay'))?$(this).attr('data-delay'):0;
				var duration = ($(this).attr('data-duration'))?$(this).attr('data-duration'):1.5;
				TweenMax.staggerFrom($(this), duration, {opacity:0, delay:dely});
				$(this).addClass('done');
		   }
	   }
	});
	
	$('.fadeInTolerant').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
		   if ($(this).hasClass('done')==false) {
			   	var dely = ($(this).attr('data-delay'))?$(this).attr('data-delay'):0;
				var duration = ($(this).attr('data-duration'))?$(this).attr('data-duration'):1.5;
				TweenMax.staggerFrom($(this), duration, {opacity:0, delay:dely});
				$(this).addClass('done');
		   }
	   },
	   tolerance:-100
	});
	
	
	$('img.lazy').onScreen({
	   container: window,
	   direction: 'vertical',
	   doIn: function() {
		   if ($(this).hasClass('done')==false) {
				TweenMax.staggerFrom($(this), 1, {opacity:0.01});
				$(this).addClass('done');
		   }
	   },
	   lazyAttr: "data-src",
   	   lazyPlaceholder: 'images/spacer.gif'
	});
	
	
	
	
	
	$(".menu .mobilemenu").click(function (evt) {
		evt.preventDefault();
		$("header.menu").addClass('active');
	});
	
	$(".menu .closemobile").click(function (evt) {
		evt.preventDefault();
		$(".menu").removeClass('active');
	});
	
	if ($('.gallery .imgs').width()) {
		
		carousel = $('.gallery .imgs');
		carousel.carouFredSel({
			prev: '.prev', next: '.next', width: '100%',
    height: 'variable',
    items: {
        height: 'variable'
    },
  responsive: true, align:false, pagination: ".pager", scroll: 1000,
  onCreate: onCreate
		});
		
		
	
		/*$('.imgs').bxSlider({
			prevSelector: ".prev",
			nextSelector: ".next",
			pagerSelector: ".pager"
		});*/
	
	}
	
	//$(window).on('resize', onResize).trigger('resize');
				
				
	if ($( ".floorplans" ).width()) {
		$( ".floorplans" ).accordion( {collapsible: true, active: false, heightStyle:"content"} );
	}
	
	
	$(".submenu a").click(function (evt) {
		
		evt.preventDefault();
		$(".submenu a").removeClass('active');
		$(this).addClass('active');
		
	});


	$(".mapmenu a").click(function (evt) {
		
		evt.preventDefault();
		$(".mapmenu a").removeClass('active');
		$(this).addClass('active');
		$(".developments").removeClass('active');
		$($(this).attr('href')).addClass('active');
		
	});
	
	
	$(".amenities-selector a").click(function (evt) {
		
		evt.preventDefault();
		var _class = $(this).attr('href').substr(1);
		
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			//$(".amenity."+_class).removeClass('active');
			TweenMax.to($(".amenity."+_class), .5, {css:{className:"-=active"}});
		} else {
			$(this).addClass('active');
			//$(".amenity."+_class).addClass('active');
			TweenMax.to($(".amenity."+_class), .5, {css:{className:"+=active"}});
		}

	});
	
	
	$(".submenu a, .subnav a").click(function (evt) {
		
		evt.preventDefault();
		$(".submenu a, .subnav a").removeClass('active');
		$(this).addClass('active');
		$(".subsection").removeClass('active');
		
		var activeSubsection = $($(this).attr('href'))
		
		activeSubsection.addClass('active').css({opacity:0}).animate({opacity:1});
		TweenMax.staggerFrom(activeSubsection, 1, {y:200});
		$(".menu").removeClass('active');
		
	});
	
}


function onCreate() {
  $(window).on('resize', onResize).trigger('resize');
  onResize();
}

function onResize() {
  // Get all the possible height values from the slides
 /* var heights = carousel.children().find("img").map(function() { return $(this).height(); });
  // Find the max height and set it
  carousel.parent().add(carousel).height(Math.min.apply(null, heights));
  console.log(heights);*/
}
