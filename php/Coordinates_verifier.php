<?php
require_once 'Coordinates.php';
class Coordinates_verifier
{
    private $coordinates;

    public function __construct($coordinates)
    {
        $this->coordinates = $coordinates;
    }

    public function verify()
    {
        $x = $this->coordinates->get_x();
        $y = $this->coordinates->get_y();
        $r = $this->coordinates->get_r();
        if (($x <= 0 and $y <= 0 and ($x ^ 2 + $y ^ 2 <= ($r / 2) ^ 2))
            or ($x >= 0 and $x <= $r / 2 and $y <= 0 and $y >= -$r)
            or ($x + $r / 2 >= $y and $y >= 0 and $x >= 0)) {
            return true;
        } else {
            return false;
        }
    }

}
?>