/* ***********************************************************************************************
 * 
 * Section for Distance
 * 
 *************************************************************************************************/


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  //Haversine-Distance
  var toRadians = Math.PI/180.0;
  var R = 6371; // Radius of the earth in km
  
  var dLat = toRadians*(lat2-lat1);  // deg2rad below
  var dLon = toRadians*(lon2-lon1); 
  var a =   Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
             
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
      d = Math.round(d*1000)/1000;
  return d;
};


function getBearing(lat1,lon1,lat2,lon2){
// Returns the (initial) bearing from 'this' point to destination point.
// Bearing: Richtung (Norden = 0) am Compass nach
// http://www.movable-type.co.uk/scripts/latlong.html
// https://software.intel.com/en-us/blogs/2012/11/30/calculating-a-bearing-between-points-in-location-aware-apps
  
    var toRadians = Math.PI/180.0;
    var toDegrees = 180/Math.PI;
    
    var LatR1 = lat1 * toRadians;
    var LonR1 = lon1 * toRadians;
    var LatR2 = lat2 * toRadians;
    var LonR2 = lon2 * toRadians;

    var y = Math.sin(LonR2-LonR1) * Math.cos(LatR2);
    var x = Math.cos(LatR1)*Math.sin(LatR2) -
            Math.sin(LatR1)*Math.cos(LatR2)*Math.cos(LonR2-LonR1);
    
    var bearing = Math.atan2(y, x);
        bearing = bearing * toDegrees;
        bearing = (bearing+360) % 360; 
    return bearing;
};


/*convert radians to numeric (signed) degrees */
function rad2deg(rad){
  return rad * (180/Math.PI);
};

/*convert numeric degrees to radians */
function deg2rad(deg) {
  return deg * (Math.PI/180);
};







function StartCalculateDistance(lat1,lon1,poi){
   
        lat1 = lat1;
        lon1 = lon1;
        lat2 = poi.latitude;
        lon2 = poi.longitude;
        
        var distance    = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
        var bearing     = getBearing(lat1,lon1,lat2,lon2);
        var elevationAngle = getElevationAngle(distance, arwizard.geolocation.position.altitude ,poi.altitude);

        
        poi["distance"] = distance;
        poi["bearing"] = bearing;
        poi["elevationAngle"] = elevationAngle;

        return poi;
};






function getElevationAngle(distanceInKm, startAltitude, endAltitude){
    
   var distanceInMeter   = distanceInKm * 1000;  
   var dAltitude         = endAltitude - startAltitude;
   
   var x                 = (dAltitude) / (distanceInMeter);
   var elevationAngle    = (180/Math.PI) * Math.atan(x); 
   var elevationAngleRnd = Math.round(elevationAngle*1000)/1000;
       
   return elevationAngle;  
};






function compassHeading001(alpha, beta, gamma) {
  //http://stackoverflow.com/questions/18112729/calculate-compass-heading-from-deviceorientation-event-api
  //http://w3c.github.io/deviceorientation/spec-source-orientation.html#worked-example
  
  // Convert degrees to radians
  var alphaRad = alpha * (Math.PI / 180);
  var betaRad = beta * (Math.PI / 180);
  var gammaRad = gamma * (Math.PI / 180);

  // Calculate equation components
  var cA = Math.cos(alphaRad);
  var sA = Math.sin(alphaRad);
  var cB = Math.cos(betaRad);
  var sB = Math.sin(betaRad);
  var cG = Math.cos(gammaRad);
  var sG = Math.sin(gammaRad);

  // Calculate A, B, C rotation components
  var rA = - cA * sG - sA * sB * cG;
  var rB = - sA * sG + cA * sB * cG;
  var rC = - cB * cG;

  // Calculate compass heading
  var compassHeading = Math.atan(rA / rB);

  // Convert from half unit circle to whole unit circle
  if(rB < 0) {
    compassHeading += Math.PI;
  }else if(rA < 0) {
    compassHeading += 2 * Math.PI;
  }

  // Convert radians to degrees
  compassHeading *= 180 / Math.PI;

  return compassHeading;
};







