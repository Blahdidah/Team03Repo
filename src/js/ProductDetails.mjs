// A class to handle displaying a single product

import {
  getLocalStorage,
  itemToCartAnimate,
  setLocalStorage,
  updateCartCountIcon,
} from './utils.mjs';
import ProductData from './ProductData.mjs'; // For autocomplete purposes

/**
 * A class to hold and display details for a single product
 */
export default class ProductDetails {
  /**
   * Constructor
   * @param {String} productId
   * @param {ProductData} dataSource
   */
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  /**
   * Setup up and render the product to the page
   */
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.dataSource.findProductById(this.productId).then((data) => {
      this.product = data;
      this.renderProductDetails('main');
      document
        .getElementById('addToCart')
        .addEventListener('click', this.addToCart.bind(this));
    });
  }

  /**
   * Add this item to the cart
   * @param {Event} event
   */
  addToCart(event) {
    //construct an existing cart, check if it is an array
    let existingCart = getLocalStorage('so-cart') || [];
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }
    // Put the product onto the list
    existingCart.push(this.product);

    // Run an animation for adding to the cart
    const cart = document.querySelector('.cart');
    itemToCartAnimate(
      event.target.closest('.product-detail').querySelector('img'),
      cart,
      500
    );

    // Store the list to local storage
    setLocalStorage('so-cart', existingCart);

    updateCartCountIcon(cart);
  }

  /**
   * Render the template to the page
   */
  renderProductDetails() {
    const discount =
      (1 - this.product.ListPrice / this.product.SuggestedRetailPrice) * 100;
    const details = document.querySelector('.product-detail');
    const template = `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.Name}</h2>

        <img
            class="divider"
            src="${this.product.Images.PrimaryLarge}"
            alt="${this.product.Name}"
        />

        <p class="product-card__price" id="msrp">MSRP: $${this.product.SuggestedRetailPrice.toFixed(
          2
        )}</p>
        <p class="product-card__price" id="discount-percent">Discounted ${discount.toFixed(
          0
        )}%</p>
        <p class="product-card__price" id="our-price">Our Price: $${this.product.ListPrice.toFixed(
          2
        )}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">${this.product.DescriptionHtmlSimple}
        
        </p>

        <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
    details.innerHTML = template;
    document.querySelector(
      'title'
    ).innerHTML = `Sleep Outside | ${this.product.Name}`; // Set the title
  }
}
