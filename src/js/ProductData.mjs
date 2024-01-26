// A Class and helper functions to handle collections of products

const baseURL = import.meta.env.VITE_SERVER_URL;

/**
 * Take a Response and converts it to a promise for an Object representing the JSON data
 * @param {Response} res
 * @returns {Promise<Object>}
 */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

/**
 * A class to hold a list of object representing products
 */
export default class ProductData {
  /**
   * Sets the category and path where the json data is located.
   * @param {String} category Specifies the category of products who json file should be loaded.
   */

  constructor() {
    
    
    //this.category = category;
    //this.path = `../json/${this.category}.json`;

  }

  /**
   * Get an array of objects representing products
   * @param {String} category
   * @returns {Promise<Array<Object>>}An object containing all the data in the categories JSON file
   */
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
    
    
    
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }

  /**
   * Finds and returns a promise to one Object representing the product in the id string.
   * @param {String} id The product identifier to return
   * @returns {Promise<Object>} a promise for an object containing the product data.
   */
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const product = await convertToJson(response);
    
    //const products = await this.getData();
    //this.product = product.Result.find((item) => item.Id === id);
    return product.Result;
  }
}
