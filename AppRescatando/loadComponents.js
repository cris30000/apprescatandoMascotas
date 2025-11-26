// loadComponents.js
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    fetch('headermejorado.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('headermejorado').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Cargar footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});