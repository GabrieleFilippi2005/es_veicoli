<?php

$indirizzoServer = "localhost";
$nomeDb = "veicoli";
$conn = mysqli_connect($indirizzoServer, "root", "", $nomeDb);

//2. Prelevare un dato json che arriva dal client
$record = file_get_contents("php://input");
$record = json_decode($record, true);


//query
$query = "UPDATE `lista_veicoli` SET `disponibile`='no' WHERE id = '$record'";
$ris = $conn->query($query);

$query2 = "SELECT * FROM lista_veicoli WHERE id = '$record'";
$risposta = $conn->query($query2);


if($risposta && $conn->affected_rows > 0){
    $risposta = $risposta ->fetch_assoc();
    //Rispondo al javascript (al client)
    echo json_encode($risposta);
}else{
    echo json_encode("Errore nella query: ".$conn->error);
}

// Chiudo la connessione al database
$conn->close();