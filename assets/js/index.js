/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */




/* ==================== AJOUT DE LA CARTE ==================== */

let mapCont = document.querySelector("#map");

let map = L.map('map').setView([50.633, 3.064156], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// let marker = L.marker([50.631389, 3.058319]).addTo(map);




/* ==================== REQUETE AJAX ==================== */

const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";

fetch(url)
  .then((resp) => resp.json())
  .then((resp) => {
    // Traitement JS
    const restos = resp.records;
    console.log(restos);

    // On fait une boucle pour lire les infos du tableau
    // for (let item of restos) {
    //   console.log(item.geometry.coordinates);
    // }

    // Boucle pour lire toutes les coordonnées (et les noms des lieux) et mettre les marqueurs
    for (let item of restos) {
      let markerResto = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]]).addTo(map)
        .bindPopup(item.fields.title);
    }

  })
  .catch((err) => console.log("Erreur de type :" + err));



