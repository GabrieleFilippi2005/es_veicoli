<?php

$indirizzoServer = "localhost";
$nomeDb = "veicoli";
$conn = mysqli_connect($indirizzoServer, "root", "", $nomeDb);

//2. Prelevare un dato json che arriva dal client
$record = file_get_contents("php://input");
$record = json_decode($record);


$modello = $record[0]->modello;
$prezzo = $record[0]->prezzo;
$km = $record[0]->km;
$posizione = $record[0]->posizione;

$query = "INSERT INTO  lista_veicoli (modello, prezzo, km, disponibile, posizione) VALUES ('$modello','$prezzo','$km','si','$posizione')";
$ris = $conn->query($query);


echo $record[0]->modello;
