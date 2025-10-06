// Only set localStorage from products.json if not already set
if (!localStorage.getItem('products')) {
    fetch('products.json')
        .then(res => res.json())
        .then(data => localStorage.setItem('products', JSON.stringify(data)));
}

let editingProductId = null; // Track which product is being edited
let products = []; // Always loaded from localStorage or JSON

// Load products from localStorage if available
function loadProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        // fallback to fetch if localStorage is empty (shouldn't happen)
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                products = data;
                renderProducts();
            });
    }
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productList.appendChild(li);
    });
}

function addProduct() {
    if (editingProductId !== null) return; // Prevent adding while editing
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    const newProduct = {
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: name,
        price: price,
        image: image
    };
    products.push(newProduct);
    renderProducts();
    clearForm();
    // Do NOT update localStorage!
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        document.getElementById('add-button').style.display = 'none';
        document.getElementById('update-button').style.display = 'inline';
        editingProductId = id;
    }
}

function updateProduct() {
    if (editingProductId === null) return;
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').value;

    const productIndex = products.findIndex(p => p.id === editingProductId);
    if (productIndex !== -1) {
        products[productIndex] = { id: editingProductId, name, price, image };
        renderProducts();
        clearForm();
        document.getElementById('add-button').style.display = 'inline';
        document.getElementById('update-button').style.display = 'none';
        editingProductId = null;
        // Do NOT update localStorage!
    }
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
    if (editingProductId === id) {
        clearForm();
        document.getElementById('add-button').style.display = 'inline';
        document.getElementById('update-button').style.display = 'none';
        editingProductId = null;
    }
    // Do NOT update localStorage!
}

function clearForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-image').value = '';
}

window.onload = function() {
    loadProducts();
    renderProducts();
    document.getElementById('update-button').onclick = updateProduct;
};