/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */



// ******************** DECLARATION DES VARIABLES ******************** //

const restosFavCont = document.querySelector(".restosfav_cont");

const favArray = JSON.parse(localStorage.getItem("favArrayKey"));
console.log(favArray);

const btnClearAllFav = document.querySelector(".clearallfav__btn");



// ******************** DECLARATION DES ECOUTEURS D'EVENEMENTS ******************** //

window.onload = () => { displayFav(); };

btnClearAllFav.addEventListener("click", () => {
  clearAllFav();
  displayFav();
});



// ******************** FONCTIONS/BOUCLES ******************** //

function displayFav () {
  restosFavCont.innerHTML = "";

  if (localStorage.length == 0) {
    restosFavCont.innerHTML += `
      <div class="restosfav_placeholder">
        <p>Vos favoris s'afficheront ici</p>
      </div>
    `;
  } else {
    for (let item of favArray) {
      restosFavCont.innerHTML += `
          <div class="restosfav_popup flex-x">
            <div class="restofav-pic-cont flex-x flex-center-x flex-center-y">
              <img src="assets/img/camera-solid.svg" alt="photo restaurant" class="restofav-pic-cont__placeholder">
            </div>
            <div class="restofav-info font-fantasy">
              <h2 class="restofav-info__title">${item.title}</h2>
              <p class="restofav-info__address">${item.address}</p>
              <p class="restofav-info__short_desc">${item.shortDesc}</p>
            </div>
            <div class="resto-buttons font-fantasy flex-x">
              <button class="resto-buttons__btn-deletefav">Retirer des favoris</button>
            </div>
          </div>
          `;

    };


  }
}

function clearAllFav () {
  localStorage.clear();
}
