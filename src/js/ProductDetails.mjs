// A class to handle displaying a single product

import {
  getLocalStorage,
  itemToCartAnimate,
  setLocalStorage,
  updateCartCountIcon,
} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs'; // For autocomplete purposes

/**
 * A class to hold and display details for a single product
 */
export default class ProductDetails {
  /**
   * Constructor
   * @param {String} productId
   * @param {ExternalServices} dataSource
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
  colorSwatches(product) {
    if (product.Colors && product.Colors.length > 1) {
      const colorSwatchContainer = document.createElement('div');
      colorSwatchContainer.classList.add('color-swatch-container');

  
      product.Colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch-box');
        swatch.setAttribute('data-color', color.ColorName); // Add this line
  
        const swatchImage = document.createElement('img');
        swatchImage.src = color.ColorChipImageSrc;
        swatchImage.alt = color.ColorName;
        swatchImage.title = color.ColorName;
        console.log(swatch);
        // Add click event listener to each swatch
        swatch.addEventListener('click', () => this.selectColor(color));

      const swatchName = document.createElement('p');
      swatchName.innerText = color.ColorName;

    swatch.appendChild(swatchImage);
    swatch.appendChild(swatchName);
    colorSwatchContainer.appendChild(swatch);
      });
  
      return colorSwatchContainer.outerHTML;
    } else {
      return '';
    }
  }
  /**
   * Render the template to the page
   */
  renderProductDetails() {
    const colorSwatches = this.colorSwatches(this.product);
    const discount = (1 - (this.product.ListPrice / this.product.SuggestedRetailPrice)) * 100;
    const details = document.querySelector('.product-detail');
    const template = `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.Name}</h2>
        <picture>
        <source media="(min-width:650px)" srcset="${this.product.Images.PrimaryExtraLarge}">  
        <source media="(min-width:465px)" srcset="${this.product.Images.PrimaryLarge}">
        <source media="(min-width:365px)" srcset="${this.product.Images.PrimaryMedium}">  
        <img
          class="divider"
          src="${this.product.Images.PrimarySmall}"
          alt="${this.product.Name}"
      />
      </picture>

        <p class="product-card__price" id="msrp">MSRP: $${this.product.SuggestedRetailPrice.toFixed(2)}</p>
        <p class="product-card__price" id="discount-percent">Discounted ${discount.toFixed(0)}%</p>
        <p class="product-card__price" id="our-price">Our Price: $${this.product.ListPrice.toFixed(2)}</p>
        <div class='colorSwatch'>
        ${colorSwatches}
        </div>

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
