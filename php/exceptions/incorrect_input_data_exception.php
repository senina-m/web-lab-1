<?php

class incorrect_input_data_exception extends Exception
{
    public function __construct($message) {
        parent::__construct($message);
    }
}
?>