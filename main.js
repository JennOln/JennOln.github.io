const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = playPauseBtn.querySelector('i');
const progressBar = document.getElementById('progressBar');

// Controlar Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
});

// Actualizar la barra de progreso a medida que se reproduce el audio
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Permitir al usuario cambiar el progreso del audio al interactuar con la barra
progressBar.addEventListener('input', () => {
    const value = progressBar.value;
    audio.currentTime = (value / 100) * audio.duration;
});

document.addEventListener('DOMContentLoaded', function() {
    const $days = document.getElementById('dias'),
          $horas = document.getElementById('horas'),
          $minutos = document.getElementById('minutos'),
          $segundos = document.getElementById('segundos'),
          $finalMessage = document.querySelector('.final-sms'), // Usar clase correcta
          $counterContainer = document.querySelector('.container__counter');
    
    // Fecha de la boda
    const countdownDate = new Date('2026-12-27T00:16:00').getTime();

    let interval = setInterval(function() {
        const now = new Date().getTime();
        let distance = countdownDate - now;
        // Cuando llegue a 0
        if (distance <= 0) {
            clearInterval(interval);
            $counterContainer.classList.add('hidden'); // Ocultar el contador
            $finalMessage.classList.add('show');
        }

        // Calcular días-horas-minutos-segundos
        let dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        let horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distance % (1000 * 60)) / 1000);

        // Escribir resultados
        $days.innerHTML = dias;
        $horas.innerHTML = ('0' + horas).slice(-2);
        $minutos.innerHTML = ('0' + minutos).slice(-2);
        $segundos.innerHTML = ('0' + segundos).slice(-2);

    }, 1000);
    

    // Intersection Observer para animaciones anteriores
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.titulo, .savethedate, .fecha, p, h3, .NuestrosPadres, .contenedorVestimenta, h2, #mesaRegalos__boton, #mapa, #btn-si, #btn-no, #submit, #hospedaje, #app__boton, #contador, .itinerario, .sparky, .ceremonia, .sliderCarrusel, .dots-memories').forEach(elemento => {
        observer.observe(elemento);
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzfV7gHyPsAlsO8X2WllIERQk7RvzH8jEv7BXjTTiS5BSKgvS9pSPQEYMrFmuOIjESC/exec';
    const form = document.forms['contact-form'];

    const botonSi = document.getElementById('btn-si');
    const botonNo = document.getElementById('btn-no');
    const asistenciaInput = document.getElementById('asistencia'); // El input oculto

    // Función para manejar el anclaje y guardar el valor seleccionado
    function seleccionarBoton(boton, valor) {
        // Quita la clase "seleccionado" de ambos botones
        botonSi.classList.remove('seleccionado');
        botonNo.classList.remove('seleccionado');
        
        // Añade la clase "seleccionado" solo al botón presionado
        boton.classList.add('seleccionado');

        // Guarda el valor en el input oculto
        asistenciaInput.value = valor;
    }

    // Añadir eventos a los botones
    botonSi.addEventListener('click', () => seleccionarBoton(botonSi, 'SÍ, asistiré'));
    botonNo.addEventListener('click', () => seleccionarBoton(botonNo, 'NO asistiré'));

    // Evento de envío del formulario
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Validar que el usuario haya seleccionado una opción
        if (!asistenciaInput.value) {
            alert('Por favor selecciona si asistirás o no.');
            return;
        }

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => alert("¡Gracias! Tu confirmación ha sido enviada"))
            .then(() => { window.location.reload(); })
            .catch(error => console.error('Error!', error.message));
    });

});
