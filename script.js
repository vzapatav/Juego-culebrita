// Obtiene el elemento canvas y su contexto de dibujo 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define el tamaño del canvas
canvas.width = 400;
canvas.height = 400;

// Tamaño de cada celda del juego
const box = 20;

// Array que representa la serpiente, inicializado con un segmento
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Coordenadas de la comida generadas aleatoriamente
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Puntaje del juego
let score = 0;

// Dirección inicial de la serpiente
let direction;

// Escucha los eventos de tecla para cambiar la dirección de la serpiente
document.addEventListener('keydown', setDirection);

// Función para cambiar la dirección de la serpiente basado en la tecla presionada
function setDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT'; // Flecha izquierda
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP'; // Flecha arriba
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT'; // Flecha derecha
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN'; // Flecha abajo
}

// Función para verificar si la nueva cabeza de la serpiente colisiona con el cuerpo
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Función principal que dibuja el juego en el canvas
function draw() {
    // Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la serpiente
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white'; // Cabeza de la serpiente en verde, cuerpo en blanco
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red'; // Borde rojo
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Dibuja la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Posición de la cabeza de la serpiente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Mueve la serpiente en la dirección actual
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Verifica si la serpiente ha comido la comida
    if (snakeX === food.x && snakeY === food.y) {
        score++; // Aumenta el puntaje
        // Genera nueva comida en una posición aleatoria
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        // Elimina el último segmento de la serpiente si no ha comido
        snake.pop();
    }

    // Nueva cabeza de la serpiente
    let newHead = { x: snakeX, y: snakeY };

    // Verifica colisiones con los bordes o el propio cuerpo de la serpiente
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game); // Detiene el juego
        alert('Game Over'); // Muestra mensaje de fin de juego
        location.reload(); // Recarga la página para reiniciar el juego
    }

    // Añade la nueva cabeza al inicio del array de la serpiente
    snake.unshift(newHead);

    // Muestra el puntaje en la pantalla
    ctx.fillStyle = 'white';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Ejecuta la función draw cada 100 milisegundos para actualizar el juego continuamente
let game = setInterval(draw, 100);

