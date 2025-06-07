import {alertBuilder} from './util.js';
document.addEventListener('DOMContentLoaded', ()=> {
    localStorage.removeItem('token');
    validateForm();
})
function validateForm() {
    const formLogin = document.querySelector("#formLogin");
    formLogin.addEventListener('submit', (e)=> {
        e.preventDefault();
        const userName = document.querySelector("#userName").value;
        const password = document.querySelector("#password").value;
        login(userName, password);
        formLogin.reset();
    })
}
function login(userName, password) {
    const URL = 'https://dummyjson.com/auth/login';
    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: userName, password: password})
    })
    .then(result => result.json().then(data => acceso(result.status, data.accessToken)))
    .catch(e => {
        alertBuilder('danger', 'Error inesperado: ' + e);
    })
}
function acceso(status, token) {
    if (status === 200) {
        alertBuilder('success', 'Inicio de sesión exitoso');
        localStorage.setItem('token', token);
        setTimeout(() => {
            mostrarSpiner();
            setTimeout(() => {
                location.href = '/admin/dashboard.html'
            }, 2000);
        }, 1200);
    } else {
        alertBuilder('danger', 'Usuario o contraseña incorrectos');
    }
}
function mostrarSpiner() {
    document.body.innerHTML = `
        <div id="spinner-container" class="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center" style="display: none; z-index: 1050;">
            <div class="text-center">
                <div class="spinner-border text-info" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3 fw-bold">Redirigiendo, por favor espera...</p>
            </div>
        </div>
    `;
}