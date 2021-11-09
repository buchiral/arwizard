<?php

include("../config.php");

$site_modus = 'dashboard';
if (isset($_REQUEST['info'])) {
    
    $obj         = $_REQUEST['info'];
    $name        = $obj[0];
    $description = $obj[1];
    $latitude    = $obj[2];
    $longitude   = $obj[3];
    $fkid        = $obj[4];
    $poi_id      = $obj[5];
	$altitude      = $obj[6];
    $obj_data 	 = $_REQUEST['obj_data'];
	$obj_data	 = json_encode($obj_data);
	
    $sql_new = "INSERT INTO ar_poi (name, description, latitude,longitude,poi_info,ar_szenario_fkid, altitude) VALUES (

'" . $name . "', 
'" . $description . "', 
'" . $latitude . "',
'" . $longitude . "',
'" . $obj_data . "',
" . $fkid . ",
" . $altitude . "
)";
    
    
    $sql_update = "UPDATE ar_poi SET 

name = '" . $name . "',
description = '" . $description . "', 
latitude = '" . $latitude . "',
longitude = '" . $longitude . "',
poi_info = '" . $obj_data . "',
altitude = '" . $altitude . "'
WHERE id= '" . $poi_id . "'      ";
    
    
    
    if ($poi_id == -50) {
        $sql = $sql_new;
    } else {
        $sql = $sql_update;
    };
    
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    };
    
    
    
    
    
};


print_r($sql);


?>