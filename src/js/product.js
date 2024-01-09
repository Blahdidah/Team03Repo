import { setLocalStorage } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let currentCart = getLocalStorage('so-cart')
  if (currentCart == null || !currentCart.constructor.toString() == 'Array') { // Nothing or no an array
    currentCart = []
  }
  currentCart.push(product)

  setLocalStorage('so-cart', currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
