import { setLocalStorage } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  let currentCart = getLocalStorage('so-cart')  // Get the shopping cart array

  if (!Array.isArray(currentCart)) {  // Make sure it's an array
    currentCart = [] // If not, make an empty array
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
