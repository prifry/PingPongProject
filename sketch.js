/*Guided Project pong from alura
 **Description: Creating a ping pong game with javascript.
 **Name: Priscila Fry
 **Date: 09/17/2024************************************************/

let xBola = 300; //sets the starting position of the ball X
let yBola = 200; //sets the starting position of the ball Y
let diameterBola = 13;
let raio = diameterBola / 2;
//below sets the velocity of the ball
let velocityXBola = 6;
let velocityYBola = 6;
let raqueteWidth = 10;
let raqueteHeight = 50;

//variables of my raquete
let xMraquete = 5; //place the raquete on the left side of the board
let yMraquete = 150; //places the raquete on the middle of the board

//Oponent raquete variables
let xOraquete = 585; // place raquete on the right side of board
let yOraquete = 150; //places the raquete on the middle of the board
let velocidadeYOraquete;

let collide = false;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons for the game
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400); // creates the black box for the game

  trilha.loop();
}

function draw() {
  background(0); // sets the black color for the background
  mostraBola(); // call the function to create the ball

  moveBola(); //call the function to move the ball

  verifyColisionBoard(); //calls the function to check collision
  mostraRaquete(xMraquete, yMraquete); // call to create minha raquete
  mostraRaquete(xOraquete, yOraquete); // call to create raquete oponent
  moveRaquete(); // call Function to make the raquete move
  //verifyColisionRaquete(); // call function to create collision in between the ball and the raquete
  colisaoRaqueteBiblioteca(xMraquete, yMraquete);
  colisaoRaqueteBiblioteca(xOraquete, yOraquete);
  moveRaqueteOponente();

  checkScore();
  marcaPonto();
}

function mostraBola() {
  circle(xBola, yBola, diameterBola); // creates the ball
}
function moveBola() {
  xBola = xBola + velocityXBola; // creates moviments
  yBola = yBola + velocityYBola; // creates moviments
}
function verifyColisionBoard() {
  //Verifying if there is a collision  with th board of the ball with the black box X and Y
  if (xBola + raio > width || xBola - raio < 0) {
    velocityXBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
    velocityYBola *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteWidth, raqueteHeight); // creando a raquete ************************
}

function moveRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yMraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yMraquete += 10;
  }
  if (yMraquete < 0) {
    yMraquete = 0;
  } else if (yMraquete > height - raqueteHeight) {
    yMraquete = height - raqueteHeight;
  }
}
function verifyColisionRaquete() {
  if (
    xBola - raio < xMraquete + mRaqueteWidth &&
    yBola - raio < yMraquete + mRaqueteHeight &&
    yBola + raio > yMraquete
  ) {
    velocityXBola *= -1;
    raquetada.play();
  }
}
function colisaoRaqueteBiblioteca(x, y) {
  collide = collideRectCircle(
    x,
    y,
    raqueteWidth,
    raqueteHeight,
    xBola,
    yBola,
    raio
  );
  if (collide) {
    velocityXBola *= -1;
    raquetada.play();
  }
}

function moveRaqueteOponente() {
  // Faz a raquete do oponente se mover para cima e para baixo seguindo a bolinha
  velocidadeYOraquete = (yBola - yOraquete - raqueteWidth / 2 - 50) / 4;
  yOraquete += velocidadeYOraquete;

  // Mantém a raquete dentro dos limites da tela
  if (yOraquete < 0) {
    yOraquete = 0;
  } else if (yOraquete > height - raqueteHeight) {
    yOraquete = height - raqueteHeight;
  }
} //this function above  is to play against computer

//This function bellow is to play against another player
//87 represents up letter w and 83 represents down  leter s in the key board
/*function moveRaqueteOponente(){
  if(keyIsDown(87)){
    yMraquete -=10;
  }
  if(keyIsDown(83)){
    yMraquete += 10;
  }
  if (yMraquete < 0) {
    yMraquete = 0;
  } else if (yMraquete > height - raqueteHeight) {
    yMraquete = height- raqueteHeight;
  }
}*/



function checkScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20); //creating a orange box for the scores
  fill(255); // cor do score
  text(meusPontos, 170, 26); //
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20); //creating a orange box for the scores
  fill(255); // cor do score
  text(pontosOponente, 470, 26);
}
function marcaPonto() {
  if (xBola > 588) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 9) {
    pontosOponente += 1;
    ponto.play();
  }
}
