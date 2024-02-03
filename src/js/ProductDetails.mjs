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
    this.selectedColor = null;
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
    //check if a color is selected
    if (!this.product.selectedColor) {
      this.displayErrorMessage('Error: Please Select a color');
      return;
    }

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

    this.clearErrorMessage();

    // Store the list to local storage
    setLocalStorage('so-cart', existingCart);

    //the cart count icon update
    updateCartCountIcon(cart);
  }

  displayErrorMessage(message) {
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList.add('error-message');
    errorMessageDiv.textContent = message;

    const productDetailContainer = document.querySelector('.product-detail');
    const firstChild = productDetailContainer.firstChild;
    productDetailContainer.insertBefore(errorMessageDiv, firstChild);
  }

  clearErrorMessage() {
    // Remove any existing error messages
    const existingErrorMessage = document.querySelector('.error-message');
    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }
  }

  selectColor(colorName) {
    this.selectedColor = { color: colorName };
    // Update the appearance of the selected swatch
    const colorSwatches = document.querySelectorAll('.color-swatch-box');
    colorSwatches.forEach((swatch) => {
      swatch.classList.remove('selected');
    });

    const selectedSwatch = document.querySelector(
      `.color-swatch-box[data-color="${colorName}"]`
    );
    if (selectedSwatch) {
      selectedSwatch.classList.add('selected');
    }
    return { color: colorName };
  }

  colorSwatches(product) {
    if (product.Colors && product.Colors.length > 0) {
      if (product.Colors.length === 1) {
        const colorArray = product.Colors[0];
        const selectedColor = colorArray.ColorName;
        if (product.Id.includes('.')) {
          product.Id = product.Id.substring(0, product.Id.lastIndexOf('.'));
        }

        product.Id = product.Id + '.' + selectedColor;
        product.selectedColor = selectedColor;
        console.log(product);
        return selectedColor;
      } else {
        const colorSwatchContainer = document.createElement('div');
        colorSwatchContainer.classList.add('color-swatch-container');
        product.Colors.forEach((color) => {
          const swatch = document.createElement('div');
          swatch.classList.add('color-swatch-box');
          swatch.setAttribute('data-color', color.ColorName); // Add this line

          const swatchImage = document.createElement('img');
          swatchImage.src = color.ColorChipImageSrc;
          swatchImage.alt = color.ColorName;
          swatchImage.title = color.ColorName;

          const swatchName = document.createElement('p');
          swatchName.innerText = color.ColorName;

          swatch.appendChild(swatchImage);
          swatch.appendChild(swatchName);
          colorSwatchContainer.appendChild(swatch);
        });
        colorSwatchContainer.addEventListener('click', (event) => {
          const clickedSwatch = event.target.closest('.color-swatch-box');
          if (clickedSwatch) {
            const colorName = clickedSwatch.getAttribute('data-color');
            if (product.Id.includes('.')) {
              product.Id = product.Id.substring(0, product.Id.lastIndexOf('.'));
            }
            product.Id = product.Id + '.' + colorName;
            product.selectedColor = colorName;
            this.selectColor(colorName);
          }
        });
        return colorSwatchContainer;
      }
    } else {
      // Return null or an empty object, indicating no color information
      return null;
    }
  }

  /**
   * Render the template to the page
   */
  renderProductDetails() {
    const colorSwatches = this.colorSwatches(this.product); //this is the selected color!
    const discount =
      (1 - this.product.ListPrice / this.product.SuggestedRetailPrice) * 100;
    const details = document.querySelector('.product-detail');

    const hasExtraImages = this.product.Images.ExtraImages && this.product.Images.ExtraImages.length > 0;

    let imageTemplate;

    if (hasExtraImages) {
      //Use a carousel if there are ExtraImages
      imageTemplate = `
      <div class="slideshow-container">
        <div class="mySlides active">
          <img id="image-0" src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" style="width: 100%"></img>
        </div>
        ${this.generateSlideShowItems()}
        <a id="prev">&#10094;</a>
        <a id="next">&#10095;</a>
        <div class="column">
          <img class="prodImage cursor active" src="${this.product.Images.PrimarySmall}" alt="${this.product.Name}" style="width: 100%;">
        </div>
        <div class="row">${this.generateThumbNails()}</div>
      </div>`;
    } 
    else {
      //Use a single image if there are no ExtraImages
      imageTemplate = `
        <picture>


          <source media="(min-width:650px)" srcset="${this.product.Images.PrimaryExtraLarge}">  
          <source media="(min-width:465px)" srcset="${this.product.Images.PrimaryLarge}">
          <source media="(min-width:365px)" srcset="${this.product.Images.PrimaryMedium}">  
          <img class="divider" src="${this.product.Images.PrimarySmall}" alt="${this.product.Name}">
        </picture>`;
    }

    //Product Template
    const template = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.Name}</h2>
      ${imageTemplate}        
      <p class="product-card__price" id="msrp">${this.product.isClearance ? '!' : '🚩'}MSRP: $${this.product.SuggestedRetailPrice.toFixed(2)}</p>
      <p class="product-card__price" id="discount-percent">Discounted ${discount.toFixed(0)}%</p>
      <p class="product-card__price" id="our-price">Our Price: $${this.product.ListPrice.toFixed(2)}</p>
      <div class='colorSwatch'>
      </div>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>`;

    details.innerHTML = template;
    document.querySelector('title').innerHTML = `Sleep Outside | ${this.product.Name}`; // Set the title

    //initialize the carousel if there are extra images
    if (hasExtraImages) {
      this.runSlideShow();
    }
  }

  //dynamically load slide pictures
  generateSlideShowItems() {  
    return this.product.Images.ExtraImages.map((image, index) => `
      <div class="mySlides">
        <img id="image-${[index+1]}" src="${image.Src}" alt="${image.Title}" style="width: 100%"></img>
      </div>
      `).join('');  
  } 
  //dyanmically load thumbnail pictures
  generateThumbNails() {
    return this.product.Images.ExtraImages.map((image, index) => `  
    <div class="column">
        <img class="prodImage cursor" src="${image.Src}" alt="${image.Title}" style="width: 100%;">
    </div>
    `).join('');
  }

  //process previous and next clicks through the images
  runSlideShow() {
    let slideIndex = 1;

    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("prodImage");

      //Ensure slideIndex is within the valid range
      if (slideIndex > slides.length) { slideIndex = 1; }
      if (slideIndex < 1) { slideIndex = slides.length; }

      //Hide slides
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      //Remove 'active' class from all dots
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      //Display current slide and mark as active
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }

    document.getElementById('next').addEventListener('click', function() {
      slideIndex += 1;
      showSlides();
    });
    
    document.getElementById('prev').addEventListener('click', function() {
      slideIndex -= 1;
      showSlides();
    });

    let thumbnailImages = document.getElementsByClassName('prodImage');

    for(let i = 0; i < thumbnailImages.length; i++) {
      thumbnailImages[i].addEventListener('click', function() {
        slideIndex = i+1;
        showSlides();
      });
    }

    showSlides();
  }   
}
