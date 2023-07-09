const date = new Date();

let day = date.getDate();
let month = date.getMonth() +1;
let year = date.getFullYear();
let hours = date.getHours();
let mins = date.getMinutes();

let currentDate = `${month}/${day}/${year} ${hours}:${mins}`;
document.querySelector('.js-date_time').innerHTML = currentDate;

let productsHTML = ``;
products.forEach((product) =>{
  const cartQty = document.querySelector('#js-cart-qty');
 
  productsHTML += `
    <div class="item-container">
      <div class="image-container">
        <button><img src="products/${product.image}.jpg" alt="ImAGE"></button>
      </div>
      <div class="item-desc-container">
        <div>${product.name}</div>
        <div class="price">
          <strong>${(product.price / 100).toFixed(2)}</strong>
        </div>
          <div class="qty-cart-container">
          <div class="cart-qty">${product.qty}</div>
            <button data-product-id="${product.id}" data-product-image="${product.image}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-qty="${product.qty}" class="js-add-to-cart add-to-cart">Add to cart </button>
          </div>
      </div>
    </div>
  `;
});
document.querySelector('.js-item-container').innerHTML = productsHTML;

const close = document.querySelector('.close-cart-list').addEventListener('click',()=> xButton());

const xButton = () =>{
  const cartList = document.querySelector('.cart-main-container');
  cartList.classList.add('js-cart-main-container-hidden');
}

//////////////////ADD TO CART///////////////////
let productsInCart = [];
let productsInCartMobile = [];

const addToCart =()=>{
  let itemsInCart = ``; // generate to HTML
  let itemsInCartMobile = ``;
  productsInCart.forEach((item) =>{
    let itemObj = item;
    
    const {productName, productImage, productPrice, productQty} = itemObj;
    itemsInCart += `
      <div>
        <div class="item-list-container">
          <img src="products/${productImage}.jpg" alt="pic ng image">
          <div class="cart-item-desc">
            <strong>${productName}</strong>
            <p>P${(productPrice / 100).toFixed(2)}</p>
            <p>Qty: ${productQty}</p>
          </div>
          <div>
            <strong>P${(productPrice / 100).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    `;
    document.querySelector('.js-cart-main-container').innerHTML = itemsInCart;
  }); 
}

////////////////////////////// add to cart BTN ////////////////////////////
let screenWidth = document.documentElement.clientWidth || window.innerWidth;
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  const addToCartButtons = document.querySelectorAll('.cart-main-container');
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productImage = button.dataset.productImage;
    const productPrice = button.dataset.productPrice;
    const productQty = parseInt(button.dataset.productQty);

    let matchingItem; // var for matching item if nasa cart na

    productsInCart.forEach((item) => { /// to check if nasa cart na yung item para hindi ma ulit sa display
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.qty++;
    }else{
      productsInCart.push({
        productId: productId,
        productName: productName,
        productImage: productImage,
        productPrice: productPrice,
        qty: productQty
      });
    }
        
    let cartQty = 0;
    productsInCart.forEach((itemQty) => {
      cartQty += itemQty.qty;
    });

    document.querySelector('.js-cart-qty').innerHTML = cartQty;
    addToCart();
    
    for(const addToCartBtn of addToCartButtons){
      addToCartBtn.classList.remove('js-cart-main-container-hidden');
    }
    
    ///////display subtotal////////
    let accumulator = 0;
    let total = 0
    productsInCart.forEach((item) => {
      let toInt = parseInt(item.productPrice);
      accumulator += toInt;
      total= (accumulator / 100).toFixed(2);
    })
    console.log(total);
    document.querySelector('.js-total-price').innerHTML = total;
   
  });
}); 
document.querySelector('.js-cart-button-mobile').addEventListener('click', () =>{
  const cartBtnMobile = document.querySelector('.cart-main-container');
  cartBtnMobile.classList.remove('js-cart-main-container-hidden');
  
});


/*
document.querySelector('.js-checkout').addEventListener('click', () => {
  test();
})

const test = () => {
  
  let accumulator = 0;
  let total = 0
  productsInCart.forEach((item) => {
    let toInt = parseInt(item.productPrice);
    accumulator += toInt;
    total= (accumulator / 100).toFixed(2);
  })
  console.log(total);
  document.querySelector('.js-total-price').innerHTML = total;
};
//*/