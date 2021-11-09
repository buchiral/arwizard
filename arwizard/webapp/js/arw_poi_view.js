var myVideoStream;
myVideoStream = new Object();
myVideoStream.width = 0;
myVideoStream.height = 0;
myVideoStream.playing = false;


function drawPOIs() {
    
   
    var allPoi = arwizard.poi;
  
    var view_height = arwizard.core.fieldview_height;
    var view_weight = arwizard.core.fieldview_width;
    var view_angle  = arwizard.core.fieldview_angle;
 
    var live_compass_alpha = arwizard.sensor.compassHeading;
  
    // Schleife über alle POI
    for (var i = 0; i < allPoi.length; i++) {

        var lat1 = arwizard.geolocation.position.latitude;
        var lon1 = arwizard.geolocation.position.longitude;
        var poi = allPoi[i];
        var poi_DB_ID = arwizard.poi[i].id;
        
        
        var poi = StartCalculateDistance(lat1, lon1, poi); //calculate Bearing, Distance
        var poi_divId = "poi" + i;
 
        var element = document.getElementById(poi_divId);
        if (!element) {
            $("#allthepoi").append('<div class="poi" poiDBid="' + poi_DB_ID + '"   poiArrayID="' + i + '" id="' + poi_divId + '"></div>');
            setEvents(poi_divId);
           
        };

        //
        var Bearing = poi["bearing"];
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


        //Control BearingAngle
        if (zBearing > limit_left && zBearing < limit_right) {
           var isInBearingAngle = true; 
        } else {
           var isInBearingAngle = false; 
        };
        
        //Control maxDistanceRange
        var max_distance = arwizard.radar.max_distance;
        if (poi["distance"] >max_distance ) {
        	var isInDistanceRange = false;
        	document.getElementById(poi_divId).style.display = "none";
        } else {
            var isInDistanceRange = true;
        }
        
        //Control ElevationAngle
        var limit_up     = arwizard.sensor.deviceorientation.beta - 90 + arwizard.core.fieldview_angleHeight / 2;
        var limit_bottom = arwizard.sensor.deviceorientation.beta - 90 - arwizard.core.fieldview_angleHeight / 2;
        
        if(poi.elevationAngle <=limit_up &&  poi.elevationAngle >= limit_bottom ){
          var isInElevationAngle = true;
        } else {
          var isInElevationAngle = false;
        };
    
        //********************************
        // Is in view of field and show it
        //********************************
        if (isInBearingAngle == true && isInDistanceRange == true && isInElevationAngle == true) {

            var x = 10, y = 10;
            
            x = ((zBearing - limit_left) / view_angle) * view_weight; // Position CSS-absolute-left
            x = Math.round(x * 100) / 100;                            // Position CSS-absolute-left

            y = (limit_up + -1*poi.elevationAngle)  *  (view_height / arwizard.core.fieldview_angleHeight); // CSS-absolute-top
            y = Math.round(y * 100) / 100;  // CSS-absolute-top
        
            var addStyle = showPoiOnView(poi_divId, poi, x, y);
            
        } else {
            
            document.getElementById(poi_divId).style.display = "none";
        
        };// End if

    }// End Schleife

    return;
};



function showPoiOnView(element_id, poi, x, y) {
    /* x = Left-Position in Px on Screen
     * y = Top-Position in Px on Screen
     * poi = The POI-Onject
     * element_id = the Div on screen
     */
    var config = arwizard.szenario.config;

    $('#' + element_id).css({
        "border-color": config.box_border_color,
        "border-width": config.box_border_width + 'px',
        "border-style": "solid",
        "border-top-left-radius": config.box_border_round_topleft + 'px',
        "border-top-right-radius": config.box_border_round_topright + 'px',
        "border-bottom-right-radius": config.box_border_round_bottomleft + 'px',
        "border-bottom-left-radius": config.box_border_round_bottomright + 'px',
        "background": config.box_bg_color,
        "opacity": config.box_opacity,
        "color" : config.box_text_color,
        'font-size': '11px'
    });

    var distance = Math.round(poi["distance"]*1000)/1000;
    
    if (distance < 1) {
        distance = Math.round(distance*1000) + ' m';
    } else {
        distance = distance + ' km';        
    };
    
   
    var icon_poi= poi.poi_info.icon_poi;
    
    document.getElementById(element_id).innerHTML ='<i style="font-size:15px" class="' + icon_poi + '" > </i> ' + poi.name + '<br><div style="text-align:right"> <i class="fa fa-location-arrow"></i>  ' + distance + '</div>';
    document.getElementById(element_id).style.display = "block";
    document.getElementById(element_id).style.left = x + "px";
    document.getElementById(element_id).style.top = y + "px";
};



function getBoxContent(poiId) {
    
    var poi             = arwizard.poi[poiId];
    var description     = poi.description;
    var name            = poi.name;
    var icon_poi        = poi.poi_info.icon_poi;
    var video_url       = poi.poi_info.video_url;
    var img_url         = poi.poi_info.img_url;
	var audio_url       = poi.poi_info.audio_url;
	var audio_autoplay  = poi.poi_info.audio_autoplay;
	
	if(audio_autoplay == 'true') {
		var autoplay = 'autoplay';
	} else {var autoplay = '';}
	
	var audio_element = '<div><audio style="max-width:80%" controls '+autoplay+'>  <source src="'+audio_url+'" type="audio/mpeg"> </audio></div><br>';
    var video_element = '<div><iframe width="auto" height="auto" src="' + video_url + '" frameborder="0" allowfullscreen></iframe></div><br>';
    var img_element   = '<div><img style="max-width:80%" src="' + img_url + '"></div><br>';    

    if(video_url==''){
    	video_element = '';
    }

    if(audio_url==''){
    	audio_element = '';
    }
    
    var lat = poi.latitude;
    var lon = poi.longitude;
           
    navigation_link = getNavigationBox(lat,lon,poiId);

    var text;
    text = '<div>';
    text += '<div><b><i class="'+ icon_poi + '" ></i>  ' + name+'</b></div><br>';
    text += '<div>' + description + '</div><br>';
    text += '' + img_element + '';
    text += '' + video_element + '';
    text += '' + audio_element + '';
    text += '<div>Lat: '+ lat +'<br>Lng:'+ lon +'<br>Distance: '+ poi.distance +' Km</div><br>';
    text += navigation_link;
    text += '</div>';

    return text;
};


function BoxText(poiId) {
    content = getBoxContent(poiId);
    
    $.fancybox({
        content: content
    });
      
    $('.start_navigation_btn').click(function (){ prepareNavigation($(this));    });
     
    var audio_autoplay = arwizard.poi[poiId].poi_info.audio_autoplay;
    	if(audio_autoplay == 'true') {
		$('audio').get(0).play();
	};
    	
};

function setEvents(id) {
    $("#" + id).click(function() {
        var poiId = $(this).attr('poiid');
        var poiArrayId = $(this).attr('poiArrayID');
        BoxText(poiArrayId);
    });
};





function getNavigationBox(lat, lon, poiId){
  
        var icon_nav = 'fa fa-mail-reply-all';
            switch (arwizard.szenario.config.navigation_type) {
                case 'BICYCLING':
                    icon_nav = "ion-android-bicycle";
                    break; 
                case 'DRIVING':
                    icon_nav = "fa fa-car";
                    break; 
                case 'WALKING':
                    icon_nav = "ion-android-walk";
                    break; 
                case 'TRANSIT':
                    icon_nav = "ion-android-bus";
                    break;  
                default: 
                    icon_nav = 'fa fa-mail-reply-all';
            }   
    
        var navigation_link  = '<div id="navigate_div"> <div><b>Navigation:</b></div>';
            navigation_link += '<button poiid="'+poiId+'" lat="'+lat+'" lon="'+lon+'" mode="DRIVING" id="start_navigation1" class="start_navigation_btn">';
            navigation_link +=  '<i class="fa fa-car"></i> Start</button> ';

            navigation_link += '<button poiid="'+poiId+'" lat="'+lat+'" lon="'+lon+'" mode="WALKING" id="start_navigation2" class="start_navigation_btn">';
            navigation_link +=  '<i class="ion-android-walk"></i> Start</button> ';
            
            navigation_link += '<button poiid="'+poiId+'" lat="'+lat+'" lon="'+lon+'" mode="TRANSIT" id="start_navigation3" class="start_navigation_btn">';
            navigation_link += '<i class="ion-android-bus"></i> Start</button> ';

            navigation_link += '<button poiid="'+poiId+'" lat="'+lat+'" lon="'+lon+'"  mode="BICYCLING" id="start_navigation4" class="start_navigation_btn">';
            navigation_link += '<i class="ion-android-bicycle"></i> Start</button> ';

            navigation_link +=  '</div><br>';
            
       var navigation_link_single =  '<div id="navigate_div"> <div><b>Navigation:</b></div>';    
           navigation_link_single += '<button poiid="'+poiId+'" lat="'+lat+'" lon="'+lon+'" mode="'+ arwizard.szenario.config.navigation_type  +'"  id="start_navigation" class="start_navigation_btn">';
           navigation_link_single += '<i class="'+icon_nav+'"></i> Start</button> ';
           navigation_link_single +=  '</div><br>';
       
       if (arwizard.szenario.config.navigation_type != 'all')  {
           navigation_link = navigation_link_single;
          };
           
    return navigation_link;
};


function prepareNavigation(e){
  
   $.fancybox.close();
   var lat = e.attr('lat');
   var lon = e.attr('lon');
   var travelmode = e.attr('mode');
    
   arwizard.navigation.status = true;
   arwizard.navigation.endpoint_latitude =  lat;
   arwizard.navigation.endpoint_longitude = lon;
   arwizard.navigation.travelmode = travelmode;
   
   navigation_alert = false;
   
   calcRouteFromPOI();
 
 return;
};


function getYPixel(distance,altitude){
  
  currentAltitude =   arwizard.geolocation.position.altitude;
  poiAltitude     =     altitude;
  
  var angle = getElevationAngle(distance,currentAltitude,poiAltitude);
  
  return y;  
}
