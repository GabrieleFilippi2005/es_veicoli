let map, modal, testoModal;
let url = "http://localhost/esercizi/es_veicoli/"

let aus


let comuni = [
    {
        id: "",
        posizione: "Fossano",
        modello: "",
        prezzo: "",
        km: "",
        disponibile: ""
    },
    {
        id: "",
        posizione: "Savigliano",
        modello: "",
        prezzo: "",
        km: "",
        disponibile: ""
    },
    {
        id: "",
        posizione: "Bra",
        modello: "",
        prezzo: "",
        km: "",
        disponibile: ""
    }
];

window.onload = async function(){

    modal = document.getElementById("sfondoModal");
    testoModal = document.querySelector("#myModal main");

    let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=" +comuni[0].posizione);
    let vet = await busta.json();
    let coord = [parseFloat(vet[0].lon), parseFloat(vet[0].lat)];


    for (let i = 1; i < comuni.length+1; i++)
    {
        fetch(url + "server/richiesta.php", {
                method: "post",
                body: JSON.stringify(i)
            }
        ).then(response => response.json())
        .then(r  =>{

            comuni[i-1].modello = r.modello
            comuni[i-1].prezzo = r.prezzo
            comuni[i-1].km = r.km
            comuni[i-1].disponibile = r.disponibile
            comuni[i-1].id = r.id
        });
    }

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
    let layer1 = aggiungiLayer(map, "img/marker.png");


    for(let comune of comuni){
        let promise = fetch("https://nominatim.openstreetmap.org/search?format=json&city="+comune.posizione);
        promise.then(async function(busta){
            let vet = await busta.json();
            let coord = [parseFloat(vet[0].lon), parseFloat(vet[0].lat)];
            aggiungiMarker(layer1, comune, coord[0], coord[1]);
            //DOM1 RICHIAMATO QUANDO VIENE MANDATO IN ESECUZIONE THEN
        });
        //DOM2 FUORI DAL THEN
    }

    //Gestione del click
    map.on("click", function (evento){
        /*
            forEachFeatureAtPixel -> Lavora in modo simile a comuni.forEach, perciò processa tutte
            le feature presenti la mappa e filtra quelle cliccate

            evento.pixel -> pixel cliccati con il mouse
        */

        let marker = map.forEachFeatureAtPixel(evento.pixel, function(feature){return feature});
        testoModal.innerHTML = "posizione: "+ marker.dati.posizione + "<br><br> modello: " + marker.dati.modello + "<br><br> chilometri: " + marker.dati.km + "<br><br> prezzo: " + marker.dati.prezzo +"€"+ "<br><br> ancora disponibile: " + marker.dati.disponibile;
        modal.style.display = "flex";
        aus = marker.dati.id


    });
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


function aggiungiMarker(layer, dati,  lon, lat){
    let punto = new ol.geom.Point(ol.proj.fromLonLat([lon, lat]));
    let marker = new ol.Feature(punto);

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
    console.log(aus);

    fetch(url + "server/rimuovi_marker.php", {
            method: "post",
            body: JSON.stringify(aus)
        }
    ).then(response => response.json())
        .then(r  =>{
            console.log(r)
        });

}

