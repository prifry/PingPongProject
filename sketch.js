/*Guided Project pong from alura
 **Description: Creating a ping pong game with javascript.
 **Name: Priscila Fry
 **Date: 09/17/2024************************************************/

let xBola = 300, yBola = 200;
let diameterBola = 13;
let raio = diameterBola / 2;
let velocityXBola = 6, velocityYBola = 6;

let raqueteWidth = 10, raqueteHeight = 50;
let xMraquete = 5, yMraquete = 150;
let xOraquete = 585, yOraquete = 150;
let velocidadeYOraquete;

let meusPontos = 0, pontosOponente = 0;
let gameRunning = false;
let musicOn = true;

let raquetada, ponto, trilha;
let startBtn, stopBtn, musicBtn;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);

  // Buttons under canvas
  startBtn = createButton('Start Game');
  startBtn.parent('controls');       // Attach to your div
  startBtn.mousePressed(() => {
    gameRunning = true;
    if (musicOn && !trilha.isPlaying()) trilha.loop();
  });

  stopBtn = createButton('Stop Game');
  stopBtn.parent('controls');        // Attach to your div
  stopBtn.mousePressed(() => {
    gameRunning = false;
    trilha.stop();
  });

  musicBtn = createButton('Toggle Music');
  musicBtn.parent('controls');       // Attach to your div
  musicBtn.mousePressed(() => {
    musicOn = !musicOn;
    if (musicOn && gameRunning) trilha.loop();
    else trilha.stop();
  });

  textSize(16);
  textAlign(CENTER);
}

function draw() {
  background(0);
   if (!gameRunning) return; // stop updating/drawing if game is paused
  mostraBola();
  if (gameRunning) {
    moveBola();
    verifyColisionBoard();
    moveRaquete();
    moveRaqueteOponente();
    colisaoRaqueteBiblioteca(xMraquete, yMraquete);
    colisaoRaqueteBiblioteca(xOraquete, yOraquete);
    checkScore();
    marcaPonto();
  }

  mostraRaquete(xMraquete, yMraquete);
  mostraRaquete(xOraquete, yOraquete);
  drawScore();
}

// --- Ball functions ---
function mostraBola() {
  circle(xBola, yBola, diameterBola);
}

function moveBola() {
  xBola += velocityXBola;
  yBola += velocityYBola;
}

function verifyColisionBoard() {
  if (xBola + raio > width || xBola - raio < 0) velocityXBola *= -1;
  if (yBola + raio > height || yBola - raio < 0) velocityYBola *= -1;
}

// --- Paddle functions ---
function mostraRaquete(x, y) {
  rect(x, y, raqueteWidth, raqueteHeight);
}

function moveRaquete() {
  if (keyIsDown(UP_ARROW)) yMraquete -= 10;
  if (keyIsDown(DOWN_ARROW)) yMraquete += 10;

  yMraquete = constrain(yMraquete, 0, height - raqueteHeight);
}

function moveRaqueteOponente() {
  velocidadeYOraquete = (yBola - yOraquete - raqueteWidth / 2 - 50) / 4;
  yOraquete += velocidadeYOraquete;
  yOraquete = constrain(yOraquete, 0, height - raqueteHeight);
}

function colisaoRaqueteBiblioteca(x, y) {
  let collide = collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBola, yBola, raio);
  if (collide) {
    velocityXBola *= -1;
    raquetada.play();
  }
}

// --- Score functions ---
function checkScore() {
  fill(255);
  drawScore();
}

function drawScore() {
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBola > 588) {
    meusPontos++;
    ponto.play();
    resetBall();
  }
  if (xBola < 9) {
    pontosOponente++;
    ponto.play();
    resetBall();
  }
}

function resetBall() {
  xBola = width / 2;
  yBola = height / 2;
  velocityXBola *= -1;
  velocityYBola = 6;
}

let gameRunning = false;

document.getElementById('start-game').addEventListener('click', () => {
  gameRunning = true;
  if (!trilha.isPlaying()) trilha.loop();
});

document.getElementById('end-game').addEventListener('click', () => {
  gameRunning = false;
});

document.getElementById('toggle-music').addEventListener('click', () => {
  if (trilha.isPlaying()) trilha.stop();
  else trilha.loop();
});
