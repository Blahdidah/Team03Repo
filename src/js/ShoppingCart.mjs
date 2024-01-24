// Class and helper functions to render a list of products on the root index.html

import ProductData from './ProductData.mjs'; // For intellisense purposes
import { renderListWithTemplate, getLocalStorage, updateCartCountIcon } from './utils.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */
function cartItemTemplate(product) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${product.Image}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1 <span class="remove-item" data-id="${product.Id}"> 🗑 </span></p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
</li>`;

  return newItem;
}

/**
 * A class to render an html listing of products from a data source.
 */
export default class ShoppingCart {
  /**
   * Set the category, dataSource and listElement properties.
   * @param {String} category
   * @param {ProductData} dataSource
   * @param {HTMLElement} listElement
   */
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

  constructor() {

  }


  /**
   * Initialize
   */
//   init() {
//     this.dataSource
//       .getData()
//       .then((productArray) => productArray.filter(this.productFilter))
//       .then((productArray) => this.renderList(productArray));
//   }

  renderCartContents() {
    const cartItems = getLocalStorage('so-cart');
    if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector('.product-list').innerHTML = htmlItems.join('');
      this.showTotal();
    } else {
      document.querySelector('.product-list').innerHTML =
        '<p>Your cart is empty.</p>';
      this.hideTotal();
    }
  }



  /**
   * Filter predicate to remove everything not on the list
   * @param {Object} product An object containing product data
   * @returns {Boolean}
   */
  productFilter(product) {
    // This is a separate function to satisfy the assignment.
    
    return true;  // Filter disabled
    
    //return ['880RR', '985RF', '985PR', '344YJ'].includes(product.Id); // This is hard coded, but I assume it will be dealt with in a future assignment.
  }

  /**
   * Renders all the card li to the page at the specified element.
   * @param {Array<Object>} productList
   */
  renderList(productList) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      productList,
      'afterbegin',
      true
    );
  }

  removeItemFromCart(itemId) {
    let cartItems = getLocalStorage('so-cart');
    cartItems = cartItems.filter(item => item.Id !== itemId);
    localStorage.setItem('so-cart', JSON.stringify(cartItems));
    updateCartCountIcon(document.querySelector('.cart'));
    this.renderCartContents(); // Update the cart display after removal
  }

  calculateTotal(cartItems) {
    //to sum up the final price of teach item in the cart
    const total = cartItems.reduce(
      (accumulator, item) => accumulator + item.FinalPrice,
      0
    );
    return total;
  }

  showTotal() {
    const totalDiv = document.getElementById('total-hide');
    totalDiv.style.display = 'block';
  
    //calculate the total based on the items in the cart
    const cartItems = getLocalStorage('so-cart');
    const totalAmount = this.calculateTotal(cartItems);
  
    //display the total in the div
    const totalElement = document.getElementById('total-amount');
    totalElement.textContent = `$${totalAmount.toFixed(2)}`;
  }

  hideTotal() {
    const totalDiv = document.getElementById('total-hide');
    totalDiv.style.display = 'none';
  }


}
