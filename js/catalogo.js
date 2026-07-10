/**
 * catalogo.js
 * Lógica específica de la página de catálogo de productos
 * Maneja filtros, búsqueda, y comportamiento de tarjetas de productos
 */

// ========== 0. DETECTAR CATEGORÍA DE URL ==========
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('categoria');
}

// ========== 1. INICIALIZAR AÑO EN FOOTER ==========
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ========== 2. INICIALIZAR CATEGORÍA ==========
window.addEventListener('DOMContentLoaded', () => {
    const categoria = getCategoryFromURL();
    if (categoria) {
        // Actualizar título con la categoría
        const catalogTitle = document.querySelector('.catalog-title');
        if (catalogTitle) {
            const categoryNames = {
                'conexiones': 'Conexiones',
                'tuberia': 'Tuberías',
                'valvulas': 'Válvulas',
                'bridas': 'Bridas'
            };
            catalogTitle.textContent = categoryNames[categoria] || 'Catálogo de Productos';
        }
        
        // Auto-seleccionar filtro de tipo
        const tipoFilters = document.querySelectorAll('input[name="tipo"]');
        tipoFilters.forEach(filter => {
            if (filter.value === categoria) {
                filter.checked = true;
            }
        });
    }
});

// ========== 3. MANEJO DE FILTROS COLAPSABLES ==========
const filterGroupButtons = document.querySelectorAll('.filter-group-btn');

filterGroupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterName = button.dataset.filter;
        const filterOptions = document.getElementById(`filter-${filterName}`);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Alternar estado
        button.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            filterOptions.style.display = 'none';
        } else {
            filterOptions.style.display = 'flex';
        }
    });
});

// ========== 4. MANEJO DE CHECKBOXES DE FILTRO ==========
const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
const clearFiltersBtn = document.getElementById('clear-filters-btn');

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        applyFilters();
    });
});

// ========== 5. FUNCIÓN PARA APLICAR FILTROS ==========
function applyFilters() {
    // Recopilar filtros seleccionados
    const selectedFilters = {
        material: [],
        tipo: [],
        tamaño: [],
        presion: []
    };

    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const filterType = checkbox.name;
            selectedFilters[filterType].push(checkbox.value);
        }
    });

    console.log('Filtros aplicados:', selectedFilters);
    
    // Aquí va la lógica para filtrar productos
    // Por ahora solo mostramos un log
    filterProducts(selectedFilters);
}

// ========== 6. FUNCIÓN PARA FILTRAR PRODUCTOS ==========
function filterProducts(filters) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Lógica de filtrado (simplificada)
        // En una aplicación real, los datos vendrían de una API
        
        let shouldShow = true;
        
        // Verificar si tiene atributos data para comparar
        // card.dataset.material, card.dataset.tipo, etc.
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Agregar animación fade
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ========== 7. BOTÓN LIMPIAR FILTROS ==========
clearFiltersBtn.addEventListener('click', () => {
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    applyFilters();
});

// ========== 8. BOTONES DE PRODUCTO ==========
const exploreBtns = document.querySelectorAll('.btn-explore');
const configureBtns = document.querySelectorAll('.btn-configure');

exploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        console.log('Explorar:', productName);
        // Aquí irías a una página de detalles del producto
    });
});

configureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        console.log('Configurar:', productName);
        // Aquí abrirías un modal o página de configuración
    });
});

// ========== 9. MENÚ LATERAL Y TEMA (compartido con main.js) ==========
// El código del menú y tema ya está en main.js y se ejecuta automáticamente
