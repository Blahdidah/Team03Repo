import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter('partials');
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize ShoppingCart
const shoppingCart = new ShoppingCart();

  // Clear the cart
shoppingCart.clearCart();
});
