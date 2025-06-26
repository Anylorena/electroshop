# Tienda Online Dinámica - ElectroShop

![Estado del Proyecto](https://img.shields.io/badge/estado-completado-green)
![Tecnología](https://img.shields.io/badge/javascript-vanilla-yellow)
![Framework CSS](https://img.shields.io/badge/framework-bootstrap%205-purple)

Aplicación web de comercio electrónico que consume datos de una API pública, permite la interacción del usuario a través de un carrito de compras y aplica filtros dinámicos. Proyecto desarrollado con JavaScript puro (Vanilla JS) y Bootstrap 5 para la interfaz.

### Demo en Vivo
Puedes ver una demostración en vivo del proyecto aquí:
**[Ver Demo en Vivo](https://tu-usuario.github.io/tu-repositorio/)**

---

## Descripción Detallada

**ElectroShop** es un proyecto académico diseñado para demostrar habilidades en el desarrollo front-end utilizando tecnologías web fundamentales. La aplicación simula una tienda en línea, obteniendo productos desde la API pública [Fake Store API](https://fakestoreapi.com/products). Los usuarios pueden ver los productos, filtrarlos por categoría, buscarlos por nombre o descripción, ordenarlos por precio o nombre, y gestionar un carrito de compras persistente.

El objetivo principal es construir una experiencia de usuario moderna, funcional e intuitiva sin depender de frameworks de JavaScript como React, Angular o Vue.

## Funcionalidades Principales

Este proyecto cumple con los siguientes requisitos funcionales:

* ✅ **Consumo de API:**
    * Obtención de datos de productos de forma asíncrona usando `fetch()` y `async/await`.
    * Manejo de estados de carga y errores durante la petición a la API.

* ✅ **DOM Dinámico:**
    * Renderizado de productos en tarjetas (cards) de Bootstrap, creadas dinámicamente.
    * Actualización automática de la vista de productos al aplicar filtros u ordenamientos.

* ✅ **Carrito de Compras Completo:**
    * Sistema para agregar y eliminar productos.
    * Posibilidad de aumentar o disminuir la cantidad de cada producto desde el carrito.
    * Cálculo y visualización en tiempo real del total de la compra.
    * El carrito es accesible desde un panel lateral (offcanvas de Bootstrap) para una mejor experiencia de usuario.

* ✅ **Eventos Interactivos:**
    * **`click`**: Para agregar productos al carrito, modificar cantidades o finalizar la compra.
    * **`change`**: En los menús desplegables (`<select>`) para filtrar por categoría y ordenar los productos.
    * **`input`**: En la barra de búsqueda para filtrar productos en tiempo real mientras el usuario escribe.

* ✅ **Persistencia de Datos con `localStorage`:**
    * El contenido del carrito de compras se guarda en el `localStorage` del navegador.
    * Al recargar la página, el carrito mantiene su estado, permitiendo al usuario continuar su compra.

* ✅ **Flujo de Compra:**
    * Botón para "Finalizar Compra" que muestra un diálogo de confirmación.
    * Al confirmar, el carrito se vacía y se muestra un mensaje de "Gracias por su compra".

* ✅ **Diseño Responsivo y Usabilidad:**
    * La interfaz se adapta a diferentes tamaños de pantalla (móvil, tablet y escritorio) gracias a Bootstrap 5.
    * Diseño limpio y enfocado en la usabilidad, con una paleta de colores atractiva y una jerarquía visual clara.

* ✅ **Código Organizado y Modular:**
    * El código está separado en archivos `index.html`, `css/styles.css` y `js/app.js`.
    * El archivo JavaScript está estructurado en funciones con responsabilidades únicas para facilitar su lectura y mantenimiento.

---

## Tecnologías Utilizadas

* **HTML5**: Para la estructura semántica del contenido.
* **CSS3**: Para los estilos personalizados y la paleta de colores.
* **JavaScript (ES6+)**: Para toda la lógica y la interactividad (sin frameworks).
* **Bootstrap 5**: Framework de CSS para el diseño responsivo, componentes y layout.
* **Bootstrap Icons**: Para la iconografía de la interfaz.
* **Fake Store API**: Como fuente de datos de los productos.

---

## Instalación y Uso

No se requieren herramientas especiales ni procesos de construcción para ejecutar este proyecto.

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Anylorena/electroshop](https://github.com/Anylorena/electroshop)
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd electroshop
    ```

3.  **Abre el archivo `index.html` en tu navegador web.**

    Para una mejor experiencia de desarrollo, se recomienda usar una extensión como **Live Server** en Visual Studio Code, que recarga automáticamente la página al detectar cambios en los archivos.

---

## Estructura de Archivos

```
Electroshop/

├── index.html # pagina principal
├── css/
│     └── estyles.css # Estilos personalizados
├── js/
│     └── app.js # Lógica principal de la aplicación
│
└── README.md
```
---

## Autor

* **Anylorena Torres**

## Agradecimientos

Un agradecimiento especial a **Fake Store API** por proporcionar los datos de los productos de forma gratuita para el desarrollo de este proyecto.
