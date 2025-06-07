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
        <button type="button" class="btn btn-outline-success" onclick="addUser()">
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

window.getCart = getCart;

function addUser() {
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
    <div class="modal-content">
    <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-cart-plus"></i> Agregar Carrito</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="card">
    <div class="card-body">
    <form id="formAddUser">
    <div class="row">
    <div class="col">
    <input type="text" id="usuario" class="form-control" placeholder="Usuario" aria-label="First name" required>
    </div>
    <div class="col">
    <input type="text" id="total" class="form-control" placeholder="Total" aria-label="Last name" required>
    </div>
    </div>
    
    <div class="row mt-3">
    <div class="col">
    <input type="text" id="cantidad" class="form-control" placeholder="Cantidad" aria-label="First name" required>
    </div>
    </div>
                           
    <div class="row mt-3 ">
    <div class="col text-center">
    <button type="button" class="btn btn-success" onclick="saveUser()">
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
    `
    document.getElementById('showModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function saveUser() {
    const form = document.getElementById('formAddUser')
    if (form.checkValidity()) {
        const usuario = document.getElementById('usuario').value
        const total = document.getElementById('total').value
        const cantidad = document.getElementById('cantidad').value
        const user = { usuario, total, cantidad }

        const REQRES_ENDPOINT = 'https://dummyjson.com/carts/add'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                return response.json().then(
                    data => {
                        return {
                            status: response.status,
                            info: data
                        }
                    }
                )
            })
            .then((result) => {
                if (result.status === 201) {
                    document.getElementById('contenido-dinamico').innerHTML =
                        '<h3 class="text-success">El carrito se guardo correctamente <i class="fa-solid fa-check"></i></h3>'
                }
                else {
                    document.getElementById('contenido-dinamico').innerHTML =
                        '<h3 class="text-danger">No se guardo el carrito en la Api <i class="fa-solid fa-x"></i></h3>'
                }
                const modalId = document.getElementById('showModalUser')
                const modal = bootstrap.Modal.getInstance(modalId)
                modal.hide()
            })
    }
    else {
        form.reportValidity()
    }
}
window.addUser = addUser;
window.saveUser = saveUser;