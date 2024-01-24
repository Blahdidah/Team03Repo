import { getParam, loadHeaderFooter} from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductListing from './ProductListing.mjs';

loadHeaderFooter();
const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductListing(category, dataSource, element);

listing.init();