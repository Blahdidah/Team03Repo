// A Class and helper functions to handle collections of products
const baseURL = import.meta.env.VITE_SERVER_URL;

/**
 * Take a Response and converts it to a promise for an Object representing the JSON data
 * @param {Response} res
 * @returns {Promise<Object>}
 */
async function convertToJson(res) {
  //parsing the response as JSON
  try{
    const responseObject = await res.json();
    if (res.ok) {
    return responseObject;
  } else {
    let responseText = '';
    for(let key in responseObject) {
      responseText += ` ${key}: ${responseObject[key]}`;
    }
    const error = new Error('Bad Response');
    error.name = 'servicesError'
    error.message = responseText;
    throw error;
  }
}catch (error){
  throw new Error(`Error parsing response as JSON: ${error.message}`)
}
}

/**
 * A class to hold a list of object representing products
 */
export default class ExternalServices {
  /**
   * Sets the category and path where the json data is located.
   */
  constructor() {
    // Empty
  }

  /**
   * Get an array of objects representing products
   * @param {String} category
   * @returns {Promise<Array<Object>>}An object containing all the data in the categories JSON file
   */
  async getData(category) {
    let data = [];

    if (category.toLowerCase() == 'all') {
      // Return the whole thing. If I can figure our how to get the api to accept search queries, I can improve this.
      for (let _category of [
        'tents',
        'backpacks',
        'hammocks',
        'sleeping-bags',
      ]) {
        let response = await fetch(baseURL + `products/search/${_category}`);
        let responseData = await convertToJson(response);
        data = data.concat(responseData.Result); // Append the new data
      }
      //console.log(data.Result);
    } else {
      // Just load one category
      let response = await fetch(baseURL + `products/search/${category}`);
      let responseData = await convertToJson(response);
      data = responseData.Result;
    }
    return data;
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
  async checkout(payload) {
    console.log(payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }
}
