// Pairs to /index.html

import { updateCartCountIcon, loadHeaderFooter} from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

let tents = new ProductData('tents'); // All the tents
let listing = new ProductListing(
  'tents',
  tents,
  document.querySelector('.product-list')
); // Listing for the tents
listing.init(); // Renders the listing to the page

loadHeaderFooter('partials');
//updateCartCountIcon(document.querySelector('.cart'));
