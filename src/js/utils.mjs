import ExternalServices from './ExternalServices.mjs';

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
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  const htmlProductList = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlProductList.join(''));
}

export function renderWithTemplate(
  template,
  parentElement,
  data = null,
  position = 'afterbegin',
  clear = false,
  callback = null
) {
  //const htmlProductList = list.map(templateFn);

  if (clear) {
    //parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, template.innerHTML);

  if (callback) {
    callback();
  }
}

export async function loadHeaderFooter(path) {
  // Load teh header and footer
  const headerTemplate = await loadTemplate(`/${path}/header.html`);
  const footerTemplate = await loadTemplate(`/${path}/footer.html`);

  // Get header footer element
  const headerElement = document.getElementById('page-header');
  const footerElement = document.getElementById('page-footer');

  // Render the header and footer
  renderWithTemplate(headerTemplate, headerElement, {}, undefined, true, () =>
    updateCartCountIcon(document.querySelector('.cart'))
  );
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadTemplate(path) {
  const templateText = await fetch(`${path}`).then((response) =>
    response.text()
  );

  const template = document.createElement('template');
  template.innerHTML = templateText;

  return template;
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

/**
 *
 * @param {HTMLElement} cartDiv
 */
export function updateCartCountIcon(cartDiv) {
  /** @type {Array<object>} */
  let cart = getLocalStorage('so-cart') || [];
  let countIcon = cartDiv.querySelector('.count-icon');

  if (cart !== null && cart !== undefined) {
    //Truthy
    if (countIcon) {
      countIcon.innerText = `${cart.length}`;
    } else {
      countIcon = document.createElement('div'); // Make a new one
      countIcon.classList.add('count-icon'); // So we can find it later and style it
      countIcon.innerText = `${cart.length}`;
      cartDiv.append(countIcon);
    }
  } else {
    if (countIcon) {
      // Remove the icon div if it's there
      countIcon.remove();
    }
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
    .animate(
      // First stage of animation, origin to target
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
    .finished.then(() => {
      // Part one of second stage of animation: cart bounce.
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
      originElement.animate([{ opacity: `0` }, { opacity: `1` }], {
        // Part two of second stage of animation: ghost in
        duration: duration * 2,
        easing: 'linear',
        fill: 'none',
      });
    });
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}
/**
 * Makes the first character upper case
 * @param {String} string
 * @returns
 */
export function initialUpper(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Alert Function for checkout form validation
export function alertMessage(message, scroll = true, duration = 6000) {
  const alert = document.createElement('div');
  alert.classList.add('checkout-alert');

  const errorMessageMatch = message.match(/error:\s*(.*)/i);
  const errorMessage = errorMessageMatch ? errorMessageMatch[1] : message;

  // make banner to display validation error
  alert.innerHTML = `<p><span> X </span>${message}</p>`;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName == 'SPAN') {
      removeAlert(alert);
    }
  });
  const main = document.querySelector('main');
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);

  // error message will disappear after 6 sec
  setTimeout(function () {
    removeAlert(alert);
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.checkout-alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}

function removeAlert(alert) {
  const main = document.querySelector('main');
  if (main.contains(alert)) {
    main.removeChild(alert);
  }
}

export function addBanner(message) {
  const banner = document.createElement('div');
  banner.classList.add('banner-message');
  // banner.innerHTML = `<p>${message}</p>`;

  // banner.addEventListener('cick', function (e) {
  //   if (e.target.tagName == 'SPAN') {
  //     main.removeChild(this);
  //   }
  // });
  const main = document.querySelector('main');
  main.prepend(banner);

  let count = Number(window.localStorage.getItem('count-jf')) || 0;
  
    if(count == 0) {
      banner.innerHTML = `<p>${message}</p>`;

    }else{

    }
  
  count++;

  localStorage.setItem('count-jf', count);  
}

export async function productQuickView(id) {
  //Get the data from api
  const externalServices = new ExternalServices();
  const productData = await externalServices.findProductById(id);

  //Create the modal window div
  const outterContainer = document.createElement('div');
  const innerContainer = document.createElement('div');

  //Populate div content
  outterContainer.classList.add('quick-view-outter');
  innerContainer.classList.add('quick-view-inner');
  innerContainer.innerHTML = `
    <span class="quickview-title"><h3>${productData.Name}</h3><input id="quickview-close" type="button" value="X"></span>
    <div class="quickview-content">
      <picture>
        <source srcset="${productData.Images.PrimaryExtraLarge} 600w" media="(min-width: 1200px)"/>
        <source srcset="${productData.Images.PrimaryLarge} 320w" media="(min-width: 640px)"/>
        <source srcset="${productData.Images.PrimaryMedium} 160w" media="(min-width: 320px)"/>
        <img src="${productData.Images.PrimarySmall}" alt="${productData.Name}, small">
      </picture>
      <p>${productData.DescriptionHtmlSimple}</p>
      <span>${productData.SuggestedRetailPrice 
        ? `<span style="text-decoration: line-through; color: red">$${productData.SuggestedRetailPrice}</span>`
        : ''
        }
        $${productData.FinalPrice} </span>
    </div>
      `;
  innerContainer.querySelector('#quickview-close').addEventListener('click', (event) => {
    innerContainer.animate(
      [
        { transform: `scale(1)` },
        { transform: `scale(0)` },
      ],
      {
        duration: 300,
        easing: 'ease-in',
        fill: 'none',
      }
    ).onfinish = () => { outterContainer.remove()} ;
  })

  // innerContainer.innerHTML = '<h2>TEST TEST</h3>';

  //Add it to the page
  outterContainer.insertAdjacentElement('afterbegin',innerContainer);
  document.querySelector('body').insertAdjacentElement('afterbegin', outterContainer);
}