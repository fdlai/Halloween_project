/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const addToCartButton = document.querySelector("#add-to-cart");
const quantityDropdown = document.querySelector("#quantity");
const cartItemsList = document.querySelector("#cart-items");
const checkoutButton = document.querySelector(".tickets__checkout-button");
const checkoutModal = document.querySelector("#modal-checkout");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function addToCart(ticketName, ticketPrice) {
  const selectedQuantity = quantityDropdown.value;
  const total = ticketPrice * selectedQuantity;

  // Create a new cart item element
  const cartItem = document.createElement("li");
  cartItem.textContent = `${ticketName} x${selectedQuantity} - Total: $${total.toFixed(
    2
  )}`;

  // Add the item to the cart
  cartItemsList.appendChild(cartItem);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

addToCartButton.addEventListener("click", () => {
  addToCart("General Admission", 35);
});

checkoutButton.addEventListener("click", () => {
  checkoutModal.classList.add("modal_opened");
});

checkoutModal.addEventListener("mousedown", (e) => {
  if (e.target === e.currentTarget) {
    checkoutModal.classList.remove("modal_opened");
  }
});
