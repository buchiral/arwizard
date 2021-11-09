/*
 * https://developers.google.com/maps/documentation/javascript/directions?hl=de#DirectionsRequests
 * 
 */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var route;
var response_store;
var navigation_alert = false;  

function calcRouteFromPOI() {
    var start, end;
    var lat1, lon1, lat2, lon2;
    var d, travMode, request, distance;
    
    start = arwizard.geolocation.position.latitude + ', ' + arwizard.geolocation.position.longitude;
    end   = arwizard.navigation.endpoint_latitude  + ', ' + arwizard.navigation.endpoint_longitude;

    lat1 = arwizard.geolocation.position.latitude;
    lon1 = arwizard.geolocation.position.longitude;
    lat2 = arwizard.navigation.endpoint_latitude;
    lon2 = arwizard.navigation.endpoint_longitude;

    distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    if (distance > 200) {
        //buttonStopNavigation();
        //alert("Die Distanz ist grösser als 200km, dies ist zu weit!");
        //return;
    };

if (distance < 0.015) {
        buttonStopNavigation();
        alert("Die Distanz ist kleiner als 15m, Das Ziel befindet sich ganz in der Nähe.");
        return;
    };



    travMode =  arwizard.navigation.travelmode;

    request = { origin: start,
                destination: end,
                travelMode: travMode // DRIVING, WALKING, TRANSIT, BICYCLING 
                };
    
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            response_store = response;
            route = response.routes[0];
            startNavigation(route);
        }
    });
}

function startNavigation(route) {
    
    
     var distance_route = route.legs[0].distance.value; 
    
    if (distance_route > 15) {
    
            if (arwizard.core.map_mode_active){
          
                   if (center_mode_active) {
        				
        		        var bounds = new google.maps.LatLngBounds();
        		        var lat1 = arwizard.geolocation.position.latitude;
        		   		var lon1 = arwizard.geolocation.position.longitude;
        		        var myLatLng = new google.maps.LatLng( lat1, lon1);	       	
        	       	
        	       		map1.setCenter(myLatLng);
        	       		map1.setZoom(18);

        	  	   };
        		
        		  $('#svg_navigation').hide();
        	      drawPathdescriptionBox();
        	     
                     directionsDisplay.setMap(map1);  
                     directionsDisplay.setOptions({preserveViewport: true}); 
                     directionsDisplay.setDirections(response_store);    
                       
            } else  {
                    drawNavigation(route);
            };
    
    
    } else {
        
             
      if (navigation_alert == false) {
          var end_text =  'Sie haben ihr Ziel erreicht. Es befindet sich in den nächsten 15m. Der Navigations-Modus wird beendet.';
              alert(end_text);
              navigation_alert = true;
              buttonStopNavigation();
         } else {
        
            //the navigation_alert is already showed  
          
      };
           
        
        
    };
    
};


function drawNavigation(route) {
    // Basis are the Points from GoogleMaps
    // For a good navigation, we have to draw a Path on the display. 
    // The next Point should be 
    // usefull is only the next 50 meters
    // So from the current Location draw a path with the Steps in the next 5 meters
    // We have to caluclating the Distance!
    // Achtung, Die Distanz sollte von der Karte sein! Nicht Luftlinie
    // Path to Path additiion


    if ($('#svg_navigation').length == 0) {
        $("#navigationpoi").append('<svg id="svg_navigation"></svg>');
    };
		
	if (arwizard.core.map_mode_active) {
		$('#svg_navigation').hide();
	} else {
		$('#svg_navigation').show();
	};


    var lat1, lon1, lat2, lon2;
    var relevant_path = [];

    var max_distance_view = arwizard.navigation.max_distance_view; // Meters all the Point in this range will display

    var count_points = route.overview_path.length;
        count_points = Math.min(4,count_points);
        
        console.log(count_points);


    relevant_path.push(route.overview_path[0]); // First ist the start_point of the overview_path

    // Get the Distance from relevant points
    var sum_distance = 0;
    for (var i = 0; i < (count_points-1); i++) {

	    //console.log(i + ' - ' +count_points );
		//console.log(route.overview_path[i + 1] );
        lat1 = route.overview_path[i].lat();
        lon1 = route.overview_path[i].lng();
        lat2 = route.overview_path[i+1].lat();
        lon2 = route.overview_path[i+1].lng();
        
        var d = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

        var sum_tmp = sum_distance + d;

        if (sum_tmp > max_distance_view && i > 0) {
            i = count_points + 100; // aus der Schleife
        } else {
            relevant_path.push(route.overview_path[i+1]);
            sum_distance = sum_distance + d;
        };
    };

console.log(sum_distance);
console.log(relevant_path);

    //Create Points on Display
    //Ausgangspunkt ist die Mitte unten
    var view_height = arwizard.core.fieldview_height;
    var view_weight = arwizard.core.fieldview_width;
    var view_angle = arwizard.core.fieldview_angle; // Winkel Sichtweite    

    var x = 0,
        y = 0;
    var lat1, lon1, lat2, lon2;
    var x1, x2, x3, x4, y1, y2, y3, y4,y_old = 0, distance_in_px_prev_sum = 0;

    var point_x_current;
    var point_y_current;
    var point_x_prev = arwizard.core.fieldview_width / 2; // Start in der Mitte des Bildschirms
    var point_y_prev = arwizard.core.fieldview_height;

    var polygon_width = 100;

    var count_view_polygon = $('.nav_path').length;
    var count_relevant_points = relevant_path.length;

      //Remove old paths
    $( ".nav_path" ).each(function() {
                                        var id = this.id;
                                        var number = id.substring(10);
                                         if (number >= count_view_polygon) {
                                             $('#'+id).parent().remove();
                                         };    
                                        
                                     });

  /*
    for (var i = 0; i < count_view_polygon; i++) {
        var element_id = 'paths_' + i;

        if (count_relevant_points <= i) {
            $('#nav_' + element_id).parent().remove();
        };
    }; // Ende remove

    */
    
    
    //Start Draw the Paths
    //Start with second Point (i=1)
    for (var i = 1; i < (count_relevant_points); i++) {

        var element_id = 'paths_' + i;

        lat1 = relevant_path[i - 1].lat();
        lon1 = relevant_path[i - 1].lng();
        lat2 = relevant_path[i].lat();
        lon2 = relevant_path[i].lng();

        di = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
        be = Math.round(getBearing(lat1, lon1, lat2, lon2) * 100) / 100;

		distance_in_px_current = (((view_height * 0.8) / sum_distance) * di);
               
        point_x_current = getx(be);
        point_y_current = arwizard.core.fieldview_height - distance_in_px_current - distance_in_px_prev_sum;
        
        distance_in_px_prev_sum = distance_in_px_current + distance_in_px_prev_sum;
        
        //console.log ( 'Länge in px' + distance_in_px_current );
        //console.log(point_x_current + ' - ' + point_y_current + ' ' + be + '  dist:' + di);
        
        
        //------------
        var comma = ',';
        var space = ' ';


        //definie Path-Points
        x1 = point_x_prev - polygon_width / 2;
        x2 = point_x_prev + polygon_width / 2;

        polygon_width = polygon_width * 0.4;

        x3 = point_x_current - polygon_width / 2;
        x4 = point_x_current + polygon_width / 2;

        y1 = point_y_prev;
        y2 = point_y_prev; 
        y3 = point_y_current;
        y4 = point_y_current;

        point_x_prev = point_x_current;
        point_y_prev = point_y_current;
        
        svg_point1 = x1 + comma + y1;
        svg_point2 = x2 + comma + y2;
        svg_point3 = x3 + comma + y3;
        svg_point4 = x4 + comma + y4;

        if ($('#nav_' + element_id).length == 0) {
            $("#svg_navigation").append('<svg><polygon class="nav_path" id="nav_' + element_id + '" /></svg>');
        };

        $('#nav_' + element_id).attr('points', svg_point1 + space + svg_point2 + space + svg_point4 + space + svg_point3);
        $('#nav_' + element_id).attr('fill', 'rgba(0, 255, 0, 0.6)');


        polygon_width = polygon_width;


    }; // End For

    //*************//

	drawPathdescriptionBox();

    var view_height = arwizard.core.fieldview_height;
    var view_width = arwizard.core.fieldview_width;
    var view_angle = arwizard.core.fieldview_angle; // Winkel Sichtweite

    document.getElementById('svg_navigation').style.width = view_width;
    document.getElementById('svg_navigation').style.height = view_height;

    var start1_x = view_width / 2;
    var start1_y = view_height / 2;

    p1_x = start1_x * 0.8;
    p2_x = start1_x * 1.2;


    var comma = ',';
    var space = ' ';
    var p1 = p1_x + comma + start1_y;
    var p2 = p2_x + comma + start1_y;
    var p3 = x + comma + y;

    circle = '<svg><circle cx="' + start1_x + '"  cy="' + start1_y + '"  r="10" stroke="black" stroke-width="3" fill="black" /></svg>';
    circle = '<svg><polygon points="' + p1 + space + p2 + space + p3 + '" style="fill:lime;stroke:purple;stroke-width:1" /></svg>';

    
};



function updateNavigationNoGPS() {
    if (arwizard.navigation.status) {
        startNavigation(route);
    };

};

function updateNavigation() {
    // The User allways change position, so we have to get the new Route from GoogleMapsAPI
    if (arwizard.navigation.status) {
        calcRouteFromPOI();
        
    };

};


function getx(bearing) {

    var view_height = arwizard.core.fieldview_height;
    var view_weight = arwizard.core.fieldview_width;
    var view_angle = arwizard.core.fieldview_angle; // Winkel Sichtweite
    var live_compass_alpha = arwizard.sensor.compassHeading;

    var Bearing = bearing;
    var korrektur = 0;
    //--------------------
    if ((live_compass_alpha - (view_angle / 2)) < 0) {
        var korrektur = (view_angle / 2);
    };

    if ((live_compass_alpha + (view_angle / 2)) > 360) {
        var korrektur = -(view_angle / 2);
    };

    var xBearing = Bearing + korrektur;
    var xCompassHeading = live_compass_alpha + korrektur;

    if (xBearing > 360) {
        xBearing = xBearing - 360;
    };

    if (xBearing < 0) {
        xBearing = xBearing + 360;
    };
    // ----------------------------            
    zBearing = xBearing;
    zCompassHeading = xCompassHeading;

    limit_left = zCompassHeading - (view_angle / 2);
    limit_right = zCompassHeading + (view_angle / 2);

    // Ist POI im View-Bereich?
    if (zBearing > limit_left && zBearing < limit_right) {

        var x = 0;

        x = ((zBearing - limit_left) / view_angle) * view_weight; // Position in Pixel
        x = Math.round(x * 100) / 100;

        return x;

    } else {

        //console.log('Bea: ' + zBearing + ' - Limit Right: ' + limit_right + ' - limitleft: ' + limit_left);

        d1 = Bearing - live_compass_alpha;
        d2 = live_compass_alpha - Bearing;

        if (d1 < 0) {
            d1 = d1 + 360;
        };
        if (d2 < 0) {
            d2 = d2 + 360;
        };

        if (d1 > d2) {
            x = -50;
        } else {
            x = view_weight + 50;
        };

        //console.log('d1: ' + d1 + ' - d2: ' + d2 + ' - limitleft: ' + limit_left);


    }; // end if

    return x;
};




function buttonStopNavigation() {
	arwizard.navigation.status = false;
    $("#navigationpoi").empty();
    
    if(directionsDisplay != null) {
    directionsDisplay.setMap(null);
    directionsDisplay = null;
}
    
};



function addPositionCenterButton(){
	 var szenario = $('#buttonContainer');
       
    if ($('#centerPosition').length == 0) {
   		szenario.append('<div id="centerPosition"><i class="ion-android-locate"></i> </div>');
	};
   	$('#centerPosition').show();
   
    $('#centerPosition').css( { fontSize: '30px' });
	
	$('#centerPosition').click(function(){
			        var lat1 = arwizard.geolocation.position.latitude;
			   		var lon1 = arwizard.geolocation.position.longitude;
			        var myLatLng = new google.maps.LatLng( lat1, lon1);
			       
			       //google.maps.event.removeListener(listener1);
			       
			      center_mode_active = true;
			      map1.setCenter(myLatLng);
			      map1.setZoom(18);
				  
			       
			       click_event = true;
			       init_center_mode = false;
	});


};

function drawPathdescriptionBox(){

    if ($('#path_description').length == 0) {
        $("#navigationpoi").append('<div id="path_description" ></div>');
    };

    var inhalt = '<b>Navigation Next-Steps:</b><span id="buttonStopNavigation" style="float:right;font-size:15px"><i class="ion-android-hand"></i> Stop</span><br>';
    inhalt = inhalt + '- Distance:' + route.legs[0].distance.text + ' | Duration: ' + route.legs[0].duration.text;
    inhalt = inhalt + '<br>- ' + route.legs[0].steps[0].instructions;
    
    if (route.legs[0].steps.length > 1){
        inhalt = inhalt + '<br>- ' + route.legs[0].steps[1].instructions;
    };

    $('#path_description').html(inhalt);
    $('#buttonStopNavigation').click(function() {
        buttonStopNavigation();
    });

    $('#path_description').css({
        "border-color": 'red',
        'width': 'auto',
        'min-height': '75px',
        'position': 'fixed',
        'background': 'red',
        'font-size': '11px',
        'display': 'block',
        'left': '2px',
        'padding': '3px',
        'bottom': '20px',
        'background': 'yellow',
        'opacity': '0.8'
    });
};



function drawNavigationOnMap(){
    
};
