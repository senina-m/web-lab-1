<?php
require_once 'exceptions/incorrect_input_data_exception.php';

class Coordinates
{
    private $x;
    private $y;
    private $r;

    public function __construct($input)
    {
        $this->x = (int)($input[0]);
        if ($this->x > 4 or $this->x < -4) {
            throw new incorrect_input_data_exception("X coordinate isn't in -4..4");
        }

        $this->y = (double)($input[1]);
        if ($this->y > 3 or $this->y < -5) {
            throw new incorrect_input_data_exception("Y coordinate isn't in -5..3");
        }

        $this->r = (double)($input[2]);
        if ($this->r > 5 or $this->r < 2) {
            throw new incorrect_input_data_exception("R isn't in -2..5");
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
}

?>