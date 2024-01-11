import { setLocalStorage, getLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  //construct an existing cart, check if it is an array
  let existingCart = getLocalStorage('so-cart') || [];
  if (!Array.isArray(existingCart)) {
    existingCart = [];
  }
  existingCart.push(product);

  setLocalStorage('so-cart', existingCart);
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
