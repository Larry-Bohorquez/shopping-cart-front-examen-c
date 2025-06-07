# shopping-cart-front-examen-c

Aplicación web para una empresa con consumo de la API [DummyJSON](https://dummyjson.com/).

---

## Índice

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Guía de Archivos](#guía-de-archivos)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Desarrolladores](#desarrolladores)

---

## Descripción General

Este proyecto es una aplicación web que permite gestionar usuarios, productos y carritos de compras consumiendo la API DummyJSON. Incluye autenticación, panel de administración y visualización de datos en tablas y modales.

![image](https://github.com/user-attachments/assets/fe694551-0c61-420c-928c-a40f9f52a6f0)
![image](https://github.com/user-attachments/assets/077a9ac7-a265-4bcd-8798-9ef2711190ce)
![image](https://github.com/user-attachments/assets/cbcdb97d-2ae9-4e5c-8fba-aa604cde1358)
![image](https://github.com/user-attachments/assets/78b6621f-2d7d-4a6e-aef9-9ef8d5030c41)
![image](https://github.com/user-attachments/assets/174d975e-e90f-462d-9e29-632d01c6645e)


---

## Estructura del Proyecto

```
index.html
README.md
admin/
    dashboard.html
js/
    cartService.js
    dashboardService.js
    loginService.js
    productsService.js
    userService.js
    util.js
```

---

## Tecnologías Usadas

- **HTML5**
- **CSS3** (Bootstrap 5)
- **JavaScript** 
- **Font Awesome**

---

## Guía de Archivos

### `index.html`

Página principal con el formulario de login. Incluye:
- Formulario de acceso (`loginForm`)
- Mensajes de alerta
- Redirección al dashboard tras login exitoso

### `admin/dashboard.html`

Panel de administración:
- Navegación para usuarios, productos y carritos
- Área dinámica para mostrar tablas y detalles
- Modal para ver detalles de usuario

### `js/loginService.js`

Lógica de autenticación:
- Envía credenciales a DummyJSON
- Maneja respuestas y muestra alertas
- Guarda el token en `localStorage` y redirige al dashboard

### `js/dashboardService.js`

Control de acceso al dashboard:
- Verifica la existencia del token
- Permite cerrar sesión (elimina token y redirige al login)

### `js/userService.js`

Gestión de usuarios:
- Obtiene y muestra la lista de usuarios en una tabla
- Permite ver detalles de usuario en un modal
- Maneja errores de la API
- Permite crear un nuevo usuario

### `js/productService.js`

Gestión de productos:
- Obtiene y muestra productos en una tabla paginada
- Visualiza propiedades como nombre, año y color
- Permite crear un nuevo producto

### `js/cartService.js`

Gestión de carritos:
- Obtiene y muestra carritos en una tabla
- Permite ver detalles de cada carrito 
- Permite crear un nuevo carrito

---

## Flujo de la Aplicación

1. **Login:**  
   El usuario accede a `index.html`, ingresa sus credenciales y, si son válidas, es redirigido al dashboard.

2. **Dashboard:**  
   En `admin/dashboard.html`, el usuario puede navegar entre usuarios, productos y carritos.  
   - Al seleccionar una opción, se muestra la información correspondiente en la tabla central.
   - Puede ver detalles de usuarios en un modal.
   - Puede cerrar sesión desde el botón "Salir".

3. **Seguridad:**  
   El acceso al dashboard está protegido por token. Si no existe token, se redirige al login.

---

## Desarrolladores

👨‍💻 **Larry Bohórquez** - 192359  
👨‍💻 **Joan Monroy** - 192374
