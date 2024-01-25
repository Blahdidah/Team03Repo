import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';
import Alert from './Alert.mjs';

loadHeaderFooter('partials');
const category = getParam('category');
const dataSource = new ProductData();
const element = document.querySelector('.product-list');
const listing = new ProductListing(category, dataSource, element);
let alerts = new Alert('alerts');

listing.init();
alerts.init();
