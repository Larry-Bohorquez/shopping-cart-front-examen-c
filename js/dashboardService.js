import {userAuth, updateCardTitle} from './util.js';

updateCardTitle('<i class="fas fa-tachometer-alt me-2"></i>', 'Bienvenid@ <span class="fw-bold user-name px-2 py-1 rounded" style="font-size:1.2rem; background-color: #e3f0fc; color: #1565c0;"></span>')

document.addEventListener('DOMContentLoaded', async () => {
    validarToken();
    const user = await userAuth();
    if (user != null) {
        const userName = document.querySelector(".user-name");
        userName.innerHTML = user.firstName + " " + user.lastName;
    }
    const cerrarSesion = document.querySelector("#salir");
    cerrarSesion.addEventListener('click', () => {
        Swal.fire({
            title: "¿Deseas cerrar sesión?",
            text: "Tu sesión actual se cerrará y volverás al inicio.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#0dcaf0",
            cancelButtonColor: "#adb5bd", 
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "Has salido exitosamente de Shoply.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                })
                setTimeout(() => {
                    location.href = '/index.html';
                }, 1000);
            }
        });
    })
});
function validarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        location.href = '/index.html';
    } 
}