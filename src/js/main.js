// Pairs to /index.html

import {loadHeaderFooter} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ExternalServices.mjs';
import Alert from './Alert.mjs';

let tents = new ExternalServices('tents'); // All the tents
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

