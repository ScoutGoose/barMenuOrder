import menuArray from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
const orderArr = [];
// FORM SUBMITION
document
  .querySelector(".card-info-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector(`[name=cardholder-name]`);
    const cardNum = document.querySelector(`[name=card-number]`);
    const cardCVV = document.querySelector(`[name=card-cvv]`);
    if (
      validateName(name.value) &&
      validateCardNumber(cardNum.value) &&
      validateCVV(cardCVV.value)
    ) {
      closeConfirmationScreen();
      orderArr.splice(0, orderArr.length);
      renderOrder();
      document.querySelector(`main`).innerHTML += `
      <div class="confirmation-message-container">
        <p class="confirmation-message">
          Thanks, ${name.value}! Your order is on its way!
        </p>
      </div>
      `;
      name.value = "";
      cardNum.value = "";
      cardCVV.value = "";
      localStorage.clear();
    }
  });
// CHECK LOCAL STORAGE ON START
checkLS();

// GLOBAL EVENT LISTENER
document.addEventListener("click", (event) => {
  if (event.target.dataset.addItemId) {
    addItemToOrder(+event.target.dataset.addItemId);
  } else if (event.target.dataset.removeItemId) {
    removeItemFromOrder(event.target.dataset.removeItemId);
  } else if (event.target.id === "checkout-btn") {
    showConfirmationScreen();
  } else if (event.target.id === "close-confirmation-screen") {
    closeConfirmationScreen();
  }
});

// RENDER MENU
function renderMenu(arr) {
  const menuSectionContainer = document.querySelector(`#menu-items`);
  let htmlToAdd = "";
  arr.forEach((item) => {
    htmlToAdd += `<div class="single-item">
    <div class="item-icon-container">${item.emoji}</div>
    <div class="item-info">
    <h3 class="item-name">${item.name}</h3>
    <p class="item-ingredients">${item.ingredients.join(", ")}</p>
    <h4 class="item-price">$${item.price}</h4>
    </div>
    <button class="item-add-btn" data-add-item-id="${item.id}">+</button>
    </div>`;
  });
  menuSectionContainer.innerHTML += htmlToAdd;
}
renderMenu(menuArray);

// ADD ITEM TO ORDER
function addItemToOrder(id) {
  const foundItem = menuArray.find((el) => el.id === id);
  orderArr.push({ ...foundItem, orderId: uuidv4() });
  // ADD ITEMS TO THE LOCAL STORAGE
  localStorage.setItem(`myOrder`, JSON.stringify(orderArr));
  renderOrder();
}

// REMOVE ITEM FROM ORDER
function removeItemFromOrder(id) {
  orderArr.push(
    ...orderArr.splice(0, orderArr.length).filter((item) => item.orderId !== id)
  );
  localStorage.setItem(`myOrder`, JSON.stringify(orderArr));
  renderOrder();
}

// RENDER ORDER
function renderOrder() {
  if (orderArr.length < 1) {
    document.querySelector(`.checkout-container`).classList.add("hidden");
  } else if (orderArr.length >= 1) {
    document.querySelector(`.checkout-container`).classList.remove("hidden");
  }
  let checkoutContainer = document.querySelector(`.checkout-items-container`);
  let htmlToAdd = "";
  orderArr.forEach(
    (el) =>
      (htmlToAdd += `
        <div class="single-checkout-item">
        <h3 class="item-name">${el.name}</h3>
        <button class="remove-btn" data-remove-item-id="${el.orderId}">remove</button>
        <h4 class="item-price">$${el.price}</h4>
        </div>`)
  );
  checkoutContainer.innerHTML = htmlToAdd;
  document.querySelector(`.total-price`).textContent = `$${orderArr.reduce(
    (acc, cur) => acc + cur.price,
    0
  )}`;
}

// CHECK LOCAL STORAGE FOR ORDER
function checkLS() {
  if (localStorage.getItem(`myOrder`)) {
    orderArr.push(...JSON.parse(localStorage.getItem(`myOrder`)));
    renderOrder();
  }
}

// SHOW ORDER CONFIRMATION SCREEN
function showConfirmationScreen() {
  document
    .querySelector(`.checkout-confirmation-screen`)
    .classList.remove("hidden");
  document.querySelector(`main`).classList.add(`disabled`);
}

// CLOSE ORDER CONFIRMATION SCREEN
function closeConfirmationScreen() {
  document
    .querySelector(`.checkout-confirmation-screen`)
    .classList.add("hidden");
  document.querySelector(`main`).classList.remove(`disabled`);
}

// CHECK AND CONFIRM ORDER
function validateName(name) {
  const regex = /^([a-zA-Z ]){2,50}$/;
  return regex.test(name);
}
// CARD NUMBER VALIDATION
function validateCardNumber(cardNum) {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  let isValid = false;

  if (visaRegEx.test(cardNum)) {
    isValid = true;
  } else if (mastercardRegEx.test(cardNum)) {
    isValid = true;
  } else if (amexpRegEx.test(cardNum)) {
    isValid = true;
  } else if (discovRegEx.test(cardNum)) {
    isValid = true;
  }
  return isValid;
}

// CVV VALIDATION
function validateCVV(cvv) {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
}
