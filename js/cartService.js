import {alertBuilder, updateCardTitle} from './util.js';
document.addEventListener('DOMContentLoaded', ()=> {
    const cartShopping = document.querySelector("#cart-shopping");
    cartShopping.addEventListener('click', () => {
        updateCardTitle('<i class="fa-solid fa-cart-shopping"></i>', 'Carrito de Compras');
        document.querySelector('#contenido-dinamico').innerHTML = ``;
        fetchCarts();
    })
})

function fetchCarts() {
    const URL ='https://dummyjson.com/carts';
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            mostrarProductos(result.data.carts);
        } else {
            document.querySelector('#contenido-dinamico').innerHTML = '';
            alertBuilder('danger', 'Error al obtener el carrito de compras.');
        }
    })
    .catch(error => {
        console.error('Error al obtener carrito de compras:', error);
    });
}
function mostrarProductos(carts) {
    let listCarts = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Total</th>
                    <th scope="col">Cantidad de Productos</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
    `
    carts.forEach(cart => {
        listCarts = listCarts + `
            <tr>
                <td>${cart.id}</td>
                <td>${cart.userId}</td>
                <td>${cart.total}</td>
                <td>${cart.totalProducts}</td>
                <td><button type="button" class="btn btn-outline-info" onclick="getCart('${cart.id}')"><i class="fas fa-eye"></i></button></td>
            </tr>
                `
    });
    listCarts = listCarts + `
        </tbody>
    </table>
    `
    document.querySelector('#contenido-dinamico').innerHTML = listCarts;
}

function getCart(id) {
    const URL = 'https://dummyjson.com/carts/' + id;
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            showModal(result.data);
        } else {
            alertBuilder('danger', 'Error al obtener el carrito de compras.');
        }
    })
    .catch(error => {
        console.error('Error al obtener el carrito de compras:', error);
    });
}

function showModal(cart) {
    const modalCart = `
        <div class="modal fade" id="showModalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Carrito de Compras</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">ID: ${cart.id}</h5>
                        <p class="card-text">Usuario: ${cart.userId}</p>
                        <p class="card-text">Total: ${cart.total}</p>
                        <p class="card-text">Cantidad de Productos: ${cart.totalProducts}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.querySelector('#showModal').innerHTML = modalCart;
    const modal = new bootstrap.Modal(document.querySelector('#showModalCart'));
    modal.show();
}

window.getCart = getCart;