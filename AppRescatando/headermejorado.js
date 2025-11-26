// JavaScript para el menú hamburguesa responsive
class ResponsiveHeader {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupTouchEvents();
        this.setupResizeHandler();
        this.setupAccessibility();
    }

    setupMobileMenu() {
        // Elementos del menú móvil
        this.hamburgerBtn = document.getElementById('hamburgerBtn');
        this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        this.closeMobileMenu = document.getElementById('closeMobileMenu');
        this.mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
        this.body = document.body;

        // Event listeners para abrir menú
        [this.hamburgerBtn, this.mobileMenuTrigger].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openMobileMenu();
                });
            }
        });

        // Event listener para cerrar menú
        if (this.closeMobileMenu) {
            this.closeMobileMenu.addEventListener('click', () => {
                this.closeMobileMenuHandler();
            });
        }

        // Cerrar menú al hacer clic fuera
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileMenuOverlay) {
                    this.closeMobileMenuHandler();
                }
            });
        }

        // Cerrar menú con Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOverlay?.classList.contains('active')) {
                this.closeMobileMenuHandler();
            }
        });

        // Cerrar menú al hacer clic en enlaces
        const mobileLinks = document.querySelectorAll('.mobile-nav-link, .submenu-link, .mobile-report-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenuHandler();
            });
        });
    }

    setupTouchEvents() {
        // Mejorar feedback táctil en dispositivos móviles
        const touchElements = document.querySelectorAll('.mobile-nav-item, .mobile-nav-link, .submenu-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }

    setupResizeHandler() {
        // Cerrar menú móvil al cambiar a desktop
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth >= 768 && this.mobileMenuOverlay?.classList.contains('active')) {
                    this.closeMobileMenuHandler();
                }
            }, 100);
        });
    }

    setupAccessibility() {
        // Mejorar accesibilidad
        this.updateAriaAttributes();

        // Navegación por teclado en menú móvil
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.mobileMenuOverlay?.classList.contains('active')) {
                this.handleMobileMenuKeyboardNav(e);
            }
        });
    }

    openMobileMenu() {
        if (this.mobileMenuOverlay && this.hamburgerBtn) {
            this.mobileMenuOverlay.classList.add('active');
            this.hamburgerBtn.classList.add('active');
            this.body.classList.add('no-scroll');
            this.updateAriaAttributes(true);
            
            // Enfocar primer elemento del menú
            setTimeout(() => {
                const firstLink = this.mobileMenuOverlay.querySelector('.mobile-nav-link');
                firstLink?.focus();
            }, 100);
        }
    }

    closeMobileMenuHandler() {
        if (this.mobileMenuOverlay && this.hamburgerBtn) {
            this.mobileMenuOverlay.classList.remove('active');
            this.hamburgerBtn.classList.remove('active');
            this.body.classList.remove('no-scroll');
            this.updateAriaAttributes(false);
            
            // Devolver foco al botón que abrió el menú
            this.hamburgerBtn.focus();
        }
    }

    updateAriaAttributes(menuOpen = false) {
        if (this.hamburgerBtn) {
            this.hamburgerBtn.setAttribute('aria-expanded', menuOpen);
            this.hamburgerBtn.setAttribute('aria-label', 
                menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        }

        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.setAttribute('aria-hidden', !menuOpen);
        }
    }

    handleMobileMenuKeyboardNav(e) {
        const focusableElements = this.mobileMenuOverlay?.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveHeader();
    
    // Inicializar modales de Bootstrap
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', () => {
            const input = modal.querySelector('input');
            input?.focus();
        });
    });

    // Detectar dispositivo táctil
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
});

// Manejo de formularios (opcional)
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí tu lógica de login
        console.log('Login submitted');
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí tu lógica de registro
        console.log('Register submitted');
    });
}

// Prevenir que los dropdowns se cierren al hacer clic dentro (para desktop)
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Lógica del Menú Hamburguesa ---
    const menuToggle = document.querySelector('.mobile-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    if (menuToggle && hamburger && navContainer) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'active' en el ícono hamburguesa (para el efecto de X)
            hamburger.classList.toggle('active');
            
            // Alterna la clase 'active' en el contenedor de los enlaces para MOSTRAR/OCULTAR el menú
            navContainer.classList.toggle('active');

            // Actualiza el estado ARIA para accesibilidad
            const isExpanded = navContainer.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Lógica del Scroll para el Header (Efecto Glassmorphism) ---
    const glassHeader = document.querySelector('.glass-header');
    
    if (glassHeader) {
        window.addEventListener('scroll', function() {
            // Añade la clase 'scrolled' cuando el usuario se desplaza más de 50px
            if (window.scrollY > 50) {
                glassHeader.classList.add('scrolled');
            } else {
                glassHeader.classList.remove('scrolled');
            }
        });
    }

    // --- 3. Lógica para cerrar el menú al hacer clic en un enlace (Opcional) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Asegúrate de que el menú solo se cierre si está abierto en móvil (activo)
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                hamburger.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});