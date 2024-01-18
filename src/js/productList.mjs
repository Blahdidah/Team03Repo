//The purpose of this script is to generate a list of product cards in HTML to form an array.
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate (product){
    return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
            </a></li>`
}

export default class ProductListing {
    //recieve prod catagory, datasource, and HTML element
    contstructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

