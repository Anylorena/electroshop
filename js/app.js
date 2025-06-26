// Espera a que el contenido del DOM esté completamente cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // SELECTORES DEL DOM: Guardamos en variables los elementos HTML con los que vamos a interactuar.
    const productGrid = document.getElementById('product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const loader = document.getElementById('loader');
    
    // Selectores del Carrito
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const finalizePurchaseButton = document.getElementById('finalize-purchase');

    // ESTADO DE LA APLICACIÓN: Variables para almacenar los datos.
    let allProducts = []; // Almacenará todos los productos de la API.
    let cart = {};        // Usaremos un objeto para el carrito para un acceso rápido por ID.

    // FUNCIÓN PRINCIPAL: Se ejecuta al cargar la página.
    async function initializeApp() {
        loadCartFromLocalStorage(); // Carga el carrito guardado
        await fetchProducts();      // Obtiene los productos de la API
        addEventListeners();        // Configura los eventos de la UI
    }

    // 1. CONSUMO DE API
    async function fetchProducts() {
        loader.style.display = 'block'; // Muestra el spinner de carga
        productGrid.innerHTML = '';     // Limpia el grid de productos
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allProducts = await response.json();
            renderProducts(allProducts);
            populateCategories();
        } catch (error) {
            productGrid.innerHTML = `<p class="text-danger text-center">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>`;
            console.error('Error fetching products:', error);
        } finally {
            loader.style.display = 'none'; // Oculta el spinner de carga
        }
    }

    // 2. RENDERIZADO DINÁMICO DEL DOM
    function renderProducts(products) {
        productGrid.innerHTML = ''; // Limpia el contenido actual
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="text-center col-12">No se encontraron productos que coincidan con tu búsqueda.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
            productCard.innerHTML = `
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text product-category">${product.category}</p>
                        <p class="card-text price">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-add-to-cart" data-id="${product.id}">
                            <i class="bi bi-cart-plus-fill"></i> Agregar al Carrito
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function populateCategories() {
        const categories = [...new Set(allProducts.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    }

    // 3. LÓGICA DEL CARRITO DE COMPRAS
    function addToCart(productId) {
        if (cart[productId]) {
            cart[productId].quantity++;
        } else {
            const product = allProducts.find(p => p.id === productId);
            cart[productId] = { ...product, quantity: 1 };
        }
        updateCart();
    }
    
    function updateCartQuantity(productId, change) {
        if (cart[productId]) {
            cart[productId].quantity += change;
            if (cart[productId].quantity <= 0) {
                delete cart[productId];
            }
            updateCart();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (Object.keys(cart).length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        } else {
            for (const id in cart) {
                const item = cart[id];
                total += item.price * item.quantity;
                totalItems += item.quantity;

                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="btn btn-sm btn-outline-secondary btn-quantity" data-id="${item.id}" data-change="-1">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary btn-quantity" data-id="${item.id}" data-change="1">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            }
        }

        cartTotalEl.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }

    function updateCart() {
        saveCartToLocalStorage();
        renderCart();
    }
    
    function finalizePurchase() {
        if (Object.keys(cart).length === 0) {
            alert('Tu carrito está vacío. Agrega productos para poder comprar.');
            return;
        }

        if (confirm('¿Estás seguro de que quieres finalizar tu compra?')) {
            cart = {}; // Vacía el objeto del carrito
            updateCart(); // Actualiza el localStorage y la UI
            
            // Cierra el offcanvas del carrito
            const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasCart'));
            offcanvas.hide();

            // Muestra mensaje de agradecimiento
            alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
        }
    }

    // 4. MANEJO DE EVENTOS
    function addEventListeners() {
        // Evento para agregar al carrito
        productGrid.addEventListener('click', (e) => {
            if (e.target.closest('.btn-add-to-cart')) {
                const button = e.target.closest('.btn-add-to-cart');
                const productId = Number(button.dataset.id);
                addToCart(productId);
            }
        });

        // Eventos para filtros y ordenamiento
        categoryFilter.addEventListener('change', handleFilters);
        sortFilter.addEventListener('change', handleFilters);
        searchInput.addEventListener('input', handleFilters);
        
        // Evento para modificar cantidad en el carrito
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.matches('.btn-quantity')) {
                const productId = Number(e.target.dataset.id);
                const change = Number(e.target.dataset.change);
                updateCartQuantity(productId, change);
            }
        });
        
        // Evento para finalizar la compra
        finalizePurchaseButton.addEventListener('click', finalizePurchase);
    }
    
    function handleFilters() {
        let filteredProducts = [...allProducts];
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sort = sortFilter.value;

        // Filtrado por búsqueda
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Filtrado por categoría
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        // Ordenamiento
        switch(sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }

        renderProducts(filteredProducts);
    }

    // 5. PERSISTENCIA CON LOCALSTORAGE
    function saveCartToLocalStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            renderCart();
        }
    }

    // Inicia la aplicación
    initializeApp();
});