<?php
/*
 * dev/ajaxtest.php
 * Author: H.Alper Tuna <halpertuna@gmail.com>
 * Date: 06.08.2016
 */

//Simulate slow connection
sleep(1);

//Respond sample data
echo json_encode([
    'success' => true,
    'method' => $_SERVER['REQUEST_METHOD'],
    'echo' => $_REQUEST
]);
