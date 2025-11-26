// rescatistas.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización
    initRescatistas();
    
    function initRescatistas() {
        // Configurar formulario de reporte
        setupReporteForm();
        
        // Configurar animaciones
        setupAnimations();
        
        // Configurar navegación suave
        setupSmoothScroll();
    }
    
    function setupReporteForm() {
        const form = document.getElementById('formReporteRescate');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateReporteForm()) {
                processReporte();
            }
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateReporteForm() {
        let isValid = true;
        const form = document.getElementById('formReporteRescate');
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validar urgencia seleccionada
        const urgenciaSelected = form.querySelector('input[name="urgencia"]:checked');
        if (!urgenciaSelected) {
            showAlert('Por favor selecciona el nivel de urgencia.', 'warning');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        clearFieldError(field);
        
        switch(field.type) {
            case 'tel':
                if (!isValidPhone(field.value)) {
                    errorMessage = 'Por favor ingresa un número de teléfono válido.';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (field.value && !isValidEmail(field.value)) {
                    errorMessage = 'Por favor ingresa un correo electrónico válido.';
                    isValid = false;
                }
                break;
        }
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = 'Este campo es obligatorio.';
            isValid = false;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        
        const errorElement = field.parentNode.querySelector('.invalid-feedback');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    function processReporte() {
        const form = document.getElementById('formReporteRescate');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carga
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        
        // Simular envío (en producción, aquí se enviarían los datos al servidor)
        setTimeout(() => {
            // Éxito
            showSuccessMessage();
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Resetear formulario
            form.reset();
            
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successModal = document.createElement('div');
        successModal.className = 'modal fade';
        successModal.id = 'successModalReporte';
        successModal.tabIndex = '-1';
        
        successModal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="success-icon mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3 class="mb-3">¡Reporte Enviado!</h3>
                        <p class="mb-4">Hemos recibido tu reporte. Nuestro equipo se contactará contigo en las próximas 24 horas para coordinar el rescate.</p>
                        <div class="emergency-note p-3 bg-light rounded">
                            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                            <strong>Si es una emergencia grave</strong>, contacta nuestra línea directa: 
                            <span class="text-danger">+1 234 567 891</span>
                        </div>
                        <button type="button" class="btn btn-primary mt-3" data-bs-dismiss="modal">Entendido</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
        
        const modal = new bootstrap.Modal(successModal);
        modal.show();
        
        successModal.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(successModal);
        });
    }
    
    function setupAnimations() {
        // Animación para elementos al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        const animateElements = document.querySelectorAll('.proceso-card, .rescatista-card, .historia-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    function setupSmoothScroll() {
        // Navegación suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 5000);
    }
    
    // Funciones de utilidad para validación
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
});