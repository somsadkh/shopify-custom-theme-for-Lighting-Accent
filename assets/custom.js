// const button = document.querySelector("button.btn.product-form__cart-submit.btn--secondary-accent");
// button.setAttribute("aria-disabled", "true")


const add_to_cart = document.querySelector("button.btn.product-form__cart-submit.btn--secondary-accent");

let myVar = setInterval(myTimer ,100);
function myTimer() {
  if (document.getElementsByTagName("script").length > 115){
    console.log(document.getElementsByTagName("script"));
    console.log("add to cart loading...")
    add_to_cart.removeAttribute('aria-disabled');
    clearInterval(myVar);
  }
}