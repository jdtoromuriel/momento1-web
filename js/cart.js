
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let contentProducts = document.querySelector(".content-pro");
let listCart = document.querySelector(".list-cart > tbody");
let btnCart = document.querySelector(".btn-cart");
let con = 0;

document.addEventListener("DOMContentLoaded", () => {
    getProductData();
})
let storageProduct = (product) => {
    let products = [];
    let productPrevius = JSON.parse(localStorage.getItem("carrito"));
    if (productPrevius != null) {
        products = Object.values(productPrevius);
    }
    products.push(product);
    localStorage.setItem("carrito", JSON.stringify(products));
    location.href = "cart.html";
}

iconCart.addEventListener("click", () =>{
    if (listCart.parentElement.style.opacity == "0") {
        listCart.parentElement.style.opacity= "1";
    } else {
        listCart.parentElement.style.opacity= "0";
    }
})
let getInfoProduct = (id) =>{
    let products = [];
    let productPrevius = JSON.parse(localStorage.getItem("productos"));
    if (productPrevius != null) {
        products = Object.values(productPrevius);
    }
    addToCart(products[id]);

    btnCart.addEventListener("click", () => {
        storageProduct(products[id]); 
    })

    con++
    iconCount.textContent = con;
}
let addToCart = (prod) => {
    let row = document.createElement("tr");
    row.innerHTML =
    `
        <td> ${con + 1} </td>
        <td> <img src="${prod.imagen}" width="70px"> </td>
        <td> ${prod.nombre} </td>
        <td> ${prod.precio} </td>
        <td> 
            <button onClick="deleteCart(${con}, this)" type="button" class="btn-delete btn btn-danger">
                ❌
            </button> 
        </td>
    `;
    listCart.appendChild(row);
}
let deleteCart = (id, element) =>{
    element.parentElement.parentElement.remove()
    if (con > 0) {
        con--;
        iconCount.textContent = con;
    }

}
let getProductData = async () => {
    let url = "http://localhost/backend-apiCrud/productos";
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 204) {
            console.log("No hay datos en la DB");
        } else {
            let tableData = await response.json();
            console.log(tableData)
            localStorage.setItem("productos", JSON.stringify(tableData))
            tableData.forEach((dato, i) => {
                contentProducts.innerHTML += `
                <div class="col-md-3 py-3 py-md-0">
                    <div class="card">
                        <img src="${dato.imagen}" alt="">
                        <div class="card-body">
                            <h3>${dato.nombre}</h3>
                            <p>${dato.descripcion}</p>
                            <h5>${dato.precio} 
                                <span class="btn-product" onClick="getInfoProduct(${i})"><i class="fa-solid fa-basket-shopping"></i></span></h5>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    } catch (error) {
        console.error(error);
    }
}