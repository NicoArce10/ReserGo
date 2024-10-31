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

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Cerrar el menú al hacer clic en un enlace
    sidebar.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
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
