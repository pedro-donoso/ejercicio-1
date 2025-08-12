$(document).ready(function() {
    // Variables globales
    const reservaModal = new bootstrap.Modal(document.getElementById('reservaModal'));
    let peliculaSeleccionada = '';
    
    // 1. Configuración de eventos para los botones "Reservar"
    $('.btn-reservar').click(function(e) {
        e.preventDefault();
        
        // Animación del botón
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 200);
        
        // Obtener la película seleccionada
        peliculaSeleccionada = $(this).closest('.movie-card').find('.movie-title').text().trim();
        
        // Mostrar el formulario de reserva
        mostrarFormularioReserva();
    });
    
    // 2. Función para mostrar el formulario de reserva
    function mostrarFormularioReserva() {
        // Crear el formulario de reserva
        const formularioHTML = `
            <form id="reservaForm" class="reserva-form">
                <!-- Película -->
                <div class="mb-4">
                    <label class="form-label">Película</label>
                    <select class="form-select" id="pelicula" required>
                        <option value="" disabled>Selecciona una película</option>
                        <option value="Duna Parte 2" ${peliculaSeleccionada === 'Duna Parte 2' ? 'selected' : ''}>Duna Parte 2</option>
                        <option value="OPPENHEIMER" ${peliculaSeleccionada === 'OPPENHEIMER' ? 'selected' : ''}>Oppenheimer</option>
                        <option value="Barbie" ${peliculaSeleccionada === 'Barbie' ? 'selected' : ''}>Barbie</option>
                    </select>
                </div>

                <!-- Horario -->
                <div class="mb-4">
                    <label class="form-label">Horario</label>
                    <select class="form-select" id="horario" required>
                        <option value="" disabled selected>Selecciona una hora</option>
                        <option value="16:00">16:00</option>
                        <option value="18:30">18:30</option>
                        <option value="21:00">21:00</option>
                    </select>
                </div>

                <!-- Asientos -->
                <div class="mb-4">
                    <label class="form-label">Cantidad de Asientos</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="asientos" min="1" max="10" value="1" required>
                        <span class="input-group-text"><i class="fas fa-chair"></i></span>
                    </div>
                    <small class="form-text text-muted">Máximo 10 asientos por reserva</small>
                </div>

                <hr class="my-4">

                <!-- Pago Simulado -->
                <h4 class="mb-3">Pago (simulado)</h4>
                <div class="mb-3">
                    <label class="form-label">Número de tarjeta</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="tarjeta" placeholder="1234 5678 9012 3456" required>
                        <span class="input-group-text"><i class="fas fa-credit-card"></i></span>
                    </div>
                    <div class="form-text">Fases ilustrados por: <strong id="tarjetaMuestra">**** **** **** 1234</strong></div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Nombre del titular</label>
                        <input type="text" class="form-control" id="titular" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">CVV</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="cvv" placeholder="123" required>
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                        </div>
                        <small class="form-text text-muted">3 o 4 dígitos en la parte posterior</small>
                    </div>
                </div>

                <!-- Resumen de Reserva -->
                <div class="resumen-reserva card mb-4">
                    <div class="card-header bg-light">
                        <h5 class="card-title mb-0">Resumen de tu Reserva</h5>
                    </div>
                    <div class="card-body">
                        <div id="resumenContenido">
                            <p class="text-muted mb-0">Complete el formulario para ver los detalles</p>
                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary me-md-2" id="cancelarBtn">
                        <i class="fas fa-times me-1"></i> Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary" id="confirmarBtn">
                        <i class="fas fa-check me-1"></i> Confirmar Reserva
                    </button>
                </div>
            </form>
        `;
        
        // Insertar el formulario en el modal
        $('#formularioReservaContainer').html(formularioHTML);
        
        // Inicializar eventos del formulario
        inicializarEventosFormulario();
        
        // Mostrar el modal
        reservaModal.show();
        
        // Actualizar resumen inicial
        actualizarResumenReserva();
    }
    
    // 3. Función para inicializar eventos del formulario
    function inicializarEventosFormulario() {
        // Actualizar resumen cuando cambian los campos
        $('#reservaForm').on('change input', function() {
            actualizarResumenReserva();
        });
        
        // Formatear número de tarjeta
        $('#tarjeta').on('input', function() {
            let value = $(this).val().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formatted = '';
            
            for (let i = 0; i < value.length && i < 16; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += value[i];
            }
            
            $(this).val(formatted);
            
            // Actualizar muestra de tarjeta
            const ultimos4 = value.length > 12 ? value.substr(-4) : '1234';
            $('#tarjetaMuestra').text(`**** **** **** ${ultimos4}`);
        });
        
        // Validar CVV
        $('#cvv').on('input', function() {
            $(this).val($(this).val().replace(/[^0-9]/g, '').substr(0, 4));
        });
        
        // Botón Cancelar
        $('#cancelarBtn').click(function() {
            if (confirm('¿Estás seguro de que deseas cancelar la reserva?')) {
                reservaModal.hide();
            }
        });
        
        // Envío del formulario
        $('#reservaForm').submit(function(e) {
            e.preventDefault();
            procesarReserva();
        });
    }
    
    // 4. Función para actualizar el resumen de la reserva
    function actualizarResumenReserva() {
        const pelicula = $('#pelicula').val();
        const horario = $('#horario').val();
        const asientos = $('#asientos').val();
        
        if (!pelicula && !horario && !asientos) {
            $('#resumenContenido').html('<p class="text-muted mb-0">Complete el formulario para ver los detalles</p>');
            return;
        }
        
        let html = '<div class="resumen-details">';
        
        if (pelicula) html += `<p class="mb-1"><strong>Película:</strong> ${pelicula}</p>`;
        if (horario) html += `<p class="mb-1"><strong>Horario:</strong> ${horario}</p>`;
        if (asientos) html += `<p class="mb-1"><strong>Asientos:</strong> ${asientos}</p>`;
        
        // Calcular total (precio simulado: 8.50€ por asiento)
        if (asientos) {
            const total = asientos * 8.50;
            html += `<hr class="my-2">
                    <p class="mb-0"><strong>Total:</strong> <span class="text-danger">€${total.toFixed(2)}</span></p>`;
        }
        
        html += '</div>';
        $('#resumenContenido').html(html);
    }
    
    // 5. Función para procesar la reserva
    function procesarReserva() {
        // Validar campos requeridos
        const camposRequeridos = ['#pelicula', '#horario', '#asientos', '#tarjeta', '#titular', '#cvv'];
        let valido = true;
        
        camposRequeridos.forEach(selector => {
            const $campo = $(selector);
            if (!$campo.val()) {
                $campo.addClass('is-invalid');
                valido = false;
            } else {
                $campo.removeClass('is-invalid');
            }
        });
        
        if (!valido) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        // Validar tarjeta (simulación)
        if ($('#tarjeta').val().replace(/\s/g, '').length !== 16) {
            $('#tarjeta').addClass('is-invalid');
            alert('El número de tarjeta debe tener 16 dígitos');
            return;
        }
        
        // Validar CVV
        if ($('#cvv').val().length < 3) {
            $('#cvv').addClass('is-invalid');
            alert('El CVV debe tener al menos 3 dígitos');
            return;
        }
        
        // Mostrar confirmación
        mostrarConfirmacionReserva();
    }
    
    // 6. Función para mostrar la confirmación de reserva
    function mostrarConfirmacionReserva() {
        const pelicula = $('#pelicula').val();
        const horario = $('#horario').val();
        const asientos = $('#asientos').val();
        const total = (asientos * 8.50).toFixed(2);
        const nroConfirmacion = Math.floor(Math.random() * 900000) + 100000;
        
        // Crear modal de confirmación dinámico
        const confirmacionHTML = `
            <div class="modal fade" id="confirmacionModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title"><i class="fas fa-check-circle me-2"></i>Reserva Confirmada</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <i class="fas fa-ticket-alt text-success" style="font-size: 3rem;"></i>
                            </div>
                            
                            <div class="mb-3">
                                <p><strong>Película:</strong> ${pelicula}</p>
                                <p><strong>Horario:</strong> ${horario}</p>
                                <p><strong>Asientos:</strong> ${asientos}</p>
                                <p><strong>Total:</strong> €${total}</p>
                                <hr>
                                <p class="mb-0"><strong>Número de confirmación:</strong> #${nroConfirmacion}</p>
                            </div>
                            
                            <div class="alert alert-success">
                                <i class="fas fa-envelope me-2"></i> Recibirás un correo electrónico con los detalles de tu reserva.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">
                                <i class="fas fa-thumbs-up me-1"></i> Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Agregar el modal al final del body
        $('body').append(confirmacionHTML);
        
        // Mostrar el modal de confirmación
        const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
        confirmacionModal.show();
        
        // Ocultar el modal de reserva
        reservaModal.hide();
        
        // Eliminar el modal de confirmación cuando se cierre
        $('#confirmacionModal').on('hidden.bs.modal', function() {
            $(this).remove();
            $('#reservaForm').trigger('reset');
        });
    }
});