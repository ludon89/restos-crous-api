/**
 * BRIEF : https://simplonline.co/briefs/19aaa193-b55e-4ee3-983d-669374b90134
 *
 *
 * DATA RESTOS : https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone
 * DOC API : https://opendata.lillemetropole.fr/explore/dataset/ensemble-des-lieux-de-restauration-des-crous/api/?rows=20
 */




/* ==================== DECLARATION DES VARIABLES ==================== */

const restosFavCont = document.querySelector(".restosfav_cont");

const restoFavTitle = localStorage.getItem("restoFavTitle");
const restoFavAddress = localStorage.getItem("restoFavAddress");
const restoFavShortDesc = localStorage.getItem("restoFavShortDesc");
console.log(restoFavTitle, restoFavAddress, restoFavShortDesc);

const restoButtonsBtnDelete = document.querySelector(".resto-buttons__btn-delete");



/* ==================== DECLARATION DES ECOUTEURS D'EVENEMENTS ==================== */

window.onload = () => { displayFav(); };

restoButtonsBtnDelete.addEventListener("click", (e) => {
  clearAll(e);
});



/* ==================== FONCTIONS/BOUCLES ==================== */

function displayFav () {
  restosFavCont.innerHTML += `
    <div class="restosfav_item flex-x">
      <div class="restofav-pic flex-x flex-center-x flex-center-y">
        <img src="assets/img/camera-solid.svg" alt="photo restaurant" class="restofav-pic__placeholder">
      </div>
      <div class="restofav-display font-fantasy">
        <h2 class="restofav-display__title">${restoFavTitle}</h2>
        <p class="restofav-display__address">${restoFavAddress}</p>
        <p class="restofav-display__short_desc">${restoFavShortDesc}</p>
      </div>
      <div class="resto-buttons font-fantasy flex-x">
        <button class="resto-buttons__btn-delete">Retirer des favoris</button>
      </div>
    </div>
  `;
}

function clearAll () {
  localStorage.clear();
}
