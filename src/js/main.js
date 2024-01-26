// Pairs to /index.html

import {loadHeaderFooter} from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';
import Alert from './Alert.mjs';

let tents = new ProductData('tents'); // All the tents
// let listing = new ProductListing(
//   'tents',
//   tents,
//   document.querySelector('.product-list')
// ); // Listing for the tents
let alerts = new Alert('alerts');


//listing.init(); // Renders the listing to the page
alerts.init();  // Renders the alerts to the page

loadHeaderFooter('partials');
//updateCartCountIcon(document.querySelector('.cart'));

