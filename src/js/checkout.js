import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter('partials');

const checkout = new CheckoutProcess();
checkout.displaySubtotal();
checkout.displaySTO();