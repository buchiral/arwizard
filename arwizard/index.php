<?php

header('Content-Type: text/html; charset=UTF-8');

include("config.php");

$site_modus = 'dashboard';
if (isset($_REQUEST['p'])){
$site_modus = $_REQUEST['p'];
};
?>


<!DOCTYPE html>
<html lang="de">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />  
	
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" type="image/png" href="images/settings48.png" />
    <title>ARwizard - Adminpanel</title>

    <!-- Bootstrap Core CSS -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
   
   	<link href="res/jquery-ui-1.11.4.custom/jquery-ui.css" rel="stylesheet">
   	
	<link href="res/colorpicker-master/jquery.colorpicker.css" rel="stylesheet">
	
    <!-- MetisMenu CSS -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- DataTables CSS -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet">

    <!-- DataTables Fancybox -->
    <link href="res/fancyapps-fancyBox-18d1712/source/jquery.fancybox.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="res/startbootstrap-sb-admin-2-1.0.5/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href="res/ionicons-2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">

    <!-- My CSS Ralph -->
    <link href="css/css.css" rel="stylesheet" type="text/css">

    <!-- jQuery -->
    <script src="res/startbootstrap-sb-admin-2-1.0.5/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div id="wrapper">
			<?php
			include('header.php');
			
			
			switch ($site_modus) {
			    case 'szenario':
			        $site = 'szenario.php';
			        break;
			    case 'dashboard':
			        $site = 'dashboard.php';
			        break;
			    case 'edit':
			        $site = 'edit_poi.php';
					$script = 'js/config.js';
			        break;
                case 'add_szenario':
                    $site = 'add_szenario.php';
                    break;
                case 'edit_szenario':
                    $site = 'edit_szenario.php';
                    break;
				default: $site='dashboard.php';
			}

			include($site);
			?>
	</div>
    <!-- /#wrapper -->


	
	<script src="res/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
	<script src="res/colorpicker-master/jquery.colorpicker.js"></script>
	
    <!-- Bootstrap Core JavaScript -->
    <script src="res/startbootstrap-sb-admin-2-1.0.5/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="res/startbootstrap-sb-admin-2-1.0.5/bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- DataTables JavaScript -->
    <script src="res/startbootstrap-sb-admin-2-1.0.5/bower_components/datatables/media/js/jquery.dataTables.min.js"></script>
    <script src="res/startbootstrap-sb-admin-2-1.0.5/bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.min.js"></script>

	<!-- QRCode JavaScript -->
	<script src="res/jquery-qrcode-master/dist/jquery.qrcode.min.js"></script>

	<!-- Fancybox JavaScript -->
	<script src="res/fancyapps-fancyBox-18d1712/source/jquery.fancybox.js"></script>
	
    <!-- googleMaps JavaScript -->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false&libraries=places"></script>

    <!-- Custom Theme JavaScript -->
    <script src="res/startbootstrap-sb-admin-2-1.0.5/dist/js/sb-admin-2.js"></script>
    
    <!--ARwizard JavaScript -->
    <script src="js/0_core.js"></script>
    <script src="js/1_maps.js"></script> 
	<script src="js/2_edit_szenario.js"></script>
 	<script src="js/z_arwizard_object.js"></script>
    <script src="webapp/js/arw_radar.js">	</script>
    <script src="webapp/js/arw_overlayer_config.js">   </script>


</body>
</html>
