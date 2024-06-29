let score = 0;
let cross = true;
let hasJumped = false;
let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');
let gameContainer = document.querySelector('.gameContainer');
let startContainer = document.querySelector('.startContainer');
let startButton = document.getElementById('startButton');
let restartContainer = document.querySelector('.restartContainer');
let restartButton = document.getElementById('restartButton');
let obstacle = document.querySelector('.obstacle');
let gameInterval;

startButton.onclick = function() {
    startContainer.style.display = 'none';
    obstacle.classList.add('obstacleAni');
    audio.play();
    startGame();
};

restartButton.onclick = function() {
    location.reload();
};

function startGame() {
    document.onkeydown = function(e) {
        if (e.keyCode == 38) { // for upper button
            let dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            hasJumped = true;
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 600); // Match animation duration
        }

        if (e.keyCode == 39) { // for right button
            let dino = document.querySelector('.dino');
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }
        if (e.keyCode == 37) { // for left button
            let dino = document.querySelector('.dino');
            let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX - 112 + "px";
        }
    };

    gameInterval = setInterval(() => {
        let dino = document.querySelector('.dino');
        let gameOver = document.querySelector('.gameOver');

        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
        let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

        let offsetX = Math.abs(dx - ox);
        let offsetY = Math.abs(dy - oy);

        if (offsetX < 73 && offsetY < 52) {
            gameOver.innerHTML = "Game Over";
            obstacle.classList.remove('obstacleAni');
            audiogo.play();
            clearInterval(gameInterval);
            setTimeout(() => {
                dino.classList.add('fallDeer');
                
            }, 50);
            setTimeout(() => {
                audio.pause();
                audiogo.pause();
            }, 1000);
            restartContainer.style.display = 'block';
        } else if (offsetX < 145 && cross && hasJumped) {
            // dino.classList.add('dayNightCycle');
            score += 100;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                let newDur = aniDur - 0.2;
                obstacle.style.animationDuration = newDur + 's';
            }, 500);
        }
    }, 10);
}

function updateScore(score) {
    let scoreCount = document.getElementById('scoreCount');
    scoreCount.innerHTML = "Your Score: " + score;
}
