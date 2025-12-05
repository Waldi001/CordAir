// === Animación al hacer scroll === //
const elements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));


// === Scroll suave para enlaces internos === //
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});


// === Hover dinámico para tarjetas === //
document.querySelectorAll('.hover-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.03)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});


// Lista de aeropuertos por provincia
const aeropuertos = {
    "Buenos Aires": ["Aeroparque Jorge Newbery (AEP)", "Ezeiza Ministro Pistarini (EZE)"],
    "Mendoza": ["El Plumerillo (MDZ)"],
    "Río Negro": ["San Carlos de Bariloche (BRC)"],
    "Santa Cruz": ["El Calafate (FTE)"],
    "Salta": ["Martín Miguel de Güemes (SLA)"],
    "Tierra del Fuego": ["Ushuaia Malvinas Argentinas (USH)"],
    "Misiones": ["Cataratas del Iguazú (IGR)"],
    "Chubut": ["El Tehuelche (PMY)"],
    "Neuquén": ["Presidente Perón (NQN)"],
    "Córdoba": ["Ingeniero Taravella (COR)"]
};

// Actualiza la lista de aeropuertos según la provincia
function actualizarAeropuertos() {
    const provincia = document.getElementById("origen").value;
    const selectAeropuerto = document.getElementById("origen-aeropuerto");
    selectAeropuerto.innerHTML = "<option value=''>Seleccione aeropuerto</option>";

    if (aeropuertos[provincia]) {
        aeropuertos[provincia].forEach(a => {
            const option = document.createElement("option");
            option.value = a;
            option.textContent = a;
            selectAeropuerto.appendChild(option);
        });
    }
}

document.getElementById("origen").addEventListener("change", actualizarAeropuertos);

// Inserta automáticamente el destino en el modal
const reservaModal = document.getElementById("reservaModal");
reservaModal.addEventListener("show.bs.modal", event => {
    const button = event.relatedTarget;
    const destino = button.getAttribute("data-destino");
    document.getElementById("destinoSeleccionado").textContent = destino;
});

// Validar y confirmar reserva
document.getElementById("reservaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const provincia = document.getElementById("origen").value;
    const aeropuerto = document.getElementById("origen-aeropuerto").value;
    const fechaIda = document.getElementById("fecha-ida").value;
    const pasajeros = document.getElementById("pasajeros").value;

    if (!provincia || !aeropuerto || !fechaIda || pasajeros < 1) {
        alert("Por favor complete todos los campos obligatorios.");
        return;
    }

    // Mensaje de confirmación
    alert("¡Reserva confirmada!\n\n" +
        "Destino: " + document.getElementById("destinoSeleccionado").textContent + "\n" +
        "Origen: " + provincia + " - " + aeropuerto + "\n" +
        "Fecha de ida: " + fechaIda + "\n" +
        "Pasajeros: " + pasajeros
    );

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(reservaModal);
    modal.hide();

    // Limpiar formulario
    document.getElementById("reservaForm").reset();
});
