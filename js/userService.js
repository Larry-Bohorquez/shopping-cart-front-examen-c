import {alertBuilder, userAuth, updateCardTitle} from './util.js';
document.addEventListener('DOMContentLoaded', ()=> {
    const linkUsuarios = document.querySelector("#usuarios");
    linkUsuarios.addEventListener('click', () => {
        updateCardTitle('<i class="fas fa-users me-2"></i>', 'Listado de Usuarios');
        document.querySelector('#contenido-dinamico').innerHTML = ``;
        fetchUsers();
    })
})

function fetchUsers() {
    const URL = 'https://dummyjson.com/users';
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            mostrarUsuarios(result.data.users);
        } else {
            document.querySelector('#contenido-dinamico').innerHTML = '';
            alertBuilder('danger', 'Error al obtener usuarios.');
        }
    })
    .catch(error => {
        console.error('Error al obtener usuarios:', error);
    });
}

async function mostrarUsuarios(users) {
    const userValidate = await userAuth();
    let listUsers = `
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Avatar</th>
                <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
    `
    users.forEach(user => {
        if (userValidate && user.id === userValidate.id) {
            listUsers += `
                <tr>
                    <td>${user.id}</td>
                    <td><strong>${user.firstName}</strong></td>
                    <td><strong>${user.lastName}</strong></td>
                    <td><img src="${user.image}" class="img-thumbnail border border-success" alt="avatar del usuario"></td>
                    <td>
                        <button type="button" class="btn btn-success" onclick="getUser('${user.id}')">
                            <i class="fas fa-user-check"></i> Tú
                        </button>
                    </td>
                </tr>
            `;
            return;
        }
        listUsers = listUsers + `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td><img src="${user.image}" class="img-thumbnail" alt="avatar del usuario"></td>
                <td>
                    <button type="button" class="btn btn-outline-info" onclick="getUser('${user.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `  
    });
    listUsers = listUsers + `
        </tbody>
    </table>
    `
    document.querySelector('#contenido-dinamico').innerHTML = listUsers;
}

function getUser(id) {
    const URL = 'https://dummyjson.com/users/' + id;
    fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json().then(data => ({status: response.status, data})))
    .then(result => {
        if (result.status === 200) {
            console.log(result.data);
            showModal(result.data);
        } else {
            alertBuilder('danger', 'Error al obtener el usuario.');
        }
    })
    .catch(error => {
        console.error('Error al obtener el usuario:', error);
    });
}

function showModal(user) {
    const modalUser = `
        <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                    <i class="fas fa-user me-2"></i>Ver Usuario
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
                    <div class="card-body">
                        <h5 class="card-title">Información del Usuario</h5>
                        <p class="card-text"><i class="fas fa-user-tag me-2"></i> ${user.username}</p>
                        <p class="card-text"><i class="fas fa-user me-2"></i> ${user.firstName} ${user.lastName}</p>
                        <p class="card-text"><i class="fas fa-envelope me-2"></i> ${user.email}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fas fa-times me-1"></i>Cerrar
                </button>
            </div>
            </div>
        </div>
        </div>
    `;
    document.querySelector('#showModal').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.querySelector('#showModalUser'));
    modal.show();
}

window.getUser = getUser;