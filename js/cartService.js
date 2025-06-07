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
        <button type="button" class="btn btn-outline-success" onclick="addCart()">
            <i class="fa-solid fa-cart-plus"></i>
        </button>
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

function addCart() {
    const modalCartAdd = `
        <div class="modal fade" id="showModalCartAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            <i class="fa-solid fa-cart-plus"></i> Agregar Carrito
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <form id="formAddCart">
                                    <div class="row">
                                        <div class="col">
                                            <input type="number" id="idUsuario" class="form-control" placeholder="Ingrese el id del usuario" aria-label="First name" required>
                                        </div>
                                        <div class="col">
                                            <input type="number" id="idProducto" class="form-control" placeholder="Ingrese el id del producto" aria-label="First name" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col">
                                            <input type="text" id="cantidad" class="form-control" placeholder="Cantidad" aria-label="First name" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col text-center">
                                            <button type="button" class="btn btn-success" onclick="saveCart()">
                                                <i class="fa-solid fa-floppy-disk"></i> Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('#showModal').innerHTML = modalCartAdd;
    const modal = new bootstrap.Modal(document.getElementById('showModalCartAdd'))
    modal.show()
}

function saveCart() {
    const form = document.getElementById('formAddCart');
    if (form.checkValidity()) {
        const idUsuario = document.getElementById('idUsuario').value
        const idProducto = document.getElementById('idProducto').value
        const cantidad = document.getElementById('cantidad').value

        const REQRES_ENDPOINT = 'https://dummyjson.com/carts/add'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify({
                userId: idUsuario,
                products: [
                    {
                        id: idProducto,
                        quantity: cantidad
                    }
                ]
            })
        })
        .then((response) =>response.json().then(data => ({status: response.status, info: data})))
        .then((result) => {
            if (result.status === 201) {
                document.getElementById('contenido-dinamico').innerHTML = '';
                alertBuilder('success','El carrito se gurdo correctamente');
            }
            else {
                document.getElementById('contenido-dinamico').innerHTML = '';
                alertBuilder('danger', 'El carrito no se agrego a la API.');
            }
            const modalId = document.getElementById('showModalCartAdd');
            const modal = bootstrap.Modal.getInstance(modalId);
            modal.hide();
        })
    }
    else {
        form.reportValidity()
    }
}
window.getCart = getCart;
window.addCart = addCart;
window.saveCart = saveCart;