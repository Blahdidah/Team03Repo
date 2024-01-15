import ProductData from './ProductData.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */

function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="/product_pages/?Id=${product.Id}">
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
      .then((dataArray) => this.renderList(dataArray));
  }
  /**
   * Renders all the card li to the page at the specified element.
   * @param {Array<Object>} productList 
   */
  renderList(productList) {
    const htmlProductList = productList.map(productCardTemplate)
    this.listElement.insertAdjacentHTML('afterbegin', htmlProductList.join(''));
    }
  }