/*
   File: jsArray.php
   91.461 Assignment: scrabble
   Corina Mangione, UMass Lowell Computer Science, corina_mangione@student.uml.edu
   Copyright (c) 2020 by Corina Mangione. All rights reserved. May be
   freely
   copied or excerpted for educational purposes with credit to the
   author.
   updated by Corina Mangione on August 14, 2020
   */
<?php

$file = file_get_contents('english4.txt');
$array = explode("\n", $file);
//var_export( $array);
print '<pre>';
foreach($array as $k => $v) {
  print "'".trim($v)."', \n";

}
print '</pre>';
