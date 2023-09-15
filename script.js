let intentos = 6;
let palabra;

fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
  .then(response => response.json())
  .then(response => {
    console.log(response);
    palabra = response[0].toUpperCase();
  })
  .catch(err => console.error(err));

const ERROR = document.getElementById('error');
const BOTON = document.getElementById('guess-button');
const REINTENTAR_BOTON = document.getElementById('retry-button');
REINTENTAR_BOTON.style.display = 'none';

BOTON.addEventListener('click', intentar);

document.getElementById('retry-button').addEventListener('click', function () {
  location.reload();
});

function leerIntento() {
  let intento = document.getElementById('guess-input').value;
  return intento.toUpperCase();
}

function initGrid() {
  const GRID = document.getElementById('grid');

  for (let i = 0; i < 6; i++) {
    const ROW = document.createElement('div');
    ROW.className = 'row';
    ROW.id = 'row-' + i;

    for (let j = 0; j < 5; j++) {
      const SPAN = document.createElement('span');
      SPAN.className = 'letter';
      SPAN.innerHTML = ' ';
      SPAN.style.backgroundColor = '#E5E5E5';
      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  }
}

initGrid();

function intentar() {
  ERROR.style.display = 'none';
  const INTENTO = leerIntento();
  if (!tamanho(INTENTO)) {
    ERROR.style.display = 'flex';
    ERROR.innerHTML = 'Introduce 5 letras';
    return false;
  }

  const GRID = document.getElementById('grid');

  const ROW = GRID.querySelector('#row-' + (6 - intentos));

  let spans = ROW.getElementsByClassName('letter');
  for (let i in palabra) {
    const SPAN = spans[i];

    if (INTENTO[i] === palabra[i]) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#02BB40';
    } else if (palabra.includes(INTENTO[i])) {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#FFC300';
    } else {
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = '#E5E5E5';
    }
  }

  if (INTENTO === palabra) {
    finalizar('GANASTE!😀');
    return;
  }

  intentos--;
  if (intentos === 0) {
    finalizar('PERDISTE!😖 La palabra es ' + palabra);
  }
}

function tamanho(palabra) {
  if (palabra.length == 5) {
    return true;
  }
  return false;
}

function finalizar(mensaje) {
  const INPUT = document.getElementById('guess-input');
  INPUT.disabled = true;
  BOTON.style.display = 'none';
  REINTENTAR_BOTON.style.display = 'block';

  Swal.fire({
    text: mensaje, // "GANASTE" or "PERDISTE"
    icon: mensaje.includes('GANASTE') ? 'success' : 'error', // Icon based on the outcome
    showCancelButton: false, // Hide the cancel button
    confirmButtonText: 'Aceptar', // Customize the confirmation button text
  });
}
