/**
 * main.js
 * ---------------------------------------------------------------------------
 * Lógica GLOBAL compartida por todas las páginas del sitio (index.html,
 * nosotros.html, futuras páginas...). Todo lo que vive aquí depende
 * únicamente de la navbar y el sidebar, que están presentes en cada página.
 *
 * Si una página necesita comportamiento propio (por ejemplo, el catálogo
 * de sucursales de index.html), ese código va en un archivo aparte
 * (home.js) para no cargar JS innecesario en páginas que no lo usan.
 * ---------------------------------------------------------------------------
 */

/**
 * 0. RESTAURAR TEMA GUARDADO AL CARGAR LA PÁGINA
 * Lee de localStorage y aplica el tema guardado antes de que se renderice
 */
(function() {
    const savedTheme = localStorage.getItem('porsche-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
})();

/**
 * 1. MODO OSCURO (interruptor manual)
 * Alterna la clase 'dark-mode' en <body>; las variables CSS (--porsche-bg,
 * --porsche-text, etc.) hacen el resto del cambio de color automáticamente.
 * Guarda la preferencia en localStorage para persistencia entre páginas.
 */
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Animación profesional del botón
        themeToggleBtn.style.animation = 'none';
        setTimeout(() => {
            themeToggleBtn.style.animation = 'themeBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 10);
        
        // Togglear modo oscuro
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        if (isDarkMode) {
            localStorage.setItem('porsche-theme', 'dark');
        } else {
            localStorage.setItem('porsche-theme', 'light');
        }
    });
}

// Agregar estilos de animación profesionales si no existen
if (!document.getElementById('pro-animations-style')) {
    const style = document.createElement('style');
    style.id = 'pro-animations-style';
    style.textContent = `
        @keyframes themeBounce {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.15); }
            100% { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 2. MENÚ LATERAL (SIDEBAR)
 * Abre/cierra el panel deslizable y bloquea el scroll del body mientras
 * está abierto (evita que la página se desplace detrás del overlay).
 */
const sidebar = document.getElementById('porsche-sidebar');
const openMenuBtn = document.getElementById('menu-open-btn');
const closeMenuBtn = document.getElementById('menu-close-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');

if (sidebar && openMenuBtn && closeMenuBtn && sidebarOverlay) {
    const openMenu = () => {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada del menú
        const sidebarContent = sidebar.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.animation = 'menuSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    };

    const closeMenu = () => {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    };

    openMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    sidebarOverlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Agregar animación de menú si no existe
if (!document.getElementById('menu-animations-style')) {
    const style = document.createElement('style');
    style.id = 'menu-animations-style';
    style.textContent = `
        @keyframes menuSlideIn {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 3. SUBMENÚS EXPANDIBLES DEL SIDEBAR (acordeón)
 * Cada botón .menu-parent-btn controla su <ul class="submenu"> hermano
 * mediante el selector CSS ~ (ver styles.css). Aquí solo alternamos la
 * clase 'active' y sincronizamos aria-expanded para lectores de pantalla.
 */
const menuParentBtns = document.querySelectorAll('.menu-parent-btn');

menuParentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
});

/**
 * 4. AÑO DINÁMICO EN EL FOOTER
 * Evita tener que actualizar "© 2026" a mano cada enero en cada página.
 */
const footerYearSpan = document.getElementById('footer-year');

if (footerYearSpan) {
    footerYearSpan.textContent = new Date().getFullYear();
}
