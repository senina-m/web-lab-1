<?php
require_once '../dto/Coordinates.php';
class Coordinates_verifier
{
    public function verify($coordinates)
    {
        $x = $coordinates->get_x();
        $y = $coordinates->get_y();
        $r = $coordinates->get_r();
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