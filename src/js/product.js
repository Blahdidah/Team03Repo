// Pairs to product_pages/index.html
import { getParam, updateCartCountIcon, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter('partials');

const dataSource = new ProductData();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

//updateCartCountIcon(document.querySelector('.cart'));
