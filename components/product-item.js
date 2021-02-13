// product-item.js

class ProductItem extends HTMLElement {
  static get observedAttributes() { return ['img', 'title', 'price']; }

  static updateCart(pos) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart[pos] = !cart[pos];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

    // Add elements
    const product = document.createElement('li');
    product.setAttribute('class', 'product');

    const image = product.appendChild(document.createElement('img'));
    if (this.hasAttribute('img')) image.src = this.getAttribute('img');
    image.width = '200';
    // image.src = this.hasAttribute('img') ? this.getAttribute('img') : default

    const title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    if (this.hasAttribute('title')) title.innerHTML = this.getAttribute('title');

    const price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    if (this.hasAttribute('price')) price.innerHTML = this.getAttribute('price');

    const button = product.appendChild(document.createElement('button'));

    button.onclick = () => {
      if (button.innerHTML === 'Add to Cart') {
        localStorage.setItem('cart-count', parseInt(localStorage.getItem('cart-count')) + 1); // increment cart count
        document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count')); // update HTML
        alert('Added to cart!');
        button.innerHTML = 'Remove from Cart';
      } else {
        localStorage.setItem('cart-count', parseInt(localStorage.getItem('cart-count')) - 1); // decrement cart count
        document.getElementById('cart-count').innerHTML = parseInt(localStorage.getItem('cart-count')); // update HTML
        button.innerHTML = 'Add to Cart';
      }
      ProductItem.updateCart(this.getAttribute('index'));
    };
    
    button.innerHTML = 'Add to Cart';

    // Add style

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(product);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'img') {
      this.shadowRoot.querySelector('img').src = newValue;
    } else if (name === 'title') {
      this.shadowRoot.querySelector('.title').innerHTML = newValue;
    } else if (name === 'price') {
      this.shadowRoot.querySelector('.price').innerHTML = '$' + newValue;
    } /*else if (name === 'index') {
      this.shadowRoot.querySelector('button').innerHTML = 
        (localStorage.getItem('cart')[this.getAttribute('index')])? 'Remove from Cart' : 'Add to Cart';
    }*/
  }
}

customElements.define('product-item', ProductItem);