// Class and helper functions to render a list of products the the root index.html

import ProductData from './ProductData.mjs'; // For intellisense purposes
import { renderListWithTemplate } from './utils.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */

function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
        </a>
    </li>`;
}

export default class ProductListing {
  /**
   * Set the category, dataSource and listElement properties.
   * @param {String} category
   * @param {ProductData} dataSource
   * @param {HTMLElement} listElement
   */
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Initialize
   */
  init() {
    this.dataSource
      .getData()
      .then((productArray) => productArray.filter(this.productFilter))
      .then((productArray) => this.renderList(productArray));
  }

  /**
   * Filter predicate to remove everything not on the list
   * @param {Object} product An object containing product data
   * @returns {Boolean}
   */
  productFilter(product) { // This is a separate function to satisfy the assignment.
    return ['880RR', '985RF', '985PR', '344YJ'].includes(product.Id); // This is hard coded, but I assume it will be dealt with in a future assignment.
  }

  /**
   * Renders all the card li to the page at the specified element.
   * @param {Array<Object>} productList
   */
  renderList(productList) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      productList,
      'afterbegin',
      true
    );
  }
}
