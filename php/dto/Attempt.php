<?php

class Attempt
{
    private $coordinates;
    private $result;
    private $time;
    private $script_time;

    public function get_coordinates()
    {
        return $this->coordinates;
    }

    public function get_result()
    {
        return $this->result;
    }

    public function get_time()
    {
        return $this->time;
    }

    public function get_script_time()
    {
        return $this->script_time;
    }

    public function __construct($input_coordinates, $result, $script_time)
    {
        $this->coordinates = $input_coordinates;
        $this->result = $result;
        $this->script_time = $script_time;
        $this->time = date("H:i:s");
    }
}

?>