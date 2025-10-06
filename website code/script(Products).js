let iconCart=document.querySelector('.icon-cart');
let closeCart=document.querySelector('.Close');
let body=document.querySelector('body');
let listProductHTML=document.querySelector('.product-list');
/////new (6, 7, 12-67)
let listCartHTML = document.querySelector('.listCart');
let cartCount = document.querySelector('.icon-cart span');
let cart=[];

fetchProducts(function(products) {
    const listProductHTML = document.querySelector('.product-list');
    listProductHTML.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        listProductHTML.appendChild(li);
    });
});

iconCart.addEventListener('click',() => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click' , () => {
    body.classList.toggle('showCart')
})
// open&close براحتي
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        let productItem = event.target.closest('li');
        let name = productItem.querySelector('h3').innerText;
        let price = productItem.querySelector('p').innerText.replace('EGP', '').trim();
        let img = productItem.querySelector('img').src;

        addToCart({ name, price, img });
    }
});
// when I add to cart I take what I need from html file 

function addToCart(product) {
    let existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {


    cart.push({
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1
    });
}
    updateCartHTML();
}

function updateCartHTML() {
    listCartHTML.innerHTML = '';
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <div class="image">
                <img src="${item.img}" alt="${item.name}" />
            </div>
            <div class="name">${item.name}</div>
            <div class="totalPrice">${item.price} EGP</div>
            <div class="quantity">
                <span>${item.quantity}</span>
            </div>
        `;
        div.style.display = "block"
        div.style.marginTop = "20px";
        listCartHTML.appendChild(div);
    });
    cartCount.innerText = totalCount;}

    document.querySelector('.clearCart').addEventListener('click',()=>{
    if(cart.length===0){
       alert("The cart is already empty!"); 
    }else{
        if(confirm("Are you sure you want to clear the cart?"))
            cart=[];
        updateCartHTML();
    }
})

    document.querySelector('.Purchase').addEventListener('click',function(){
    if(cart.length===0)
    {
alert("The cart is empty!!!,Please add an item");
    }
else{
alert("Thank you for your order! Your purchase has been successfully processed.");
cart=[];
updateCartHTML();
    }});
//////
// Dropdown Menu Functionality
        document.querySelector('.dropdown-btn').addEventListener('click', function() {
            // Toggle active class to show/hide dropdown
            document.querySelector('.dropdown').classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                document.querySelector('.dropdown').classList.remove('active');
            }
        });
//////
// Only set localStorage from products.json if not already set
if (!localStorage.getItem('products')) {
    fetch('products.json')
        .then(res => res.json())
        .then(data => localStorage.setItem('products', JSON.stringify(data)));
}

// Load products from localStorage or fallback to products.json
function fetchProducts(callback) {
    const stored = localStorage.getItem('products');
    if (stored) {
        callback(JSON.parse(stored));
    } else {
        fetch('products.json')
            .then(res => res.json())
            .then(data => callback(data));
    }
}

// Example: Use this to dynamically render products if you want
// fetchProducts(function(products) {
//     // Render products dynamically here if needed
// });