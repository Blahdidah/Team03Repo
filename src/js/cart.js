import {loadHeaderFooter} from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-id');
    shoppingCart.removeItemFromCart(itemId);
  }
});