<?php

include("../config.php");



$obj = $_REQUEST['info'];
$poi_id = $obj[0];


$sql = "DELETE FROM `armanage`.`ar_poi` WHERE `ar_poi`.`id` = ".$poi_id."            ";


if (mysqli_query($conn, $sql)) {
    echo "Delete";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}


?>