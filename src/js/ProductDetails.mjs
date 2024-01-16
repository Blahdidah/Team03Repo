import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

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

    addToCart(product) {
        //construct an existing cart, check if it is an array
        let existingCart = getLocalStorage('so-cart') || [];
        if (!Array.isArray(existingCart)) {
            existingCart = [];
        }
        existingCart.push(this.product);

        setLocalStorage('so-cart', existingCart);
    }

    renderProductDetails() {
        const details = document.querySelector('.product-detail');
        const template = `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.Name}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />

        <p class="product-card__price">${this.product.ListPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">${this.product.DescriptionHtmlSimple}
          
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
        details.innerHTML = template;
        
    }
}