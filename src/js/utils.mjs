/**
 * wrapper for querySelector...returns matching element
 * @param {String} selector 
 * @param {HTMLElement} parent 
 * @returns 
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

/**
 * retrieve data from localstorage
 * @param {String} key 
 * @returns {String}
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * save data to local storage
 * @param {String} key 
 * @param {Object} data 
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * set a listener for both touchend and click
 * @param {String} selector 
 * @param {Function} callback 
 */
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
/**
 * Render a list of something to an HTMLElement based on a template function.
 * @param {function} templateFn 
 * @param {HTMLElement} parentElement 
 * @param {Array} list 
 * @param {string} position 
 * @param {boolean} clear 
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
    const htmlProductList = list.map(templateFn)
    if(clear) {
      parentElement.innerHTML = ''; //Better way?
    }
    parentElement.insertAdjacentHTML(position, htmlProductList.join(''));
}
/**
 * Search for and return the value a parameter in the url query.
 * @param {String} param 
 * @returns {String}
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}