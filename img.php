<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_GET["q"]); // parcourir l'article plustot que google image !!!
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$ret=curl_exec($ch);
curl_close($ch);
preg_match('#[a-z0-9._\/&-:]+\.(jpg|jpeg|gif|png)#',$ret,$res);
preg_match('#\.(jpg|jpeg|gif|png)#', $res[0],$img);
$format = "";
switch ($img[0]) {
	case '.gif':
		$format = "image/gif";
		break;
	case '.jpeg':
		$format = "image/jpeg";
		break;
	case '.png':
		$format = "image/png";
		break;
	case '.jpg':
		$format = "image/jpeg";
		break;	
}
header("Content-Type: " . $format);
echo file_get_contents($res[0]);
?>
