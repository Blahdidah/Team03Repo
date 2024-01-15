import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

let tents = new ProductData('tents')
let listing = new ProductListing('tents', tents, document.querySelector('.product-list'));
listing.init();






