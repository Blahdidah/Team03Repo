import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';
import Alert from './Alert.mjs';

loadHeaderFooter('partials');

const category = getParam('category');
const dataSource = new ProductData(category); // All products
const listElement = document.querySelector('.product-list')
let myListing = new ProductListing(category, dataSource, listElement);
let alerts = new Alert('alerts');

myListing.init(); // Renders the listing to the page
alerts.init();  // Renders the alerts to the page