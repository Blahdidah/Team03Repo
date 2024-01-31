import ShoppingCart from './ShoppingCart.mjs';
import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage } from './utils.mjs';

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
/**
 *
 * @param {Array<Object>} items
 * @returns
 */
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((item) => {
    let newItem = {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    };
    return newItem;
  });
}

export default class CheckoutProcess {
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.externalServices = new ExternalServices();
    this.cartItems = getLocalStorage('so-cart');
    this.subTotal = 0;
    /** @type {HTMLElement} */
    this.orderForm = document.forms.order_form;
    this.orderForm.addEventListener('submit', this.checkout.bind(this));
  }
  displaySubtotal() {
    //Calculate and display the subtotal
    this.subTotal = this.shoppingCart.calculateTotal(this.cartItems);
    document.getElementById('subtotal').innerText = `$${this.subTotal}`;
  }
  displaySTO() {
    // Calculate and display the shipping, tax and order total
  }

  /**
   *
   * @param {SubmitEvent} form
   */
  async checkout(form) {
    form.preventDefault();

    let formData = new FormData(form.target);

    let formDataObject = {};
    formData.forEach((value, key) => formDataObject[key] = value);
    

    // let formDataObject = {
    //   orderDate: new Date().toISOString(), // 2021-01-27T18:18:26.095Z
    //   fname: formData.get('fname'),
    //   lname: formData.get('lname'),
    //   street: formData.get('street'),
    //   city: formData.get('city'),
    //   state: formData.get('state'),
    //   zip: formData.get('zip'),
    //   cardNumber: formData.get('cardNumber'),
    //   expiration: formData.get('expiration'),
    //   code: formData.get('code'),
    //   items: packageItems(this.cartItems),
    //   orderTotal: this.subTotal,
    //   shipping: 1,
    //   tax: 1,
    // };

    formDataObject['orderDate'] = new Date().toISOString()
    formDataObject['orderTotal'] = '100';
    formDataObject['shipping'] = 12;
    formDataObject['tax'] = '1.1';
    formDataObject['items'] = packageItems(this.cartItems);
    

    
    console.log(formDataObject);
    this.externalServices.checkout(JSON.stringify(formDataObject));
    //this.externalServices.checkout(formData);

    // build the data object from the calculated fields, the items in the cart, and the information entered into the form

    // call the checkout method in our ExternalServices module and send it our data object.
  }
}
