<?php
require_once ('dto/Attempt.php');
require_once ('dto/Coordinates.php');
require_once ('exceptions/Empty_data_exception.php');
require_once ('exceptions/Incorrect_input_data_exception.php');
require_once ('verifiers/Coordinates_verifier.php');
session_start();

$attempts = (isset ($_SESSION["attempts"])) ? ($_SESSION["attempts"]) : array();
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
//        echo json_encode($data);
        $coords = new Coordinates(not_empty_data($data));
        $verifier = new Coordinates_verifier();
        $start_time = microtime(true);
        $result = $verifier->verify($coords);
        $script_time = microtime(true) - $start_time;
        $current_attempt = new Attempt($coords, $result, $script_time);
//        echo $current_attempt->jsonSerialize();
        array_push($attempts, $current_attempt);
        $_SESSION["attempts"] = $attempts;
//        session_destroy();
        echo json_encode($attempts);

//        echo "<br>";
//        print_r($attempts);

//        echo "<br><br>Last attempt: X:".$current_attempt->get_coordinates()->get_x()."\n Y:".$current_attempt->get_coordinates()->
//            get_y()."\n R:".$current_attempt->get_coordinates()->get_r()."\n result:".$current_attempt->
//            get_result()."\n time:".$current_attempt->get_time()."\n scriptTime:".$current_attempt->get_script_time()."ms";
    } catch (Exception $e) {
        echo json_encode($e->getMessage());
//        echo $e->getMessage();
    }
}

//function array_to_table($header_table, $table)
//{
//    echo "<table>\n";
//    //header
//    foreach ($header_table as $header) {
//        echo "<th>" . $header . "</th>";
//    }
//    while ($line = pg_fetch_array($table, null, PGSQL_ASSOC)) {
//        echo "\t<tr>\n";
//        foreach ($line as $col_value) {
//            echo "\t\t<td>$col_value</td>\n";
//        }
//        echo "\t</tr>\n";
//    }
//    echo "</table>\n";
//}

function not_empty_data($data)
{
    foreach ($data as $datum) {
        if ($datum == ""){
            throw new empty_data_exception('Input data is empty!');
        }
    }
    return $data;
}