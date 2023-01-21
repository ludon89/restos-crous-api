/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */




/* ==================== AJOUT DE LA CARTE ==================== */

let mapCont = document.querySelector("#map");

let map = L.map('map').setView([50.664009, 3.112414], 11);

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



    /* ==================== DECLARATION DES VARIABLES ==================== */

    const popup = document.querySelector(".popup");

    const restoInfoTitle = document.querySelector(".resto-info__title");
    const restoInfoAddress = document.querySelector(".resto-info__address");
    const restoInfoShortDesc = document.querySelector(".resto-info__short_desc");
    restoInfoTitle.innerHTML = "";
    restoInfoAddress.innerHTML = "";
    restoInfoShortDesc.innerHTML = "";

    const restoButtonsBtnSave = document.querySelector(".resto-buttons__btn-save");
    const restoButtonsBtnClose = document.querySelector(".resto-buttons__btn-close");

    const debugBtn = document.getElementById("debugBtn");



    /* ==================== DECLARATION DES ECOUTEURS D'EVENEMENTS ==================== */

    restoButtonsBtnSave.addEventListener("click", () => {
      saveFav();
    });

    restoButtonsBtnClose.addEventListener("click", () => {
      closePopup();
    });

    // debugBtn.addEventListener("click", () => {
    //   debugDisplayPopup();
    // });



    /* ==================== FONCTIONS/BOUCLES ==================== */

    // Boucle pour lire toutes les infos resto, mettre les marqueurs, remplir le HTML correspondant au clic...
    for (let item of restos) {
      let marker = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]]).addTo(map);
      marker.on("click", () => getRestoInfo(item)); // Mettre la fonction pour affecter l'affichage au clic ici
    }

    function getRestoInfo (item) { // TODO erreur si undefined
      popup.classList.remove("hidden");
      restoInfoTitle.innerHTML = item.fields.title;
      restoInfoAddress.innerHTML = item.fields.contact;
      restoInfoShortDesc.innerHTML = item.fields.short_desc;
    }

    function saveFav () { // ? lire directement les données plutôt que le innerHTML
      localStorage.setItem("restoInfoTitle", restoInfoTitle.innerHTML);
      console.log(localStorage);
    }

    function closePopup () {
      popup.classList.add("hidden");
    }






    function debugDisplayPopup () {
      popup.classList.remove("hidden");
    }

  })
  .catch((err) => console.log("Erreur de type :" + err));



