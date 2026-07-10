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
 * 1. MODO OSCURO (interruptor manual)
 * Alterna la clase 'dark-mode' en <body>; las variables CSS (--porsche-bg,
 * --porsche-text, etc.) hacen el resto del cambio de color automáticamente.
 */
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Agregar animación al botón
        themeToggleBtn.style.transform = 'rotate(180deg) scale(1.2)';
        
        // Togglear modo oscuro
        document.body.classList.toggle('dark-mode');
        
        // Remover animación después de que termine
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 600);
    });
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
        document.body.style.overflow = 'hidden'; // evita doble scroll (body + sidebar)
    };

    const closeMenu = () => {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
    };

    openMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    sidebarOverlay.addEventListener('click', closeMenu); // clic fuera del panel = cerrar

    // Cerrar el sidebar con la tecla Escape (accesibilidad de teclado)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
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
