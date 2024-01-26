// Class and helper functions to render a list of products on the root index.html

import ProductData from './ProductData.mjs'; // For intellisense purposes
import { renderListWithTemplate, initialUpper } from './utils.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */
function productCardTemplate(product) {
  const discount = (1 - (product.ListPrice / product.SuggestedRetailPrice)) * 100;
  return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">MSRP: $${product.SuggestedRetailPrice.toFixed(2)}</p>
            <p class="product-card__price" id="discount-percent">${discount.toFixed(0)}% off</p>
            <p class="product-card__price">Our Price: $${product.ListPrice.toFixed(2)}</p>
        </a>
    </li>`;
}

/**
 * A class to render an html listing of products from a data source.
 */
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
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    document.querySelector('.products').querySelector('h2').innerText = `Top Products: ${initialUpper(this.category)}`;
    document.title += `: ${initialUpper(this.category)}`;

    // this.dataSource
    //   .getData()
    //   .then((productArray) => productArray.filter(this.productFilter))
    //   .then((productArray) => this.renderList(productArray));
  }

  /**
   * Filter predicate to remove everything on the list
   * @param {Object} product An object containing product data
   * @returns {Boolean}
   */
  productFilter(product) {
    // This is a separate function to satisfy the assignment.
    //return !['989CG','880RT'].includes(product.Id); // This is hard coded, but I assume it will be dealt with in a future assignment.
    return true; // We don't need to filter these now.
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
