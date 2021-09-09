<?php
require_once('dto/Attempt.php');
require_once('dto/Coordinates.php');
require_once ('json/json_services.php');
require_once('exceptions/Empty_data_exception.php');
require_once('exceptions/Incorrect_input_data_exception.php');
require_once('verifiers/Coordinates_verifier.php');
session_start();

$attempts = (isset ($_SESSION["attempts"])) ? ($_SESSION["attempts"]) : array();

$json_services = new Services_JSON();
header('Content-type: application/json');
$json = file_get_contents('php://input');
$data = $json_services->decode($json);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        var_dump(not_empty_data($data));
//        $coords = new Coordinates(not_empty_data($data));
//        $verifier = new Coordinates_verifier();
//        $start_time = microtime(true);
//        $result = $verifier->verify($coords);
//        $script_time = microtime(true) - $start_time;
//        $current_attempt = new Attempt($coords, $result, $script_time);
//        array_push($attempts, $current_attempt);
//        $_SESSION["attempts"] = $attempts;
////        $_SESSION["attempts"] = array();
////        session_destroy();
//        echo $json_services->encode($attempts);
//        //todo: think about situation when there is only one element in array -- it steel has to be encoded as array
//
    } catch (Exception $e) {
        echo  $json_services->encode($e->getMessage());
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header('Allow: POST, OPTIONS');
} else {
    echo $json_services->encode(array('error' => $_SERVER["REQUEST_METHOD"].' request method is not allowed'));
}

function not_empty_data($data)
{
    foreach ($data as $datum) {
        if ($datum == "") {
            throw new empty_data_exception('Input data is empty!');
        }
    }
    return $data;
}
