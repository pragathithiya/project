const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Phone", price: 499.99 },
  { id: 3, name: "Headphones", price: 149.99 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} x 
      <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
  saveCart();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const found = cart.find(item => item.id === id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function updateQuantity(index, quantity) {
  const qty = parseInt(quantity);
  if (qty > 0) {
    cart[index].quantity = qty;
    renderCart();
  } else {
    alert("Quantity must be at least 1.");
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Checkout successful!");
  cart = [];
  saveCart();
  renderCart();
}

renderProducts();
renderCart();
