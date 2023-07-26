<?php

$indirizzoServer = "localhost";
$nomeDb = "veicoli";
$conn = mysqli_connect($indirizzoServer, "root", "", $nomeDb);


$query2 = "SELECT max(id) as max_id FROM lista_veicoli";
$n_veicoli = $conn->query($query2);

if ($n_veicoli && $conn->affected_rows > 0) {
    $row = $n_veicoli->fetch_assoc(); // Estrai il risultato come un array associativo
    $max_id = $row['max_id']; // Ottengo il valore dell' id dalla colonna calcolata "max_id"
    echo json_encode($max_id);
}
else
    echo json_encode("errore".$conn->error);

$conn->close();