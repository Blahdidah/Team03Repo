// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
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
