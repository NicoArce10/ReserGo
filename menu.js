document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;

    // Crear el overlay si no existe
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        body.appendChild(overlay);
    }

    // Función para cerrar el menú
    function closeMenu() {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', closeMenu);

    // Cerrar el menú al hacer clic en cualquier parte del documento cuando está abierto
    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Cerrar el menú al hacer clic en un enlace
    sidebar.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            closeMenu();
        }
    });

    // Manejar el envío del formulario de contacto si existe
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Mensaje enviado con éxito. Gracias por contactarnos!');
            contactForm.reset();
        });
    }
});
