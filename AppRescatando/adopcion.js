// JavaScript específico para la página de adopción
document.addEventListener('DOMContentLoaded', function() {
    initializeAdopcionPage();
});

function initializeAdopcionPage() {
    let mascotaSeleccionada = null;
    const mascotas = {
        1: {
            nombre: 'Max',
            tipo: 'perro',
            imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80',
            detalles: 'Labrador Mix • 2 años • Macho'
        },
        2: {
            nombre: 'Luna',
            tipo: 'gato', 
            imagen: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            detalles: 'Gato Doméstico • 3 años • Hembra'
        },
        3: {
            nombre: 'Bella',
            tipo: 'perro',
            imagen: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            detalles: 'Chihuahua Mix • 6 meses • Hembra'
        },
        4: {
            nombre: 'Simba',
            tipo: 'gato',
            imagen: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            detalles: 'Gato Doméstico • 1.5 años • Macho'
        },
        5: {
            nombre: 'Rocky',
            tipo: 'perro',
            imagen: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            detalles: 'Beagle • 4 años • Macho'
        },
        6: {
            nombre: 'Algodón',
            tipo: 'otro',
            imagen: 'https://images.unsplash.com/photo-1557008071-6ec8d74e9c6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            detalles: 'Conejo Doméstico • 2 años • Macho'
        }
    };

    // Filtros de búsqueda
    const btnBuscar = document.getElementById('btnBuscar');
    const btnReset = document.getElementById('btnReset');
    const gridMascotas = document.getElementById('gridMascotas');

    if (btnBuscar) {
        btnBuscar.addEventListener('click', aplicarFiltros);
    }

    if (btnReset) {
        btnReset.addEventListener('click', resetearFiltros);
    }

    function aplicarFiltros() {
        const tipo = document.getElementById('filtroTipo').value;
        const edad = document.getElementById('filtroEdad').value;
        const tamanio = document.getElementById('filtroTamanio').value;
        const genero = document.getElementById('filtroGenero').value;

        const mascotas = gridMascotas.querySelectorAll('.col-lg-4');

        mascotas.forEach(mascota => {
            const mascotaTipo = mascota.getAttribute('data-tipo');
            const mascotaEdad = mascota.getAttribute('data-edad');
            const mascotaTamanio = mascota.getAttribute('data-tamanio');
            const mascotaGenero = mascota.getAttribute('data-genero');

            const coincideTipo = tipo === 'todos' || mascotaTipo === tipo;
            const coincideEdad = edad === 'todos' || mascotaEdad === edad;
            const coincideTamanio = tamanio === 'todos' || mascotaTamanio === tamanio;
            const coincideGenero = genero === 'todos' || mascotaGenero === genero;

            if (coincideTipo && coincideEdad && coincideTamanio && coincideGenero) {
                mascota.style.display = 'block';
                mascota.style.animation = 'fadeIn 0.6s ease-out';
            } else {
                mascota.style.display = 'none';
            }
        });
    }

    function resetearFiltros() {
        document.getElementById('filtroTipo').value = 'todos';
        document.getElementById('filtroEdad').value = 'todos';
        document.getElementById('filtroTamanio').value = 'todos';
        document.getElementById('filtroGenero').value = 'todos';
        
        aplicarFiltros();
    }

    // Botones de favoritos
    const botonesFavorito = document.querySelectorAll('.btn-favorito');
    botonesFavorito.forEach(boton => {
        boton.addEventListener('click', function() {
            const icono = this.querySelector('i');
            if (icono.classList.contains('far')) {
                icono.classList.remove('far');
                icono.classList.add('fas');
                this.classList.add('active');
                showAlert('Agregado a favoritos', 'success');
            } else {
                icono.classList.remove('fas');
                icono.classList.add('far');
                this.classList.remove('active');
                showAlert('Removido de favoritos', 'info');
            }
        });
    });

    // Botones de adopción
    const botonesAdoptar = document.querySelectorAll('.btn-adoptar');
    const modalAdopcion = document.getElementById('modalAdopcion');
    
    botonesAdoptar.forEach(boton => {
        boton.addEventListener('click', function() {
            const idMascota = this.getAttribute('data-mascota');
            mascotaSeleccionada = mascotas[idMascota];
            
            if (mascotaSeleccionada) {
                actualizarModalAdopcion(mascotaSeleccionada);
            }
        });
    });

    function actualizarModalAdopcion(mascota) {
        document.getElementById('modalAdopcionTitle').textContent = `Adoptar a ${mascota.nombre}`;
        document.getElementById('modalMascotaImagen').src = mascota.imagen;
        document.getElementById('modalMascotaImagen').alt = mascota.nombre;
        document.getElementById('modalMascotaNombre').textContent = mascota.nombre;
        document.getElementById('modalMascotaDetalles').textContent = mascota.detalles;
        
        // Actualizar información adicional según la mascota seleccionada
        let infoAdicional = '';
        switch(mascota.nombre) {
            case 'Max':
                infoAdicional = 'Perro juguetón y cariñoso. Ideal para familias con niños.';
                break;
            case 'Luna':
                infoAdicional = 'Gata tranquila que disfruta de la compañía. Perfecta para hogares calmados.';
                break;
            case 'Bella':
                infoAdicional = 'Cachorra energética que necesita una familia activa.';
                break;
            case 'Simba':
                infoAdicional = 'Gato aventurero que necesita espacio para explorar.';
                break;
            case 'Rocky':
                infoAdicional = 'Perro inteligente y energético. Ideal para dueños experimentados.';
                break;
            case 'Algodón':
                infoAdicional = 'Conejo tranquilo y dócil. Necesita jaula espaciosa.';
                break;
        }
        
        document.getElementById('modalMascotaInfo').innerHTML = `
            <p class="mb-2"><strong>Tipo:</strong> ${mascota.tipo.charAt(0).toUpperCase() + mascota.tipo.slice(1)}</p>
            <p class="mb-2"><strong>Características:</strong> ${infoAdicional}</p>
            <p class="mb-0"><strong>Requisitos:</strong> Compromiso de cuidado responsable</p>
        `;
    }

    // Manejo del formulario de adopción
    const formularioAdopcion = document.getElementById('formularioAdopcion');
    const mascotasExistentes = document.getElementById('mascotasExistentes');
    const adopcionMascotas = document.getElementById('adopcionMascotas');

    if (adopcionMascotas) {
        adopcionMascotas.addEventListener('change', function() {
            if (this.value === 'si') {
                mascotasExistentes.style.display = 'block';
                document.getElementById('adopcionMascotasDesc').required = true;
            } else {
                mascotasExistentes.style.display = 'none';
                document.getElementById('adopcionMascotasDesc').required = false;
            }
        });
    }

    if (formularioAdopcion) {
        formularioAdopcion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!mascotaSeleccionada) {
                showAlert('Por favor selecciona una mascota primero.', 'error');
                return;
            }
            
            if (validarFormularioAdopcion()) {
                enviarSolicitudAdopcion();
            }
        });
    }

    function validarFormularioAdopcion() {
        const requiredFields = formularioAdopcion.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validación específica de edad
        const edad = document.getElementById('adopcionEdad');
        if (edad.value && parseInt(edad.value) < 18) {
            edad.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            showAlert('Por favor, completa todos los campos obligatorios correctamente.', 'error');
        }
        
        return isValid;
    }

    function enviarSolicitudAdopcion() {
        const submitBtn = formularioAdopcion.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando solicitud...';
        submitBtn.disabled = true;
        
        // Simular envío de solicitud
        setTimeout(() => {
            // Éxito
            mostrarConfirmacionAdopcion();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
        }, 3000);
    }

    function mostrarConfirmacionAdopcion() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalAdopcion'));
        modal.hide();
        
        showAlert(`¡Solicitud de adopción para ${mascotaSeleccionada.nombre} enviada exitosamente! Nos pondremos en contacto contigo pronto.`, 'success');
        
        // Resetear formulario
        formularioAdopcion.reset();
        mascotasExistentes.style.display = 'none';
        mascotaSeleccionada = null;
    }

    function showAlert(message, type) {
        if (typeof window.showAlert === 'function') {
            window.showAlert(message, type);
        } else {
            // Fallback simple
            alert(message);
        }
    }

    // Inicializar filtros al cargar
    aplicarFiltros();
}