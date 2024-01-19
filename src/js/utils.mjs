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
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

/**
 * 
 * @param {HTMLElement} cartDiv 
 */
export function updateCartCountIcon(cartDiv) {
  /** @type {Array<object>} */
  let cart = getLocalStorage('so-cart');
  if(cart.length) {  //Truthy
    const countIcon = document.createElement('div');

    countIcon.classList.add('count-icon');
    
    countIcon.innerText = `${cart.length}`;
    cartDiv.append(countIcon);
  }
}


/**
 * Animates an origin element being put into a target element.
 * @param {HTMLElement} originElement 
 * @param {HTMLElement} targetElement 
 * @param {Number} duration 
 */
export function itemToCartAnimate(originElement, targetElement, duration) {
  // Get the boxes
  let originRect = originElement.getBoundingClientRect();
  let targetRect = targetElement.getBoundingClientRect();

  // Relative translation transformation from center of elements
  let transformX =
    (targetRect.right + targetRect.left) / 2 -
    (originRect.right + originRect.left) / 2;
  let transformY =
    (targetRect.bottom + targetRect.top) / 2 -
    (originRect.bottom + originRect.top) / 2;

  originElement
    .animate( // First stage of animation, origin to target
      [
        { transform: `translate(0px, 0px) scale(1) rotate(0deg)` },
        {
          transform: `translate(${transformX}px, ${transformY}px) scale(0) rotate(45deg)`,
        },
      ],
      {
        duration: duration,
        easing: 'ease-out',
        fill: 'none',
      }
    )
    .finished.then(() => { // Part one of second stage of animation: cart bounce.
      targetElement.animate(
        [
          { transform: `scaleX(1) scaleY(1)` },
          { transform: `scaleX(1.2) scaleY(0.8)` },
          { transform: `scaleX(1) scaleY(1)` },
        ],
        {
          duration: duration / 2,
          easing: 'linear',
          fill: 'none',
        }
      );
      originElement.animate([{ opacity: `0` }, { opacity: `1` }], { // Part two of second stage of animation: ghost in
        duration: duration * 2,
        easing: 'linear',
        fill: 'none',
      });
    });
}
//i don't completely understand what i'm supposed to be doing here...
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear= false) {
  const toString = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  }
    parentElement.insertAdjacentHTML(position, toString.join(''));
}
