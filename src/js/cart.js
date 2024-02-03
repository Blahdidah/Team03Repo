import { loadHeaderFooter } from './utils.mjs';
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
if (cart.total > 0) {
  // show our checkout button and total if there are items in the cart.
  document.querySelector('.total-hide').classList.remove('hide');
}
