$(document).ready(function() {
    // Efecto al pasar el ratón sobre las tarjetas de película
    $('.movie-card').hover(
        function() {
            $(this).css('box-shadow', '0 8px 16px rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).css('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
        }
    );

    // Animación al hacer clic en el botón Reservar
    $('.btn-reservar').click(function(e) {
        e.preventDefault();
        
        // Animación del botón
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 200);
        
        // Aquí podrías agregar la lógica para reservar
        alert('Función de reserva en construcción');
    });

    // Efecto de carga inicial
    $('.movie-card').each(function(index) {
        $(this).delay(100 * index).animate({
            opacity: 1,
            top: 0
        }, 300);
    });
});