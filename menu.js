document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const elements = {
        menuToggle: document.querySelector('.menu-toggle'),
        sidebar: document.getElementById('sidebar'),
        body: document.body,
        contactForm: document.getElementById('contact-form')
    };

    // Crear overlay
    const overlay = createOverlay();

    // Funciones
    function createOverlay() {
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            elements.body.appendChild(overlay);
        }
        return overlay;
    }

    function closeMenu() {
        elements.menuToggle.classList.remove('active');
        elements.sidebar.classList.remove('active');
        overlay.classList.remove('active');
        elements.body.classList.remove('menu-open');
    }

    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Agregar un pequeño delay para evitar el doble trigger
        setTimeout(() => {
            elements.menuToggle.classList.toggle('active');
            elements.sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            elements.body.classList.toggle('menu-open');
        }, 10);
    }

    function handleClickOutside(event) {
        if (elements.sidebar.classList.contains('active') && 
            !elements.sidebar.contains(event.target) && 
            !elements.menuToggle.contains(event.target)) {
            closeMenu();
        }
    }

    function handleSidebarClick(event) {
        if (event.target.tagName === 'A') {
            closeMenu();
        }
    }

    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Agregar solo el event listener apropiado según el dispositivo
    if (isTouchDevice) {
        elements.menuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(e);
        }, { passive: false });
    } else {
        elements.menuToggle.addEventListener('click', toggleMenu);
    }

    overlay.addEventListener(isTouchDevice ? 'touchstart' : 'click', closeMenu);
    document.addEventListener(isTouchDevice ? 'touchstart' : 'click', handleClickOutside);
    elements.sidebar.addEventListener(isTouchDevice ? 'touchstart' : 'click', handleSidebarClick);

    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    function handleContactFormSubmit(event) {
        event.preventDefault();
        alert('Mensaje enviado con éxito. Gracias por contactarnos!');
        elements.contactForm.reset();
    }
});
