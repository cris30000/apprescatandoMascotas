// Cargar header y footer
document.addEventListener('DOMContentLoaded', function() {
    // Cargar header
    fetch('headermejorado.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('headermejorado').innerHTML = data;
            initializeHeader();
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

// Funciones para el header
function initializeHeader() {
    // Cambiar clase activa en navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Cambiar enlace activo al hacer clic
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Aquí iría la lógica de autenticación
            console.log('Login attempt:', { email, password });
            alert('Inicio de sesión exitoso (simulado)');
            
            // Cerrar modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            // Aquí iría la lógica de registro
            console.log('Registration attempt:', { name, email, password });
            alert('Registro exitoso (simulado)');
            
            // Cerrar modal
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
        });
    }

    // Manejo del formulario de administrador
    const adminForm = document.getElementById('adminForm');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            // Aquí iría la lógica de autenticación de admin
            console.log('Admin login attempt:', { username, password });
            alert('Acceso al panel de administración (simulado)');
            
            // Cerrar modal
            const adminModal = bootstrap.Modal.getInstance(document.getElementById('adminModal'));
            adminModal.hide();
        });
    }
}

// Funciones para gestión de usuarios
function loginUser(email, password) {
    // Simulación de login
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    id: 1,
                    name: 'Usuario Ejemplo',
                    email: email,
                    role: 'user'
                }
            });
        }, 1000);
    });
}

function registerUser(userData) {
    // Simulación de registro
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    id: Math.floor(Math.random() * 1000),
                    ...userData
                }
            });
        }, 1000);
    });
}

// Funciones para gestión de mascotas
function getPets() {
    // Simulación de obtención de mascotas
    return [
        {
            id: 1,
            name: 'Max',
            breed: 'Labrador Mix',
            age: 2,
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80',
            description: 'Max es un perro juguetón y cariñoso que adora los paseos y los niños.'
        },
        {
            id: 2,
            name: 'Luna',
            breed: 'Gato Doméstico',
            age: 1,
            image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Luna es una gata tranquila que disfruta de la compañía y los mimos.'
        }
    ];
}

// Funciones para reportar rescates
function reportRescue(rescueData) {
    // Simulación de reporte de rescate
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                rescueId: Math.floor(Math.random() * 1000),
                message: 'Rescate reportado exitosamente'
            });
        }, 1000);
    });
}

// En la función initializeNavigation, agrega:
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (currentPage === 'rescates.html') {
        const rescateLink = document.querySelector('a[href="rescates.html"]');
        if (rescateLink) rescateLink.classList.add('active');
    } else if (currentPage === 'suscripciones.html') {
        const suscripcionLink = document.querySelector('a[href="suscripciones.html"]');
        if (suscripcionLink) suscripcionLink.classList.add('active');
    } else if (currentPage === 'index.html' || currentPage === '') {
        const inicioLink = document.querySelector('a[href="index.html"]');
        if (inicioLink) inicioLink.classList.add('active');
    }
}