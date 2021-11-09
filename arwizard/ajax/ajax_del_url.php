<?php

include("../config.php");



$obj = $_REQUEST['data'];
$sid = $obj['sid'];
$urlid = $obj['urlid'];


$oldURL = $database->get("ar_szenario"	, "extern_poi_url"	, array(	'id' 				=> $sid));
$oldURL = json_decode($oldURL,true); // --> Array

unset($oldURL[$urlid]);

$oldURL= array_values($oldURL);


$save = json_encode($oldURL);

		$update = $database->update("ar_szenario", 
										
										array(
											
											"extern_poi_url" => $save,

										),
										
										array( "id" => $sid )
										); 





$error = $database->error();

if (empty($error[1])) {
	
	$value = array('sid' => $sid );
	

} else {
// Error
	$value = array( 'sid' => $sid,
					'error' => json_encode($error));

};

// Output
echo json_encode($value);

die();



?>