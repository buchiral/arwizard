<?php

// Config for the Page

$current_host = $_SERVER['HTTP_HOST'];

$db_config_server01['DB_NAME']     = 'armanage';
$db_config_server01['DB_USER']     = 'root';
$db_config_server01['DB_PASSWORD'] = '';
$db_config_server01['DB_HOST']     = 'localhost';


$db_config = $db_config_server01;


$db_pwd    = $db_config['DB_PASSWORD'];
$db_name   = $db_config['DB_NAME'];
$db_server = $db_config['DB_HOST'];
$db_user   = $db_config['DB_USER'];


// Verbindung zum DB-Server
$conn = mysqli_connect($db_config['DB_HOST'], $db_config['DB_USER'], $db_config['DB_PASSWORD'], $db_config['DB_NAME']);

if (!$conn) {
    die('Verbindung schlug fehl: ' . mysql_error());
}

//echo 'Erfolgreich verbunden';
//mysqli_close($link);


//***************************************************************
// Integrate Medooo
require 'res/medoo.in/medoo.min.php';


$database = new medoo(array(
    'database_type' => 'mysql',
    'database_name' => $db_name,
    'server' => $db_server,
    'username' => $db_user,
    'password' => $db_pwd,
    'charset' => 'utf8'
));

//***************************************************************



?>