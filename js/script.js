let map, modal, testoModal;
let url = "http://localhost/esercizi/es_veicoli/"

let aus
let layer1
let maxID
let punto
let marker


let veicoli = [{
    id: "",
    posizione: "",
    modello: "",
    prezzo: "",
    km: "",
    disponibile: "si"
}]


window.onload = async function(){

    let response2 = await fetch(url + "server/get_maxid.php", {
        method: "post",
    });

    if (response2.ok) {
        let r = await response2.json();
        maxID = r
    } else {
        // Gestire eventuali errori in caso di fallimento della richiesta
        console.error("Errore");
    }
    console.log(maxID)
    for (let i = 0; i<maxID; i++)
    {
        veicoli.push({
            id: "",
            posizione: "",
            modello: "",
            prezzo: "",
            km: "",
            disponibile: ""
        })
    }


    modal = document.getElementById("sfondoModal");
    testoModal = document.querySelector("#myModal main");

    for (let i = 1; i < veicoli.length; i++) {
        let response = await fetch(url + "server/richiesta.php", {
            method: "post",
            body: JSON.stringify(i),
        });

        if (response.ok) {
            let r = await response.json();
            veicoli[i - 1].modello = r.modello;
            veicoli[i - 1].prezzo = r.prezzo;
            veicoli[i - 1].km = r.km;
            veicoli[i - 1].disponibile = r.disponibile;
            veicoli[i - 1].id = r.id;
            veicoli[i - 1].posizione = r.posizione;
        } else {
            // Gestire eventuali errori in caso di fallimento della richiesta
            console.error("Errore");
        }
    }

    let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=" +veicoli[0].posizione);
    let vet = await busta.json();
    let coord = [parseFloat(vet[0].lon), parseFloat(vet[0].lat)];

    //Definisco una mappa
    map = new ol.Map(
        {
            target:"map", /* id dell'oggetto html */
            /* Definisco il livello base (mappa globale completa) */
            layers:[
                new ol.layer.Tile({source:new ol.source.OSM()})
            ],
            /*caratteristiche visive (zoom, centro, ...) della mappa creata */
            view:new ol.View({
                /* Array di float: coordinate (lon, lat)  */
                center: ol.proj.fromLonLat(coord),
                zoom:10
            })
        });

    //Path rispetto alla cartella principale del progetto (non come se fossi il js)
    layer1 = aggiungiLayer(map, "img/auto.png");

    aggiungi(layer1)

    //Gestione del click
    map.on("click", function (evento){
        let marker = map.forEachFeatureAtPixel(evento.pixel, function(feature){return feature});
        testoModal.innerHTML = "posizione: "+ marker.dati.posizione + "<br><br> modello: " + marker.dati.modello + "<br><br> chilometri: " + marker.dati.km + "<br><br> prezzo: " + marker.dati.prezzo +"€"+ "<br><br> ancora disponibile: " + marker.dati.disponibile;
        modal.style.display = "flex";
        aus = marker.dati.id
    });
}

function aggiungi(layer1) {
    let i = 0
    for(let comune of veicoli){
        let promise = fetch("https://nominatim.openstreetmap.org/search?format=json&city="+comune.posizione);
        promise.then(async function(busta){
            let vet = await busta.json();
            let coord = [parseFloat(vet[0].lon), parseFloat(vet[0].lat)];
            if (comune.disponibile === "si")
                aggiungiMarker(layer1, comune, coord[0], coord[1],i);
            //DOM1 RICHIAMATO QUANDO VIENE MANDATO IN ESECUZIONE THEN
        });
        //DOM2 FUORI DAL THEN
        i++
    }
}

function aggiungiLayer(mappa, pathImg){
    let layer = new ol.layer.Vector({
        /* Il sorgente dello strato visivo che si vuole aggiungere (es. altra mappa) */
        source:new ol.source.Vector(),
        /*
            Permette di specificare delle caratteristiche
            grafiche del layer
        */
        style: new ol.style.Style({
            image: new ol.style.Icon({
                /* Coordinate dell'immagine rispetto alle coordinate del punto */
                anchor:[0.5, 1],
                src:pathImg
            })
        })
    });
    mappa.addLayer(layer);
    return layer;
}



function aggiungiMarker(layer, dati,  lon, lat,i){
    punto = new ol.geom.Point(ol.proj.fromLonLat([lon, lat]));
    marker = new ol.Feature(punto);

    dati.lon = lon;
    dati.lat = lat;
    marker.dati = dati;
    //Inserisce il marker nel layer passato per parametro
    layer.getSource().addFeature(marker);
}

function chiudiModal(){
    modal.style.display = "none";
}

function acquista() {
    veicoli[aus-1].disponibile = "no"

    fetch(url + "server/rimuovi_marker.php", {
            method: "post",
            body: JSON.stringify(aus)
        }
    ).then(response => response.json())
        .then(r  =>{
            let comune = veicoli[r.id-1]
            console.log(r.id)
            console.log(comune)
               let promise = fetch("https://nominatim.openstreetmap.org/search?format=json&city="+comune.posizione);
                promise.then(async function(busta){
                    let vet = await busta.json();
                    rimuoviMarker();
                    //DOM1 RICHIAMATO QUANDO VIENE MANDATO IN ESECUZIONE THEN
                });
                //DOM2 FUORI DAL THEN

        });

}

function rimuoviMarker(layer, dati,  lon, lat){
    location.reload()
}


async function inserisci() {
    let modello = document.getElementById("input_modello")
    let prezzo = document.getElementById("input_prezzo")
    let km = document.getElementById("input_km")
    let posizione = document.getElementById("input_posizione")

    let nuova_auto = [{
        posizione: posizione.value,
        modello: modello.value,
        prezzo: prezzo.value,
        km: km.value,
    }]

    console.log(nuova_auto)
    let response = await fetch(url + "server/inserisci_auto.php", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuova_auto),
    });
    if (response.ok) {
        console.log("inserimento avvenuto con successo")
    } else {
        console.error("Errore");
    }
}