const ingresarTexto = document.getElementById('ingresarTexto');
const botonEncriptar = document.getElementById('botonEncriptar');
const botonDesencriptar = document.getElementById('botonDesencriptar');
const botonCopiar = document.getElementById('botonCopiar');
const mensajeFinal = document.getElementById('mensajeFinal');
const personaje = document.getElementById('personaje');
const mensajeInfo = document.getElementById('mensajeInfo');
const right = document.getElementById('right');

function soloLetras(e) {
    let key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;

    for (let i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

let vocales = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
]



const reemplazar = (nuevoValor) => {
    mensajeFinal.innerHTML = nuevoValor;
    personaje.classList.add('oculto');
    ingresarTexto.value = '';
    mensajeInfo.style.display = 'none';
    botonCopiar.style.display = 'block';
    right.classList.add('ajustar');
    mensajeFinal.classList.add('ajustar');
};

const reset = () => {
    mensajeFinal.innerHTML = '';
    personaje.classList.remove('oculto');
    mensajeInfo.style.display = 'block';
    botonCopiar.style.display = 'none';
    right.classList.remove('ajustar');
    mensajeFinal.classList.remove('ajustar');
    ingresarTexto.focus();
};

botonEncriptar.addEventListener('click', () => {
    const texto = ingresarTexto.value.toLowerCase();
    if (texto != '') {
        function encriptar(newText) {
            for (let i = 0; i < vocales.length; i++) {
                if (newText.includes(vocales[i][0])) {
                    newText = newText.replaceAll(vocales[i][0], vocales[i][1]);
                }
            }
            return newText;
        }
    } else {
        alert('Favor de coloca un texto para encriptar');
        reset();
    }
    reemplazar(encriptar(texto));
});

botonDesencriptar.addEventListener('click', () => {
    const texto = ingresarTexto.value.toLowerCase();
    if (texto != '') {
        function desencriptar(newText) {
            for (let i = 0; i < vocales.length; i++) {
                if (newText.includes(vocales[i][1])) {
                    newText = newText.replaceAll(vocales[i][1], vocales[i][0]);
                }
            }
            return newText;
        }
        reemplazar(desencriptar(texto));
    } else {
        alert('Favor de coloca un texto para desencriptar');
        reset();
    }
});

botonCopiar.addEventListener('click', () => {
    let texto = mensajeFinal;
    /*Funciona pero no es compatible con dispositivos móviles
    navigator.clipboard.writeText(texto.value);*/
    texto.select();
    document.execCommand('copy');
    alert('El texto ha sido copiado');
    reset();
});