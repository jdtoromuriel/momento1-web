document.addEventListener("DOMContentLoaded", () => {
    let pago = JSON.parse(localStorage.getItem("pago"));
    if (pago) {
      displayOrderSummary(pago);
      setupPaymentMethodListener(pago);
    }
  });
  
  function displayOrderSummary(pago) {
    const cartSummaryDetail = document.querySelector(".cart-summary-detail");
    cartSummaryDetail.innerHTML = "";
  
    pago.products.forEach(product => {
      let productDetail = `
        <div class="d-flex justify-content-between align-items-center mb-24">
          <p class="lead color-black">${product.nombre}</p>
          <p class="lead">$${parseFloat(product.precio).toFixed(2)}</p>
        </div>
      `;
      cartSummaryDetail.insertAdjacentHTML("beforeend", productDetail);
    });
  
    document.querySelector(".valor-domicilio").textContent = `$${parseFloat(pago.valorDomicilio).toFixed(2)}`;
    document.querySelector(".descuento").textContent = `-$${parseFloat(pago.descuentoPromo).toFixed(2)}`;
    document.querySelector(".subtotal").textContent = `$${parseFloat(pago.subtotal).toFixed(2)}`;
  
    updateTotal(pago);
  }

  function updateTotal(pago) {
    const selectedMethod = document.querySelector('input[name="radio"]:checked').value;
    let subtotal = parseFloat(pago.subtotal);
    let valorDomicilio = parseFloat(pago.valorDomicilio);
    let descuentoPromo = parseFloat(pago.descuentoPromo);
  
    let total = subtotal + valorDomicilio - descuentoPromo;
  
    if (selectedMethod === "1") {
      total *= 1.05; 
    }
  
    document.querySelector(".total").textContent = `$${total.toFixed(2)}`;
  }
  
  function setupPaymentMethodListener(pago) {
    const paymentMethods = document.querySelectorAll('input[name="radio"]');
    
    paymentMethods.forEach(method => {
      method.addEventListener("change", () => {
        updateTotal(pago);
      });
    });
  }
  
  document.querySelector('.cus-btn.dark').addEventListener('click', () => {
    let pago = JSON.parse(localStorage.getItem("pago"));
    if (pago) {
      let orderInfo = {
        ...pago,
        total: document.querySelector(".total").textContent.replace('$', '')
      };

      localStorage.setItem("pago", JSON.stringify(orderInfo));
      localStorage.removeItem("carrito"); 
  
      window.location.href = "checkout.html";
    }
  });
  