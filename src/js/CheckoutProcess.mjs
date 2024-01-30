import { getLocalStorage } from "./utils.mjs";

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
        const formElement = document.forms["checkout"];

        const json = formDataJson(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.ship = this.ship;
        json.items = packageItems(this.list)
        console.log(json);
    }
}