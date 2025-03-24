const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 70, y: 350,radius: 10,  color: "blue", jumping: false };
let obstacle = { x: 400, y: 350, radius: 20, color: "red", speed: 28 };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameOver = false;

document.getElementById("highScore").innerText = highScore;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player as a circle
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw obstacle as a circle
    ctx.fillStyle = obstacle.color;
    ctx.beginPath();
    ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (gameOver) return;

    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.radius < 0) {
        obstacle.x = canvas.width;
        score++;
        document.getElementById("score").innerText = score;
    }

    if (collision(player, obstacle)) {
        gameOver = true;
        document.getElementById("message").style.display = "block";
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").innerText = highScore;
        }
    }
}

function collision(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < a.radius + b.radius;
}

function gameLoop() {
    draw();
    update();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !player.jumping) {
        player.jumping = true;
        player.y -= 100;
        setTimeout(() => {
            player.y = 350;
            player.jumping = false;
        }, 300);
    }
    if (e.code === "Enter" && gameOver) {
        restartGame();
    }
});

function restartGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    obstacle.x = canvas.width;
    gameOver = false;
    document.getElementById("message").style.display = "none";
    gameLoop();
}

gameLoop();