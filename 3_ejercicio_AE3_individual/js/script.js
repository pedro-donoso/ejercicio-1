document.addEventListener('DOMContentLoaded', function() {
  // Funcionalidad para rechazar solicitudes
  const rejectButtons = document.querySelectorAll('.conn-req-btn');
  
  rejectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const connectionRequest = this.closest('.connection-request');
      
      // Animación de desvanecimiento antes de eliminar
      if (connectionRequest) {
        connectionRequest.style.opacity = '0';
        connectionRequest.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          connectionRequest.remove();
          // Actualizar el contador de solicitudes
          updateRequestCount();
        }, 300);
      }
    });
  });
  
  // Funcionalidad para aceptar solicitudes (opcional)
  const acceptButtons = document.querySelectorAll('.conn-req-btn-ac');
  
  acceptButtons.forEach(button => {
    button.addEventListener('click', function() {
      const connectionRequest = this.closest('.connection-request');
      const userName = connectionRequest.querySelector('.conn-req-name').textContent;
      const userPhoto = connectionRequest.querySelector('.conn-req-photo').src;
      
      // Mover a la sección de conexiones
      const connectionsList = document.querySelector('.card:last-child');
      const connectionItem = document.createElement('div');
      connectionItem.className = 'connection';
      
      connectionItem.innerHTML = `
        <img src="${userPhoto}" alt="Foto de perfil de ${userName}" onerror="this.style.display='none'">
        ${userName}
      `;
      
      connectionsList.appendChild(connectionItem);
      
      // Incrementar contador de conexiones
      const connectionCount = document.querySelector('.connection-count');
      if (connectionCount) {
        connectionCount.textContent = parseInt(connectionCount.textContent) + 1;
      }
      
      // Eliminar la solicitud
      connectionRequest.style.opacity = '0';
      connectionRequest.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        connectionRequest.remove();
        updateRequestCount();
      }, 300);
    });
  });
  
  // Función para actualizar el contador de solicitudes
  function updateRequestCount() {
    const requestCount = document.querySelectorAll('.connection-request').length;
    const requestTitle = document.querySelector('.card h3');
    
    if (requestTitle) {
      requestTitle.textContent = `Solicitudes de Conexión (${requestCount})`;
    }
  }

  // Funcionalidad para editar perfil
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const editProfileForm = document.getElementById('edit-profile-form');
  const cancelEditBtn = document.getElementById('cancel-edit');

  editProfileBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    // Mostrar el formulario de edición
    document.getElementById('edit-profile').style.display = 'block';
    // Ocultar el contenido del perfil
    document.querySelector('.profile-card').style.display = 'none';

    // Rellenar el formulario con los datos actuales
    document.getElementById('name').value = document.getElementById('profile-name').textContent;
    document.getElementById('location').value = document.getElementById('profile-location').textContent.split('<br>')[0]; // Solo la ubicación
    document.getElementById('bio').value = document.getElementById('profile-bio').textContent;
  });

  editProfileForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Actualizar el perfil con los nuevos valores
    document.getElementById('profile-name').textContent = document.getElementById('name').value;
    document.getElementById('profile-location').textContent = document.getElementById('location').value;
    document.getElementById('profile-bio').textContent = document.getElementById('bio').value;

    // Ocultar el formulario de edición
    document.getElementById('edit-profile').style.display = 'none';
    // Mostrar el contenido del perfil
    document.querySelector('.profile-card').style.display = 'block';
  });

  cancelEditBtn.addEventListener('click', function() {
    // Ocultar el formulario de edición
    document.getElementById('edit-profile').style.display = 'none';
    // Mostrar el contenido del perfil
    document.querySelector('.profile-card').style.display = 'block';
  });
});


    