<?php

// Connessione al database

$indirizzoServer = "localhost";
$nomeDb = "veicoli";
$conn = mysqli_connect($indirizzoServer, "root", "", $nomeDb);

//2. Prelevare un dato json che arriva dal client
$record = file_get_contents("php://input");
$record = json_decode($record, true);


//query
$query = "SELECT * FROM lista_veicoli WHERE id = '$record'";
$ris = $conn->query($query);

if($ris && $conn->affected_rows > 0){
    $risposta = $ris ->fetch_assoc();
    //Rispondo al javascript (al client)
    echo json_encode($risposta);
}else{
    echo "Errore nella query: ".$conn->error;
}

// Chiudo la connessione al database
$conn->close();

