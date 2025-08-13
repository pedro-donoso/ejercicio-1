$(document).ready(function() {
    const reservaModal = new bootstrap.Modal(document.getElementById('reservaModal'));
    let peliculaSeleccionada = '';
    
    $('.btn-reservar').click(function(e) {
        e.preventDefault();
        
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
            $(this).css('transform', 'scale(1)');
        }, 200);
        
        peliculaSeleccionada = $(this).closest('.movie-card').find('.movie-title').text().trim();
        
        mostrarFormularioReserva();
    });
    
    function mostrarFormularioReserva() {
        const formularioHTML = `
            <form id="reservaForm" class="reserva-form">
                <!-- Película -->
                <div class="mb-2">
                    <label class="form-label">Película</label>
                    <select class="form-select" id="pelicula" required>
                        <option value="" disabled>Selecciona una película</option>
                        <option value="Duna Parte 2" ${peliculaSeleccionada === 'Duna Parte 2' ? 'selected' : ''}>Duna Parte 2</option>
                        <option value="OPPENHEIMER" ${peliculaSeleccionada === 'OPPENHEIMER' ? 'selected' : ''}>Oppenheimer</option>
                        <option value="Barbie" ${peliculaSeleccionada === 'Barbie' ? 'selected' : ''}>Barbie</option>
                    </select>
                </div>

                <!-- Horario -->
                <div class="mb-2">
                    <label class="form-label">Horario</label>
                    <select class="form-select" id="horario" required>
                        <option value="" disabled selected>Selecciona una hora</option>
                        <option value="16:00">16:00</option>
                        <option value="18:30">18:30</option>
                        <option value="21:00">21:00</option>
                    </select>
                </div>

                <!-- Asientos -->
                <div class="mb-2">
                    <label class="form-label">Cantidad de Asientos</label>
                    <div class="input-group">
                        <input type="number" class="form-control" id="asientos" min="1" max="10" value="1" required>
                        <span class="input-group-text"><i class="fas fa-chair"></i></span>
                    </div>
                    <small class="form-text text-muted">Máximo 10 asientos por reserva</small>
                </div>

                <hr class="my-4">

                <!-- Pago Simulado -->
                <h4 class="mb-2">Pago</h4>
            
                <div class="row mb-2">
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
                <div class="resumen-reserva card mb-3">
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
        
        $('#formularioReservaContainer').html(formularioHTML);
        
        inicializarEventosFormulario();
        
        reservaModal.show();
        
        actualizarResumenReserva();
    }
    
    function inicializarEventosFormulario() {
        $('#reservaForm').on('change input', function() {
            actualizarResumenReserva();
        });
        
        $('#cvv').on('input', function() {
            $(this).val($(this).val().replace(/[^0-9]/g, '').substr(0, 4));
        });
        
        $('#cancelarBtn').click(function() {
            if (confirm('¿Estás seguro de que deseas cancelar la reserva?')) {
                reservaModal.hide();
            }
        });
        
        $('#reservaForm').submit(function(e) {
            e.preventDefault();
            procesarReserva();
        });
    }
    
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
        
        if (asientos) {
            const total = asientos * 5000;
            html += `<hr class="my-2">
                    <p class="mb-0"><strong>Total:</strong> <span>${total}</span></p>`;
        }
        
        html += '</div>';
        $('#resumenContenido').html(html);
    }
    
    function procesarReserva() {
        const camposRequeridos = ['#pelicula', '#horario', '#asientos', '#titular', '#cvv'];
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
        
        if ($('#cvv').val().length < 3) {
            $('#cvv').addClass('is-invalid');
            alert('El CVV debe tener al menos 3 dígitos');
            return;
        }
        
        mostrarConfirmacionReserva();
    }
    
    function mostrarConfirmacionReserva() {
        const pelicula = $('#pelicula').val();
        const horario = $('#horario').val();
        const asientos = $('#asientos').val();
        const total = (asientos * 5000);
        const nroConfirmacion = Math.floor(Math.random() * 900000) + 100000;
        
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
                            
                            <div class="mb-2">
                                <p><strong>Película:</strong> ${pelicula}</p>
                                <p><strong>Horario:</strong> ${horario}</p>
                                <p><strong>Asientos:</strong> ${asientos}</p>
                                <p><strong>Total:</strong> ${total}</p>
                                <hr>
                                <p class="mb-0"><strong>Número de confirmación:</strong> #${nroConfirmacion}</p>
                            </div>
                            
                            <div class="alert alert-success">
                                <p>Muchas gracias por su compra.</p>
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
        
        $('body').append(confirmacionHTML);
        
        const confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
        confirmacionModal.show();
        
        reservaModal.hide();
        
        $('#confirmacionModal').on('hidden.bs.modal', function() {
            $(this).remove();
            $('#reservaForm').trigger('reset');
        });
    }
});