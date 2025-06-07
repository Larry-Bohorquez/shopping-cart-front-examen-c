export function alertBuilder(alertType, message) {
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.querySelector('.alert').innerHTML = alert;
}

export async function userAuth() {
    const token = localStorage.getItem('token');
    try {
        const URL = 'https://dummyjson.com/auth/me';
        const result = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (result.status === 200) {
            const user = await result.json();
            return user;
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        return null;
    }
}
export function updateCardTitle(icono, title) {
    const titleNew = document.querySelector("#title");
    titleNew.innerHTML = `<h2 id="title" class="card-title mb-0 text-center">${icono} ${title}</h2>`;
}