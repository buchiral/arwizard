
<?php

include("../config.php");
	
	if (isset($_REQUEST['sid'])){
		$sid = $_REQUEST['sid'];
	} else {
		$sid = 1;
	};
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>AR-Szenario - LiveMode</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">

	<link rel="icon" type="image/png" href="../images/settings48.png" />
    <!-- Custom CSS -->
    <link href="css/css_0style.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="res/font-awesome-4.3.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="res/fancyapps-fancyBox-18d1712/source/jquery.fancybox.css">
	<link rel="stylesheet" href="res/ionicons-2.0.1/css/ionicons.min.css">


</head>

<body id="body" ar_szenario="<?php echo $sid; ?>" onload="init()">
   
   <div id="page">
        <div id="szenario">
     
            <video id="camera"></video>
            
            <div id="allthepoi"></div>
              
            <div id="navigationpoi"></div>
            
            
            
            <div id="console">con</div>
            <div id="radarcontainer" style="display: none">
                <svg id="svg_radar" height="400" width="400">
                    <path id="path_radar" />
                    <path id="path_fieldview" />
                    <path id="path_needle" />
                    
                </svg>
            </div>
            <div id="buttonContainer"></div>
          	<div id="bg_img_container" >
				<div id="img_overlayer"></div>
				<img src="img/city-skyline-hi.png" id="bg_img" >
			</div>
        </div>
    </div>

<div id="mapcontainer"><div id="map-canvas-1">
</div></div>

    <div id="overlayerLoading">
        <div class="overlayerLoadingBox">
            <i id="overlayerLoadingIcon" class="fa fa-cog"></i>
            <br><span id="overlayerLoadingText">Loading...</span>
        </div>
    </div>


    <footer>

		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
        
        <!-- First insert JQuery -->
        <script src="res/jquery-2.1.3.min.js"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <!-- Slider -->
        <script src="res/jquery-ui-touch-punch-master/jquery.ui.touch-punch.js"></script>
	    <!-- Google Maps API -->
	    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false"></script>
        <!-- Fancybox -->	        
	    <script type="text/javascript" src="res/fancyapps-fancyBox-18d1712/source/jquery.fancybox.js"></script>

        <!-- ***********************************************************-->        
        <!-- ***********************************************************-->
        <!-- ARwizard Javascript-Files-->
        <script type="text/javascript" src="js/config.js"></script>
        
        <script type="text/javascript" src="js/arw_calculating.js"></script>
        <script type="text/javascript" src="js/arw_camera.js"></script>

        <script type="text/javascript" src="js/arw_poi_view.js"></script>

        <script type="text/javascript" src="js/arw_radar.js"></script>
        <script type="text/javascript" src="js/arw_overlayer_config.js"></script>
        <script type="text/javascript" src="js/arw_navigation.js"></script>
        <script type="text/javascript" src="js/arw_map.js"></script>
        
        <script type="text/javascript" src="js/arw_core.js"></script>  		<!--  have to be the last JS-File  -->
        <!-- ***********************************************************-->
        <!-- ***********************************************************-->
                    
    </footer>
</body>
</html>