import {loadHeaderFooter} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

const shoppingCart = new ShoppingCart();
shoppingCart.renderCartContents();
loadHeaderFooter('partials');

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-id');
    shoppingCart.removeItemFromCart(itemId);
  }
});

document.getElementById('cart_submit').addEventListener('click', () => {
  window.location.href = '/checkout/';
});