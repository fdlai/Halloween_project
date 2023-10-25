/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const addToCartButton = document.querySelector("#add-to-cart");
const ticketPriceDropdown = document.querySelector("#ticket-type");
const quantityDropdown = document.querySelector("#quantity");
const ticketsDescription = document.querySelector(".tickets__description");
const cartItemsList = document.querySelector(".tickets__list");
const ticketsTotal = document.querySelector(".tickets__total");
const checkoutButton = document.querySelector(".tickets__checkout-button");
const checkoutModal = document.querySelector("#modal-checkout");
const modalTotal = document.querySelector(".modal__total");
const ticketTemplate =
  document.querySelector("#ticket-template").content.firstElementChild;
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleCheckoutButtonState() {
  if (cartItemsList.textContent.trim() === "") {
    checkoutButton.disabled = true;
  } else {
    checkoutButton.disabled = false;
  }
}

function addToCart() {
  const ticketName = ticketPriceDropdown.value;
  let ticketPrice;
  if (ticketName === "General Admission") {
    ticketPrice = 35;
    ticketsDescription.textContent =
      "General Admission access to the 13th Gate Haunted House and all attractions.";
  } else {
    ticketPrice = 75;
    ticketsDescription.textContent =
      "Immediate Access to the 13th Gate Haunted House. VIP allows you to skip Haunted House OUTSIDE line.";
  }

  const selectedQuantity = quantityDropdown.value;
  const price = ticketPrice * selectedQuantity;

  // Create a new cart item element
  const cartItem = ticketTemplate.cloneNode(true);
  const cartItemInfo = cartItem.querySelector(".ticket__info");
  cartItemInfo.textContent = `${ticketName} x${selectedQuantity} - Price: $${price.toFixed(
    2
  )}`;

  //remove ticket functionality
  const cartItemRemoveButton = cartItem.querySelector(".ticket__remove-button");
  cartItemRemoveButton.addEventListener("click", () => {
    cartItem.remove();
    updateTotal();
    handleCheckoutButtonState();
  });

  function updateTotal() {
    const total = calculateTotal();
    ticketsTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Add the item to the cart
  cartItemsList.appendChild(cartItem);
  const total = calculateTotal();
  updateTotal();

  handleCheckoutButtonState();
}

function calculateTotal() {
  const text = cartItemsList.textContent.trim();
  if (text === "") {
    return 0;
  }
  const nums = text.match(/(?<=\$)\d+/g).map(parseFloat);
  return nums.reduce((a, b) => a + b);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
ticketPriceDropdown.addEventListener("change", () => {
  const ticketName = ticketPriceDropdown.value;
  if (ticketName === "General Admission") {
    ticketsDescription.textContent =
      "General Admission access to the 13th Gate Haunted House and all attractions.";
  } else {
    ticketsDescription.textContent =
      "Immediate Access to the 13th Gate Haunted House. VIP allows you to skip Haunted House OUTSIDE line.";
  }
});

addToCartButton.addEventListener("click", () => {
  addToCart("General Admission", 35);
});

checkoutButton.addEventListener("click", () => {
  modalTotal.textContent = `Total: $${calculateTotal().toFixed(2)}`;
  checkoutModal.classList.add("modal_opened");
});

checkoutModal.addEventListener("mousedown", (e) => {
  if (e.target === e.currentTarget) {
    checkoutModal.classList.remove("modal_opened");
  }
});
