
function drawRadar() {
	
	
	arwizard.radar.widest_distance = getWidestDistanceOfAllPOI();
	
	if (arwizard.radar.max_distance == 100) {
		arwizard.radar.max_distance = arwizard.radar.widest_distance;
	};	
	
	if (arwizard.radar.max_distance > 5000) {
        arwizard.radar.max_distance = arwizard.radar.widest_distance;
    };  
	
	                            
  if(  arwizard.szenario.config.radar_option == 'show'){
	drawRadarStart();
	$('#radarcontainer').show();
	} else {
	$('#radarcontainer').hide();	
	};
	
	
};

function drawRadarStart() {
    
    var grad = arwizard.core.fieldview_angle;
    var radius = 100;
    var storke_width = 10;
        storke_width = Number(arwizard.szenario.config.radar_circle_border_width);
    
   if (arwizard.szenario.config.radar_radius){
       radius = Number(arwizard.szenario.config.radar_radius);
     }
   
    
    needle_width  = radius/8;
    needle_height = needle_width*1;
    
    //----------------------------------------
    // Draw Radar
    var p1_x = radius + storke_width + needle_height*2;
    var p1_y = p1_x;
    var a = (Math.sin(((180 - grad) / 2) * Math.PI / 180)) * radius;
    var b = (Math.cos(((180 - grad) / 2) * Math.PI / 180)) * radius;
    var p2_x = Math.round(p1_x - b);
    var p2_y = Math.round(p1_y - a);

    var winkelrad = (grad) / 2 * Math.PI / 180;
    var zline = Math.round(Math.sin(winkelrad) * radius * 2);

    var path_d = 'M' + p1_x + ',' + p1_y + '  L' + p2_x + ',' + p2_y + ' a' + radius + ',' + radius + ' 0 1,0 ' + zline + ',' + 0 + ' z';

    var startX, startY, offsetRadians, largeArc, sweepFlag, endX, endY;
    var space = ' ';
    
    startX = p1_x;
    startY = p1_y;
    offsetRadians = 0;
    largeArc = 1;
    sweepFlag = 0;
    endX = zline;
    endY = 0;

    path = 'M' + space + startX + space + startY + space;
    path += 'L' + space + p2_x + space + p2_y;
    path += 'a' + space + radius + space + radius + space + offsetRadians + space + largeArc + space + sweepFlag + space + endX + space + endY;
    path += ' z';

    var obj = $('#path_radar');
    obj.attr('d', path);
    obj.attr('fill', 'green');
    obj.attr('fill-opacity', '0.4');
    obj.attr('stroke', 'blue');
    obj.attr('storke-width', '0');
    
    w = p1_x * 2 + 'px';
    h = p1_y * 2 + 'px';
    
    $('#svg_radar').css({  'width': w,
                           'height': h  });

    //----------------------------------------
    // Draw Field-View 
    var i = zline / 2;
    px_3 = i + p2_x;
    py_3 = p1_y - radius;
    py_3 = 0;

    p4_x = p2_x + zline;
    p4_y = p2_y;


    var startX, startY, offsetRadians, largeArc, sweepFlag, endX, endY;
    startX = p2_x;
    startY = p2_y;
    offsetRadians = 0;
    largeArc = 0;
    sweepFlag = 1;
    endX = p4_x;
    endY = p4_y;

    path = 'M' + space + startX + space + startY + space;
    path += 'A' + space + radius + space + radius + space + offsetRadians + space + largeArc + space + sweepFlag + space + endX + space + endY;
    path += 'L' + space + p1_x + space + p1_y;
    path += ' z';

    var obj = $('#path_fieldview');
    obj.attr('d', path);
    obj.attr('fill', 'none');
    obj.attr('stroke', 'pink');
    obj.attr('storke-width', '1');


    // Draw Needle 
    var current_compass = 0; // 270
    var live_compass_alpha = arwizard.sensor.compassHeading;
    
    if (live_compass_alpha){
        current_compass = Math.round(live_compass_alpha * 1) / 1;
    };
    
    var alpha = 360-current_compass;
    
    if (alpha > 360) { alpha = alpha - 360;    };
    
    var grad_deg = alpha * Math.PI / 180;
    radius = radius + needle_width;
    x = Math.round(Math.sin(grad_deg) * radius); // position for the needle, x-coord
    y = Math.round(Math.cos(grad_deg) * radius); // position for the needle, y-coord
    
    startX = p1_x + x; 
    startY = p1_y - y;
    
    d1_x = needle_width / 2;        //10
    d1_y = 0;                   //0
    d2_x = needle_width / -2;   //-5
    d2_y = needle_height * -1;   // -20
    d3_x = needle_width / -2;
    d3_y = needle_height;


    path  = 'M' + space + startX + space + startY + space;
    path += 'l' + space + d1_x + space + d1_y;
    path += 'l' + space + d2_x + space + d2_y;
    path += 'l' + space + d3_x + space + d3_y;
    path += ' z';
    
    tran = 'rotate(' + alpha + ' ' + startX + ' ' + startY + ' ) '; // rotate the needle with the compass-angle
    
    var obj = $('#path_needle');
        obj.attr('d', path);
        obj.attr('transform', tran);
        obj.attr('fill', 'pink');
        obj.attr('stroke', 'pink');
        obj.attr('storke-width', '1');
    
    styleRadar();
           
    $('#radarcontainer').show();   
  
 
  
  // Draw Points in Radar

  
	  var allPoi = arwizard.poi;
	  if (arwizard.poi){
		  var len = allPoi.length ;
	 } else {
	 	len = 0;
	 };
     // Schleife über alle POI
     
     
   var widestDistance = getWidestDistance() + 0.01;
	   
    for (var i = 0; i <len; i++) {

        var lat1 = arwizard.geolocation.position.latitude;
        var lon1 = arwizard.geolocation.position.longitude;
        //alert(lat1 + ' - ' + lon1);
        
        var poi = allPoi[i];
        var poi_DB_ID = arwizard.poi[i].id;
        var poi = StartCalculateDistance(lat1, lon1, poi); //calculate Bearing, Distance
        var poi_divId = "poi_radar" + i;
        

		var d = poi["distance"];
		var bearing = poi["bearing"];
		 
		// console.log(lat1 + ' - ' + lon1 + ' - ' + d + ' - ' + bearing);
		 
		    var alpha = bearing + (360-arwizard.sensor.compassHeading);
		    	
		    	if (alpha > 360) { alpha = alpha - 360;    };
		   	
		    var grad_deg = alpha * Math.PI / 180;
		    radius01 = radius * 0.75;
		    radius02 = radius * 0.3;
		    
		    radius1 = Math.round((d / widestDistance) * radius01);
		    radius1 = Math.max(radius1,radius02 );
		    
		    x = Math.round(Math.sin(grad_deg) * radius1); // position for the needle, x-coord
		    y = Math.round(Math.cos(grad_deg) * radius1); // position for the needle, y-coord
			
			x = x + p1_x;
			y = (p1_y*2) - (p1_y + y);
			
			circle =  '<svg><circle cx="'+ x +'"  cy="'+ y +'" id="'+poi_divId+'" r="1" stroke="black" stroke-width="3" fill="black" /></svg>';

			var element = document.getElementById(poi_divId);
	        if (!element) {
	        	$('#svg_radar').append(circle);
	        } else {
	        	
			var sx = 	     x;
	  		var sy = 	     y;
	  		
	  				$('#'+poi_divId).attr('cx',sx);
	  				$('#'+poi_divId).attr('cy',sy);
	        };
	        
	                var max_distance = arwizard.radar.max_distance;
			        if (poi["distance"] > max_distance ) {
			        	$('#'+poi_divId).hide();
			        } else {
			        	$('#'+poi_divId).show();
			        };
	}; 
  
  
  
    
    return 'ok';
};

function styleRadar(){
    
    var op =  arwizard.szenario.config;
    
    var obj = $('#path_radar');
        obj.attr('fill', op.radar_circle_bg_color);
        obj.attr('fill-opacity', op.radar_circle_opacity);
        obj.attr('stroke', op.radar_circle_border_color);
        obj.attr('stroke-width', op.radar_circle_border_width);
    
    
    var obj = $('#path_needle');
        obj.attr('fill', op.radar_needle_bg_color);
        obj.attr('stroke', op.radar_needle_border_color);
        obj.attr('stroke-width',op.radar_needle_border_width);
    
    
    var obj = $('#path_fieldview');
        obj.attr('fill-opacity', op.radar_fieldview_opacity);
        obj.attr('fill', op.radar_fieldview_bg_color);
        obj.attr('stroke', op.radar_fieldview_border_color);
        obj.attr('stroke-width', op.radar_fieldview_border_width);
    
        var top = 'auto';
        var right = 'auto';
        var bottom = 'auto';
        var left = 'auto';
       
          switch (op.radar_position){
              case 'bottomleft' :   bottom = 0; left = 0; break;
              case 'bottomright' : bottom = 0; right = 0; break;
              case 'topleft' : top = 0; left = 0; break;
              case 'topright' : top = 0; right  = 0; break;
          };
       
        $('#svg_radar').css({   'left': left,
                                'bottom': bottom,
                                'right': right,
                                'top': top });
                                
                                return;
};



function getWidestDistance(){
	
	var distance = [];
	var allPoi = arwizard.poi;
	
		  if (arwizard.poi){
			  var len = allPoi.length ;
		 } else {
		 	len = 0;
		 };
	
	
    for (var i = 0; i <len; i++) {

        var lat1 = arwizard.geolocation.position.latitude;
        var lon1 = arwizard.geolocation.position.longitude;
        //alert(lat1 + ' - ' + lon1);
        
        var poi = allPoi[i];
        var poi = StartCalculateDistance(lat1, lon1, poi); //calculate Bearing, Distance
       
        var max_distance = arwizard.radar.max_distance;
       
			        if (poi["distance"] > max_distance ) {
			        	
			        } else {
			        	distance.push(poi['distance']);
			        };
     };	
     
     var maxValueInArray = Math.max.apply(Math, distance);
   return maxValueInArray;
};



function getWidestDistanceOfAllPOI(){
	
	var widest_distance = 0;
	var allPoi = arwizard.poi;
	
		  if (arwizard.poi){
			  var len = allPoi.length ;
		 } else {
		 	len = 0;
		 };
	
	for (var i = 0; i <len; i++) {

        var lat1 = arwizard.geolocation.position.latitude;
        var lon1 = arwizard.geolocation.position.longitude;
        
        var poi = allPoi[i];
        var poi = StartCalculateDistance(lat1, lon1, poi); //calculate Bearing, Distance
        
			        if (poi["distance"] > widest_distance ) {
			        	widest_distance = poi["distance"];
			        }
     };	
    
	widest_distance = Math.round(widest_distance+20);
     
   return widest_distance;
};
