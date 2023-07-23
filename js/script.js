let map, modal, testoModal;


let comuni = [
    {
        nome: "Fossano",
        desc: "«pene»",
        km: "1000",
        disponibile: "si"
    },
    {
        nome: "Savigliano",
        desc: "«zdf»",
        km: "1000",
        disponibile: "si"
    },
    {
        nome: "Bra",
        desc: "«sspene»",
        km: "1200",
        disponibile: "si"
    }
];

window.onload = async function(){

    modal = document.getElementById("sfondoModal");
    testoModal = document.querySelector("#myModal main");

    let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=" +comuni[0].nome);
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
    let layer1 = aggiungiLayer(map, "img/marker.png");


    for(let comune of comuni){
        let promise = fetch("https://nominatim.openstreetmap.org/search?format=json&city="+comune.nome);
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
        testoModal.innerHTML = marker.dati.nome + "<br>" + marker.dati.desc + "<br>" + marker.dati.km + "<br>" + marker.dati.disponibile;
        modal.style.display = "flex";
        console.log(marker.desc);

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

