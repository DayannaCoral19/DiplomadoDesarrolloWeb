// ==================== VARIABLES GLOBALES ====================
const ADMIN_USER = {
    id: 1,
    name: "Administrador Daycor",
    email: "dayannacor@hotmail.com",
    phone: "3106571039",
    address: "Calle 13 #7-54, Ipiales - Nariño",
    password: "Admin1234*",
    role: "admin",
    active: true,
    createdAt: new Date().toISOString()
};

let productsDB = {
    papeleria: JSON.parse(localStorage.getItem('daycor_products_papeleria')) || [],
    oficina: JSON.parse(localStorage.getItem('daycor_products_oficina')) || [],
    libreria: JSON.parse(localStorage.getItem('daycor_products_libreria')) || [],
    detalles: JSON.parse(localStorage.getItem('daycor_products_detalles')) || []
};

let users = JSON.parse(localStorage.getItem('daycor_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('daycor_current_user')) || null;
let cart = JSON.parse(localStorage.getItem('daycor_cart')) || [];
let coupons = JSON.parse(localStorage.getItem('daycor_coupons')) || [];
let menuSettings = JSON.parse(localStorage.getItem('daycor_menu_settings')) || {
    papeleria: true, oficina: true, libreria: true, detalles: true, contacto: true
};
let images = JSON.parse(localStorage.getItem('daycor_images')) || [];

let currentAdminModule = 'papeleria';
let currentViewMode = 'grid';
let appliedCoupon = null;
let currentEditingProduct = null;
let currentEditingModule = null;
let currentEditingIndex = null;

// ==================== FUNCIÓN PARA OBTENER URL DE IMAGEN ====================
function getImageUrl(imagenPath) {
    if (!imagenPath) return 'https://placehold.co/300x220/cccccc/white?text=Sin+Imagen';
    
    if (imagenPath.startsWith('http://') || imagenPath.startsWith('https://')) {
        return imagenPath;
    }
    
    if (imagenPath.startsWith('img/')) {
        return imagenPath;
    }
    
    return `https://placehold.co/300x220/1a237e/white?text=${encodeURIComponent(imagenPath)}`;
}

// ==================== INICIALIZAR DATOS POR DEFECTO ====================
if (users.length === 0) {
    users = [ADMIN_USER];
    localStorage.setItem('daycor_users', JSON.stringify(users));
} else if (!users.find(u => u.email === ADMIN_USER.email)) {
    users.push(ADMIN_USER);
    localStorage.setItem('daycor_users', JSON.stringify(users));
}

// Libros con imágenes
if (productsDB.libreria.length === 0) {
    productsDB.libreria = [
        { id: 1, codigo: "LIB-001", referencia: "ISBN-978-1", descripcion: "Cien Años de Soledad", autor: "Gabriel García Márquez", editorial: "Planeta", precioUnidad: 45000, precioPack: 250000, imagen: "https://placehold.co/300x220/1a237e/white?text=Cien+Años+de+Soledad", estado: "activo", modulo: "libreria", promocion: true, categorias: ["Romance"], resumen: "La obra maestra de Gabriel García Márquez narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo." },
        { id: 2, codigo: "LIB-002", referencia: "ISBN-978-2", descripcion: "El Amor en los Tiempos del Cólera", autor: "Gabriel García Márquez", editorial: "Random Penguin", precioUnidad: 42000, precioPack: 235000, imagen: "https://placehold.co/300x220/ff6600/white?text=El+Amor+en+los+Tiempos+del+Cólera", estado: "activo", modulo: "libreria", promocion: false, categorias: ["Romance"], resumen: "Una historia de amor que abarca más de medio siglo." },
        { id: 3, codigo: "LIB-003", referencia: "ISBN-978-3", descripcion: "La Sombra del Viento", autor: "Carlos Ruiz Zafón", editorial: "Planeta", precioUnidad: 48000, precioPack: 265000, imagen: "https://placehold.co/300x220/1a237e/white?text=La+Sombra+del+Viento", estado: "activo", modulo: "libreria", promocion: true, categorias: ["Suspenso"], resumen: "Un joven llamado Daniel Sempere es llevado por su padre al Cementerio de los Libros Olvidados." },
        { id: 4, codigo: "LIB-004", referencia: "ISBN-978-4", descripcion: "El Alquimista", autor: "Paulo Coelho", editorial: "Urano", precioUnidad: 35000, precioPack: 195000, imagen: "https://placehold.co/300x220/ff6600/white?text=El+Alquimista", estado: "activo", modulo: "libreria", promocion: false, categorias: ["Superación"], resumen: "Santiago, un joven pastor andaluz, viaja desde su tierra natal hasta los desiertos de Egipto en busca de un tesoro." },
        { id: 5, codigo: "LIB-005", referencia: "ISBN-978-5", descripcion: "El Principito", autor: "Antoine de Saint-Exupéry", editorial: "Pan House", precioUnidad: 28000, precioPack: 155000, imagen: "https://placehold.co/300x220/1a237e/white?text=El+Principito", estado: "activo", modulo: "libreria", promocion: true, categorias: ["Superación"], resumen: "Un piloto perdido en el desierto conoce a un pequeño príncipe que viene de otro planeta." },
        { id: 6, codigo: "LIB-006", referencia: "ISBN-978-6", descripcion: "1984", autor: "George Orwell", editorial: "Random Penguin", precioUnidad: 39000, precioPack: 215000, imagen: "https://placehold.co/300x220/ff6600/white?text=1984", estado: "activo", modulo: "libreria", promocion: false, categorias: ["Ciencia Ficción"], resumen: "En una sociedad totalitaria dominada por el Gran Hermano, Winston Smith desafía el sistema." },
        { id: 7, codigo: "LIB-007", referencia: "ISBN-978-7", descripcion: "El Hobbit", autor: "J.R.R. Tolkien", editorial: "Planeta", precioUnidad: 52000, precioPack: 285000, imagen: "https://placehold.co/300x220/1a237e/white?text=El+Hobbit", estado: "activo", modulo: "libreria", promocion: true, categorias: ["Aventura"], resumen: "Bilbo Bolsón, un hobbit hogareño, es reclutado por el mago Gandalf y trece enanos para recuperar un tesoro guardado por el dragón Smaug." },
        { id: 8, codigo: "LIB-008", referencia: "ISBN-978-8", descripcion: "La Chica del Tren", autor: "Paula Hawkins", editorial: "Urano", precioUnidad: 38000, precioPack: 210000, imagen: "https://placehold.co/300x220/ff6600/white?text=La+Chica+del+Tren", estado: "activo", modulo: "libreria", promocion: false, categorias: ["Suspenso"], resumen: "Rachel toma el mismo tren todos los días y observa a una pareja desde la ventana." }
    ];
    localStorage.setItem('daycor_products_libreria', JSON.stringify(productsDB.libreria));
}

if (coupons.length === 0) {
    coupons.push({ id: 1, code: "DESC50", discount: 50, startDate: "2024-01-01", endDate: "2024-12-31", active: true });
    localStorage.setItem('daycor_coupons', JSON.stringify(coupons));
}

// ==================== FUNCIONES DE UTILIDAD ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-CO').format(Math.round(price));
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function saveModuleData() {
    localStorage.setItem(`daycor_products_${currentAdminModule}`, JSON.stringify(productsDB[currentAdminModule]));
}

function updateBrandsVisibility() {
    const brandsSection = document.getElementById('brandsSection');
    const activePage = document.querySelector('.page.active');
    if (brandsSection) {
        brandsSection.style.display = (activePage && activePage.id === 'inicio') ? 'block' : 'none';
    }
}

// ==================== GESTIÓN DE MENÚS ====================
function renderMenuSettings() {
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
        const menuName = toggle.getAttribute('data-menu');
        if (menuSettings[menuName] !== undefined) toggle.checked = menuSettings[menuName];
        toggle.addEventListener('change', function() {
            menuSettings[this.getAttribute('data-menu')] = this.checked;
            localStorage.setItem('daycor_menu_settings', JSON.stringify(menuSettings));
            updateNavigationMenu();
            showNotification(`Módulo ${this.checked ? 'activado' : 'inactivado'}`);
        });
    });
}

function updateNavigationMenu() {
    document.querySelectorAll('.nav-item').forEach(item => {
        const modulo = item.getAttribute('data-modulo');
        if (modulo === 'admin') return;
        if (modulo && menuSettings[modulo] !== undefined) {
            if (!currentUser || currentUser.role !== 'admin') {
                item.style.display = menuSettings[modulo] ? 'flex' : 'none';
            } else {
                item.style.display = 'flex';
            }
        }
    });
}

// ==================== LIBRERÍA ====================
function loadFilterOptions() {
    const editoriales = [...new Set(productsDB.libreria.map(book => book.editorial))];
    const autores = [...new Set(productsDB.libreria.map(book => book.autor))];
    const pubContainer = document.getElementById('publisherFilters');
    const authContainer = document.getElementById('authorFilters');
    if (pubContainer) pubContainer.innerHTML = editoriales.map(ed => `<label><input type="checkbox" class="publisher-filter" value="${ed}"> ${ed}</label>`).join('');
    if (authContainer) authContainer.innerHTML = autores.map(aut => `<label><input type="checkbox" class="author-filter" value="${aut}"> ${aut}</label>`).join('');
}

function renderLibreriaWithFilters() {
    let filteredBooks = [...productsDB.libreria.filter(b => b.estado === 'activo')];
    const searchTerm = document.getElementById('searchBooksInput')?.value.toLowerCase() || '';
    if (searchTerm) filteredBooks = filteredBooks.filter(b => b.descripcion.toLowerCase().includes(searchTerm) || (b.autor && b.autor.toLowerCase().includes(searchTerm)) || (b.editorial && b.editorial.toLowerCase().includes(searchTerm)));
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    if (selectedCategories.length) filteredBooks = filteredBooks.filter(b => b.categorias && b.categorias.some(cat => selectedCategories.includes(cat)));
    const selectedPublishers = Array.from(document.querySelectorAll('.publisher-filter:checked')).map(cb => cb.value);
    if (selectedPublishers.length) filteredBooks = filteredBooks.filter(b => selectedPublishers.includes(b.editorial));
    const selectedAuthors = Array.from(document.querySelectorAll('.author-filter:checked')).map(cb => cb.value);
    if (selectedAuthors.length) filteredBooks = filteredBooks.filter(b => selectedAuthors.includes(b.autor));
    const minPrice = parseInt(document.getElementById('priceMin')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('priceMax')?.value) || 200000;
    filteredBooks = filteredBooks.filter(b => b.precioUnidad >= minPrice && b.precioUnidad <= maxPrice);
    const promoOnly = document.getElementById('promoOnly')?.checked || false;
    if (promoOnly) filteredBooks = filteredBooks.filter(b => b.promocion === true);
    const sortBy = document.getElementById('sortBy')?.value || 'default';
    if (sortBy === 'price_asc') filteredBooks.sort((a, b) => a.precioUnidad - b.precioUnidad);
    else if (sortBy === 'price_desc') filteredBooks.sort((a, b) => b.precioUnidad - a.precioUnidad);
    else if (sortBy === 'title_asc') filteredBooks.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    else if (sortBy === 'title_desc') filteredBooks.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
    const grid = document.getElementById('libreriaProductsGrid');
    if (!grid) return;
    if (filteredBooks.length === 0) { grid.innerHTML = '<div style="text-align:center;padding:2rem;color:#6c757d"><i class="fas fa-search" style="font-size:2rem;margin-bottom:1rem;display:block"></i>No se encontraron libros</div>'; return; }
    if (currentViewMode === 'grid') {
        grid.className = 'books-grid-view';
        grid.innerHTML = filteredBooks.map(book => `
            <div class="book-card" onclick="showBookDetail(${book.id})">
                ${book.promocion ? '<div class="promo-badge">🔥 PROMOCIÓN</div>' : ''}
                <div class="image-container">
                    <img src="${getImageUrl(book.imagen)}" alt="${book.descripcion}" onerror="this.src='https://placehold.co/300x220/1a237e/white?text=Libro'">
                </div>
                <div class="book-info">
                    <h4>📖 ${escapeHtml(book.descripcion)}</h4>
                    <div class="book-author"><i class="fas fa-user"></i> ${escapeHtml(book.autor || 'Autor por definir')}</div>
                    <div class="book-publisher"><i class="fas fa-building"></i> ${escapeHtml(book.editorial || 'Editorial por definir')}</div>
                    <div class="book-categories">${book.categorias ? book.categorias.map(cat => `<span class="category-tag">#${cat}</span>`).join('') : '<span class="category-tag">#General</span>'}</div>
                    <div class="book-price">💰 $${formatPrice(book.precioUnidad)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartFromLibreria(${book.id})"><i class="fas fa-cart-plus"></i> Agregar a cotización</button>
                </div>
            </div>
        `).join('');
    }
}

function initLibraryFilters() {
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const minPriceVal = document.getElementById('minPriceVal');
    const maxPriceVal = document.getElementById('maxPriceVal');
    if (priceMin) priceMin.addEventListener('input', () => { if (minPriceVal) minPriceVal.textContent = formatPrice(priceMin.value); renderLibreriaWithFilters(); });
    if (priceMax) priceMax.addEventListener('input', () => { if (maxPriceVal) maxPriceVal.textContent = formatPrice(priceMax.value); renderLibreriaWithFilters(); });
    document.querySelectorAll('.category-filter, .publisher-filter, .author-filter').forEach(cb => cb.addEventListener('change', renderLibreriaWithFilters));
    const promoOnly = document.getElementById('promoOnly');
    if (promoOnly) promoOnly.addEventListener('change', renderLibreriaWithFilters);
    const sortBy = document.getElementById('sortBy');
    if (sortBy) sortBy.addEventListener('change', renderLibreriaWithFilters);
    const searchInput = document.getElementById('searchBooksInput');
    if (searchInput) searchInput.addEventListener('input', renderLibreriaWithFilters);
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) clearBtn.addEventListener('click', () => { document.querySelectorAll('.category-filter:checked, .publisher-filter:checked, .author-filter:checked').forEach(cb => cb.checked = false); if (searchInput) searchInput.value = ''; if (priceMin) priceMin.value = 0; if (priceMax) priceMax.value = 200000; if (minPriceVal) minPriceVal.textContent = '0'; if (maxPriceVal) maxPriceVal.textContent = formatPrice(200000); if (promoOnly) promoOnly.checked = false; if (sortBy) sortBy.value = 'default'; renderLibreriaWithFilters(); });
    document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentViewMode = btn.getAttribute('data-view'); renderLibreriaWithFilters(); }));
}

// ==================== MODAL DETALLE DEL LIBRO ====================
function showBookDetail(bookId) {
    const book = productsDB.libreria.find(b => b.id === bookId);
    if (!book) return;
    const modal = document.getElementById('bookDetailModal');
    const content = document.getElementById('bookDetailContent');
    const stock = Math.floor(Math.random() * 50) + 10;
    content.innerHTML = `
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap">
            <div style="flex:1;min-width:200px"><img src="${getImageUrl(book.imagen)}" alt="${book.descripcion}" style="width:100%;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1)" onerror="this.src='https://placehold.co/300x400/1a237e/white?text=Libro'"></div>
            <div style="flex:2">
                <h2 style="color:#1a237e;margin-bottom:1rem">📖 ${escapeHtml(book.descripcion)}</h2>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Código:</strong> ${book.codigo}</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Referencia:</strong> ${book.referencia}</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Autor:</strong> ${escapeHtml(book.autor || 'No especificado')}</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Editorial:</strong> ${escapeHtml(book.editorial || 'No especificada')}</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Categorías:</strong> ${book.categorias ? book.categorias.map(c => `#${c}`).join(', ') : 'General'}</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Stock:</strong> 📦 ${stock} unidades</div>
                <div style="margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:1px solid #e0e5ec"><strong>Resumen:</strong><div style="margin-top:0.5rem;line-height:1.6;color:#4a5568">${escapeHtml(book.resumen || 'Sin resumen disponible')}</div></div>
                <div style="font-size:1.5rem;font-weight:bold;color:#ff6600;margin:1rem 0">💰 Precio: $${formatPrice(book.precioUnidad)}</div>
                <div><strong>Oferta x6:</strong> $${formatPrice(book.precioPack)} (ahorro $${formatPrice(book.precioUnidad * 6 - book.precioPack)})</div>
                ${book.promocion ? '<div style="background:#ff6600;color:white;padding:5px 10px;border-radius:20px;display:inline-block;margin:1rem 0">🔥 EN PROMOCIÓN</div>' : ''}
                <div style="display:flex;gap:1rem;margin-top:1rem">
                    <button onclick="addToCartFromLibreria(${book.id}); closeBookDetailModal();" style="padding:0.6rem 1.2rem;background:#25D366;color:white;border:none;border-radius:8px;cursor:pointer"><i class="fas fa-cart-plus"></i> Cotizar</button>
                    <button onclick="closeBookDetailModal()" style="padding:0.6rem 1.2rem;background:#6c757d;color:white;border:none;border-radius:8px;cursor:pointer"><i class="fas fa-arrow-left"></i> Regresar</button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function closeBookDetailModal() {
    document.getElementById('bookDetailModal').style.display = 'none';
}

// ==================== ADMIN - GESTIÓN DE PRODUCTOS ====================
function renderProductsByModule(module) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    const productsList = productsDB[module] || [];
    if (productsList.length === 0) { productsGrid.innerHTML = '<p style="text-align:center;padding:2rem">No hay productos</p>'; return; }
    productsGrid.innerHTML = productsList.map((product, idx) => `
        <div class="product-card-module" onclick="openEditProductModal('${module}', ${idx})">
            <div class="product-status ${product.estado}">${product.estado === 'activo' ? '✅ Activo' : '⛔ Inactivo'}</div>
            <div class="image-container">
                <img src="${getImageUrl(product.imagen)}" alt="${product.descripcion}" onerror="this.src='https://placehold.co/300x150/cccccc/white?text=Sin+Imagen'">
            </div>
            <div class="product-info">
                <h4>📦 ${escapeHtml(product.descripcion)}</h4>
                <p><strong>Código:</strong> ${product.codigo} | <strong>Ref:</strong> ${product.referencia}</p>
                <p class="price">💰 $${formatPrice(product.precioUnidad)}</p>
                <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px">
                    <button onclick="event.stopPropagation(); openEditProductModal('${module}', ${idx})" style="background:#2196F3;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer"><i class="fas fa-edit"></i> Editar</button>
                    <button onclick="event.stopPropagation(); deleteProduct('${module}', ${idx})" style="background:#f44336;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer"><i class="fas fa-trash"></i> Eliminar</button>
                    <button onclick="event.stopPropagation(); addToCartFromModule('${module}', ${idx})" style="background:#25D366;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer"><i class="fab fa-whatsapp"></i> Cotizar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openEditProductModal(module, index) {
    const product = productsDB[module][index];
    if (!product) return;
    currentEditingProduct = { ...product };
    currentEditingModule = module;
    currentEditingIndex = index;
    document.getElementById('editProductCode').value = product.codigo || '';
    document.getElementById('editProductReference').value = product.referencia || '';
    document.getElementById('editProductDescription').value = product.descripcion || '';
    document.getElementById('editProductPriceUnit').value = product.precioUnidad || 0;
    document.getElementById('editProductPricePack').value = product.precioPack || 0;
    document.getElementById('editProductImageUrl').value = product.imagen || '';
    document.getElementById('editProductStatus').value = product.estado || 'activo';
    const bookFields = document.getElementById('editBookFields');
    if (module === 'libreria') {
        bookFields.style.display = 'block';
        document.getElementById('editBookAuthor').value = product.autor || '';
        document.getElementById('editBookPublisher').value = product.editorial || '';
        document.getElementById('editBookPromotion').value = product.promocion ? 'true' : 'false';
        document.getElementById('editBookSummary').value = product.resumen || '';
        const categoriesContainer = document.getElementById('editBookCategories');
        const allCategories = ['Romance', 'Acción', 'Suspenso', 'Superación', 'Ciencia Ficción', 'Aventura', 'Fantasía', 'Terror', 'Poesía', 'Historia', 'Biografía', 'Infantil'];
        categoriesContainer.innerHTML = allCategories.map(cat => `<label><input type="checkbox" value="${cat}" ${product.categorias && product.categorias.includes(cat) ? 'checked' : ''}> ${cat}</label>`).join('');
    } else {
        bookFields.style.display = 'none';
    }
    document.getElementById('editProductModal').style.display = 'block';
}

function closeEditProductModal() {
    document.getElementById('editProductModal').style.display = 'none';
    currentEditingProduct = null;
    currentEditingModule = null;
    currentEditingIndex = null;
}

function saveEditedProduct(event) {
    event.preventDefault();
    if (!currentEditingProduct || currentEditingModule === null || currentEditingIndex === null) return;
    const updatedProduct = {
        ...currentEditingProduct,
        codigo: document.getElementById('editProductCode').value,
        referencia: document.getElementById('editProductReference').value,
        descripcion: document.getElementById('editProductDescription').value,
        precioUnidad: parseFloat(document.getElementById('editProductPriceUnit').value),
        precioPack: parseFloat(document.getElementById('editProductPricePack').value),
        imagen: document.getElementById('editProductImageUrl').value,
        estado: document.getElementById('editProductStatus').value,
        updatedAt: new Date().toISOString()
    };
    if (currentEditingModule === 'libreria') {
        updatedProduct.autor = document.getElementById('editBookAuthor').value;
        updatedProduct.editorial = document.getElementById('editBookPublisher').value;
        updatedProduct.promocion = document.getElementById('editBookPromotion').value === 'true';
        updatedProduct.resumen = document.getElementById('editBookSummary').value;
        const selectedCategories = Array.from(document.querySelectorAll('#editBookCategories input:checked')).map(cb => cb.value);
        updatedProduct.categorias = selectedCategories;
    }
    productsDB[currentEditingModule][currentEditingIndex] = updatedProduct;
    saveModuleData();
    if (currentEditingModule === 'libreria') renderLibreriaWithFilters();
    renderProductsByModule(currentEditingModule);
    showNotification('✅ Producto actualizado correctamente');
    closeEditProductModal();
}

function saveProduct() {
    const codigo = document.getElementById('productCode')?.value;
    const referencia = document.getElementById('productReference')?.value;
    const descripcion = document.getElementById('productDescription')?.value;
    const precioUnidad = parseFloat(document.getElementById('productPriceUnit')?.value);
    const precioPack = parseFloat(document.getElementById('productPricePack')?.value);
    const imagen = document.getElementById('productImageUrl')?.value;
    const estado = document.getElementById('productStatus')?.value;
    const resumen = document.getElementById('productSummary')?.value;
    if (!codigo || !referencia || !descripcion || !precioUnidad) { showNotification('Complete campos obligatorios', 'error'); return; }
    const newProduct = { id: Date.now(), codigo, referencia, descripcion, precioUnidad, precioPack: precioPack || precioUnidad * 5.5, imagen, estado, modulo: currentAdminModule, promocion: false, createdAt: new Date().toISOString() };
    if (currentAdminModule === 'libreria') {
        newProduct.autor = "Autor por definir";
        newProduct.editorial = "Editorial por definir";
        newProduct.categorias = [];
        newProduct.resumen = resumen || "Sin resumen disponible";
    }
    productsDB[currentAdminModule].push(newProduct);
    saveModuleData();
    renderProductsByModule(currentAdminModule);
    document.getElementById('productCode').value = '';
    document.getElementById('productReference').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPriceUnit').value = '';
    document.getElementById('productPricePack').value = '';
    document.getElementById('productImageUrl').value = '';
    if (document.getElementById('productSummary')) document.getElementById('productSummary').value = '';
    showNotification(`Producto agregado a ${currentAdminModule}`);
}

function deleteProduct(module, index) {
    if (confirm('¿Eliminar este producto?')) {
        productsDB[module].splice(index, 1);
        saveModuleData();
        renderProductsByModule(module);
        showNotification('Producto eliminado');
    }
}

// ==================== CARGA MASIVA EXCEL ====================
function downloadTemplate() {
    const templateData = [
        ['Codigo_producto', 'Descripcion_producto', 'Referencia', 'Precio_1_unidad', 'Precio_2_x6', 'Link_imagen', 'Descripcion_larga', 'Estado', 'Autor', 'Editorial', 'Promocion', 'Categorias', 'Resumen'],
        ['LIB-001', 'Cien Años de Soledad', 'ISBN-001', 45000, 250000, 'https://placehold.co/300x200/1a237e/white?text=Cien+Años', 'Novela de García Márquez', 'activo', 'Gabriel García Márquez', 'Planeta', 'Si', 'Romance,Realismo Mágico', 'Resumen del libro...']
    ];
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    ws['!cols'] = [{wch:20},{wch:30},{wch:15},{wch:15},{wch:15},{wch:40},{wch:40},{wch:10},{wch:25},{wch:20},{wch:10},{wch:25},{wch:50}];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    XLSX.writeFile(wb, `plantilla_productos_${currentAdminModule}.xlsx`);
    showNotification('Plantilla descargada');
}

function downloadCurrentData() {
    const products = productsDB[currentAdminModule];
    if (products.length === 0) { showNotification('No hay datos', 'error'); return; }
    const data = [['Codigo', 'Descripcion', 'Referencia', 'Precio1', 'Precio6', 'Imagen', 'Estado', 'Autor', 'Editorial', 'Promocion', 'Categorias', 'Resumen']];
    products.forEach(p => { data.push([p.codigo, p.descripcion, p.referencia, p.precioUnidad, p.precioPack, p.imagen, p.estado, p.autor || '', p.editorial || '', p.promocion ? 'Si' : 'No', p.categorias ? p.categorias.join(',') : '', p.resumen || '']); });
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos');
    XLSX.writeFile(wb, `datos_${currentAdminModule}_${new Date().toISOString().split('T')[0]}.xlsx`);
    showNotification('Datos exportados');
}

function uploadExcel(file, updateMode = false) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
        if (rows.length < 2) { showNotification('Archivo sin datos', 'error'); return; }
        let count = 0;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 5) continue;
            const codigo = row[0]?.toString().trim();
            const descripcion = row[1]?.toString().trim();
            const referencia = row[2]?.toString().trim();
            const precioUnidad = parseFloat(row[3]);
            const precioPack = parseFloat(row[4]);
            let imagen = row[5]?.toString().trim() || '';
            const estado = row[7]?.toString().trim().toLowerCase() === 'activo' ? 'activo' : 'inactivo';
            if (!codigo || !descripcion || !referencia || isNaN(precioUnidad)) continue;
            if (updateMode) {
                const idx = productsDB[currentAdminModule].findIndex(p => p.codigo === codigo);
                if (idx !== -1) {
                    productsDB[currentAdminModule][idx] = { ...productsDB[currentAdminModule][idx], descripcion, referencia, precioUnidad, precioPack: precioPack || precioUnidad * 5.5, imagen, estado, updatedAt: new Date().toISOString() };
                    if (currentAdminModule === 'libreria') {
                        productsDB[currentAdminModule][idx].autor = row[8]?.toString().trim() || "Autor por definir";
                        productsDB[currentAdminModule][idx].editorial = row[9]?.toString().trim() || "Editorial por definir";
                        productsDB[currentAdminModule][idx].promocion = row[10]?.toString().toLowerCase() === 'si';
                        productsDB[currentAdminModule][idx].categorias = row[11]?.toString().split(',').map(c => c.trim()) || [];
                        productsDB[currentAdminModule][idx].resumen = row[12]?.toString().trim() || "Sin resumen disponible";
                    }
                    count++;
                } else {
                    const newProduct = { id: Date.now() + i, codigo, referencia, descripcion, precioUnidad, precioPack: precioPack || precioUnidad * 5.5, imagen, estado, modulo: currentAdminModule, promocion: false, createdAt: new Date().toISOString() };
                    if (currentAdminModule === 'libreria') {
                        newProduct.autor = row[8]?.toString().trim() || "Autor por definir";
                        newProduct.editorial = row[9]?.toString().trim() || "Editorial por definir";
                        newProduct.promocion = row[10]?.toString().toLowerCase() === 'si';
                        newProduct.categorias = row[11]?.toString().split(',').map(c => c.trim()) || [];
                        newProduct.resumen = row[12]?.toString().trim() || "Sin resumen disponible";
                    }
                    productsDB[currentAdminModule].push(newProduct);
                    count++;
                }
            } else {
                const newProduct = { id: Date.now() + i, codigo, referencia, descripcion, precioUnidad, precioPack: precioPack || precioUnidad * 5.5, imagen, estado, modulo: currentAdminModule, promocion: false, createdAt: new Date().toISOString() };
                if (currentAdminModule === 'libreria') {
                    newProduct.autor = row[8]?.toString().trim() || "Autor por definir";
                    newProduct.editorial = row[9]?.toString().trim() || "Editorial por definir";
                    newProduct.promocion = row[10]?.toString().toLowerCase() === 'si';
                    newProduct.categorias = row[11]?.toString().split(',').map(c => c.trim()) || [];
                    newProduct.resumen = row[12]?.toString().trim() || "Sin resumen disponible";
                }
                productsDB[currentAdminModule].push(newProduct);
                count++;
            }
        }
        if (count) { saveModuleData(); renderProductsByModule(currentAdminModule); showNotification(`${count} productos ${updateMode ? 'actualizados' : 'cargados'}`); }
        else showNotification('No se pudo cargar', 'error');
    };
    reader.readAsArrayBuffer(file);
}

// ==================== CARRITO ====================
function addToCartFromModule(module, index) {
    const product = productsDB[module][index];
    if (!product) return;
    if (!currentUser) { showNotification('Debe iniciar sesión', 'error'); openLoginModal(); return; }
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else cart.push({ id: product.id, codigo: product.codigo, descripcion: product.descripcion, precio: product.precioUnidad, modulo: module, quantity: 1 });
    localStorage.setItem('daycor_cart', JSON.stringify(cart));
    updateCartUI(); updateCartCount();
    showNotification(`${product.descripcion} agregado al carrito`);
}

function addToCartFromLibreria(productId) {
    const product = productsDB.libreria.find(p => p.id === productId);
    if (product) addToCartFromModule('libreria', productsDB.libreria.findIndex(p => p.id === productId));
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartDiscount = document.getElementById('cartDiscount');
    const cartFinalTotal = document.getElementById('cartFinalTotal');
    if (!cartItems) return;
    if (cart.length === 0) { cartItems.innerHTML = '<div style="text-align:center;padding:2rem"><i class="fas fa-shopping-cart" style="font-size:3rem;color:#ccc;margin-bottom:1rem;display:block"></i>🛒 Carrito vacío</div>'; if (cartTotal) cartTotal.textContent = '0'; if (cartDiscount) cartDiscount.textContent = '0'; if (cartFinalTotal) cartFinalTotal.textContent = '0'; return; }
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => { const subtotal = item.precio * item.quantity; total += subtotal; return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #e0e5ec;flex-wrap:wrap;gap:8px"><div style="flex:2"><strong>📚 ${escapeHtml(item.descripcion)}</strong><br><small>💰 $${formatPrice(item.precio)} c/u</small><br><small>Cód: ${item.codigo}</small></div><div><button onclick="updateQuantity(${index}, -1)">-</button><input type="number" value="${item.quantity}" min="1" style="width:60px;text-align:center" onchange="updateQuantity(${index}, 0, this.value)"><button onclick="updateQuantity(${index}, 1)">+</button></div><div><strong>$${formatPrice(subtotal)}</strong></div><button onclick="removeFromCart(${index})" style="background:#f44336;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer"><i class="fas fa-trash"></i></button></div>`; }).join('');
    let discountAmount = 0;
    if (appliedCoupon) discountAmount = total * (appliedCoupon.discount / 100);
    const finalTotal = total - discountAmount;
    if (cartTotal) cartTotal.textContent = formatPrice(total);
    if (cartDiscount) cartDiscount.textContent = formatPrice(discountAmount);
    if (cartFinalTotal) cartFinalTotal.textContent = formatPrice(finalTotal);
}

function updateCartCount() { const cc = document.getElementById('cartCount'); if(cc) cc.textContent = cart.reduce((s,i)=>s+i.quantity,0); }
function updateQuantity(i,c,n){ if(n!==null) cart[i].quantity=parseInt(n)||1; else cart[i].quantity+=c; if(cart[i].quantity<1) cart[i].quantity=1; localStorage.setItem('daycor_cart',JSON.stringify(cart)); updateCartUI(); updateCartCount(); }
function removeFromCart(i){ cart.splice(i,1); localStorage.setItem('daycor_cart',JSON.stringify(cart)); updateCartUI(); updateCartCount(); showNotification('Producto eliminado del carrito'); }

function applyCoupon() {
    const couponCode = document.getElementById('couponInput')?.value?.toUpperCase();
    if (!couponCode) { showNotification('Ingrese código de cupón', 'error'); return; }
    const coupon = coupons.find(c => c.code === couponCode && c.active === true);
    if (!coupon) { showNotification('Cupón inválido o inactivo', 'error'); return; }
    const today = new Date().toISOString().split('T')[0];
    if (coupon.startDate > today || coupon.endDate < today) { showNotification('Cupón fuera de fecha de vigencia', 'error'); return; }
    appliedCoupon = coupon;
    const couponInfo = document.getElementById('couponInfo');
    if (couponInfo) couponInfo.innerHTML = `🎫 Cupón ${coupon.code} aplicado: ${coupon.discount}% de descuento`;
    showNotification(`✨ Cupón ${coupon.code} aplicado! ${coupon.discount}% descuento`, 'success');
    updateCartUI();
}

function removeCoupon() { appliedCoupon = null; const ci = document.getElementById('couponInfo'); if(ci) ci.innerHTML = ''; showNotification('Cupón eliminado'); updateCartUI(); }

function clearCart() { 
    if (confirm('¿Está seguro de vaciar el carrito?')) { 
        cart = []; 
        appliedCoupon = null; 
        localStorage.setItem('daycor_cart', JSON.stringify(cart)); 
        updateCartUI(); 
        updateCartCount(); 
        showNotification('Carrito vaciado'); 
    } 
}

// ==================== FUNCIÓN ENVIAR COTIZACIÓN (CON VACIADO DE CARRITO) ====================
function sendQuoteToWhatsApp() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('Debe iniciar sesión para enviar una cotización', 'error');
        openLoginModal();
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        total += item.precio * item.quantity;
    });
    
    let discountAmount = 0;
    let couponText = '';
    if (appliedCoupon) {
        discountAmount = total * (appliedCoupon.discount / 100);
        couponText = `\n🎫 Cupón ${appliedCoupon.code}: -$${formatPrice(discountAmount)} (${appliedCoupon.discount}% OFF)`;
    }
    const finalTotal = total - discountAmount;
    
    let message = `📋 *COTIZACIÓN DAYCOR*\n\n`;
    message += `👤 *Cliente:* ${currentUser.name}\n`;
    message += `📞 *Teléfono:* ${currentUser.phone || 'No registrado'}\n`;
    message += `📍 *Dirección:* ${currentUser.address || 'No registrada'}\n\n`;
    message += `*🛒 PRODUCTOS SOLICITADOS:*\n`;
    message += `┌─────────────────────────────────┐\n`;
    
    cart.forEach(item => {
        const subtotal = item.precio * item.quantity;
        message += `│ 📦 ${item.descripcion}\n`;
        message += `│    Código: ${item.codigo}\n`;
        message += `│    Cantidad: ${item.quantity} x $${formatPrice(item.precio)}\n`;
        message += `│    Subtotal: $${formatPrice(subtotal)}\n`;
        message += `├─────────────────────────────────┤\n`;
    });
    
    message += `│ *SUBTOTAL: $${formatPrice(total)}*\n`;
    if (appliedCoupon) {
        message += `│ *🎫 Cupón ${appliedCoupon.code}: -$${formatPrice(discountAmount)}* (${appliedCoupon.discount}% OFF)\n`;
    }
    message += `│ *💰 TOTAL: $${formatPrice(finalTotal)}*\n`;
    message += `└─────────────────────────────────┘\n\n`;
    message += `*Fecha:* ${new Date().toLocaleString()}\n`;
    message += `*Método de pago:* Por confirmar\n`;
    message += `*Entrega:* Por confirmar\n\n`;
    message += `_Gracias por cotizar con Comercial Daycor_ 🌟`;
    
    window.open(`https://wa.me/573146876879?text=${encodeURIComponent(message)}`, '_blank');
    
    // Vaciar carrito después de enviar
    cart = [];
    appliedCoupon = null;
    localStorage.setItem('daycor_cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
    closeModal();
    showNotification('✅ Cotización enviada. El carrito ha sido vaciado.', 'success');
}

// ==================== AUTENTICACIÓN ====================
function registerUser(e){
    e.preventDefault();
    const name=document.getElementById('regName')?.value, email=document.getElementById('regEmail')?.value, phone=document.getElementById('regPhone')?.value, addr=document.getElementById('regAddress')?.value, pwd=document.getElementById('regPassword')?.value, cpwd=document.getElementById('regConfirmPassword')?.value, terms=document.getElementById('termsCheckbox')?.checked;
    if(!terms){ showNotification('Acepte términos', 'error'); return; }
    if(pwd!==cpwd){ showNotification('Contraseñas no coinciden', 'error'); return; }
    if(pwd.length<6){ showNotification('Mínimo 6 caracteres', 'error'); return; }
    if(users.find(u=>u.email===email)){ showNotification('Email ya registrado', 'error'); return; }
    users.push({id:Date.now(),name,email,phone,address:addr,password:pwd,role:'user',active:true,createdAt:new Date().toISOString()});
    localStorage.setItem('daycor_users',JSON.stringify(users));
    showNotification('Usuario registrado');
    closeModal();
    setTimeout(()=>openLoginModal(),500);
}

function loginUser(e){
    e.preventDefault();
    const email=document.getElementById('loginEmail')?.value, pwd=document.getElementById('loginPassword')?.value;
    const user=users.find(u=>u.email===email && u.password===pwd);
    if(!user){ showNotification('Credenciales incorrectas', 'error'); return; }
    if(!user.active){ showNotification('Usuario inactivo', 'error'); return; }
    currentUser=user;
    localStorage.setItem('daycor_current_user',JSON.stringify(currentUser));
    updateUIForUser();
    closeModal();
    showNotification(`Bienvenido ${user.name}`);
}

function logoutUser(){ 
    currentUser = null; 
    localStorage.removeItem('daycor_current_user'); 
    cart = []; 
    appliedCoupon = null; 
    localStorage.setItem('daycor_cart', JSON.stringify(cart)); 
    updateUIForUser(); 
    updateCartUI(); 
    updateCartCount(); 
    showNotification('Sesión cerrada'); 
    showPage('inicio'); 
}

function updateUIForUser(){
    const lb=document.getElementById('loginBtn'), lo=document.getElementById('logoutBtn'), ui=document.getElementById('userInfo'), cb=document.getElementById('cartBtn'), admi=document.getElementById('adminNavItem'), adn=document.getElementById('adminName');
    if(currentUser){
        if(lb) lb.style.display='none';
        if(lo) lo.style.display='flex';
        if(ui) ui.innerHTML=`<i class="fas fa-user-circle"></i> ${currentUser.name}`;
        if(cb) cb.style.display='flex';
        if(admi && currentUser.role==='admin'){ admi.style.display='flex'; if(adn) adn.textContent=currentUser.name; }
        else if(admi) admi.style.display='none';
    } else {
        if(lb) lb.style.display='flex';
        if(lo) lo.style.display='none';
        if(ui) ui.innerHTML='';
        if(cb) cb.style.display='none';
        if(admi) admi.style.display='none';
    }
    updateNavigationMenu();
}

// ==================== GESTIÓN DE USUARIOS ====================
function renderUsersTable(){
    const tb=document.getElementById('usersTableBody');
    if(!tb) return;
    tb.innerHTML=users.map(u=>`<tr><td><input type="checkbox" class="user-checkbox" data-user-id="${u.id}"></td><td>${u.id}</td><td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.email)}</td><td>${u.phone||'-'}</td><td><span class="user-role ${u.role}">${u.role==='admin'?'Admin':'Usuario'}</span></td><td><span class="user-status ${u.active?'active':'inactive'}">${u.active?'Activo':'Inactivo'}</span></td><td><button onclick="editUser(${u.id})" class="btn-edit"><i class="fas fa-edit"></i></button><button onclick="toggleUserStatus(${u.id})" class="btn-toggle"><i class="fas ${u.active?'fa-ban':'fa-check'}"></i></button>${u.role!=='admin'?`<button onclick="deleteUser(${u.id})" class="btn-delete"><i class="fas fa-trash"></i></button>`:''}</td></tr>`).join('');
}
function toggleUserStatus(id){ const u=users.find(u=>u.id===id); if(u&&u.role!=='admin'){ u.active=!u.active; localStorage.setItem('daycor_users',JSON.stringify(users)); renderUsersTable(); showNotification(`Usuario ${u.active?'activado':'inactivado'}`); } }
function activateAllUsers(){ users.forEach(u=>{if(u.role!=='admin')u.active=true;}); localStorage.setItem('daycor_users',JSON.stringify(users)); renderUsersTable(); showNotification('Todos activados'); }
function deactivateAllUsers(){ if(confirm('¿Inactivar todos los usuarios no admin?')){ users.forEach(u=>{if(u.role!=='admin')u.active=false;}); localStorage.setItem('daycor_users',JSON.stringify(users)); renderUsersTable(); showNotification('Usuarios inactivados'); } }
function editUser(id){ const u=users.find(u=>u.id===id); if(u){ const n=prompt('Nombre:',u.name); if(n) u.name=n; const p=prompt('Teléfono:',u.phone); if(p!==null) u.phone=p; localStorage.setItem('daycor_users',JSON.stringify(users)); renderUsersTable(); showNotification('Usuario actualizado'); } }
function deleteUser(id){ if(confirm('¿Eliminar?')){ users=users.filter(u=>u.id!==id); localStorage.setItem('daycor_users',JSON.stringify(users)); renderUsersTable(); showNotification('Usuario eliminado'); } }

// ==================== GESTIÓN DE CUPONES ====================
function renderCoupons(){ const g=document.getElementById('couponsGrid'); if(!g) return; if(!coupons.length){ g.innerHTML='<p>No hay cupones</p>'; return; } g.innerHTML=coupons.map(c=>`<div class="coupon-card"><div class="coupon-status ${c.active?'active':'inactive'}">${c.active?'Activo':'Inactivo'}</div><div class="coupon-code">${c.code}</div><div class="coupon-discount">${c.discount}% OFF</div><div class="coupon-dates">${c.startDate} - ${c.endDate}</div><button onclick="toggleCoupon(${c.id})">${c.active?'Inactivar':'Activar'}</button><button onclick="deleteCoupon(${c.id})">Eliminar</button></div>`).join(''); }
function createCoupon(){ const c=document.getElementById('couponCode')?.value.toUpperCase(), s=document.getElementById('couponStartDate')?.value, e=document.getElementById('couponEndDate')?.value, d=parseInt(document.getElementById('couponDiscount')?.value); if(!c||!s||!e||!d){ showNotification('Complete todos', 'error'); return; } if(coupons.find(cp=>cp.code===c)){ showNotification('Cupón ya existe', 'error'); return; } coupons.push({id:Date.now(),code:c,discount:d,startDate:s,endDate:e,active:true}); localStorage.setItem('daycor_coupons',JSON.stringify(coupons)); renderCoupons(); showNotification(`Cupón ${c} creado`); document.getElementById('couponCode').value=''; document.getElementById('couponStartDate').value=''; document.getElementById('couponEndDate').value=''; document.getElementById('couponDiscount').value=''; }
function toggleCoupon(id){ const c=coupons.find(c=>c.id===id); if(c){ c.active=!c.active; localStorage.setItem('daycor_coupons',JSON.stringify(coupons)); renderCoupons(); } }
function deleteCoupon(id){ if(confirm('¿Eliminar cupón?')){ coupons=coupons.filter(c=>c.id!==id); localStorage.setItem('daycor_coupons',JSON.stringify(coupons)); renderCoupons(); } }

// ==================== GESTIÓN DE IMÁGENES ====================
function renderImages(){ const g=document.getElementById('imagesGrid'); if(!g) return; if(!images.length){ g.innerHTML='<p>No hay imágenes</p>'; return; } g.innerHTML=images.map((img,idx)=>`<div class="image-card"><img src="${img.url}" onerror="this.src='https://placehold.co/300x150/cccccc/white?text=Error'"><div><strong>${img.name}</strong><br><small>${img.module} - ${img.function}</small></div><button onclick="deleteImage(${idx})">Eliminar</button><button onclick="copyImageUrl('${img.url}')">Copiar URL</button></div>`).join(''); }
function copyImageUrl(url){ navigator.clipboard.writeText(url).then(()=>showNotification('URL copiada')).catch(()=>showNotification('Error','error')); }
function addImage(){ const m=document.getElementById('imageModule')?.value, n=document.getElementById('imageName')?.value, u=document.getElementById('imageUrl')?.value, f=document.getElementById('imageFunction')?.value; if(!m||!n||!u||!f){ showNotification('Complete todos', 'error'); return; } images.push({id:Date.now(),module:m,name:n,url:u,function:f,active:true,createdAt:new Date().toISOString()}); localStorage.setItem('daycor_images',JSON.stringify(images)); renderImages(); showNotification('Imagen agregada'); document.getElementById('imageModule').value=''; document.getElementById('imageName').value=''; document.getElementById('imageUrl').value=''; document.getElementById('imageFunction').value=''; }
function deleteImage(i){ if(confirm('¿Eliminar imagen?')){ images.splice(i,1); localStorage.setItem('daycor_images',JSON.stringify(images)); renderImages(); } }

// ==================== NAVEGACIÓN ====================
function showPage(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const target=document.getElementById(pageId);
    if(target) target.classList.add('active');
    updateBrandsVisibility();
    if(pageId==='libreria'){ loadFilterOptions(); initLibraryFilters(); renderLibreriaWithFilters(); }
    if(pageId==='admin'){ showAdminSection('products'); }
    document.querySelectorAll('.nav-item').forEach(i=>{ const m=i.getAttribute('data-modulo'); if(m===pageId) i.classList.add('active'); else i.classList.remove('active'); });
}

function showAdminSection(sectionId){
    document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
    const target=document.getElementById(`admin${sectionId.charAt(0).toUpperCase()+sectionId.slice(1)}Section`);
    if(target) target.classList.add('active');
    document.querySelectorAll('.admin-vertical-link').forEach(l=>l.classList.remove('active'));
    const al=document.querySelector(`.admin-vertical-link[data-admin-section="${sectionId}"]`);
    if(al) al.classList.add('active');
    if(sectionId==='users') renderUsersTable();
    if(sectionId==='menus') renderMenuSettings();
    if(sectionId==='coupons') renderCoupons();
    if(sectionId==='images') renderImages();
    if(sectionId==='products') renderProductsByModule(currentAdminModule);
}

function initAdminNavigation(){
    document.querySelectorAll('.admin-vertical-link').forEach(l=>{ l.removeEventListener('click',l._handler); l._handler=(e)=>{ e.preventDefault(); showAdminSection(l.getAttribute('data-admin-section')); }; l.addEventListener('click',l._handler); });
    const al=document.getElementById('adminLogoutBtn');
    if(al){ al.removeEventListener('click',al._handler); al._handler=()=>{ logoutUser(); showPage('inicio'); }; al.addEventListener('click',al._handler); }
}

function openLoginModal(){ document.getElementById('loginModal').style.display='block'; }
function openCartModal(){ updateCartUI(); document.getElementById('cartModal').style.display='block'; }
function closeModal(){ document.querySelectorAll('.modal').forEach(m=>m.style.display='none'); }
function sendPQRS(e){ e.preventDefault(); showNotification(`Solicitud radicada: DAY-${Date.now()}`); document.getElementById('pqrsForm').reset(); }

let currentSlide=0;
function initCarousel(){
    const slides=document.querySelectorAll('.carousel-slide');
    const prev=document.getElementById('prevBtn'), next=document.getElementById('nextBtn');
    if(!slides.length) return;
    function showSlide(i){ if(i>=slides.length) currentSlide=0; if(i<0) currentSlide=slides.length-1; const c=document.querySelector('.carousel-slides'); if(c) c.style.transform=`translateX(-${currentSlide*100}%)`; }
    if(prev) prev.addEventListener('click',()=>{ currentSlide--; showSlide(currentSlide); });
    if(next) next.addEventListener('click',()=>{ currentSlide++; showSlide(currentSlide); });
    setInterval(()=>{ currentSlide++; showSlide(currentSlide); },5000);
}

document.addEventListener('DOMContentLoaded',()=>{
    initCarousel();
    document.querySelectorAll('.admin-tab').forEach(tab=>{ tab.addEventListener('click',()=>{ document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active'); currentAdminModule=tab.getAttribute('data-module-tab'); document.getElementById('selectedModule').textContent=currentAdminModule.charAt(0).toUpperCase()+currentAdminModule.slice(1); renderProductsByModule(currentAdminModule); if(currentAdminModule==='libreria'){ document.getElementById('bookSummaryField').style.display='block'; }else{ document.getElementById('bookSummaryField').style.display='none'; } }); });
    document.querySelectorAll('.nav-item').forEach(i=>{ i.querySelector('a')?.addEventListener('click',(e)=>{ e.preventDefault(); showPage(i.getAttribute('data-modulo')); }); });
    document.querySelectorAll('.module-card').forEach(c=>{ c.addEventListener('click',()=>{ showPage(c.getAttribute('data-modulo')); }); });
    document.getElementById('saveProductBtn')?.addEventListener('click',saveProduct);
    document.getElementById('downloadTemplateBtn')?.addEventListener('click',downloadTemplate);
    document.getElementById('downloadCurrentDataBtn')?.addEventListener('click',downloadCurrentData);
    document.getElementById('uploadExcelBtn')?.addEventListener('click',()=>document.getElementById('excelUpload').click());
    document.getElementById('excelUpload')?.addEventListener('change',(e)=>{ if(e.target.files[0]) uploadExcel(e.target.files[0],false); });
    document.getElementById('updateFromExcelBtn')?.addEventListener('click',()=>{ const inp=document.getElementById('excelUpload'); inp.click(); inp.onchange=(e)=>{ if(e.target.files[0]) uploadExcel(e.target.files[0],true); }; });
    document.getElementById('loginForm')?.addEventListener('submit',loginUser);
    document.getElementById('registerForm')?.addEventListener('submit',registerUser);
    document.getElementById('pqrsForm')?.addEventListener('submit',sendPQRS);
    document.getElementById('continueShopping')?.addEventListener('click',closeModal);
    document.getElementById('sendWhatsApp')?.addEventListener('click',sendQuoteToWhatsApp);
    document.getElementById('loginBtn')?.addEventListener('click',openLoginModal);
    document.getElementById('logoutBtn')?.addEventListener('click',logoutUser);
    document.getElementById('cartBtn')?.addEventListener('click',openCartModal);
    document.getElementById('activateAllUsers')?.addEventListener('click',activateAllUsers);
    document.getElementById('deactivateAllUsers')?.addEventListener('click',deactivateAllUsers);
    document.getElementById('createCouponBtn')?.addEventListener('click',createCoupon);
    document.getElementById('addImageBtn')?.addEventListener('click',addImage);
    document.getElementById('applyCouponBtn')?.addEventListener('click',applyCoupon);
    document.getElementById('removeCouponBtn')?.addEventListener('click',removeCoupon);
    document.getElementById('clearCartBtn')?.addEventListener('click',clearCart);
    document.querySelector('.close-book-detail')?.addEventListener('click',closeBookDetailModal);
    document.querySelector('.close-edit-modal')?.addEventListener('click',closeEditProductModal);
    document.getElementById('cancelEditBtn')?.addEventListener('click',closeEditProductModal);
    document.getElementById('editProductForm')?.addEventListener('submit',saveEditedProduct);
    document.querySelectorAll('.close, .close-cart').forEach(btn=>btn.addEventListener('click',closeModal));
    window.addEventListener('click',(e)=>{ if(e.target.classList.contains('modal')){ closeModal(); closeBookDetailModal(); closeEditProductModal(); } });
    document.querySelectorAll('.tab-btn').forEach(btn=>{ btn.addEventListener('click',()=>{ const id=btn.getAttribute('data-tab'); document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active')); document.getElementById(`${id}Tab`)?.classList.add('active'); document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }); });
    updateUIForUser();
    renderProductsByModule('papeleria');
    updateCartCount();
    updateBrandsVisibility();
    initAdminNavigation();
    showPage('inicio');
});

// Funciones globales
window.editProduct = openEditProductModal;
window.deleteProduct = deleteProduct;
window.toggleUserStatus = toggleUserStatus;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.toggleCoupon = toggleCoupon;
window.deleteCoupon = deleteCoupon;
window.deleteImage = deleteImage;
window.copyImageUrl = copyImageUrl;
window.addToCartFromModule = addToCartFromModule;
window.addToCartFromLibreria = addToCartFromLibreria;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.showPage = showPage;
window.showBookDetail = showBookDetail;
window.closeBookDetailModal = closeBookDetailModal;
window.openEditProductModal = openEditProductModal;
window.closeEditProductModal = closeEditProductModal;
window.getImageUrl = getImageUrl;