import {alertBuilder, updateCardTitle} from './util.js';
document.addEventListener('DOMContentLoaded', ()=> {
    const linkProducts = document.querySelector("#productos");
    linkProducts.addEventListener('click', () => {
        updateCardTitle('<i class="fas fa-box me-2"></i>', 'Listado de Productos');
        document.querySelector('#contenido-dinamico').innerHTML = ``;
        fetchProducts();
    })
})

function fetchProducts() {
    const URL = 'https://dummyjson.com/products';
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            mostrarProductos(result.data.products);
        } else {
            document.querySelector('#contenido-dinamico').innerHTML = '';
            alertBuilder('danger', 'Error al obtener productos.');
        }
    })
    .catch(error => {
        console.error('Error al obtener productos:', error);
    });
}
function mostrarProductos(products) {
    let listProducts = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
    `
    products.forEach(product => {
        listProducts = listProducts + `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><img src="${product.images}" class="img-thumbnail"></td>
                <td><button type="button" class="btn btn-outline-info" onclick="getProducts('${product.id}')" ><i class="fas fa-eye"></i></button></td>
            </tr>
        `  
    });
    listProducts = listProducts + `
        </tbody>
    </table>
    `
    document.querySelector('#contenido-dinamico').innerHTML = listProducts;
}

function getProducts(id) {
    const URL = 'https://dummyjson.com/products/' + id;
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            showModal(result.data);
        } else {
            alertBuilder('danger', 'Error al obtener el usuario.');
        }
    })
    .catch(error => {
        console.error('Error al obtener el usuario:', error);
    });
}

function showModal(product) {
    const modalProduct = `
        <div class="modal fade" id="showModalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${product.images}" class="card-img-top" alt="Avatar del Producto">
                    <div class="card-body">
                        <h5 class="card-title">Información del Producto</h5>
                        <p class="card-text">Titulo: ${product.title}</p>
                        <p class="card-text">Descripcion: ${product.description}</p>
                        <p class="card-text">Precio: ${product.price}</p>
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
    document.querySelector('#showModal').innerHTML = modalProduct;
    const modal = new bootstrap.Modal(document.querySelector('#showModalProduct'));
    modal.show();
}

window.getProducts = getProducts;