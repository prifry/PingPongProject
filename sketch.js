/*Guided Project pong from alura
 **Description: Creating a ping pong game with javascript.
 **Name: Priscila Fry
 **Date: 09/17/2024************************************************/

let xBola = 300, yBola = 200, diameterBola = 13;
let raio = diameterBola / 2;
let velocityXBola = 6, velocityYBola = 6;
let raqueteWidth = 10, raqueteHeight = 50;
let xMraquete = 5, yMraquete = 150;
let xOraquete = 585, yOraquete = 150;
let velocidadeYOraquete;
let collide = false;

let meusPontos = 0, pontosOponente = 0;

let raquetada, ponto, trilha;
let gameRunning = false; // Start/stop control

let startBtn, endBtn, musicBtn;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);

  // Start Button
  startBtn = createButton('Start Game');
  startBtn.position(10, height + 10);
  startBtn.mousePressed(() => gameRunning = true);

  // End Button
  endBtn = createButton('End Game');
  endBtn.position(120, height + 10);
  endBtn.mousePressed(() => gameRunning = false);

  // Music toggle button
  musicBtn = createButton('Music On/Off');
  musicBtn.position(230, height + 10);
  musicBtn.mousePressed(() => {
    if (trilha.isPlaying()) trilha.stop();
    else trilha.loop();
  });

  trilha.loop();
}

function draw() {
  background(0);

  if (!gameRunning) return;

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

// ----- Existing functions -----
function mostraBola() { circle(xBola, yBola, diameterBola); }
function moveBola() { xBola += velocityXBola; yBola += velocityYBola; }
function verifyColisionBoard() {
  if (xBola + raio > width || xBola - raio < 0) velocityXBola *= -1;
  if (yBola + raio > height || yBola - raio < 0) velocityYBola *= -1;
}
function mostraRaquete(x, y) { rect(x, y, raqueteWidth, raqueteHeight); }
function moveRaquete() {
  if (keyIsDown(UP_ARROW)) yMraquete -= 10;
  if (keyIsDown(DOWN_ARROW)) yMraquete += 10;
  if (yMraquete < 0) yMraquete = 0;
  else if (yMraquete > height - raqueteHeight) yMraquete = height - raqueteHeight;
}
function colisaoRaqueteBiblioteca(x, y) {
  collide = collideRectCircle(x, y, raqueteWidth, raqueteHeight, xBola, yBola, raio);
  if (collide) {
    velocityXBola *= -1;
    raquetada.play();
  }
}
function moveRaqueteOponente() {
  velocidadeYOraquete = (yBola - yOraquete - raqueteWidth / 2 - 50) / 4;
  yOraquete += velocidadeYOraquete;
  if (yOraquete < 0) yOraquete = 0;
  else if (yOraquete > height - raqueteHeight) yOraquete = height - raqueteHeight;
}
function checkScore() {
  stroke(255); textAlign(CENTER); textSize(16);
  fill(color(255, 140, 0)); rect(150, 10, 40, 20); fill(255); text(meusPontos, 170, 26);
  fill(color(255, 140, 0)); rect(450, 10, 40, 20); fill(255); text(pontosOponente, 470, 26);
}
function marcaPonto() {
  if (xBola > 588) { meusPontos += 1; ponto.play(); }
  if (xBola < 9) { pontosOponente += 1; ponto.play(); }
}
