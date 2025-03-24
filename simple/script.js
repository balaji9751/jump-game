const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score-value');

let playerJumping = false;
let score = 0;

// Player Jump Function
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    jump();
  }
});

function jump() {
  if (!playerJumping) {
    playerJumping = true;
    player.style.bottom = '140px';

    setTimeout(() => {
      player.style.bottom = '40px';
      playerJumping = false;
    }, 500); // Jump duration
  }
}

// Obstacle Movement
function moveObstacle() {
  let obstacleX = obstacle.offsetLeft;

  const interval = setInterval(() => {
    obstacleX -= 5; // Move obstacle
    obstacle.style.left = obstacleX + 'px';

    // Reset obstacle position
    if (obstacleX < -40) {
      obstacleX = 600;
      score++;
      scoreElement.innerText = score;
    }

    // Collision Detection
    if (obstacleX <= 90 && obstacleX >= 50 && !playerJumping) {
      alert('Game Over! Your Score: ' + score);
      clearInterval(interval);
      location.reload();
    }
  }, 20);
}

moveObstacle();
