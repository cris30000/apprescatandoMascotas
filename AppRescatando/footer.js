// Efecto de suscripción al newsletter
document.getElementById('subscribeBtn').addEventListener('click', function() {
    const email = document.getElementById('newsletterEmail').value;
    if (email && validateEmail(email)) {
        alert('¡Gracias por suscribirte a nuestro newsletter!');
        document.getElementById('newsletterEmail').value = '';
    } else {
        alert('Por favor, introduce un correo electrónico válido.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}