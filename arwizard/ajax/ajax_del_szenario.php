<?php

include("../config.php");
							


if (isset($_REQUEST['data'])){
	$obj = $_REQUEST['data'];
};


$sid = $obj['sid'];


$database->delete("ar_szenario", array(
		"id" => $sid
));

$database->delete("ar_poi", array(
        "ar_szenario_fkid" => $sid
));

$error = $database->error();

if (empty($error[1])) {
								//ok	
				      } else {
								print_r($error); //Error		
						     };

die();
?>