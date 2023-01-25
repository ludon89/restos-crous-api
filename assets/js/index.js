/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */




// ******************** AJOUT DE LA CARTE ******************** //

let mapCont = document.querySelector("#map");

let map = L.map('map').setView([50.664009, 3.112414], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// ******************** REQUETE AJAX ******************** //

const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";

fetch(url)
  .then((resp) => resp.json())
  .then((resp) => {
    // Traitement JS
    const restos = resp.records;
    console.log(restos);



    // ******************** DECLARATION DES VARIABLES ******************** //

    const popup = document.querySelector(".popup");

    const restoInfoTitle = document.querySelector(".resto-info__title");
    const restoInfoAddress = document.querySelector(".resto-info__address");
    const restoInfoShortDesc = document.querySelector(".resto-info__short_desc");
    restoInfoTitle.innerHTML = "";
    restoInfoAddress.innerHTML = "";
    restoInfoShortDesc.innerHTML = "";

    const restoButtonsBtnSave = document.querySelector(".resto-buttons__btn-save");
    const restoButtonsBtnClose = document.querySelector(".resto-buttons__btn-close");

    // const debugBtn = document.getElementById("debugBtn");



    // ******************** DECLARATION DES ECOUTEURS D'EVENEMENTS ******************** //

    restoButtonsBtnSave.addEventListener("click", () => {
      saveFav();
    });

    restoButtonsBtnClose.addEventListener("click", () => {
      closePopup();
    });

    // debugBtn.addEventListener("click", () => {
    //   debugDisplayPopup();
    // });



    // ******************** FONCTIONS/BOUCLES ******************** //

    // Boucle pour lire toutes les infos resto, mettre les marqueurs, remplir le HTML correspondant au clic...
    for (let item of restos) {
      let marker = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]]).addTo(map);
      // .bindPopup(item.fields.title);
      marker.on("click", () => getRestoInfo(item)); // TODO bind.popup
    }

    function getRestoInfo (item) {
      // console.log(item);
      // console.log(restos);
      popup.classList.remove("hidden");
      restoInfoTitle.innerHTML = item.fields.title;
      restoInfoAddress.innerHTML = item.fields.contact;
      if (item.fields.short_desc != null) {
        restoInfoShortDesc.innerHTML = item.fields.short_desc;
      } else { restoInfoShortDesc.innerHTML = "Champ non renseigné"; }
    }

    function saveFav () {
      const restoFavTitle = restoInfoTitle.innerHTML;
      const restoFavAddress = restoInfoAddress.innerHTML;
      const restoFavShortDesc = restoInfoShortDesc.innerHTML;

      const restoFavObj = { // Je mets les infos du resto que je veux mettre en fav dans un objet
        "title": restoFavTitle,
        "address": restoFavAddress,
        "shortDesc": restoFavShortDesc,
      };
      // const favArray = [restoFavObj]; // J'aurai besoin d'un tableau pour stocker plusieurs favoris

      // localStorage.setItem("restoFavTitle", restoFavTitle);
      // localStorage.setItem("restoFavAddress", restoFavAddress);
      // localStorage.setItem("restoFavShortDesc", restoFavShortDesc);

      localStorage.setItem("favObj", JSON.stringify(restoFavObj));
      // localStorage.setItem("favArray", JSON.stringify(favArray)); // Je transforme le tableau en chaine de caractères
    }

    function closePopup () {
      popup.classList.add("hidden");
    }

  })
  .catch((err) => console.log("Erreur de type :" + err));






/**
 * Mettre et récup plusieurs élements dans le Local Storage :
 *
 * 3 fonctions : save, get, add
 *
 * on utilise un tableau pour mettre plusieurs objets (autant qu'il nous en faut) :
 * {nom : ... ; adresse : ... ; description : ...}
 *
 * on envoie l'objet sous forme de chaine de caractères, mais on le parse quand on le récup
 * (et après on pourra boucler dedans)
 *
 * function add(e){
 *   let product = get();
 *   product.push(e);
 *   save(product); // fonction pour ajouter un favori dans le local storage
 * }
 *
 */
