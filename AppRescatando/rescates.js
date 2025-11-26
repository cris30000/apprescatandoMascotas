// JavaScript específico para la página de rescates
document.addEventListener('DOMContentLoaded', function() {
    initializeRescatesPage();
});

function initializeRescatesPage() {
    // Preview de fotos
    const fotoInput = document.getElementById('fotos');
    const previewContainer = document.getElementById('previewFotos');
    
    if (fotoInput) {
        fotoInput.addEventListener('change', function(e) {
            previewContainer.innerHTML = '';
            const files = e.target.files;
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const previewDiv = document.createElement('div');
                        previewDiv.className = 'col-6 col-md-4 col-lg-3 foto-preview';
                        
                        previewDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" class="remove-foto" data-index="${i}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        
                        previewContainer.appendChild(previewDiv);
                    };
                    
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    // Remover foto del preview
    previewContainer.addEventListener('click', function(e) {
        if (e.target.closest('.remove-foto')) {
            const button = e.target.closest('.remove-foto');
            const index = parseInt(button.getAttribute('data-index'));
            e.preventDefault();
            
            // Remover del preview
            button.parentElement.remove();
            
            // Crear nuevo FileList sin la imagen removida
            const dt = new DataTransfer();
            const files = fotoInput.files;
            
            for (let i = 0; i < files.length; i++) {
                if (i !== index) {
                    dt.items.add(files[i]);
                }
            }
            
            fotoInput.files = dt.files;
        }
    });

    // Filtros de la galería
    const filtros = document.querySelectorAll('.filtros-rescate .btn');
    const rescates = document.querySelectorAll('#gridRescates .col-lg-4');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover active de todos los botones
            filtros.forEach(btn => btn.classList.remove('active'));
            // Agregar active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            rescates.forEach(rescate => {
                if (filter === 'todos' || rescate.getAttribute('data-categoria') === filter) {
                    rescate.style.display = 'block';
                    rescate.style.animation = 'fadeIn 0.6s ease-out';
                } else {
                    rescate.style.display = 'none';
                }
            });
        });
    });

    // Manejo del formulario de reporte
    const reporteForm = document.getElementById('reporteRescateForm');
    
    if (reporteForm) {
        reporteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            if (validateRescueForm()) {
                // Simular envío del formulario
                const formData = new FormData(this);
                
                // Mostrar loading
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de envío
                setTimeout(() => {
                    // Aquí iría la lógica real de envío
                    console.log('Formulario enviado:', Object.fromEntries(formData));
                    
                    // Mostrar mensaje de éxito
                    showAlert('¡Reporte enviado exitosamente! Nuestro equipo se pondrá en contacto contigo pronto.', 'success');
                    
                    // Resetear formulario
                    reporteForm.reset();
                    previewContainer.innerHTML = '';
                    
                    // Restaurar botón
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                }, 2000);
            }
        });
    }

    // Validación del formulario
    function validateRescueForm() {
        const requiredFields = reporteForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        // Validación específica para email si se proporciona
        const emailField = document.getElementById('email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            emailField.classList.add('is-invalid');
            isValid = false;
        }
        
        if (!isValid) {
            showAlert('Por favor, completa todos los campos obligatorios correctamente.', 'error');
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showAlert(message, type) {
        // Remover alertas existentes
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}