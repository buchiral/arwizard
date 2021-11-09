<?php

include("../config.php");
							
if (isset($_REQUEST['data'])){
	$data = $_REQUEST['data'];
};


//**************************************************************//

$ar_szenario_id = $data['sid'];

$url = $data['url'];


$oldURL = $database->get("ar_szenario"	, "extern_poi_url"	, array(	'id' 				=> $ar_szenario_id));



$oldURL = json_decode($oldURL,true);

$oldURL[] = $url;




$new_url = json_encode($oldURL,JSON_FORCE_OBJECT);


		$update = $database->update("ar_szenario", 
										
										array(
											
											"extern_poi_url" =>$new_url,


										),
										
										array( "id" => $ar_szenario_id )
										); 

								

$error = $database->error();

if (empty($error[1])) {
	
	$value = array('sid' => $ar_szenario_id );
	

} else {
// Error
	$value = array( 'sid' => $ar_szenario_id,
					'error' => json_encode($error));

};

// Output
echo json_encode($value);

die();
?>