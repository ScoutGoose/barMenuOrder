import menuArray from "./data.js";
const orderArr = [];
document.addEventListener("click", (event) => {
  if (event.target.dataset.addItemId) {
    addItemToOrder(+event.target.dataset.addItemId);
    document.querySelector(`.checkout-container`).classList.remove("hidden");
  }
});

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
                    <button class="item-add-btn" data-add-item-id="${
                      item.id
                    }">+</button>
                  </div>`;
  });
  menuSectionContainer.innerHTML += htmlToAdd;
}
renderMenu(menuArray);

// ADD ITEM TO ORDER
function addItemToOrder(id) {
  const foundItem = menuArray.find((el) => el.id === id);
  orderArr.push(foundItem);
  renderOrder();
}

// RENDER ORDER
function renderOrder() {
  let checkoutContainer = document.querySelector(`.checkout-items-container`);
  let htmlToAdd = "";
  orderArr.forEach(
    (el) =>
      (htmlToAdd += `
          <div class="single-checkout-item">
          <h3 class="item-name">${el.name}</h3>
          <button class="remove-btn">remove</button>
          <h4 class="item-price">$${el.price}</h4>
          </div>`)
  );
  checkoutContainer.innerHTML = htmlToAdd;
  document.querySelector(`.total-price`).textContent = `$${orderArr.reduce(
    (acc, cur) => acc + cur.price,
    0
  )}`;
}
