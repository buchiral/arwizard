<?php

/*
 * 
 * http://www.mocky.io/v2/553ff9babe2f27df0200729e
 * 	
	//http://www.mocky.io/v2/5541091cbe2f275324007356
 * 
 */

include("../../config.php");
	
if (isset($_REQUEST['arszenario_id'])){
	$arszenario_id = $_REQUEST['arszenario_id'];
	} else {
	$arszenario_id = 1;
	};
	//$arszenario_id =14;

	$datas1 = $database->select("ar_poi"		, "*"	, array(	'ar_szenario_fkid' 	=> $arszenario_id));
	$datas2 = $database->get("ar_szenario"	, "*"	, array(	'id' 				=> $arszenario_id));

	//There are DB-Field which are already Json-Strings
	$ar_szenario_config = json_decode($datas2['config']);
	$datas2['config'] = $ar_szenario_config;

	$ar_extern_url = json_decode($datas2['extern_poi_url'],true); // a array
	$datas2['extern_poi_url'] = $ar_extern_url;

	//There are DB-Field which are already Json-Strings
	$rows = count($datas1);
	for ($i=0; $i < $rows; $i++){
		$ar_poi_config = json_decode($datas1[$i]['poi_info']);
		$datas1[$i]['poi_info'] = $ar_poi_config;	
	};		
	//
	
	$output['poi'] = $datas1;
	$output['szenario'] = $datas2;
    $result = $output['poi'];

	for ($i=0; $i < count($datas2['extern_poi_url']); $i++){
	     // erzeuge einen neuen cURL-Handle
		 $ch = curl_init();
		 
		 // setze die URL und andere Optionen
		//curl_setopt($ch, CURLOPT_URL, 'http://localhost/master/arwizard/webapp/ajax/test.txt');
		curl_setopt($ch, CURLOPT_URL, $datas2['extern_poi_url'][$i]);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		 
		 // führe die Aktion aus und gebe die Daten an den Browser weiter
		 $extern_json = curl_exec($ch);
		 
		 // schließe den cURL-Handle und gebe die Systemresourcen frei
		 curl_close($ch);
	
	$obj = json_decode($extern_json,true);
	//print_r($output);

	$ar1 = $output['poi'];
	$ar2 = $obj;
	
	//print_r($obj);
	if (is_array($ar2)){
		$result = array_merge_recursive ($ar1, $ar2);
		$output['poi'] = $result;
		}
	};
	
	

	$json_message = json_encode($output);
	
	echo $json_message;
	
	die();
?>