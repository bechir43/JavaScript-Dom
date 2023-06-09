// SELECT ELEMENTS
const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");


// RENDER PRODUCTS

function renderProducts(){
    products.forEach( (product) =>{
        productsE1.innerHTML += `
                <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                        ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
    });
}
renderProducts();
// CART array
let cart = []

// ADD TO CART
function addToCart(id){
    //check if product already exist in cart 
    if(cart.some((item) => item.id === id)) {
        alert("Product already in cart!")
    }else{
        const item = products.find((product) => product.id === id)

        cart.push({
            ...item,
            numberofUnits: 1
        });

    }

    updateCart();
}

//update Cart

function updateCart() {
    renderCartItems();
    renderSubstotal();
}

//calculate and render subtotal
function renderSubstotal(){
    let totalprice = 0, 
    totalItems = 0;
    
    cart.forEach((item) => {
        totalprice += item.price * item.numberOfUnits;
        totalItems +=item.numberofUnits;
    });
    subtotalE1.innerHTML = `Subtotal (${totalItems} items): $${totalprice}`;
}

// render cart items
function renderCartItems(){
    cartItemsE1.innerHTML = ""; //clear cart element
    cart.forEach((item) => {
        cartItemsE1.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                            <img src="${item.imgSrc}" alt="${item.name}">
                            <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                            <div class="btn minus" onclick="changeNumberofUnits('minus', ${item.id})">-</div>
                            <div class="number">${item.numberofUnits}</div>
                            <div class="btn plus" onclick="changeNumberofUnits('plus', ${item.id})">+</div>           
                    </div>
                </div>
        `;
    });
}

// change number of units for an item 
function changeNumberofUnits(action, id) {
    cart = cart.map((item) => {
       
        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            
            if(action === 'minus' && numberOfUnits > 1){
                numberOfUnits--;
            }else if(action = 'plus' && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}
