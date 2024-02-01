import { alertMessage, loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter('partials');
const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));
// listening for click on the button

//Doing it both ways.
document.querySelector('#checkoutSubmit').addEventListener('click', (event) => {
  event.preventDefault();
  /** @type {HTMLFormElement} */
  const checkoutForm = document.forms['checkout'];
  checkoutForm.reportValidity();

  if (checkoutForm.checkValidity()) {
    myCheckout.checkout();
  }
  else {
    alertMessage('Correct invalid values before resubmitting.');
  }
});


// document.querySelector('#checkout').addEventListener('submit', (e) => {
//   e.preventDefault();
//   myCheckout.checkout();
// });
