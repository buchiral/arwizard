

//  https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
//  https://developers.google.com/maps/documentation/javascript/examples/marker-remove

var geocoder;
var map;
var markers = [];

function initialize() {

  elevator = new google.maps.ElevationService();
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(47.3686498, 8.539182500000038);
  var mapOptions = {
    zoom: 10,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) { addMarker(event.latLng); });
  
  // Adds a marker at the center of the map.
  // addMarker(haightAshbury);
 var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
//  map.fitBounds(defaultBounds);



 // Create the search box and link it to the UI element.
  var input = document.getElementById('addresss');
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox = new google.maps.places.SearchBox(input);

 
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
      
      loc = place.geometry.location;
      $('#latitude_temp').val(loc.lat());
      $('#longitude_temp').val(loc.lng()); 
      
      getAltitude(loc);
         
    }

    map.fitBounds(bounds);
    
    if (map.zoom > 10) {
        map.setZoom(13);
    };
    
    
    
    
  });




// Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

};//************ End init
    
    
    
    
// Add a marker to the map and push to the array.
function addMarker(location) {
 clearMarkers();
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  console.log(location);
      $('#latitude_temp').val(location.lat());
      $('#longitude_temp').val(location.lng());    
       getAltitude(location);
       
       
  markers.push(marker);
};
//*********


//---------
function codeAddress() {
  var address = document.getElementById('addresss').value;
 
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      }); 
      console.log(results[0]);
      var l1 = results[0].geometry.location.lat();
      var l12 = results[0].geometry.location.lng();
      $('#latitude_temp').val(l1);
      $('#longitude_temp').val(l12);
      
      
      
         } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

//---------


function clearMarkers() {
   
    for (var i = 0; i < markers.length; i++) {
             markers[i].setMap(null);
      }
    markers = [];
}


var elevator;

function getAltitude(loc){
    locations = [];
    locations.push(loc);
    
    var positionalRequest = {
    'locations': locations
  };
     elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK) {

      // Retrieve the first result
      if (results[0]) {
        console.log(results);
            
            $('#altitude_temp').val(results[0].elevation);
            
            
            
      } else {
        alert('No results found');
      }
    } else {
      alert('Elevation service failed due to: ' + status);
    }
  });
  
 return 0; 
  
};


//google.maps.event.addDomListener(window, 'load', initialize);
//google.maps.event.addDomListener(window, 'load', initialize);