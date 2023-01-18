/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */



/* ==================== AJOUT DE LA CARTE ==================== */

let mapCont = document.querySelector("#map");

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



/* ==================== TUTO REQUETE AJAX ==================== */

const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";

fetch(url)
  .then((resp) => resp.json())
  .then((resp) => {
    // Traitement JS
    const restos = resp.records;
    console.log(restos[0]);
    // On fait une boucle pour lire les infos du tableau
    for (let item of restos) {
      console.log(item.fields.title);
      console.log(item.fields.geolocalisation);
    }

  })
  .catch((err) => console.log("Erreur de type :" + err));



