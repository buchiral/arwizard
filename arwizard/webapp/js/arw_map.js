// Init Global-Variable
var map1;
var marker_position;
var center_mode_active = true;
//-------------------------------

function initMapMode() {
     
     directionsDisplay = new google.maps.DirectionsRenderer();
     
     
	    var w = arwizard.core.width;
        var h = arwizard.core.height;
        $('#map-canvas-1').width(w);
        $('#map-canvas-1').height(h);	
        
        $('#buttonContainer').css( {color: 'black'}); 
	
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  };
  
  map1 = new google.maps.Map(document.getElementById('map-canvas-1'), mapOptions);
  
  $('#camera').hide();
  $('#allthepoi').hide();
  
  
  
var image = {
    url: 'img/circle_blue.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };

  var bounds = new google.maps.LatLngBounds();
  
  var allPoi = arwizard.poi;
  
   for (var i = 0; i < allPoi.length; i++) {

        var lat1 = arwizard.geolocation.position.latitude;
        var lon1 = arwizard.geolocation.position.longitude;
        var poi  = arwizard.poi[i];
        var poi_DB_ID = arwizard.poi[i].id;
        var poi_divId = "poi" + i;
         
  
    var myLatLng = new google.maps.LatLng( poi['latitude'], poi['longitude']);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map1,
        title:poi['name']
    });
     
     marker.set("id",	i);
     
     if (poi['distance'] < 2000){ bounds.extend( myLatLng);};
    
	 createEvent(marker);
  } // End for
  
   var lat1 = arwizard.geolocation.position.latitude;
   var lon1 = arwizard.geolocation.position.longitude;

   	var myLatLng = new google.maps.LatLng( lat1, lon1);
        marker_position = new google.maps.Marker({
        position: myLatLng,
        map: map1,
        icon: image,
        zIndex: google.maps.Marker.MAX_ZINDEX + 1
    });
  
  map1.fitBounds(bounds);
  
  var listener = google.maps.event.addListener(map1, "bounds_changed", function() { 
  							if (arwizard.navigation.status){
  					 			updateNavigation();
  							};					 
					});
  							
  addPositionCenterButton();
  addMapListener();
};




function createEvent(marker){
	google.maps.event.addListener(marker, 'click', function() {
	BoxText(marker.id);
  	});
};


function updateMarker_position(){
   
   if(arwizard.core.map_mode_active){
   
   var lat1 = arwizard.geolocation.position.latitude;
   var lon1 = arwizard.geolocation.position.longitude;
   var myLatLng = new google.maps.LatLng( lat1, lon1);
   marker_position.setPosition(myLatLng);
    };
};


function addMapListener(){
	listener3 = google.maps.event.addListener(map1, "dragstart", function() { 
					  	center_mode_active = false;
					  	console.log('dragstart');
	});
	
}	 