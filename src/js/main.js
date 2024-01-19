import { updateCartCountIcon } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const listing = new ProductListing('Tents', dataSource, element)

listing.init();

updateCartCountIcon(document.querySelector('.cart'));