$( document ).ready(function() {
	
	eventHandlers ();
	
	panElement ('.map-overview');
	resizeWindowLocation();
	

	        if ($( window ).width() < 1024) {

	        	$( "#button-tap-1" ).click(function() {
	        		
	        		$('#map-overview .inner').toggleClass("toggleleMapInner"); 
            		$('#map-overview').toggleClass("toggleleMap");
	        		
  				});



             $('#map-overview .inner').click(function() {
	        		
	        		$('#map-overview .inner').toggleClass("toggleleMapInner"); 
            		$('#map-overview').toggleClass("toggleleMap");
	        		
  				});


             $( "#button-tap-2" ).click(function() {
	        		$('#map-overview-2 .inner').toggleClass("toggleleMapInner"); 
            		$('#map-overview-2').toggleClass("toggleleMap");
	        		
  				});



             $('#map-overview-2 .inner').click(function() {
	        		
	        		$('#map-overview-2 .inner').toggleClass("toggleleMapInner"); 
            		$('#map-overview-2').toggleClass("toggleleMap");
	        		
  				});
        	
	}
});



$( window ).resize(resizeWindowLocation);


function resizeWindowLocation () {
  
   if ($( window ).width() < 550 && travelCarousel==false) {
	  
		$('.traveloptions .inner').carouFredSel({
			prev: '.traveloptions .prev', next: '.traveloptions .next', 
			responsive:true, align: false, scroll: 1000, classnames:{selected:"traveloption"}
		})
		
		travelCarousel = true;
		
  } else if ($( window ).width() > 550) {
	  
	  	$('.traveloptions .inner').trigger("destroy").attr('style', '');
		$('.traveloption').attr('style', '');
		travelCarousel = false;
		
  }


  
}
