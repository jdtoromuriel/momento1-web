document.addEventListener('DOMContentLoaded', function() {
    const goHomeButton = document.getElementById('goHome');

    goHomeButton.addEventListener('click', function() {
        // Borra el localStorage de 'pago'
        localStorage.removeItem('pago');
        
        // Redirige al inicio
        window.location.href = 'index.html'; // Ajusta el enlace al archivo de inicio de tu proyecto
    });
});
