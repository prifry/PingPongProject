/*Guided Project pong from alura
 **Description: Creating a ping pong game with javascript.
 **Name: Priscila Fry
 **Date: 09/17/2024************************************************/

let xBola = 300;
let yBola = 200;
let diameterBola = 13;
let raio = diameterBola / 2;
let velocityXBola = 6;
let velocityYBola = 6;
let raqueteWidth = 10;
let raqueteHeight = 50;

let xMraquete = 5;
let yMraquete = 150;

let xOraquete = 585;
let yOraquete = 150;
let velocidadeYOraquete;

let meusPontos = 0;
let pontosOponente = 0;

let raquetada, ponto, trilha;

let gameRunning = false;
let musicOn = true;

let startBtn, stopBtn, musicBtn;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);

  // Create Start button
  startBtn = createButton('Start Game');
  startBtn.position(10, height + 10);
  startBtn.mousePressed(() => {
    gameRunning = true;
    if (musicOn) trilha.loop();
  });

  // Create Stop button
  stopBtn = createButton('Stop Game');
  stopBtn.position(120, height + 10);
  stopBtn.mousePressed(() => {
    gameRunning = false;
    trilha.stop();
  });

  // Create Music Toggle button
  musicBtn = createButton('Toggle Music');
  musicBtn.position(230, height + 10);
  musicBtn.mousePressed(() => {
    musicOn = !musicOn;
    if (musicOn && gameRunning) {
      trilha.loop();
    } else {
      trilha.stop();
    }
  });
}

function draw() {
  background(0);

  if (!gameRunning) return; // stop drawing the game if not running

  mostraBola();
  moveBola();
  verifyColisionBoard();

  mostraRaquete(xMraquete, yMraquete);
  mostraRaquete(xOraquete, yOraquete);

  moveRaquete();
  colisaoRaqueteBiblioteca(xMraquete, yMraquete);
  colisaoRaqueteBiblioteca(xOraquete, yOraquete);

  moveRaqueteOponente();
  checkScore();
  marcaPonto();
}

function mostraBola() {
  circle(xBola, yBola, diameterBola);
}

function moveBola() {
  xBola += velocityXBola;
  yBola += velocityYBola;
}

function verifyColisionBoard() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocityXBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
    velocityYBola *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteWidth, raqueteHeight);
}

function moveRaquete() {
  if (keyIsDown(UP_ARROW)) yMraquete -= 10;
  if (keyIsDown(DOWN_ARROW)) yMraquete += 10;
  yMraquete = constrain(yMraquete, 0, height - raqueteHeight);
}

function colisaoRaqueteBiblioteca(x, y) {
  let collide = collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBola, yBola, raio);
  if (collide) {
    velocityXBola *= -1;
    raquetada.play();
  }
}

function moveRaqueteOponente() {
  velocidadeYOraquete = (yBola - yOraquete - raqueteWidth / 2 - 50) / 4;
  yOraquete += velocidadeYOraquete;
  yOraquete = constrain(yOraquete, 0, height - raqueteHeight);
}

function checkScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);

  fill(255, 140, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);

  fill(255, 140, 0);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBola > width - 12) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 12) {
    pontosOponente += 1;
    ponto.play();
  }
}
