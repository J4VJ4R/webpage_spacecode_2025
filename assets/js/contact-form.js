/**
 * Contact Form Handler - SpaceCode Technologies
 * Maneja el envío del formulario con AJAX para mejor UX
 * 
 * @version 1.0
 * @date 2025-10-31
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Deshabilitar botón de envío
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Ocultar mensaje anterior
        formMessage.style.display = 'none';
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        
        // Enviar con AJAX
        fetch(contactForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar mensaje
            formMessage.style.display = 'block';
            
            if (data.success) {
                // Éxito
                formMessage.style.backgroundColor = '#d4edda';
                formMessage.style.color = '#155724';
                formMessage.style.border = '1px solid #c3e6cb';
                formMessage.innerHTML = '<strong>✅ ' + data.message + '</strong>';
                
                // Limpiar formulario
                contactForm.reset();
                
                // Enviar evento a Google Analytics (si está disponible)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form Sent'
                    });
                }
                
            } else {
                // Error
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.border = '1px solid #f5c6cb';
                formMessage.innerHTML = '<strong>❌ ' + data.message + '</strong>';
            }
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Auto-ocultar mensaje después de 10 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        })
        .catch(error => {
            // Error de red
            console.error('Error:', error);
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            formMessage.style.border = '1px solid #f5c6cb';
            formMessage.innerHTML = '<strong>❌ Error de conexión. Por favor, intenta de nuevo o contáctanos por WhatsApp.</strong>';
            
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });
    
    // Validación en tiempo real del email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.setCustomValidity('Por favor, ingresa un email válido');
                this.reportValidity();
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Validación en tiempo real del teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Permitir solo números, espacios, +, -, (, )
            this.value = this.value.replace(/[^0-9\s\+\-\(\)]/g, '');
        });
    }
});
