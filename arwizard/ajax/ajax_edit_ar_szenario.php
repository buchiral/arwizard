<?php

include("../config.php");
							
if (isset($_REQUEST['data'])){
	$data = $_REQUEST['data'];
};

if (isset($_REQUEST['form_data'])){
	$form_data = $_REQUEST['form_data'];
};


//**************************************************************//
$ar_szenario_id = $data['id'];
$ar_config_json = json_encode($form_data);

if ($ar_szenario_id == '-1') {
// NEW	
		$last_id = $database->insert("ar_szenario", array(
											
											"name" => utf8_encode($data['ar_name']),
											"description" => utf8_encode($data['ar_description']),
											"config" => $ar_config_json
										)
										);								
$ar_szenario_id = $last_id;

} else {
//Edit
		$update = $database->update("ar_szenario", 
										
										array(
											
											"name" => utf8_encode($data['ar_name']),
											"description" => utf8_encode($data['ar_description']),
											"config" => $ar_config_json
										),
										
										array( "id" => $ar_szenario_id )
										); 

}; // End if
								

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