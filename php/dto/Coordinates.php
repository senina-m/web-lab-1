<?php
require_once 'exceptions/Incorrect_input_data_exception.php';

class Coordinates
{
    private $x;
    private $y;
    private $r;

    public function __construct($coordinates)
    {
//        var_dump($coordinates);
        $this->x = (int) ($coordinates->{"x"});
        if ($this->x > 4 or $this->x < -4 or !(is_numeric($coordinates->{"x"})) ) {
            throw new Incorrect_input_data_exception("X coordinate isn't in -4..4");
        }

        $this->y = (double)($coordinates->{"y"});
        if ($this->y > 3 or $this->y < -5 or !(is_numeric($coordinates->{"y"}))) {
            throw new Incorrect_input_data_exception("Y coordinate isn't in -5..3");
        }

        $this->r = (double)($coordinates->{"r"});
        if ($this->r > 5 or $this->r < 2 or !(is_numeric($coordinates->{"r"}))) {
            throw new Incorrect_input_data_exception("R isn't in -2..5");
        }
    }

    public function get_x()
    {
        return $this->x;
    }

    public function get_y()
    {
        return $this->y;
    }

    public function get_r()
    {
        return $this->r;
    }

//    public function jsonSerialize()
//    {
//        return "x:".$this->x.",".
//            "y:".$this->y.",".
//            "r:".$this->r;
//    }
}
