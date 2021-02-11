// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem("products") == null) {
    fetch('https://fakestoreapi.com/products')
      .then( response => response.text() )
      .then( data => {
        localStorage.setItem("products", data);
      });
  }
});