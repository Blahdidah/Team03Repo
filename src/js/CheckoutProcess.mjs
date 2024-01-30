import { getLocalStorage } from "./utils.mjs";
import ExternalServices  from "./ExternalServices.mjs";


const services = new ExternalServices();

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

 function formDataToJSON(formElement) {
    const formInfo = new FormData(formElement);
    const convertedJSON = {};

    formInfo.forEach(function (value, key) {
        convertedJSON[key] = value;
    });
    return convertedJSON;
 }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.subtotal = 0;
        this.tax = 0;
        this.ship = 0;
        this.itemTotal = 0;
        this.orderTotal = 0;

        

        }
        async checkout(form) {
            let formInfo = newFormData(form.target);


    }
    init() {
        this.list = getLocalStorage(this.key);
        this.itemSummary();
    }

    itemSummary() {
        const summaryElement = document.querySelector(this.outputSelect + "#");
        const itemNum = document.querySelector(this.outputSelector + "#num-item");
        itemNum.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal;
    }
    calculateOrderTotal() {
        this.ship = 10 + (this.list.length -1) *2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.ship).toFixed(2));

        this.displayOrderTotal();
    }

    displayOrderTotal() {
        const shipping = 
    }
}