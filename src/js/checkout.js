import { loadHeaderFooter, removeAllAlerts, alertMessage} from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter('partials');
const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));


// listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  const myForm = document.forms['checkout'];
  const errorMessages = [];

  // Check validity manually without triggering the default browser validation
  myForm.querySelectorAll('input:invalid').forEach((input) => {
    if (!input.validity.valid) {
      let errorMessage = '';

      // Check for specific validation constraints-Custom messages
      if (input.validity.valueMissing) {
        errorMessage = `Please enter a value for "${input.name}"`;
      } else if (input.validity.patternMismatch) {
        errorMessage = `Invalid format for "${input.name}"`;
      }
      errorMessages.push(errorMessage);
    }
  });

  // Display error messages
  if (errorMessages.length > 0) {
    removeAllAlerts(); // Remove existing alerts
    errorMessages.forEach((errorMessage) => {
      alertMessage(errorMessage, false); // Display each error message
    });
  } else {
    // If no errors, proceed with checkout
    myCheckout.checkout();
  }
  
});