document.addEventListener('DOMContentLoaded', function() {
  const restaurantes = [
    { nombre: "La Cabrera", zona: "Palermo", tipo: "Parrilla", descripcion: "Una de las mejores parrillas...", direccion: "Cabrera 5099", horarioApertura: "12:00", horarioCierre: "23:00", imagen: "Cabrera.png", precio: "$$$$" },
    { nombre: "SushiClub", zona: "Recoleta", tipo: "Japonesa", descripcion: "Exclusivo restaurante de sushi...", direccion: "Avenida Alvear 1502", horarioApertura: "12:00", horarioCierre: "22:00", imagen: "SushiClub.png", precio: "$$$" },
    { nombre: "El Preferido de Palermo", zona: "Palermo", tipo: "Italiana", descripcion: "Restaurante icónico de cocina italiana.", direccion: "Jorge Luis Borges 2108", horarioApertura: "13:00", horarioCierre: "23:00", imagen: "Preferido.png", precio: "$$" },
    { nombre: "Cafe San Juan", zona: "San Telmo", tipo: "Española", descripcion: "Cocina española de primer nivel.", direccion: "Av. San Juan 450", horarioApertura: "12:30", horarioCierre: "22:30", imagen: "CafeSanJuan.png", precio: "$$" },
    { nombre: "Chila", zona: "Puerto Madero", tipo: "Gourmet", descripcion: "Alta cocina gourmet en Puerto Madero.", direccion: "Alicia Moreau de Justo 1160", horarioApertura: "19:00", horarioCierre: "00:00", imagen: "Chila.png", precio: "$$$$" },
    { nombre: "Don Julio", zona: "Palermo", tipo: "Parrilla", descripcion: "Restaurante de carnes premiado.", direccion: "Guatemala 4699", horarioApertura: "12:00", horarioCierre: "23:00", imagen: "Julio.png", precio: "$$$" },
    { nombre: "La Bourgogne", zona: "Recoleta", tipo: "Francesa", descripcion: "Restaurante gourmet francés.", direccion: "Ayacucho 2027", horarioApertura: "19:00", horarioCierre: "23:00", imagen: "Bourgogne.png", precio: "$$$$" },
    { nombre: "Tegui", zona: "Palermo", tipo: "Gourmet", descripcion: "Cocina de autor con ingredientes locales.", direccion: "Costa Rica 5852", horarioApertura: "20:00", horarioCierre: "00:00", imagen: "Tegui.png", precio: "$$$$" },
    { nombre: "Narda Comedor", zona: "Belgrano", tipo: "Gourmet", descripcion: "Restaurante con enfoque saludable.", direccion: "Sucre 664", horarioApertura: "12:00", horarioCierre: "22:30", imagen: "NardaComedor.png", precio: "$$$" },
    { nombre: "Aramburu", zona: "Constitución", tipo: "Gourmet", descripcion: "Cocina creativa y moderna.", direccion: "Salta 1050", horarioApertura: "19:30", horarioCierre: "23:00", imagen: "Aramburu.png", precio: "$$$$" },
    { nombre: "Oviedo", zona: "Recoleta", tipo: "Española", descripcion: "Restaurante de alta cocina española.", direccion: "Beruti 2602", horarioApertura: "12:00", horarioCierre: "22:30", imagen: "Oviedo.png", precio: "$$$" },
    { nombre: "El Pobre Luis", zona: "Belgrano", tipo: "Parrilla", descripcion: "Parrilla uruguaya famosa.", direccion: "Arribeños 2393", horarioApertura: "12:00", horarioCierre: "23:00", imagen: "ElPobreLuis.png", precio: "$$" },
    { nombre: "La Brigada", zona: "San Telmo", tipo: "Parrilla", descripcion: "Parrilla clásica de San Telmo.", direccion: "Estados Unidos 465", horarioApertura: "12:00", horarioCierre: "23:00", imagen: "Brigada.png", precio: "$$$" },
    { nombre: "Casa Cavia", zona: "Palermo", tipo: "Gourmet", descripcion: "Restaurante en una antigua casa.", direccion: "Cavia 2985", horarioApertura: "12:00", horarioCierre: "00:00", imagen: "CasaCavia.png", precio: "$$$$" },
    { nombre: "Elena", zona: "Retiro", tipo: "Gourmet", descripcion: "Restaurante elegante en un hotel.", direccion: "Posadas 1086", horarioApertura: "12:30", horarioCierre: "23:30", imagen: "Elena.png", precio: "$$$$" }
  ];

  const searchInput = document.getElementById('search-input');
  const filterType = document.getElementById('filter-type');
  const searchButton = document.getElementById('search-button');
  const restaurantList = document.getElementById("restaurant-list");
  const reservationForm = document.getElementById("reservation-form");
  const reservationsList = document.getElementById("reservations-list");
  const reservationsOutput = document.getElementById("reservations-output");
  const timeErrorMessage = document.getElementById("time-error-message");
  const dateInput = document.getElementById("reservation-date");
  const filterZone = document.getElementById('filter-zone');

  mostrarRestaurantes(restaurantes);

  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  function mostrarRestaurantes(lista) {
    const restaurantGrid = document.querySelector(".restaurant-grid");
    restaurantGrid.innerHTML = "";

    if (lista.length === 0) {
      restaurantGrid.innerHTML = "<p>No se encontraron restaurantes.</p>";
      return;
    }

    lista.forEach((restaurante, index) => {
      const card = document.createElement("div");
      card.classList.add("restaurant-card");
      card.innerHTML = `
        <img src="${restaurante.imagen}" alt="${restaurante.nombre}" class="restaurant-image">
        <div class="restaurant-info">
          <h3>${restaurante.nombre}</h3>
          <p><strong>${restaurante.zona}</strong> - ${restaurante.tipo} - (${restaurante.precio})</p>
          <p>${restaurante.descripcion}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${restaurante.direccion}</p>
          <p><i class="far fa-clock"></i> ${restaurante.horarioApertura} a ${restaurante.horarioCierre}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        mostrarFormularioReserva(restaurante);
      });
      restaurantGrid.appendChild(card);

      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
  }

  searchButton.addEventListener('click', () => {
    const tipoSeleccionado = filterType.value.toLowerCase();
    const zonaSeleccionada = filterZone.value.toLowerCase();
    const textoBusqueda = searchInput.value.toLowerCase();

    const restaurantesFiltrados = restaurantes.filter(restaurante => {
      const coincideTipo = tipoSeleccionado === "" || restaurante.tipo.toLowerCase() === tipoSeleccionado;
      const coincideZona = zonaSeleccionada === "" || restaurante.zona.toLowerCase() === zonaSeleccionada;
      const coincideNombre = restaurante.nombre.toLowerCase().includes(textoBusqueda);
      return coincideTipo && coincideZona && coincideNombre;
    });

    document.getElementById('reservation-form').style.display = "none";

    mostrarRestaurantes(restaurantesFiltrados);
  });

  function mostrarFormularioReserva(restaurante) {
    document.getElementById("selected-restaurant").textContent = restaurante.nombre;
    document.getElementById('reservation-form').style.display = "block";

    const timeSelect = document.getElementById("reservation-time");
    const dateInput = document.getElementById("reservation-date");

    function generarOpcionesHora() {
      timeSelect.innerHTML = '<option value="">Seleccione una hora</option>';
      const fechaSeleccionada = new Date(dateInput.value + "T00:00:00");
      const fechaActual = new Date();
      
      let horaInicio = new Date(fechaSeleccionada);
      let horaApertura = restaurante.horarioApertura.split(':');
      horaInicio.setHours(parseInt(horaApertura[0]), parseInt(horaApertura[1]));

      let horaFin = new Date(fechaSeleccionada);
      let horaCierre = restaurante.horarioCierre.split(':');
      if (horaCierre[0] === "00") {
        horaFin.setDate(horaFin.getDate() + 1);
      }
      horaFin.setHours(parseInt(horaCierre[0]), parseInt(horaCierre[1]));

      if (fechaSeleccionada.toDateString() === fechaActual.toDateString()) {
        const ahora = new Date();
        if (ahora > horaInicio) {
          horaInicio = new Date(ahora.getTime() + 30 * 60000);
          horaInicio.setMinutes(Math.ceil(horaInicio.getMinutes() / 30) * 30);
        }
      }

      while (horaInicio < horaFin) {
        const opcion = document.createElement('option');
        opcion.value = horaInicio.toTimeString().slice(0, 5);
        let textoHora = horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (horaInicio.getDate() !== fechaSeleccionada.getDate()) {
          textoHora += ' (día siguiente)';
        }
        opcion.textContent = textoHora;
        timeSelect.appendChild(opcion);
        horaInicio.setMinutes(horaInicio.getMinutes() + 30);
      }
    }

    dateInput.addEventListener('change', generarOpcionesHora);

    const hoy = new Date().toISOString().split('T')[0];
    dateInput.min = hoy;
    dateInput.value = hoy;

    generarOpcionesHora();

    document.getElementById('reservation-form').scrollIntoView({behavior: 'smooth'});
  }

  const form = document.getElementById('reservation-details');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const fechaReserva = document.getElementById("reservation-date").value;
    const horaReserva = document.getElementById("reservation-time").value;
    const horaApertura = document.getElementById("reservation-time").getAttribute("min");
    const horaCierre = document.getElementById("reservation-time").getAttribute("max");

    const hoy = new Date().toISOString().split("T")[0];
    if (fechaReserva < hoy) {
      timeErrorMessage.textContent = "La fecha de reserva no puede ser anterior a hoy.";
      timeErrorMessage.style.display = "block";
      return;
    }

    if (horaReserva < horaApertura || horaReserva > horaCierre) {
      timeErrorMessage.textContent = `La hora de la reserva debe estar entre ${horaApertura} y ${horaCierre}.`;
      timeErrorMessage.style.display = "block";
      return;
    }

    const nombreCliente = document.getElementById("reservation-name").value;
    const restaurante = document.getElementById("selected-restaurant").textContent;
    const fecha = document.getElementById("reservation-date").value;
    const personas = document.getElementById("reservation-people").value;
    const correo = document.getElementById("contact-info").value;

    const reserva = {
      id: Date.now(),
      nombreCliente,
      restaurante,
      fecha,
      hora: horaReserva,
      personas,
      correo
    };

    let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservasGuardadas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));

    mostrarReservas();

    form.reset();
    reservationForm.style.display = "none";
  });

  function mostrarReservas() {
    const reservationsOutput = document.getElementById('reservations-output');
    if (!reservationsOutput) return;

    reservationsOutput.innerHTML = '';
    
    if (reservas.length === 0) {
      reservationsOutput.innerHTML = '<p>No tienes reservas activas.</p>';
      return;
    }

    const ul = document.createElement('ul');
    reservas.forEach((reserva, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${reserva.restaurante} - ${reserva.fecha} a las ${reserva.hora}
        <button onclick="editarReserva(${index})">Editar</button>
        <button onclick="eliminarReserva(${index})">Eliminar</button>
      `;
      ul.appendChild(li);
    });

    reservationsOutput.appendChild(ul);
  }

  window.editarReserva = function(id) {
    let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservasGuardadas.find(r => r.id === id);
    if (reserva) {
      document.getElementById("reservation-name").value = reserva.nombreCliente;
      document.getElementById("selected-restaurant").textContent = reserva.restaurante;
      document.getElementById("reservation-date").value = reserva.fecha;
      document.getElementById("reservation-time").value = reserva.hora;
      document.getElementById("reservation-people").value = reserva.personas;
      document.getElementById("contact-info").value = reserva.correo;
      reservationForm.style.display = "block";
      eliminarReserva(id);
    }
  };

  window.eliminarReserva = function(id) {
    let reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservasGuardadas = reservasGuardadas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));
    mostrarReservas();
  };

  mostrarReservas();

  function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function buscarRestaurantes() {
    const searchTerm = normalizeText(searchInput.value);
    const tipoSeleccionado = filterType.value.toLowerCase();
    const zonaSeleccionada = filterZone.value;

    const resultados = restaurantes.filter(restaurante => {
      const coincideNombre = normalizeText(restaurante.nombre).includes(searchTerm);
      const coincideTipo = tipoSeleccionado === '' || restaurante.tipo.toLowerCase() === tipoSeleccionado;
      const coincideZona = zonaSeleccionada === '' || restaurante.zona === zonaSeleccionada;
      return coincideNombre && coincideTipo && coincideZona;
    });

    document.getElementById('reservation-form').style.display = 'none';

    mostrarRestaurantes(resultados);

    mostrarMisReservas();
  }

  searchButton.addEventListener('click', buscarRestaurantes);

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarRestaurantes();
    }
  });

  filterType.addEventListener('change', buscarRestaurantes);
  filterZone.addEventListener('change', buscarRestaurantes);
});

function scrollToSection(elementId) {
  const element = document.getElementById(elementId);
  window.scrollTo({
    behavior: 'smooth',
    top: element.offsetTop - 60
  });
}

document.getElementById('explore-btn').addEventListener('click', function() {
  scrollToSection('restaurant-list');
});

function realizarReserva(event) {
  event.preventDefault();
  
  const nombreCliente = document.getElementById('reservation-name').value;
  const restaurante = document.getElementById('selected-restaurant').textContent;
  const fecha = document.getElementById('reservation-date').value;
  const hora = document.getElementById('reservation-time').value;
  const personas = document.getElementById('reservation-people').value;
  const correo = document.getElementById('contact-info').value;

  const nuevaReserva = {
    id: Date.now(),
    nombreCliente,
    restaurante,
    fecha,
    hora,
    personas,
    correo
  };

  let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(nuevaReserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  mostrarModal('reserva-exitosa');

  event.target.reset();

  mostrarMisReservas();
}

function mostrarMisReservas() {
  const misReservasSection = document.getElementById('mis-reservas');
  const listaReservas = document.getElementById('lista-reservas');
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

  if (reservas.length === 0) {
    misReservasSection.style.display = 'none';
    return;
  }

  misReservasSection.style.display = 'block';
  listaReservas.innerHTML = '';

  reservas.forEach((reserva) => {
    const reservaElement = document.createElement('div');
    reservaElement.classList.add('reserva-item');
    reservaElement.innerHTML = `
      <h3>${reserva.restaurante}</h3>
      <p><strong>Fecha:</strong> ${reserva.fecha}</p>
      <p><strong>Hora:</strong> ${reserva.hora}</p>
      <p><strong>Personas:</strong> ${reserva.personas}</p>
      <div class="botones">
        <button class="editar" onclick="editarReserva(${reserva.id})">Editar</button>
        <button class="eliminar" onclick="eliminarReserva(${reserva.id})">Eliminar</button>
      </div>
    `;
    listaReservas.appendChild(reservaElement);
  });
}

function editarReserva(id) {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const reserva = reservas.find(r => r.id === id);
  if (reserva) {
    document.getElementById('reservation-name').value = reserva.nombreCliente;
    document.getElementById('selected-restaurant').textContent = reserva.restaurante;
    document.getElementById('reservation-date').value = reserva.fecha;
    document.getElementById('reservation-time').value = reserva.hora;
    document.getElementById('reservation-people').value = reserva.personas;
    document.getElementById('contact-info').value = reserva.correo;

    // Mostrar el formulario de reserva
    document.getElementById('reservation-form').style.display = 'block';

    // Eliminar la reserva antigua sin mostrar el modal
    let reservasActualizadas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(reservasActualizadas));

    // Desplazarse hasta el formulario de reserva
    document.getElementById('reservation-form').scrollIntoView({behavior: 'smooth'});
    
    // Actualizar la sección de Mis Reservas
    mostrarMisReservas();
  }
}

function eliminarReserva(id) {
  let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas = reservas.filter(r => r.id !== id);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarMisReservas();
  mostrarModal('reserva-eliminada');
}

document.addEventListener('DOMContentLoaded', function() {
  mostrarMisReservas();
});

function mostrarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";

  const span = modal.querySelector(".close");
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  setTimeout(function() {
    modal.style.display = "none";
  }, 3000);
}

function realizarBusqueda() {
  const textoBusqueda = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const tipoSeleccionado = filterType.value.toLowerCase();
  const zonaSeleccionada = filterZone.value.toLowerCase();

  const restaurantesFiltrados = restaurantes.filter(restaurante => {
    const nombreNormalizado = restaurante.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (nombreNormalizado.includes(textoBusqueda) || textoBusqueda === '') &&
           (restaurante.tipo.toLowerCase() === tipoSeleccionado || tipoSeleccionado === '') &&
           (restaurante.zona.toLowerCase() === zonaSeleccionada || zonaSeleccionada === '');
  });

  document.getElementById('reservation-form').style.display = "none";
  mostrarRestaurantes(restaurantesFiltrados);
}

searchButton.addEventListener('click', realizarBusqueda);

searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    realizarBusqueda();
  }
});

filterType.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    realizarBusqueda();
  }
});

filterZone.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    realizarBusqueda();
  }
});

