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
  let cart = getLocalStorage('so-cart');
  let countIcon = cartDiv.querySelector('.count-icon');

  if (cart.length) {
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

/**
 * 
 * @param {Response} res 
 * @returns {Object}
 */
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

/**
 * Show an alert at the top of the page body
 * @param {string} message 
 * @param {boolean} scroll 
 * @param {string} background The background color of the alert
 * @param {string} foreground The foreground color of the alert
 * @param {number} ttl time to live before alert is removed
 * @returns {HTMLElement}
 */
export function alertMessage(message, scroll = true, background = 'default', foreground = 'default', ttl = 0) {
  const alertBox = document.createElement('div');
  const messageSpan = document.createElement('span');
  const closeButton = document.createElement('input');

  messageSpan.innerText = message;
  closeButton.value = 'X';
  closeButton.type = 'button';
  closeButton.addEventListener('click', () => {
    alertBox.remove();
  });

  alertBox.append(messageSpan);
  alertBox.append(closeButton);

  alertBox.classList.add('alert-box'); // Set the background if specified
  if (background != 'default') {
    alertBox.style.backgroundColor = background;
  }
  if (foreground != 'default') {
    // Set the foreground if specified
    alertBox.style.color = foreground;
    closeButton.style.color = foreground;
  }

  document.querySelector('main').insertAdjacentElement('afterbegin', alertBox); // Display the message box

  if (ttl > 0) {
    // Set it up to disappear after a time specified
    setTimeout(() => {
      alertBox.animate(
        // TODO: Figure out how to make this smoother
        [
          {
            padding: '.5em',
          },
          {
            height: '0px',
            padding: '0em',
          },
        ],
        {
          duration: 250,
        }
      ).onfinish = () => alertBox.remove();
    }, ttl * 1000);
  }

  if (scroll) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return alertBox; // Might want to check it for something
}