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
            card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        } else {
            card.style.display = 'none';
            card.style.animation = 'fadeOutDown 0.4s cubic-bezier(0.42, 0, 0.58, 1)';
        }
    });
}

// Agregar animaciones profesionales
if (!document.getElementById('catalog-animations')) {
    const style = document.createElement('style');
    style.id = 'catalog-animations';
    style.textContent = `
        @keyframes fadeInUp {
            from { 
                opacity: 0; 
                transform: translateY(24px) scale(0.94);
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes fadeOutDown {
            from { 
                opacity: 1; 
                transform: translateY(0) scale(1);
            }
            to { 
                opacity: 0; 
                transform: translateY(24px) scale(0.94);
            }
        }
    `;
    document.head.appendChild(style);
}

// Aplicar stagger a las tarjetas de productos en carga
const applyProductStagger = () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.06}s`;
    });
};

window.addEventListener('DOMContentLoaded', applyProductStagger);

// ========== 7. BOTÓN LIMPIAR FILTROS ==========
clearFiltersBtn.addEventListener('click', () => {
    // Animación del botón
    clearFiltersBtn.style.animation = 'buttonPulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Limpiar filtros con transición
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    applyFilters();
    
    // Resetear animación
    setTimeout(() => {
        clearFiltersBtn.style.animation = 'none';
    }, 600);
});

// Agregar animación de botón si no existe
if (!document.getElementById('button-animations')) {
    const style = document.createElement('style');
    style.id = 'button-animations';
    style.textContent = `
        @keyframes buttonPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.08) rotate(-5deg); }
            100% { transform: scale(1) rotate(0); }
        }
    `;
    document.head.appendChild(style);
}

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
