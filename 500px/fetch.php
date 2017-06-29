<?php
$url= $_GET['url'];
$curlInit = curl_init($url);
curl_setopt($curlInit,CURLOPT_CONNECTTIMEOUT,10);
curl_setopt($curlInit,CURLOPT_FAILONERROR,true);
curl_setopt($curlInit,CURLOPT_FOLLOWLOCATION,true);
curl_setopt($curlInit,CURLOPT_RETURNTRANSFER,true);
//curl_setopt($curlInit,CURLOPT_HEADER,true);
curl_setopt($curlInit,CURLOPT_SSL_VERIFYPEER, false);
echo  curl_exec($curlInit);
curl_close($curlInit);

?>