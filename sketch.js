var canvas;
var backgroundImage, striker_img, goli_img;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, p1, p2;
var players = [];
var goal,ball;

function preload() {
  backgroundImage = loadImage("./assets/ballbk.jpg");
  striker_img = loadImage("../assets/soccercristianoimage.jpg");
  goli_img = loadImage("../assets/goalkeeperimage.jpg");
  powerCoinImage = loadImage("./assets/goldCoin.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
