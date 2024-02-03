import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

/**
 * Convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
 * @param {Array<Object>} items
 * @returns {Array<Object}
 */
function packageItems(items) {
  const simplifiedItems = items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
  return simplifiedItems;
}

/**
 * Extracts form data from an HTMLFormElement
 * @param {HTMLFormElement} formElement The form element to get the data from
 * @returns {Object}
 */
function formDataToJSON(formElement) {
  const formInfo = new FormData(formElement);
  const convertedJSON = {}; //does this need to be a const?

  formInfo.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  
  return convertedJSON;
}

export default class CheckoutProcess {
  /**
   * Initialize object variables
   * @param {String} key Key to the shopping cart in local storage
   * @param {String} outputSelector String to select the output parent element
   */
  constructor(key, outputSelector) {
    this.key = key; // Shopping cart local storage key.
    this.outputSelector = outputSelector; // Query string to find the output element
    this.list = []; // The shopping cart items go here.
    this.tax = 0;
    this.ship = 0;
    this.itemTotal = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  /**
   * calculate and display the total amount of the items in the cart, and the number of items.
   */
  calculateItemSummary() {
    /** @type {Array<Object>} */
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + parseFloat(item.FinalPrice),
      0
    );
    const outputElement = document.querySelector('#items');
    this.list.forEach((item) => {
      // Add each item to the output element
      const newItemElement = document.createElement('div');
      newItemElement.innerText = item.Name;
      newItemElement.insertAdjacentHTML(
        'afterbegin',
        `<input type="hidden" name="id" value="${item.Id}"> `
      );
      newItemElement.insertAdjacentHTML(
        'afterbegin',
        `<input type="hidden" name="name" value="${item.Name}"> `
      );
      newItemElement.insertAdjacentHTML(
        'afterbegin',
        `<input type="hidden" name="price" value="${item.FinalPrice}"> `
      );
      newItemElement.insertAdjacentHTML(
        'afterbegin',
        `<input type="hidden" name="quantity" value="1"> `
      );
      outputElement.append(newItemElement);
    });
    outputElement.insertAdjacentHTML(
      'beforeend',
      `Total Items: ${this.list.length}`
    );
    document.querySelector('#subtotal').value = `$${this.itemTotal.toFixed(2)}`;
    //TODO: Clean this up when we know this works
    // const summaryElement = document.querySelector(this.outputSelect + '#orderTotal');
    // const itemNum = document.querySelector(this.outputSelector + '#cartTotal');
    // itemNum.innerText = this.list.length;

    // const amounts = this.list.map((item) => item.FinalPrice);
    // this.itemTotal = amounts.reduce((sum, item) => sum + item);
    // summaryElement.innerText = '$' + this.itemTotal;
  }

  /**
   * // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
   */
  calculateOrderTotal() {
    this.ship = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) + // Calculated in calculateItemSummary
      parseFloat(this.tax) +
      parseFloat(this.ship)
    ).toFixed(2);
    this.displayOrderTotals();
  }

  /**
   * Once the totals are all calculated display them in the order summary page
   */
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + ' #shipping');
    const tax = document.querySelector(this.outputSelector + ' #tax');
    const orderTotal = document.querySelector(
      this.outputSelector + ' #orderTotal'
    );
    shipping.value = `$${this.ship}`;
    tax.value = `$${this.tax}`;
    orderTotal.value = `$${this.orderTotal}`;
  }

  /**
   * Package the form to json and use ExternalServices to send it
   * @param {Event} event
   */
  async checkout() {
    const formElement = document.forms['checkout'];
    const json = formDataToJSON(formElement);
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    try {
      const res = await services.checkout(json);
      alert(res.message);
    } catch (err) {
      console.log(err);
    }
  }
}
