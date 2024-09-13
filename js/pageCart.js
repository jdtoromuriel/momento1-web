let cartTable = document.querySelector(".cart-table > tbody");

let subtotalElement = document.querySelector(".cart-summary-detail .subtotal");
let domicilioElement = document.querySelector(".cart-summary-detail .domicilio");
let descuentoElement = document.querySelector(".cart-summary-detail .descuento");
let totalElement = document.querySelector(".cart-summary .total");

document.addEventListener("DOMContentLoaded", () => {
  getCartData();
});

let updateQuantity = (index, change) => {
  let products = JSON.parse(localStorage.getItem("carrito")) || [];
  if (products[index]) {
    products[index].cantidad = (parseInt(products[index].cantidad) || 1) + change;
    if (products[index].cantidad < 1) products[index].cantidad = 1; 

    localStorage.setItem("carrito", JSON.stringify(products));
    getCartData();
  }
};

let getCartData = () => {
  let products = JSON.parse(localStorage.getItem("carrito")) || [];
  let subtotal = 0;
  let valorDomicilio = 5.00;
  let descuentoPromo = 5.00;

  cartTable.innerHTML = "";

  products.forEach((product, index) => {
    let precio = parseFloat(product.precio) || 0;
    let cantidad = parseInt(product.cantidad) || 1; 

    let row = document.createElement("tr");

    row.innerHTML = `
      <td class="product-block">
        <button class="remove-from-cart-btn btn" data-index="${index}">
          <i class="fa-solid fa-x"></i>
        </button>
        <img src="${product.imagen}" alt="${product.nombre}">
        <a href="product-detail.html" class="h6">${product.nombre}</a>
      </td>
      <td>
        <p class="lead color-black">${precio.toFixed(2)}</p>
      </td>
      <td>
        <div class="quantity quantity-wrap">
          <div class="decrement"><i class="fa-solid fa-minus"></i></div>
          <input type="text" name="quantity" value="${cantidad}" maxlength="2" size="1" class="number" readonly>
          <div class="increment"><i class="fa-solid fa-plus"></i></div>
        </div>
      </td>
      <td>
        <h6 class="product-total">${(precio * cantidad).toFixed(2)}</h6>
      </td>
    `;

    cartTable.appendChild(row);
  });

  // Agregar eventos de clic a los botones de incremento y decremento
  cartTable.querySelectorAll(".decrement").forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateQuantity(index, -1);
    });
  });

  cartTable.querySelectorAll(".increment").forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateQuantity(index, 1);
    });
  });

  cartTable.addEventListener("click", (e) => {
    if (e.target.closest(".remove-from-cart-btn")) {
      const index = e.target.closest(".remove-from-cart-btn").dataset.index;
      removeFromCart(index);
    }
  });

  subtotal = products.reduce((acc, product) => acc + parseFloat(product.precio) * (parseInt(product.cantidad) || 1), 0);

  updateOrderSummary(subtotal, valorDomicilio, descuentoPromo);
};

let removeFromCart = (index) => {
  let products = JSON.parse(localStorage.getItem("carrito")) || [];
  if (products[index]) {
    products.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(products));
    getCartData();
  }
};

let updateOrderSummary = (subtotal, valorDomicilio, descuentoPromo) => {
  let total = subtotal + valorDomicilio - descuentoPromo;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  domicilioElement.textContent = `$${valorDomicilio.toFixed(2)}`;
  descuentoElement.textContent = `-$${descuentoPromo.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
};

let processPayment = () => {
  let products = JSON.parse(localStorage.getItem("carrito")) || [];
  let subtotal = products.reduce((acc, product) => acc + parseFloat(product.precio) * (parseInt(product.cantidad) || 1), 0);
  let valorDomicilio = 5.00; 
  let descuentoPromo = 5.00; 
  let total = subtotal + valorDomicilio - descuentoPromo;

  let paymentData = {
    products: products,
    subtotal: subtotal.toFixed(2),
    valorDomicilio: valorDomicilio.toFixed(2),
    descuentoPromo: descuentoPromo.toFixed(2),
    total: total.toFixed(2)
  };
  localStorage.setItem("pago", JSON.stringify(paymentData));
  localStorage.removeItem("carrito");
};
