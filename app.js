import menuArray from "./data.js";

function renderMenu(arr) {
  const menuSectionContainer = document.querySelector(`#menu-items`);
  let htmlToAdd = "";
  arr.forEach((item) => {
    htmlToAdd += `<div class="single-item">
                    <div class="item-icon-container">${item.emoji}</div>
                    <div class="item-info">
                      <h3 class="item-name">${item.name}</h3>
                      <p class="item-ingredients">${item.ingredients.join(
                        ", "
                      )}</p>
                      <h4 class="item-price">$${item.price}</h4>
                    </div>
                    <button class="item-add-btn">+</button>
                  </div>`;
  });
  menuSectionContainer.innerHTML += htmlToAdd;
}

renderMenu(menuArray);
