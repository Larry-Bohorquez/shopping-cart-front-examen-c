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
        <button onclick="addProduct()" type="button" class="btn btn-outline-success"><i class="fa-solid fa-box"></i> +</button>
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

function addProduct() {
    const modalProductAdd = `
        <div class="modal fade" id="showModalProductAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-box"></i>+ Añadir Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                    <form id="formAddProduct">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="titulo" class="form-control" placeholder="Titulo del Producto" aria-label="First name" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <label for="descripcion" class="form-label">Descripción</label>
                                <textarea class="form-control" id="descripcion" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <input type="number" id="precio" class="form-control" placeholder="Precio" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="number" id="cantidad" class="form-control" placeholder="Cantidad" aria-label="First name" required>
                            </div>                            
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <input type="url" id="image" class="form-control" placeholder="Link del producto" aria-label="Last name" required>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button onclick="saveProduct()" type="button" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
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
    document.querySelector('#showModal').innerHTML = modalProductAdd;
    const modal = new bootstrap.Modal(document.getElementById('showModalProductAdd'));
    modal.show();
}

function saveProduct() {
    const form = document.querySelector('#formAddProduct');
    if (form.checkValidity()) {
        const titulo = document.querySelector('#titulo').value;
        const descripcion = document.querySelector('#descripcion').value;
        const precio = document.querySelector('#precio').value;
        const cantidad = document.querySelector('#cantidad').value;
        const imagen = document.querySelector('#image').value;
        const product = {titulo, descripcion, precio, cantidad, imagen};

        const URL = 'https://dummyjson.com/products/add';
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(product)
        })
        .then((response) =>response.json().then(data => ({status: response.status, info: data})))
        .then(result => {
            if (result.status === 201) {
                document.querySelector("#contenido-dinamico").innerHTML = '';
                alertBuilder('success', 'Producto creado correctamente.');
            } else {
                document.querySelector("#contenido-dinamico").innerHTML = '';
                alertBuilder('danger', 'El producto no se agrego a la API.');
            }
            const modalId = document.getElementById('showModalProductAdd');
            const modal = bootstrap.Modal.getInstance(modalId);
            modal.hide();
        })
    } else {
        form.reportValidity();
    }
}

window.getProducts = getProducts;
window.addProduct = addProduct;
window.saveProduct = saveProduct;