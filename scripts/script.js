// Script.js
function populateProducts() {
  // populate product items
  let item, i, element;
  let products = JSON.parse(localStorage.getItem('products'));
  let cart = JSON.parse(localStorage.getItem('cart'));
  if(cart === null) {
    cart = new Array(products.length).fill(false);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart-count', 0);
  }

  for (i = 0; i < products.length; ++i) {
    item = products[i];
    element = document.createElement('product-item');
    element.setAttribute('index', i);
    element.setAttribute('price', item.price);
    element.setAttribute('title', item.title);
    element.setAttribute('img', item.image);
    
    document.getElementById('product-list').appendChild(element);
    element.shadowRoot.querySelector('button').innerHTML = (cart[i])? 'Remove from Cart' : 'Add to Cart';
  }
  
  document.getElementById('cart-count').innerHTML = localStorage.getItem('cart-count');
}

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem("products") === null) {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.text())
    .then((data) => {
        localStorage.setItem('products', data);
        populateProducts();
    });
  } else {
    populateProducts();
  }
});