// Pairs to product_pages/index.html
import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter('partials');

const dataSource = new ExternalServices();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();
