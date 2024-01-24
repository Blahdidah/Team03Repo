// Pairs to /index.html

import {loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';


const category = getParam('category');

let tents = new ProductData(category); // All the tents
let listing = new ProductListing(
  category,
  tents,
  document.querySelector('.product-list')
); // Listing for the tents

listing.init(); // Renders the listing to the page

loadHeaderFooter('partials');
//updateCartCountIcon(document.querySelector('.cart'));

