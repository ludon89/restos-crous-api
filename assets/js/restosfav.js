/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */



// ******************** DECLARATION DES VARIABLES ******************** //

const restosFavCont = document.querySelector(".restosfav_cont");

const restoFavTitle = localStorage.getItem("restoFavTitle");
const restoFavAddress = localStorage.getItem("restoFavAddress");
const restoFavShortDesc = localStorage.getItem("restoFavShortDesc");
console.log(restoFavTitle, restoFavAddress, restoFavShortDesc);



// ******************** DECLARATION DES ECOUTEURS D'EVENEMENTS ******************** //

window.onload = () => { displayFav(); };



// ******************** FONCTIONS/BOUCLES ******************** //

function displayFav () {
  restosFavCont.innerHTML = "";
  if (localStorage.length !== 0) {
    restosFavCont.innerHTML += `
      <div class="restosfav_popup flex-x">
        <div class="restofav-pic-cont flex-x flex-center-x flex-center-y">
          <img src="assets/img/camera-solid.svg" alt="photo restaurant" class="restofav-pic-cont__placeholder">
        </div>
        <div class="restofav-info font-fantasy">
          <h2 class="restofav-info__title">${restoFavTitle}</h2>
          <p class="restofav-info__address">${restoFavAddress}</p>
          <p class="restofav-info__short_desc">${restoFavShortDesc}</p>
        </div>
        <div class="resto-buttons font-fantasy flex-x">
          <button class="resto-buttons__btn-delete">Retirer des favoris</button>
        </div>
      </div>
    `;

    const restoButtonsBtnDelete = document.querySelector(".resto-buttons__btn-delete");

    restoButtonsBtnDelete.addEventListener("click", () => {
      clearAllFav();
      displayFav();
    });

  } else {
    restosFavCont.innerHTML += `
      <div class="restosfav_placeholder">
        <p>Vos favoris s'afficheront ici</p>
      </div>
    `;
  }
}

function clearAllFav () {
  console.log("test clearAllFav");
  localStorage.clear();
}
