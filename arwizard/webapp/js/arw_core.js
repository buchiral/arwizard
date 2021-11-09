


var localcamerastream = '';


    //------------------------------------------------------------------------------------------------------

    //********************************
    // Init These are the Start-fucntions
    function init() {
        init_page();
        init_loadSzenarioConfig();
    };
    //********************************

function initStep2(){
  console.log('init2'); 

  var status01 =  init_camera();
 
  var status02 =  getLocation();
  var status03 =  initSensorListener(); //Eventlistener
  drawButtonOverlayer();
  
  var test = status01 + status02 + status03;
    console.log(test);
 
  if (test == 'okokok') {
        //showOverlayerLoadingToggle(); 
    };

};


    function init_page() {
        // Set the Main-Container
        // It should be now scrolling
        var w = arwizard.core.width;
        var h = arwizard.core.height;
        console.log(w);
        $('#page').width(w);
        $('#page').height(h);
        $('#page').css({
            display: 'block',
            background: 'none'
        });

        $('#bg_img').width(w);
        $('#bg_img').height(h);
        $('#bg_img').css('z-index','-5');
        $('#bg_img').css('left','0');
        $('#bg_img').css('position','fixed');
        $('#bg_img').css('top','0');
        
        $('#img_overlayer').width(w);
        $('#img_overlayer').height(h);
        $('#img_overlayer').css('z-index','-4');
        $('#img_overlayer').css('left','0');
        $('#img_overlayer').css('position','fixed');
        $('#img_overlayer').css('top','0');
        $('#img_overlayer').css('background','black');
        $('#img_overlayer').css('opacity','0.4');
    };

    
    // Get & And Load Szenario-Data from Database
    function init_loadSzenarioConfig(){
        console.log('init_loadSzenario');
        var arszenario_id = $(body).attr('ar_szenario');
            
            $.ajax({
                  dataType: "text",
                  method: "POST",
                  url: "ajax/ajax_get_information.php",
                  data: {'arszenario_id': arszenario_id }
            })
              .done(function( msg ) {
                    //console.log(msg);
                    var json_text = msg;
                    var obj = JSON.parse(json_text);
                   
                    arwizard.poi      = obj.poi;
                    arwizard.szenario = obj.szenario;
                    
                    initStep2();
                    return 'ok';
              });        
        
       return;
    };

    
function getLocation_watch(position) {

        
        
        arwizard.geolocation.available = true;
        arwizard.geolocation.error = false;
        arwizard.geolocation.position = {

          latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            altitude_gps: position.coords.altitude,
/* 
/* 

            latitude: 47.36463763162752,
            longitude: 8.508557081222534,
            altitude: 442.5515441894531,
  
            
*/
            accuracy: position.coords.accuracy,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
        };
        showOverlayerLoadingToggle('leer','hide');
        
        getAltitude();
        drawPOIs();
        drawRadar(); 
        updateNavigation();
        updateMarker_position();

        console.log("Watch GPS: " + position.coords.accuracy);
    };

    function watchLocationError(error) {
        console.log(error);
        arwizard.geolocation.available = false;
        arwizard.geolocation.error = true;
        arwizard.geolocation.errorname = error.name;
        if (error.code == 1) {
            arwizard.geolocation.permission_denied = true;
            alert("Plaese activate GPS and load again.");
            }
    };
    
    
    function showPosition(position) {
    //alert(position.coords.latitude);
}
    
    function getLocation() {
         
        var config = {
            enableHighAccuracy: true,
            maximumAge: 250,
            timeout: 2000
        };

        if (navigator.geolocation) {
            
            arwizard.geolocation.support = true;
            navigator.geolocation.getCurrentPosition(showPosition);
            navigator.geolocation.watchPosition(getLocation_watch, watchLocationError, config); // Verfolgung beginnen
        } else {
            arwizard.geolocation.support = false;
            console.log("Log: Geolocation is not supported by this browser.");
        }
        return 'ok';
    };
    

    function handleDevieOrientation(event) {
             //http://dev.w3.org/geo/api/spec-source-orientation.html#deviceorientation
        arwizard.sensor.deviceorientation = {
            available: true,
            support: true,
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        };

        var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

        var compassHeading1 = compassHeading001(alpha, beta, gamma);
        var compassHeading2 = arwizard.geolocation.position.heading;
        var compassHeading3 = 360 - event.alpha;
        
      

    
        switch (1) {
            case 1:
                compass = compassHeading1;
                break;
            case 2:
                compass = compassHeading2;
                break;
            case 3:
                compass = compassHeading3;
                break;
        };
        
        if (isNaN(compass)){
            compass = 38;
        };
        //compass = 300;
		arwizard.sensor.compassHeading = compass;

        document.getElementById("console").innerHTML = "Compass: " +  Math.round(compassHeading1 * 100) / 100 + "    - Altitude " + arwizard.geolocation.position.altitude + '-  ' + compassHeading3;
         document.getElementById("console").innerHTML = "Compass: " +  Math.round(compassHeading1 * 100) / 100 + "    - Altitude " + arwizard.geolocation.position.altitude;
        
        drawPOIs();
        drawRadar(); 
        updateNavigationNoGPS();
    
    return;
};



    function handleDeviceMotion(event) {
       
        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        var z = event.accelerationIncludingGravity.z;
        var r = event.rotationRate;

        rotationRate_alpha = r.alpha;
        rotationRate_beta = r.beta;
        rotationRate_gamma = r.gamma;

        arwizard.sensor.devicemotion = {
            available: true,
            support: true,
            accelerationIncludingGravity_x: x,
            accelerationIncludingGravity_y: y,
            accelerationIncludingGravity_z: z,
            rotationRate_alpha: rotationRate_alpha,
            rotationRate_beta: rotationRate_beta,
            rotationRate_gamma: rotationRate_gamma
        };

    };

    function initSensorListener() {
        console.log('Init SensorListenor');
        
        // Check for support for DeviceMotion events
        if (window.DeviceMotionEvent) {
            arwizard.sensor.devicemotion.support = true;
            window.addEventListener('devicemotion', handleDeviceMotion, false);
        };

        if (window.DeviceOrientationEvent) {
            arwizard.sensor.deviceorientation.support = true;
            window.addEventListener('deviceorientation', handleDevieOrientation, false);
        }; // end if
        
        return 'ok';
    };


function initDeviceOrientationListener(){
         if (window.DeviceOrientationEvent) {
            arwizard.sensor.deviceorientation.support = true;
            window.addEventListener('deviceorientation', handleDevieOrientation, false);
        }; // end if
};


var elevator;
elevator = new google.maps.ElevationService();

function getAltitude(){
        
        var latlng = new google.maps.LatLng(arwizard.geolocation.position.latitude, arwizard.geolocation.position.longitude);
    
        
      locations = [];
      locations.push(latlng);
    
    var positionalRequest = {
    'locations': locations
  };
     elevator.getElevationForLocations(positionalRequest, function(results, status) {
    if (status == google.maps.ElevationStatus.OK) {

      // Retrieve the first result
      if (results[0]) {
        //console.log(results);
        //console.log(results[0].elevation);
          arwizard.geolocation.position.altitude = results[0].elevation;  
     
      } else {
                arwizard.geolocation.position.altitude =  arwizard.geolocation.position.altitude_gps;
                //alert('No results found');
      }
    } else {
                arwizard.geolocation.position.altitude =  arwizard.geolocation.position.altitude_gps;
                //alert('Elevation service failed due to: ' + status);
    }
  });
  
 return 0; 
  
};