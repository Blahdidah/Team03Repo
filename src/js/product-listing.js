// Pairs to /index.html

import {loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

loadHeaderFooter('partials');


const category = getParam('category') || 'all';  // Display a category if this is present
const query = getParam('query') || '';  // Do a search is this is present
const keyWords = query.split(' ');

const productData = new ProductData(); // All the tents

const listing = new ProductListing(
  category,
  productData,
  document.querySelector('.product-list'),
  keyWords
); // Listing for the tents

listing.init(); // Renders the listing to the page


//updateCartCountIcon(document.querySelector('.cart'));

