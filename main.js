/*let c = init("canvas");
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
//initiation

class firefly {
    constructor(){
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.s = Math.random() * 2;
        this.ang = Math.random() * 2 * Math.PI;
        this.v = (this.s * this.s) / 4;
    }
    move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.and += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI)/180;
    }
    show() {
        c.beginPath()
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = "#fddba3";
        c.fill();
    }
}
    
let f = [];

function draw(){
    if(f.length < 100){
        for (let j = 0; i < 10; j++) {
            f.push(new firefly());
        }
    }    
}
//animation
for (let i = 0;i<f.length; i++) {
    f[i].move();
    f[i].move();
    if (f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h) {
        f.splice(i, 1);
    }
}

let mouse = {}
let last_mouse = {};

canvas.addEventListener(
    "mouseover", 
    function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x =e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    },
    false
);

function init(elemid){
    let canvas = document.getElementById(elemid),
    c = canvas.getContext('2d'),
    w = (canvas.width = window.innerWidth), 
    h = (canvas.height = window.innerHeight);
    c.fillStyle = "rgb(30, 30, 30, 1)";
    c.fillRect(0, 0, w, h);
    return c;
}

window.requestAnimationFrame = function () {
    return (
        window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback);
        }
    );
};

function loop( ) {
    window.requestAnimationFrame(loop)
    c.clearRect(0, 0, w, h);
    draw();
}

window.addEventListener("resize", function() {
    (w = canvas.width = window.innerWidth),
    (h = canvas.height = window.innerHeight);
    loop();
});
loop();
setInterval(loop, 1000 / 60);
*/
document.addEventListener('DOMContentLoaded', function() {
    const $days = document.getElementById('dias'),
          $horas = document.getElementById('horas'),
          $minutos = document.getElementById('minutos'),
          $segundos = document.getElementById('segundos'),
          $finalMessage = document.querySelector('.final-sms'); // Usar clase correcta

    // Fecha futura
    const countdownDate = new Date('Oct 29, 2025 00:17:00').getTime(); // Corregir la sintaxis de la fecha

    let interval = setInterval(function() {
        // Obtener fecha actual y milisegundos
        const now = new Date().getTime();

        // Obtener la distancia entre ambas fechas
        let distance = countdownDate - now;

        // Calcular días-horas-minutos-segundos
        let dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        let horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distance % (1000 * 60)) / 1000);

        // Escribir resultados
        $days.innerHTML = dias;
        $horas.innerHTML = horas;
        $minutos.innerHTML = minutos;
        $segundos.innerHTML = ('0' + segundos).slice(-2);

        // Cuando llegue a 0
        if (distance < 0) {
            clearInterval(interval);
            $finalMessage.style.transform = 'translateY(0)';
            $finalMessage.style.opacity = '1';
        }
    }, 1000);

    // Intersection Observer para animaciones anteriores
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.titulo, .savethedate, .fecha, p, h3, .NuestrosPadres, .contenedorVestimenta, h2, #mesaRegalos__boton, #mapa, #btn-si, #btn-no, #sent, #hospedaje, #app__boton').forEach(elemento => {
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
