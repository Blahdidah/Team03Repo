// Pairs to /index.html

import { loadHeaderFooter, updateCartCountIcon } from './utils.mjs';
import Alert from './Alert.mjs';
loadHeaderFooter('partials');
/*

let tents = new ProductData('tents'); // All the tents
let listing = new ProductListing(
  'tents',
  tents,
  document.querySelector('.product-list')
); // Listing for the tents */
let alerts = new Alert('alerts');


//listing.init(); // Renders the listing to the page
alerts.init();  // Renders the alerts to the page


//updateCartCountIcon(document.querySelector('.cart'));

