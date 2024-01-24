import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart('so-cart', '.product-list');
cart.renderCartContents();

loadHeaderFooter('partials');

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-id');
    cart.removeItemFromCart(itemId);
  }
});