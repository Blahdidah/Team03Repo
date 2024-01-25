import { getLocalStorage, loadHeaderFooter, updateCartCountIcon } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  
  if (cartItems && cartItems.length > 0) {
    
    const quantityMap = new Map();

    cartItems.forEach((item)=>{
      const itemId = item.Id;
      if(quantityMap.has(itemId)){
        quantityMap.set(itemId, quantityMap.get(itemId)+1);
      }else{
        quantityMap.set(itemId, 1);
      }
    });
    //this helps prevent duplicate line items in the cart
    const uniqueProductIds = Array.from(quantityMap.keys());
    document.querySelector('.product-list').innerHTML = '';

    uniqueProductIds.forEach((itemId)=>{
      const item = cartItems.find((cartItem) => cartItem.Id === itemId);
      const htmlItem = cartItemTemplate(item, quantityMap.get(itemId));
      document.querySelector('.product-list').insertAdjacentHTML('beforeend', htmlItem);
    })
    //const htmlItems = cartItems.map((item) => cartItemTemplate(item, quantityMap.get(item.Id)));
    //document.querySelector('.product-list').innerHTML = htmlItems.join('');
    showTotal();
  } else {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty.</p>';
    hideTotal();

  }
}

function hideTotal() {
  const totalDiv = document.getElementById('total-hide');
  totalDiv.style.display = 'none';
}

function showTotal() {
  const totalDiv = document.getElementById('total-hide');
  totalDiv.style.display = 'block';

  //calculate the total based on the items in the cart
  const cartItems = getLocalStorage('so-cart');
  const totalAmount = calculateTotal(cartItems);

  //display the total in the div
  const totalElement = document.getElementById('total-amount');
  totalElement.textContent = `$${totalAmount.toFixed(2)}`;
}

function calculateTotal(cartItems) {
  //to sum up the final price of teach item in the cart
  const total = cartItems.reduce(
    (accumulator, item) => accumulator + item.FinalPrice,
    0
  );
  return total;
}

function cartItemTemplate(item, quantity) {
  //console.log('image path:', item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${quantity} <span class="remove-item" data-id="${item.Id}"> 🗑 </span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-item')) {
    const itemId = event.target.getAttribute('data-id');
    removeItemFromCart(itemId);
  }
});

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage('so-cart');
  cartItems = cartItems.filter(item => item.Id !== itemId);
  localStorage.setItem('so-cart', JSON.stringify(cartItems));
  updateCartCountIcon(document.querySelector('.cart'));
  renderCartContents(); // Update the cart display after removal
}

loadHeaderFooter('partials');