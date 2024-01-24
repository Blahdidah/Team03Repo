// Pairs to /index.html

import {loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

loadHeaderFooter('partials');


const category = getParam('category');

const productData = new ProductData(); // All the tents
const listing = new ProductListing(
  category,
  productData,
  document.querySelector('.product-list')
); // Listing for the tents

listing.init(); // Renders the listing to the page


//updateCartCountIcon(document.querySelector('.cart'));

