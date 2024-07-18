document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
  
    fetch('assets/data/personajes.json')
      .then(response => response.json())
      .then(personajes => {
        mostrarDetalle(personajes, nombre);
        configurarBuscador(personajes);
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
  
    function mostrarDetalle(personajes, nombre) {
      const personaje = personajes.find(p => p.nombre === nombre);
  
      if (personaje) {
        const nombreElemento = document.getElementById('nombre');
        nombreElemento.textContent = personaje.nombre;
  
        const detalleContenedor = document.getElementById('detalle');
        detalleContenedor.innerHTML = ''; // Limpiar contenido previo
        const col = document.createElement('div');
        col.classList.add('col-md-6', 'offset-md-3');
  
        const card = document.createElement('div');
        card.classList.add('card');
  
        const img = document.createElement('img');
        img.src = personaje.imagen;
        img.classList.add('card-img-top');
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = `
          <strong>Edad:</strong> ${personaje.edad} <br>
          <strong>Ocupación:</strong> ${personaje.ocupacion} <br>
          <strong>Familia:</strong> ${personaje.familia} <br>
          <strong>Descripción:</strong> ${personaje.descripcion}
        `;
  
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
  
        detalleContenedor.appendChild(col);
      } else {
        const detalleContenedor = document.getElementById('detalle');
        const mensajeError = document.createElement('p');
        mensajeError.textContent = 'Personaje no encontrado.';
        detalleContenedor.appendChild(mensajeError);
      }
    }
  
    function configurarBuscador(personajes) {
      document.getElementById('buscar').addEventListener('input', event => {
        const searchTerm = event.target.value.toLowerCase();
        const personajesFiltrados = personajes.filter(personaje =>
          personaje.nombre.toLowerCase().includes(searchTerm) ||
          personaje.descripcion.toLowerCase().includes(searchTerm)
        );
  
        if (personajesFiltrados.length > 0) {
          mostrarDetalle(personajesFiltrados, personajesFiltrados[0].nombre);
        } else {
          const detalleContenedor = document.getElementById('detalle');
          detalleContenedor.innerHTML = '<p>Personaje no encontrado.</p>';
        }
      });
    }
  });
  