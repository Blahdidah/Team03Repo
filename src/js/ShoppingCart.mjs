// Class and helper functions to render a list of products on the root index.html

import ExternalServices from './ExternalServices.mjs'; // For intellisense purposes
import {
  renderListWithTemplate,
  getLocalStorage,
  updateCartCountIcon,
} from './utils.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */
function cartItemTemplate(product, quantity) {
  console.log(product);

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${product.Images.PrimarySmall}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.selectedColor}</p>
  <p class="cart-card__quantity">qty: ${quantity} <span class="remove-item" data-id="${product.Id}"> 🗑 </span></p>
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
   * @param {ExternalServices} dataSource
   * @param {HTMLElement} listElement
   */
  //   constructor(category, dataSource, listElement) {
  //     this.category = category;
  //     this.dataSource = dataSource;
  //     this.listElement = listElement;
  //   }

  constructor() {}

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
      const quantityMap = new Map();
      cartItems.forEach((item) => {
        const itemId = item.Id;
        //        console.log(itemId);
        if (quantityMap.has(itemId)) {
          quantityMap.set(itemId, quantityMap.get(itemId) + 1);
        } else {
          quantityMap.set(itemId, 1);
        }
      });
      const uniqueProductIds = Array.from(quantityMap.keys());
      document.querySelector('.product-list').innerHTML = '';
      uniqueProductIds.forEach((itemId) => {
        const origItemId = itemId.substring(0, itemId.lastIndexOf('.'));
        console.log(origItemId);
        const item = cartItems.find((cartItem) => cartItem.Id === itemId);
        const htmlItem = cartItemTemplate(item, quantityMap.get(itemId));
        document
          .querySelector('.product-list')
          .insertAdjacentHTML('beforeend', htmlItem);
      });
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

    return true; // Filter disabled

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
    cartItems = cartItems.filter((item) => item.Id !== itemId);
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
