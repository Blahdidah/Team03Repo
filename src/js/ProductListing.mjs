// Class and helper functions to render a list of products on the root index.html

import ExternalServices from './ExternalServices.mjs'; // For intellisense purposes
import { renderListWithTemplate, initialUpper } from './utils.mjs';

/**
 * Helper function to generate a product card based on values provided by the product parameter object.
 * @param {object}
 * @returns {string}
 */
function productCardTemplate(product) {
  const discount = (1 - product.ListPrice / product.SuggestedRetailPrice) * 100;
  return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">MSRP: $${product.SuggestedRetailPrice.toFixed(
              2
            )}</p>
            <p class="product-card__price" id="discount-percent">${discount.toFixed(
              0
            )}% off</p>
            <p class="product-card__price">Our Price: $${product.ListPrice.toFixed(
              2
            )}</p>
        </a>
        <input type="button" value="QUICK VIEW" class="quickview-button" onclick="productQuickView('${product.Id}')">
    </li>`;
}

/**
 * A class to render an html listing of products from a data source.
 */
export default class ProductListing {
  /**
   * Set the category, dataSource and listElement properties.
   * @param {String} category
   * @param {ExternalServices} dataSource
   * @param {HTMLElement} listElement
   * @param {Array} keyWords
   */
  constructor(category, dataSource, listElement, keyWords) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.keyWords = keyWords;
  }

  /**
   * Initialize
   */
  async init() {
    /** @param {Array} list*/
    let list = await this.dataSource.getData(this.category);
    list = list.filter((product) => this.searchFilter(product, this.keyWords));

    this.renderList(list);

    document
      .querySelector('.products')
      .querySelector('h2').innerText = `Top Products: ${initialUpper(
      this.category
    )}`;
    document.title += `: ${initialUpper(this.category)}`;
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
   *
   * @param {Object} product
   * @param {Array} keyWords
   */
  searchFilter(product, keyWords) {
    // Look at important fields and look for keyword matches. Return true if one is found.
    if (keyWords.length) {
      for (let keyWord of keyWords) {
        let expression = new RegExp(keyWord.toLowerCase());
        if (expression.test(product.Name.toLowerCase())) {
          // Match against name
          return true;
        }
        if (expression.test(product.DescriptionHtmlSimple.toLowerCase())) {
          // Match against description
          return true;
        }
        if (expression.test(product.Category.toLowerCase())) {
          // Match against category
          return true;
        }

        // if(product.Name.toLowerCase().split(' ').includes(keyWord.toLowerCase())) {
        //   return true;
        // }
      }
      return false;
    } else {
      true;
    }
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
