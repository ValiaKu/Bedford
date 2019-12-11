function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

$(window).load(function() {
  var $all = $(".amenity").removeClass("initialSelected");
  $(shuffle($all).slice(0, 8)).addClass("initialSelected");

  var $allMinusClicked;
  var $allLeftAmenities;
});


$( document ).ready(function() {
    $(".amenities-selector a").click(function () {


   
    var activeSubsection = $("#amenities");

    activeSubsection.addClass('at').css({opacity:0}).animate({opacity:1});
    TweenMax.staggerFrom(activeSubsection, 0.01, {y:-400});
    //$('html, body').scrollTop();

 




    if(".initialSelected") {
      $(".amenity").removeClass("initialSelected");
    }
    //evt.preventDefault();
    //var _class = $(this).attr('href').substr(1);
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      

      //$(".amenity."+_class).removeClass('active');
      //var amountOfMinus = 0;

      $(".amenity."+this.id).removeClass("selected");
      $(".amenity."+this.id).removeClass("visible100");

       $allMinusClicked = $(".amenity.visible100.selected").not("."+this.id).toArray();



      var $clientlunchArr = $(".amenity.clientlunch").toArray();
      var $finediningArr = $(".amenity.finedining").toArray();
      var $afterhoursArr = $(".amenity.afterhours").toArray();
      var $designerbrandsArr = $(".amenity.designerbrands").toArray();
      var $quickbiteArr = $(".amenity.quickbite").toArray();
      var $boutiqueArr = $(".amenity.boutique").toArray();

      if($(".amenity.clientlunch").hasClass("visible100")) {

        $(shuffle($.merge( $.merge( [], $allMinusClicked ), $clientlunchArr )).slice(0,8)).addClass("visible100").addClass("selected");
        
      }
      if($(".amenity.finedining").hasClass("visible100")) {
        $(shuffle($.merge( $.merge( [], $allMinusClicked ), $finediningArr )).slice(0,8)).addClass("visible100").addClass("selected");
      }
      if($(".amenity.afterhours").hasClass("visible100")) {
       $(shuffle($.merge( $.merge( [], $allMinusClicked ), $afterhoursArr )).slice(0,8)).addClass("visible100").addClass("selected");
      }
      if($(".amenity.designerbrands").hasClass("visible100")) {
      $(shuffle($.merge( $.merge( [], $allMinusClicked ), $designerbrandsArr )).slice(0,8)).addClass("visible100").addClass("selected");
      }
      if($(".amenity.quickbite").hasClass("visible100")) {
       $(shuffle($.merge( $.merge( [], $allMinusClicked ), $quickbiteArr )).slice(0,8)).addClass("visible100").addClass("selected");
      }
      if($(".amenity.boutique").hasClass("visible100")) {
       $(shuffle($.merge( $.merge( [], $allMinusClicked ), $boutiqueArr )).slice(0,8)).addClass("visible100").addClass("selected");
      }
 

    //  for(var i = 0; i <9; i++) {
        /*if($(".amenity."+this.id).hasClass("visible100")) {
          if ($(".amenity."+this.id).hasClass("selected")) {
            amountOfMinus++;
          alert(amountOfMinus);
          }
          
        }*/
        //alert($allMinusClicked[i]);
      //  $.each($allMinusClicked, function( index, value ) {
  //alert( index + ": " + value );
//});
  //    }

      //alert(".amenity."+this.id);

      //$(shuffle($allMinusClicked).slice(0, 8)).addClass("visible100").addClass("selected");

       
      
    } else {
        $(this).addClass('active');
        var $baseArray = $(".amenities .selected").toArray();
        $(".amenity").removeClass("selected");

        var $addedArray = $(".amenity." + this.id).toArray();
        $(shuffle($.merge( $.merge( [], $baseArray ), $addedArray )).slice(0,8)).addClass("visible100").addClass("selected");
    }

  });
});







