// suscripciones.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let selectedPlan = null;
    
    // Inicialización
    initSuscripciones();
    
    function initSuscripciones() {
        // Configurar eventos para botones de planes
        setupPlanButtons();
        
        // Configurar validación del formulario
        setupFormValidation();
        
        // Configurar máscaras para campos de pago
        setupPaymentMasks();
        
        // Configurar animaciones
        setupAnimations();
    }
    
    function setupPlanButtons() {
        const planButtons = document.querySelectorAll('.btn-plan');
        
        planButtons.forEach(button => {
            button.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                selectPlan(plan);
                
                // Scroll suave al formulario
                document.getElementById('formulario-suscripcion').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
    
    function selectPlan(plan) {
        selectedPlan = plan;
        
        // Actualizar UI para mostrar plan seleccionado
        updateSelectedPlanUI(plan);
        
        // Habilitar botón de envío del formulario
        document.getElementById('submitSuscripcion').disabled = false;
        
        // Mostrar notificación de plan seleccionado
        showPlanSelectionNotification(plan);
    }
    
    function updateSelectedPlanUI(plan) {
        const selectedPlanContainer = document.getElementById('selectedPlan');
        let planName, planPrice;
        
        switch(plan) {
            case 'basico':
                planName = 'Amigo Peludo';
                planPrice = '$10/mes';
                break;
            case 'estandar':
                planName = 'Guardián Animal';
                planPrice = '$25/mes';
                break;
            case 'premium':
                planName = 'Héroe Rescatista';
                planPrice = '$50/mes';
                break;
        }
        
        selectedPlanContainer.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${planName}</h5>
                    <p class="mb-0 text-muted">${planPrice}</p>
                </div>
                <span class="badge bg-primary">Seleccionado</span>
            </div>
        `;
    }
    
    function showPlanSelectionNotification(plan) {
        // Crear notificación toast
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.style.zIndex = '11';
        
        toast.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header">
                    <i class="fas fa-check-circle text-success me-2"></i>
                    <strong class="me-auto">Plan Seleccionado</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    Has seleccionado el plan ${getPlanName(plan)}. ¡Gracias por tu apoyo!
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
    
    function getPlanName(plan) {
        switch(plan) {
            case 'basico': return 'Amigo Peludo';
            case 'estandar': return 'Guardián Animal';
            case 'premium': return 'Héroe Rescatista';
            default: return '';
        }
    }
    
    function setupFormValidation() {
        const form = document.getElementById('suscripcionForm');
        const submitButton = document.getElementById('submitSuscripcion');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                processSubscription();
            }
        });
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const form = document.getElementById('suscripcionForm');
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!selectedPlan) {
            showAlert('Por favor selecciona un plan de suscripción.', 'warning');
            isValid = false;
        }
        
        const termsCheckbox = document.getElementById('terminosSuscripcion');
        if (!termsCheckbox.checked) {
            showAlert('Debes aceptar los términos y condiciones para continuar.', 'warning');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar errores previos
        clearFieldError(field);
        
        // Validaciones específicas por tipo de campo
        switch(field.type) {
            case 'email':
                if (!isValidEmail(field.value)) {
                    errorMessage = 'Por favor ingresa un correo electrónico válido.';
                    isValid = false;
                }
                break;
                
            case 'tel':
                if (!isValidPhone(field.value)) {
                    errorMessage = 'Por favor ingresa un número de teléfono válido.';
                    isValid = false;
                }
                break;
                
            case 'text':
                if (field.id === 'numeroTarjeta' && !isValidCardNumber(field.value)) {
                    errorMessage = 'Por favor ingresa un número de tarjeta válido.';
                    isValid = false;
                } else if (field.id === 'fechaVencimiento' && !isValidExpiryDate(field.value)) {
                    errorMessage = 'Por favor ingresa una fecha de vencimiento válida (MM/AA).';
                    isValid = false;
                } else if (field.id === 'cvv' && !isValidCVV(field.value)) {
                    errorMessage = 'Por favor ingresa un CVV válido (3 dígitos).';
                    isValid = false;
                }
                break;
        }
        
        // Validación de campo requerido
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = 'Este campo es obligatorio.';
            isValid = false;
        }
        
        // Mostrar error si es necesario
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
    
    function setupPaymentMasks() {
        const cardNumberInput = document.getElementById('numeroTarjeta');
        const expiryDateInput = document.getElementById('fechaVencimiento');
        const cvvInput = document.getElementById('cvv');
        
        // Máscara para número de tarjeta (formato: XXXX XXXX XXXX XXXX)
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
        
        // Máscara para fecha de vencimiento (formato: MM/AA)
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
        
        // Máscara para CVV (solo números, máximo 3 dígitos)
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
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
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        const animateElements = document.querySelectorAll('.plan-card, .stat-card, .benefit-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    function processSubscription() {
        const submitButton = document.getElementById('submitSuscripcion');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carga
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Procesando...';
        
        // Simular procesamiento (en un caso real, aquí se enviarían los datos al servidor)
        setTimeout(() => {
            // Éxito
            showSuccessMessage();
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Resetear formulario
            document.getElementById('suscripcionForm').reset();
            selectedPlan = null;
            document.getElementById('selectedPlan').innerHTML = '<p class="text-muted">Por favor selecciona un plan arriba</p>';
            
        }, 2000);
    }
    
    function showSuccessMessage() {
        // Crear modal de éxito
        const successModal = document.createElement('div');
        successModal.className = 'modal fade';
        successModal.id = 'successModal';
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
                        <h3 class="mb-3">¡Suscripción Exitosa!</h3>
                        <p class="mb-4">Gracias por unirte a nuestra misión. Tu apoyo mensual ayudará a salvar más vidas de mascotas necesitadas.</p>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Continuar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
        
        // Mostrar modal
        const modal = new bootstrap.Modal(successModal);
        modal.show();
        
        // Eliminar modal del DOM después de cerrarse
        successModal.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(successModal);
        });
    }
    
    function showAlert(message, type) {
        // Crear alerta temporal
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto-eliminar después de 5 segundos
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
    
    function isValidCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return /^\d{16}$/.test(cleaned);
    }
    
    function isValidExpiryDate(expiryDate) {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(expiryDate)) return false;
        
        const [month, year] = expiryDate.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        
        if (parseInt(year) < currentYear) return false;
        if (parseInt(year) === currentYear && parseInt(month) < currentMonth) return false;
        
        return true;
    }
    
    function isValidCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }
});