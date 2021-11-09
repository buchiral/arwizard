

function drawButtonOverlayer() {
        $('#buttonContainer').css( { 
                             position: 'fixed', 
                             right: '10px',
                             top: '40%',
                             fontSize: '25px',
                             zIndex: '8000',
                             color: 'white' });
  

                             
  if(  arwizard.szenario.config.pause_function == 'enable' ){
   drawCameraButton();
   $('#cameraButton').show();
  } else {
  	$('#cameraButton').hide();}
  
  if(  arwizard.szenario.config.radius_option == 'enable'){
   drawRadiusSlider();
    $('#radiusButton').show(); 
  } else { $('#radiusButton').hide(); };  
  
  if(  arwizard.szenario.config.mapmodus == 'enable'){
   drawButtonMap();
    $('#mapButton').show();
  } else { $('#mapButton').hide();};
  
  if(  arwizard.szenario.config.listmodus == 'enable'){
   drawButtonList();
   $('#listButton').show(); 
  } else {$('#listButton').hide(); };
  
};

function drawCameraButton() {
    
    var szenario = $('#buttonContainer');
        
    if ($('#cameraButton').length == 0) {
   		szenario.append('<div id="cameraButton"><i class="ion-videocamera"></i> </div>');
	};
   
     
    
    $('#cameraButton').css( { 
                             fontSize: '30px' });
    

    $('#cameraButton').click(function(){
        
        id = arwizard.camera.containerId;
        
        if (arwizard.camera.isPlaying) {
        
        cameraStream.stop();
        $('#'+id).hide();
        arwizard.camera.isPlaying = false;
        } else {
        	
        init_camera();
        };
    });
};



function drawRadiusSlider(){
	
	
	 var szenario = $('#buttonContainer');
	 if ($('#radiusButton').length == 0) {
         szenario.append('<div id="radiusButton"><i class="fa fa-arrows-h"></i> </div>');
	};
		 $('#radiusButton').css( { fontSize: '30px' });
         
                             
         $('#radiusButton').click(function(){
			        
			 var text;
			    text = '<div>';
			    text += '<div><b>Setting Radius:</b></div><br><div class="rand01"><div id="slider"></div><br><input id="input_slider_radius" value="100 Km" type="text" /></div>';
			    text += '</div>';
			      
			
			    $.fancybox({
			        content: text
			    });
			
			
			$('#input_slider_radius').val(arwizard.radar.max_distance+" Km"); 
				$( "#slider" ).slider({
					
				value: arwizard.radar.max_distance,
                min: 0,
                max: arwizard.radar.widest_distance,
                step: 1,
                slide: function(event, ui) {

					arwizard.radar.max_distance = ui.value;
					
                    $('#input_slider_radius').val(ui.value+" Km");
                	
                	drawRadar();
                	drawPOIs();
                }
				}	
				);

    });
	
};




function drawButtonMap(){
	
	var szenario = $('#buttonContainer');
    	
    	if ($('#mapButton').length == 0) {
    	szenario.append('<div id="mapButton"><i id="mapButton_i" class="ion-map"></i> </div>');
	    };
	    $('#mapButton').css( { fontSize: '30px' });
     
                        
        $('#mapButton').click(function(){
		
			if (arwizard.core.map_mode_active){
				arwizard.core.map_mode_active = false;
				                
                $('#mapcontainer').html('<div id="map-canvas-1"></div>');
				$('#buttonContainer').css( {   color: 'white'}); 
                $('#camera').show();
                $('#allthepoi').show();

                $('#mapButton_i').removeClass();
                $('#mapButton_i').addClass('ion-map');
                
                  if(  arwizard.szenario.config.pause_function == 'enable' ){
                        $('#cameraButton').show();
                        };
                
                $('#centerPosition').hide();
                
                updateNavigation();
			
			 }else {
		        arwizard.core.map_mode_active = true;
				initMapMode();
				$('#mapButton_i').removeClass();
				$('#mapButton_i').addClass('fa fa-picture-o');
		        $('#cameraButton').hide();
			 };  
	
	}); // End Click
	
};





function drawButtonList(){
	
	 var szenario = $('#buttonContainer');
	 
    	 if ($('#listButton').length == 0) {
    	 szenario.append('<div id="listButton"><i class="fa fa-list-ul "></i> </div>');
	     };
	     
	     $('#listButton').css( {fontSize: '30px' });
                             
         $('#listButton').click(function(){

		    		 var text = '<i class="fa fa-image fa-fw"></i> List with POI:<br><br>';
		    		 var allPoi = arwizard.poi;
  			   
                         // Sort by Distance    			   
        	             allPoi.sort(function(a, b){
  				                                      return a['distance']-b['distance'];
  				                                   });
            var color_class = 'grey_list'; 
   		    var css_proof = true;
   		   
   		for (var i = 0; i < allPoi.length; i++) {
   	
   	                if (css_proof) 
   	                    {color_class = 'grey_list';
   	                     css_proof = false;} 
   	                    else { color_class = '';
   	                    css_proof = true;};
   	            
		    		var description = allPoi[i].description;
				    var video_url = allPoi[i].poi_info.video_url;
				    var img_url = allPoi[i].poi_info.img_url;
				
				    var video_element = '<iframe width="auto" height="auto" src="' + video_url + '" frameborder="0" allowfullscreen></iframe>';
				    var img_element = '<div><img style="max-width:80%" src="' + img_url + '"></div><br>';
				
				    var lng = allPoi[i].longitude;
				    var lat = allPoi[i].latitude;
				
				   
				    text += '<div class="'+ color_class+'" style="border-bottom:solid;margin-bottom:8px">';
				    text += '<div><b>'+allPoi[i].name+'</b> <span class="open_box" onclick="BoxText('+i+')"><i class="fa fa-share-square-o"></i></span></div>';
				    text += '<div>Distance: '+ allPoi[i].distance +' km</div>';
				    text += '</div>';
		};
		
						
					 $.fancybox({ 
					               content: text
					           });

    }); // End click
	
};


/*
 * In this File there only Function
 * 
 */
function showOverlayerLoadingToggle(message,modus) {
    /* modus = auto, hide, show*/
    

    var overlayer = document.getElementById("overlayerLoading");
    var old_value = overlayer.style.display;
    var new_value = "none";

    if (old_value == 'none') {
        new_value = "block";
    };
    
    if(modus == 'hide'){
      new_value = 'none';  
    };
    
    if(modus == 'show'){
      new_value = 'block';  
    };
    
    
    var textbox = document.getElementById("overlayerLoadingText");

    if (!message) {
        message = "Loading...";
    };

    textbox.innerHTML = message;
    overlayer.style.display = new_value;

    return;
};







