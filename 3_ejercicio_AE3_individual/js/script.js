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
    });

    