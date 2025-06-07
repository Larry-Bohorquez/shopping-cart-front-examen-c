import { alertBuilder, userAuth, updateCardTitle } from './util.js';
document.addEventListener('DOMContentLoaded', () => {
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
        .then(response => response.json().then(data => ({ status: response.status, data })))
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
        <button type="button" class="btn btn-outline-success" onclick="addUser()">
                <i class="fa-solid fa-user-plus"></i>
        </button>
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
        .then(response => response.json().then(data => ({ status: response.status, data })))
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
        <div class="modal-dialog modal-md">
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

function addUser() {
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
    <div class="modal-content">
    <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Agregar Usuario</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="card">
    <div class="card-body">
    <form id="formAddUser">
    <div class="row">
    <div class="col">
    <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" aria-label="First name" required>
    </div>
    <div class="col">
    <input type="text" id="last_name" class="form-control" placeholder="Apellidos" aria-label="Last name" required>
    </div>
    </div>
    
    <div class="row mt-3">
    <div class="col">
    <input type="email" id="email" class="form-control" placeholder="Correo" aria-label="First name" required>
    </div>
                            <div class="col">
                            <input type="url" id="avatar" class="form-control" placeholder="Link del avatar" aria-label="Last name" required>
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const avatar = document.getElementById('avatar').value
        const user = { first_name, last_name, email, avatar }

        const REQRES_ENDPOINT = 'https://dummyjson.com/users/add'
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
                        '<h3 class="text-success">El usuario se guardo correctamente <i class="fa-solid fa-check"></i></h3>'
                }
                else {
                    document.getElementById('contenido-dinamico').innerHTML =
                        '<h3 class="text-danger">No se guardo el usuario en la Api <i class="fa-solid fa-x"></i></h3>'
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