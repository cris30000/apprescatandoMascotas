// Funcionalidad básica para filtros y búsqueda
document.addEventListener('DOMContentLoaded', function() {
    const buscarInput = document.getElementById('buscarVeterinaria');
    const filtroServicio = document.getElementById('filtroServicio');
    const filtroZona = document.getElementById('filtroZona');
    const veterinariaCards = document.querySelectorAll('.veterinaria-card');

    function filtrarVeterinarias() {
        const textoBusqueda = buscarInput.value.toLowerCase();
        const servicioSeleccionado = filtroServicio.value;
        const zonaSeleccionada = filtroZona.value;

        veterinariaCards.forEach(card => {
            const nombre = card.querySelector('h3').textContent.toLowerCase();
            const servicios = card.getAttribute('data-servicios');
            const zona = card.getAttribute('data-zona');

            const coincideTexto = nombre.includes(textoBusqueda);
            const coincideServicio = !servicioSeleccionado || servicios.includes(servicioSeleccionado);
            const coincideZona = !zonaSeleccionada || zona === zonaSeleccionada;

            if (coincideTexto && coincideServicio && coincideZona) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listeners para los filtros
    buscarInput.addEventListener('input', filtrarVeterinarias);
    filtroServicio.addEventListener('change', filtrarVeterinarias);
    filtroZona.addEventListener('change', filtrarVeterinarias);

    // Funcionalidad de los botones
    document.querySelectorAll('.btn-llamar').forEach(btn => {
        btn.addEventListener('click', function() {
            const telefono = this.closest('.veterinaria-card').querySelector('.telefono').textContent.replace('📞 ', '');
            alert(`Llamando al: ${telefono}`);
        });
    });

    document.querySelectorAll('.btn-ruta').forEach(btn => {
        btn.addEventListener('click', function() {
            const direccion = this.closest('.veterinaria-card').querySelector('.direccion').textContent.replace('📍 ', '');
            alert(`Mostrando ruta a: ${direccion}`);
        });
    });

    document.querySelectorAll('.btn-info').forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.closest('.veterinaria-card').querySelector('h3').textContent;
            alert(`Mostrando información detallada de: ${nombre}`);
        });
    });
});